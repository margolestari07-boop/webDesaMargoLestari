"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeftIcon } from "@/components/tailadmin/icons";
import { cn } from "@/components/tailadmin/utils";
import SignInHeader from "./header";

// Kolom formulir sign-in TailAdmin asli
// (src/components/others/auth/sign-in/index.tsx), diadaptasi untuk panel
// Desa: tombol login sosial, divider, dan tautan "Sign Up" template tidak
// dipakai (hanya ada satu akun admin, tanpa pendaftaran); formulirnya
// diteruskan sebagai children (LoginForm Desa dengan loginAction).
export default function SignIn({
  title = "Masuk panel pengelola",
  description = "Masukkan email dan kata sandi akun pengelola untuk masuk.",
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    // Satu blok terpusat: tautan kembali, judul, dan formulir mengalir
    // berurutan dalam satu kolom max-w-md yang dipusatkan vertikal
    // (justify-center di sini). Sebelumnya tautan dipisah sebagai anak
    // flex pertama di atas, sementara judul+formulir dipusatkan sendiri
    // di sisa tinggi lewat flex-1 justify-center, sehingga muncul
    // celah kosong ~350px antara tautan dan judul di layar desktop.
    // Lebar di sini harus w-full (bukan lg:w-1/2): <main> di page.tsx
    // sudah lg:w-1/2, jadi w-1/2 ganda membuat kolom form hanya 1/4
    // layar dan menempel ke kiri, menyisakan strip putih lebar di
    // antara form dan panel gelap di layar lebar.
    <div className={cn("flex w-full flex-1 flex-col justify-center")}>
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700"
          >
            <ChevronLeftIcon className="rtl:rotate-180" />
            Kembali ke situs publik
          </Link>
        </div>

        <SignInHeader title={title} description={description} />

        <div>{children}</div>
      </div>
    </div>
  );
}
