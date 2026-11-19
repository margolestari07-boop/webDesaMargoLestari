import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteIdentity } from "@/data/site";
import { requireAdmin } from "@/lib/supabase/authorization";
import { logout } from "./actions";
import { AdminShell } from "./_components/admin-shell";

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
    <AdminShell
      brand={
        <Link className="admin-brand" href="/admin">
          <span aria-hidden="true" className="admin-brand-mark">
            <span className="material-symbols-outlined">holiday_village</span>
          </span>
          <span className="admin-brand-text">
            <strong>{siteIdentity.name}</strong>
            <span>Panel Pengelola</span>
          </span>
        </Link>
      }
      topbarActions={
        <>
          <Link className="admin-view-site-link" href="/">
            <span aria-hidden="true" className="material-symbols-outlined">
              visibility
            </span>
            <span>Lihat situs</span>
          </Link>
          <span className="admin-user-chip">
            <span aria-hidden="true" className="admin-user-avatar">
              A
            </span>
            <span>Admin</span>
          </span>
          <form action={logout}>
            <Button size="small" type="submit" variant="secondary">
              Keluar
            </Button>
          </form>
        </>
      }
    >
      {children}
    </AdminShell>
  );
}
