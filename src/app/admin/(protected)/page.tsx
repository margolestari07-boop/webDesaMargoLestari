import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ringkasan Pengelola",
};

export default function AdminDashboardPage() {
  return (
    <section aria-labelledby="admin-title" className="admin-dashboard">
      <p className="section-kicker">Ringkasan</p>
      <h1 className="admin-dashboard-title" id="admin-title">
        Panel pengelola
      </h1>
      <p>
        Akses admin aktif. Pengaturan identitas dan informasi resmi desa dapat
        dikelola di sini; menu konten akan ditambahkan bertahap.
      </p>
      <Link className="admin-settings-link" href="/admin/pengaturan">
        Buka pengaturan situs
      </Link>
    </section>
  );
}
