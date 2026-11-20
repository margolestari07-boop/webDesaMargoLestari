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
    <div className={cn("flex w-full flex-1 flex-col lg:w-1/2")}>
      <div className="mx-auto mb-5 w-full max-w-md sm:pt-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="rtl:rotate-180" />
          Kembali ke situs publik
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div>
          <SignInHeader title={title} description={description} />

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
