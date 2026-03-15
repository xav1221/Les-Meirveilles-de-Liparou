import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://azdoqtfnwugnnhcchjfn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_AmBB6eUCHMZU2jA0rHfUvA_FiWGSamF";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
