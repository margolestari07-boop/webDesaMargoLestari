import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { getSupabaseEnvironment } from "@/lib/supabase/env";

export const SITE_SETTINGS_CACHE_TAG = "site-settings";

export async function getPublicSiteSettings() {
  const { url, anonKey } = getSupabaseEnvironment();
  const supabase = createSupabaseClient<Database>(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          next: { revalidate: 300, tags: [SITE_SETTINGS_CACHE_TAG] },
        }),
    },
  });

  // Pengaturan situs selalu live: tidak ada lagi status draf/terbit.
  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "village_name, subdistrict, regency, province, address, phone, email, service_hours",
    )
    .eq("singleton", true)
    .maybeSingle();

  return error ? null : data;
}
