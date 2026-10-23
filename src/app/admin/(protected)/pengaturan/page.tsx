import type { Metadata } from "next";
import { SettingsForm } from "@/app/admin/(protected)/pengaturan/settings-form";
import { requireAdmin } from "@/lib/supabase/authorization";

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
      <section aria-labelledby="settings-title" className="admin-settings">
        <p className="section-kicker">Pengelolaan situs</p>
        <h1 className="admin-dashboard-title" id="settings-title">
          Pengaturan situs
        </h1>
        <p className="admin-settings-error" role="alert">
          Pengaturan belum dapat dimuat. Coba muat ulang halaman atau hubungi
          pengelola sistem.
        </p>
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
    status: data.status === "published" ? "published" : "draft",
  };

  return (
    <section aria-labelledby="settings-title" className="admin-settings">
      <p className="section-kicker">Pengelolaan situs</p>
      <h1 className="admin-dashboard-title" id="settings-title">
        Pengaturan situs
      </h1>
      <p className="admin-settings-intro">
        Perbarui identitas, lokasi, informasi layanan, dan tautan resmi desa.
      </p>
      <p className="admin-settings-notice">
        Data awal bersumber dari proposal. Kecamatan Tanjung Bintang masih perlu
        diverifikasi karena dokumen lain menyebut Jati Agung; izin publikasi
        kontak juga perlu dipastikan. Simpan sebagai draf sampai semua informasi
        disetujui pihak desa.
      </p>
      <SettingsForm initialValues={values} />
    </section>
  );
}
