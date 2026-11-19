import type { Metadata } from "next";
import { requireAdmin } from "@/lib/supabase/authorization";
import { AccountForms } from "./account-form";

export const metadata: Metadata = {
  title: "Akun & Keamanan",
};

export default async function AccountAdminPage() {
  const { supabase } = await requireAdmin();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return (
      <section aria-labelledby="account-title" className="admin-settings">
        <p className="section-kicker">Akun &amp; keamanan</p>
        <h1 className="admin-dashboard-title" id="account-title">
          Akun &amp; keamanan
        </h1>
        <p className="admin-settings-error" role="alert">
          Akun yang sedang login tidak dapat dimuat. Silakan keluar lalu
          masuk kembali.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="account-title" className="admin-settings">
      <p className="section-kicker">Akun &amp; keamanan</p>
      <h1 className="admin-dashboard-title" id="account-title">
        Akun &amp; keamanan
      </h1>
      <p className="admin-settings-intro">
        Halaman ini hanya mengubah email dan kata sandi akun Supabase yang
        sedang login. Kata sandi tidak pernah disimpan di tabel aplikasi dan
        tidak dicatat di log audit. Perubahan email dan kata sandi memerlukan
        kata sandi saat ini sebagai verifikasi.
      </p>
      <p className="admin-settings-notice">
        Bila kata sandi diubah, sesi di perangkat lain tidak otomatis dicabut
        oleh alur ini; keluar dan masuk kembali di perangkat lain bila perlu.
        Bila kehilangan akses, pemulihan dilakukan lewat alur reset password
        Supabase ke email akun ini.
      </p>
      <AccountForms currentEmail={user.email} />
    </section>
  );
}
