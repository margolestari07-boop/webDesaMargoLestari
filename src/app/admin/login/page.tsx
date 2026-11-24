import type { Metadata } from "next";
import GridShape from "@/components/tailadmin/common/grid-shape";
import SignIn from "@/components/tailadmin/auth/sign-in";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Masuk Pengelola",
  robots: { index: false, follow: false },
};

// Halaman masuk dengan layout auth TailAdmin asli
// (src/app/[locale]/(full-width-pages)/(auth)/layout.tsx + kolom sign-in):
// kolom formulir + panel merek bg-brand-950 (token biru halaman depan Desa).
// Formulirnya tetap LoginForm Desa (loginAction tidak berubah).
export default function AdminLoginPage() {
  return (
    <div className="ta-root relative z-1 bg-white p-6 sm:p-0">
      <a className="skip-link" href="#main-content">
        Langsung ke formulir
      </a>
      <div className="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row">
        <main className="flex w-full flex-1 flex-col lg:w-1/2" id="main-content">
          <SignIn
            description="Akses ini hanya untuk akun yang telah didaftarkan sebagai pengelola desa."
            title="Masuk panel pengelola"
          >
            <LoginForm />
          </SignIn>
        </main>

        <div className="relative hidden h-full w-full items-center justify-center bg-brand-950 lg:grid lg:w-1/2">
          <div className="z-1 flex h-full items-center justify-center">
            <GridShape />
            <div className="flex max-w-xs flex-col items-center">
              <p className="mb-4 text-center text-2xl font-bold text-white">
                Desa Margo Lestari
              </p>
              <p className="text-center text-gray-400">
                Kelola konten desa dalam satu panel. Beranda, Profil Desa,
                Kependudukan, dan APBDes — ubah data langsung dan kelola akun
                dari satu tempat yang aman.
              </p>
              <p className="mt-6 text-center text-xs text-gray-500">
                Sistem Informasi Pelayanan Desa Margo Lestari
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
