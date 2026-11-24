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

  // Hanya pengaturan berstatus published yang tampil ke publik.
  // Draf tidak pernah bocor ke header/footer.
  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "village_name, subdistrict, regency, province, address, phone, email, service_hours, status",
    )
    .eq("singleton", true)
    .eq("status", "published")
    .maybeSingle();

  return error ? null : data;
}
