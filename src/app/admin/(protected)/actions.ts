"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/authorization";

export async function logout() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
