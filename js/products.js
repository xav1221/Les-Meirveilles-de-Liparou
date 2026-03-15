import { supabase } from "./supabaseClient.js";

async function loadProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug
      ),
      product_images (
        image_url,
        is_cover,
        position
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur chargement produits :", error);
    return;
  }

  console.log("Produits chargés :", data);

  const productsGrid = document.getElementById("productsGrid");
  if (!productsGrid) {
    console.warn("Element #productsGrid introuvable");
    return;
  }

  productsGrid.innerHTML = "";

  if (!data.length) {
    productsGrid.innerHTML = `
      <div class="empty">
        <h3>Aucun article trouvé</h3>
        <p>Aucun produit n'est encore disponible dans la base.</p>
      </div>
    `;
    return;
  }

  data.forEach((product) => {
    const stockLabel =
      product.stock_status === "out_of_stock"
        ? "Rupture"
        : product.stock_status === "low_stock"
        ? "Stock faible"
        : "En stock";

    const coverImage =
      product.product_images?.find((img) => img.is_cover)?.image_url ||
      "./Images des articles/default-product.jpg";

    const card = document.createElement("article");
    card.className = "product";

    card.innerHTML = `
      <div class="product-image-wrap">
        <img src="${coverImage}" alt="${product.name}">
        <div class="product-labels">
          <span class="pill">${product.categories?.name || "Sans catégorie"}</span>
          <span class="pill">${stockLabel}</span>
        </div>
      </div>
      <div class="product-body">
        <h4>${product.name}</h4>
        <p>${product.description || ""}</p>

        <div class="price-block">
          <div>
            <div class="price-main">${Number(product.price_retail).toFixed(2)} €</div>
            <div class="sub">Détail</div>
          </div>
          <div>
            <div class="price-main">${Number(product.price_wholesale).toFixed(2)} €</div>
            <div class="sub">Gros dès ${product.wholesale_min_qty}</div>
          </div>
        </div>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

loadProducts();
