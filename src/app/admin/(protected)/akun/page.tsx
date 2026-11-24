import type { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { requireAdmin } from "@/lib/supabase/authorization";
import { AccountForms } from "./account-form";
import { PageHeader } from "../_components/page-header";

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
      <section aria-labelledby="account-title" className="space-y-6">
        <PageHeader
          kicker="Akun & keamanan"
          title="Akun & keamanan"
          titleId="account-title"
        />
        <Alert variant="destructive">
          <AlertDescription>
            Akun yang sedang login tidak dapat dimuat. Silakan keluar lalu
          masuk kembali.
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  return (
    <section aria-labelledby="account-title" className="space-y-6">
      <PageHeader
        intro="Halaman ini hanya mengubah email dan kata sandi akun Supabase yang sedang login. Kata sandi tidak pernah disimpan di tabel aplikasi dan tidak dicatat di log audit. Perubahan email dan kata sandi memerlukan kata sandi saat ini sebagai verifikasi."
        kicker="Akun & keamanan"
        title="Akun & keamanan"
        titleId="account-title"
      />
      <p className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-gray-600">
        Bila kata sandi diubah, sesi di perangkat lain tidak otomatis dicabut
        oleh alur ini; keluar dan masuk kembali di perangkat lain bila perlu.
        Bila kehilangan akses, pemulihan dilakukan lewat alur reset password
        Supabase ke email akun ini.
      </p>
      <AccountForms currentEmail={user.email} />
    </section>
  );
}
