import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Masuk Pengelola",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="admin-login-page">
      <a className="skip-link" href="#main-content">
        Langsung ke formulir
      </a>
      <aside className="admin-login-brand">
        <div className="admin-login-brand-top">
          <span aria-hidden="true" className="admin-brand-mark">
            <span className="material-symbols-outlined">holiday_village</span>
          </span>
          <span className="admin-brand-text">
            <strong>Desa Margo Lestari</strong>
            <span>Panel Pengelola</span>
          </span>
        </div>
        <div className="admin-login-brand-body">
          <h2>Kelola konten desa dalam satu panel.</h2>
          <p>
            Beranda, Profil Desa, Kependudukan, dan APBDes — simpan draf,
            terbitkan, dan kelola akun dari satu tempat yang aman.
          </p>
        </div>
        <p className="admin-login-brand-foot">
          Sistem Informasi Pelayanan Desa Margo Lestari
        </p>
      </aside>
      <main className="admin-login-form-side" id="main-content">
        <section aria-labelledby="login-title" className="admin-login-panel">
          <div className="admin-login-logo">
            <span aria-hidden="true" className="admin-login-logo-mark">
              <span className="material-symbols-outlined">
                holiday_village
              </span>
            </span>
            <span className="admin-login-logo-text">
              <strong>Desa Margo Lestari</strong>
              <span>Panel Pengelola</span>
            </span>
          </div>
          <h1 className="admin-login-title" id="login-title">
            Masuk panel pengelola
          </h1>
          <p className="admin-login-intro">
            Akses ini hanya untuk akun yang telah didaftarkan sebagai pengelola
            desa.
          </p>
          <LoginForm />
          <p className="admin-login-foot">
            Bukan pengelola?{" "}
            <Link href="/">Kembali ke situs publik</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
