"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  message: string | null;
};

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(256),
});

const rejectedLogin: LoginState = {
  message: "Email atau kata sandi tidak cocok.",
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return rejectedLogin;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error || !data.user) {
    return rejectedLogin;
  }

  const { data: admin, error: membershipError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", data.user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (membershipError || !admin) {
    await supabase.auth.signOut();
    return rejectedLogin;
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}
