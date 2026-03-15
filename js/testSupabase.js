import { supabase } from "./supabaseClient.js";

async function testConnection() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Erreur Supabase :", error);
    return;
  }

  console.log("Catégories récupérées :", data);
}

testConnection();