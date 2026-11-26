import Link from "next/link";
import type { PublicSiteSettings } from "@/components/site-header";

const materialIconClass = "material-symbols-outlined";

export function SiteFooter({
  settings,
}: {
  settings: PublicSiteSettings;
}) {
  // Data kontak dari pengaturan terbit; fallback ke nilai statis lama bila
  // pengaturan belum diterbitkan. Kecamatan memakai Tanjung Bintang dari
  // site_settings (footer lama menulis Jati Agung, belum terverifikasi).
  const address =
    settings?.address ??
    "Desa Margo Lestari, Kecamatan Tanjung Bintang, Kabupaten Lampung Selatan, Lampung 35365";
  const serviceHours =
    settings?.service_hours ?? "Senin – Jumat: 08.00 – 15.30 WIB";
  const phone = settings?.phone ?? "+62 821-1439-7667";
  const phoneHref = `tel:${phone.replaceAll(/[^+\d]/g, "")}`;
  const email = settings?.email ?? "margolestari07@gmail.com";
  const emailHref = `mailto:${email}`;
  const year = new Date().getFullYear();
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface w-full pt-16 pb-12">
      <div className="px-gutter mx-auto max-w-7xl">
        <div className="gap-space-xl grid grid-cols-1 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="Logo Pemerintah Desa"
                className="h-8 w-auto object-contain"
                src="/logo-pemerintah-desa.jpg"
              />
              <span className="font-headline-sm text-headline-sm text-inverse-on-surface font-bold">
                Pemerintah Desa
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-surface-dim leading-relaxed">
              Mewujudkan tata kelola pemerintahan desa yang amanah, transparan,
              mandiri, dan berkeadaban dengan pelayanan publik terpadu ramah
              warga.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                aria-label="Kirim email ke Desa Margo Lestari"
                className="bg-surface-variant/20 text-inverse-on-surface flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface-variant/40"
                href={emailHref}
              >
                <span className={`${materialIconClass} text-[18px]`}>
                  mail
                </span>
              </a>
              <a
                aria-label="Telepon Balai Desa"
                className="bg-surface-variant/20 text-inverse-on-surface flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface-variant/40"
                href={phoneHref}
              >
                <span className={`${materialIconClass} text-[18px]`}>
                  call
                </span>
              </a>
            </div>
          </div>


          <div className="flex flex-col gap-4">
            <h4 className="font-headline-sm text-headline-sm text-inverse-on-surface font-bold tracking-tight">
              Layanan Mandiri
            </h4>
            <ul className="font-body-sm text-body-sm text-surface-dim flex flex-col gap-2.5">
              <li>
                <Link
                  className="hover:text-inverse-on-surface transition-colors"
                  href="/#galeri"
                >
                  Dokumentasi Kegiatan Desa
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-headline-sm text-headline-sm text-inverse-on-surface font-bold tracking-tight">
              Pemerintahan
            </h4>
            <ul className="font-body-sm text-body-sm text-surface-dim flex flex-col gap-2.5">
              <li>
                <Link
                  className="hover:text-inverse-on-surface transition-colors"
                  href="/#sotk"
                >
                  Struktur Organisasi &amp; Perangkat Desa
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-headline-sm text-headline-sm text-inverse-on-surface font-bold tracking-tight">
              Kantor Pelayanan
            </h4>
            <div className="font-body-sm text-body-sm text-surface-dim flex flex-col gap-2">
              <p>{address}</p>
              <p className="font-label-sm text-label-sm text-secondary-fixed-dim pt-1">
                {serviceHours}
              </p>
            </div>
            <div className="pt-1">
              <a
                className="font-label-md text-label-md text-secondary-fixed hover:text-inverse-on-surface inline-flex items-center gap-2 transition-colors"
                href={phoneHref}
              >
                Hubungi Balai Desa
                <span className={`${materialIconClass} text-[16px]`}>
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="font-body-sm text-body-sm text-surface-dim flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <p>
            © {year} Pemerintah Desa. Seluruh hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
}
