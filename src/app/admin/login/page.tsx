import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Masuk Pengelola",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Langsung ke formulir
      </a>
      <main className="admin-login-page" id="main-content">
        <section aria-labelledby="login-title" className="admin-login-panel">
          <p className="section-kicker">Desa Margo Lestari</p>
          <h1 className="admin-login-title" id="login-title">
            Masuk panel pengelola
          </h1>
          <p className="admin-login-intro">
            Akses ini hanya untuk akun yang telah didaftarkan sebagai pengelola
            desa.
          </p>
          <LoginForm />
        </section>
      </main>
    </>
  );
}
