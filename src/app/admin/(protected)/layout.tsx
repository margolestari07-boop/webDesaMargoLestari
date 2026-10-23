import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteIdentity } from "@/data/site";
import { requireAdmin } from "@/lib/supabase/authorization";
import { logout } from "./actions";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

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
          <form action={logout}>
            <Button size="small" type="submit" variant="secondary">
              Keluar
            </Button>
          </form>
        </div>
      </header>
      <main className="admin-main" id="admin-main">
        {children}
      </main>
    </div>
  );
}
