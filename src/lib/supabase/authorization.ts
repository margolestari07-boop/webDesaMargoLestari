import { redirect } from "next/navigation";
import { createClient } from "./server";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || typeof userId !== "string") {
    redirect("/admin/login");
  }

  const { data: admin, error: membershipError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", userId)
    .eq("is_active", true)
    .maybeSingle();

  if (membershipError || !admin) {
    redirect("/admin/login");
  }

  return { supabase, userId };
}
