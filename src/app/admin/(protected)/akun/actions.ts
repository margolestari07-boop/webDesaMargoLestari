"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/types/database";
import { requireAdmin } from "@/lib/supabase/authorization";
import { insertAuditEvent } from "@/lib/content/drafts";
import {
  idleFormState,
  readFormStrings,
  zodFieldErrors,
  type FormState,
} from "@/lib/content/form";

const GENERIC_MISMATCH =
  "Email atau kata sandi saat ini tidak cocok.";
const GENERIC_FAILURE =
  "Perubahan belum tersimpan. Silakan coba lagi.";

const emailSchema = z.object({
  current_password: z
    .string()
    .min(1, "Kata sandi saat ini wajib diisi."),
  new_email: z
    .string()
    .trim()
    .email("Masukkan alamat email yang valid.")
    .max(254),
});

const passwordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, "Kata sandi saat ini wajib diisi."),
    new_password: z
      .string()
      .min(8, "Kata sandi baru minimal 8 karakter.")
      .max(128),
    confirm_password: z.string().min(1, "Konfirmasi kata sandi wajib diisi."),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Konfirmasi kata sandi tidak sama dengan kata sandi baru.",
    path: ["confirm_password"],
  })
  .refine((data) => data.new_password !== data.current_password, {
    message: "Kata sandi baru harus berbeda dari kata sandi saat ini.",
    path: ["new_password"],
  });

/**
 * Verifikasi kata sandi saat ini dengan masuk ulang memakai email akun
 * yang sedang login. Tanpa kata sandi yang benar, perubahan ditolak.
 * Pesan error dibuat generik agar tidak membocorkan akun mana yang salah.
 */
async function reauthenticate(
  supabase: SupabaseClient<Database>,
  email: string,
  currentPassword: string,
): Promise<boolean> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  return !error;
}

/**
 * Ubah email akun Supabase yang sedang login. Password tidak pernah
 * disimpan di tabel aplikasi dan tidak dicatat di audit.
 */
export async function changeEmailAction(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase, userId } = await requireAdmin();
  const values = readFormStrings(formData);
  const parsed = emailSchema.safeParse(values);
  if (!parsed.success) {
    return {
      kind: "error",
      message: "Periksa kembali isian yang ditandai.",
      fieldErrors: zodFieldErrors(parsed.error),
      values,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return { kind: "error", message: GENERIC_FAILURE, fieldErrors: {}, values };
  }

  const verified = await reauthenticate(
    supabase,
    user.email,
    parsed.data.current_password,
  );
  if (!verified) {
    return {
      kind: "error",
      message: GENERIC_MISMATCH,
      fieldErrors: {},
      values,
    };
  }

  const { error } = await supabase.auth.updateUser({
    email: parsed.data.new_email,
  });
  if (error) {
    return { kind: "error", message: GENERIC_FAILURE, fieldErrors: {}, values };
  }

  await insertAuditEvent(
    supabase,
    userId,
    "account",
    null,
    "account_email_changed",
    "Email akun admin diubah.",
  );
  return {
    ...idleFormState,
    kind: "success",
    message:
      "Permintaan perubahan email dikirim. Bila konfigurasi Supabase meminta konfirmasi, periksa kotak masuk email baru untuk menyelesaikan perubahan.",
  };
}

/**
 * Ubah kata sandi akun Supabase yang sedang login. Hanya akun sendiri
 * yang dapat diubah; kredensial admin lain tidak ditampilkan maupun
 * diubah dari halaman ini.
 */
export async function changePasswordAction(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase, userId } = await requireAdmin();
  const values = readFormStrings(formData);
  const parsed = passwordSchema.safeParse(values);
  if (!parsed.success) {
    return {
      kind: "error",
      message: "Periksa kembali isian yang ditandai.",
      fieldErrors: zodFieldErrors(parsed.error),
      values,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return { kind: "error", message: GENERIC_FAILURE, fieldErrors: {}, values };
  }

  const verified = await reauthenticate(
    supabase,
    user.email,
    parsed.data.current_password,
  );
  if (!verified) {
    return {
      kind: "error",
      message: GENERIC_MISMATCH,
      fieldErrors: {},
      values,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.new_password,
  });
  if (error) {
    return { kind: "error", message: GENERIC_FAILURE, fieldErrors: {}, values };
  }

  await insertAuditEvent(
    supabase,
    userId,
    "account",
    null,
    "account_password_changed",
    "Kata sandi akun admin diubah.",
  );
  return {
    ...idleFormState,
    kind: "success",
    message:
      "Kata sandi berhasil diubah. Gunakan kata sandi baru saat masuk berikutnya.",
  };
}
