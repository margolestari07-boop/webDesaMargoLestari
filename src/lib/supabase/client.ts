import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../../types/database";
import { getSupabaseEnvironment } from "./env";

export function createClient() {
  const { url, anonKey } = getSupabaseEnvironment();

  return createBrowserClient<Database>(url, anonKey);
}
