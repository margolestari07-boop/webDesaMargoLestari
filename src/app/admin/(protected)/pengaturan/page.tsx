import type { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { SettingsForm } from "@/app/admin/(protected)/pengaturan/settings-form";
import { requireAdmin } from "@/lib/supabase/authorization";
import { PageHeader } from "../_components/page-header";

export const metadata: Metadata = {
  title: "Pengaturan Situs",
};

function socialLink(links: unknown, key: string) {
  if (
    typeof links === "object" &&
    links !== null &&
    !Array.isArray(links) &&
    key in links
  ) {
    const value = links[key as keyof typeof links];
    return typeof value === "string" ? value : "";
  }

  return "";
}

export default async function SiteSettingsPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("singleton", true)
    .maybeSingle();

  if (error || !data) {
    return (
      <section aria-labelledby="settings-title" className="space-y-6">
        <PageHeader
          kicker="Pengelolaan situs"
          title="Pengaturan situs"
          titleId="settings-title"
        />
        <Alert variant="destructive">
          <AlertDescription>
            Pengaturan belum dapat dimuat. Coba muat ulang halaman atau hubungi
          pengelola sistem.
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  const values = {
    village_name: data.village_name,
    tagline: data.tagline ?? "",
    subdistrict: data.subdistrict,
    regency: data.regency,
    province: data.province,
    address: data.address ?? "",
    latitude: data.latitude?.toString() ?? "",
    longitude: data.longitude?.toString() ?? "",
    contact_person: data.contact_person ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    service_hours: data.service_hours ?? "",
    website: socialLink(data.social_links, "website"),
    facebook: socialLink(data.social_links, "facebook"),
    instagram: socialLink(data.social_links, "instagram"),
    youtube: socialLink(data.social_links, "youtube"),
  };

  return (
    <section aria-labelledby="settings-title" className="space-y-6">
      <PageHeader
        intro="Perbarui identitas, lokasi, informasi layanan, dan tautan resmi desa."
        kicker="Pengelolaan situs"
        title="Pengaturan situs"
        titleId="settings-title"
      />
      <p className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-gray-600">
        Data awal bersumber dari proposal. Kecamatan Tanjung Bintang masih perlu
        diverifikasi karena dokumen lain menyebut Jati Agung; izin publikasi
        kontak juga perlu dipastikan. Perubahan yang disimpan langsung tampil
        di situs publik, jadi pastikan semua informasi sudah disetujui pihak
        desa.
      </p>
      <SettingsForm initialValues={values} />
    </section>
  );
}
