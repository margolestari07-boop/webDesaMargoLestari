import type { Metadata } from "next";

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
        Akses admin aktif. Menu pengaturan dan pengelolaan konten akan tersedia
        bertahap setelah tiap fitur selesai dibangun.
      </p>
    </section>
  );
}
