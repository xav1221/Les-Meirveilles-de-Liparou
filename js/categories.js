import { supabase } from "./supabaseClient.js";

async function loadCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Erreur chargement catégories :", error);
    return;
  }

  console.log("Catégories chargées dans la page :", data);

  const categoryContainer = document.getElementById("categoryChips");
  if (!categoryContainer) {
    console.warn("Element #categoryChips introuvable");
    return;
  }

  categoryContainer.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.className = "chip active";
  allButton.textContent = "Toutes";
  allButton.dataset.category = "Toutes";
  categoryContainer.appendChild(allButton);

  data.forEach((category) => {
    const button = document.createElement("button");
    button.className = "chip";
    button.textContent = category.name;
    button.dataset.category = category.slug;
    categoryContainer.appendChild(button);
  });
}

loadCategories();
