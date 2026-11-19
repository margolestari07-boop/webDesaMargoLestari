import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteIdentity } from "@/data/site";
import { requireAdmin } from "@/lib/supabase/authorization";
import { logout } from "./actions";
import { AdminNav } from "./_components/admin-nav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    ((error as { digest: string }).digest.startsWith("NEXT_REDIRECT") ||
      (error as { digest: string }).digest.startsWith("NEXT_NOT_FOUND"))
  );
}

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  try {
    await requireAdmin();
  } catch (error) {
    // requireAdmin mengarahkan ke /admin/login lewat redirect(); lempar
    // ulang agar pengalihan tetap berjalan. Error lain (mis. env Supabase
    // belum dikonfigurasi) ditampilkan sebagai pesan jelas, bukan crash.
    if (isRedirectError(error)) throw error;
    return (
      <div className="admin-shell">
        <main className="admin-main" id="admin-main">
          <section aria-labelledby="admin-error-title" className="admin-settings">
            <p className="section-kicker">Panel pengelola</p>
            <h1 className="admin-dashboard-title" id="admin-error-title">
              Panel belum dapat dibuka
            </h1>
            <p className="admin-settings-error" role="alert">
              Konfigurasi Supabase (NEXT_PUBLIC_SUPABASE_URL dan
              NEXT_PUBLIC_SUPABASE_ANON_KEY) belum tersedia atau database
              belum dapat dihubungi. Periksa file .env.local, lalu muat ulang
              halaman ini.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <a className="skip-link" href="#admin-main">
        Langsung ke konten panel
      </a>
      <header className="admin-header">
        <div className="admin-header-inner">
          <Link className="admin-brand" href="/admin">
            <span className="section-kicker">Panel pengelola</span>
            <strong>{siteIdentity.name}</strong>
          </Link>
          <div className="admin-header-actions">
            <Link className="admin-view-site-link" href="/">
              Lihat situs publik
            </Link>
            <form action={logout}>
              <Button size="small" type="submit" variant="secondary">
                Keluar
              </Button>
            </form>
          </div>
        </div>
      </header>
      <div className="admin-layout">
        <AdminNav />
        <main className="admin-main" id="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
