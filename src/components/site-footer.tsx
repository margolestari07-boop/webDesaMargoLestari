import Link from "next/link";

const materialIconClass = "material-symbols-outlined";

export function SiteFooter() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface w-full pt-16 pb-12">
      <div className="px-gutter mx-auto max-w-7xl">
        <div className="gap-space-xl grid grid-cols-1 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="Logo Pemerintah Desa"
                className="h-8 w-auto object-contain brightness-0 invert"
                src="/logo-pemerintah-desa.png"
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
              {["mail", "call", "share"].map((icon) => (
                <div
                  className="bg-surface-variant/20 text-inverse-on-surface flex h-9 w-9 items-center justify-center rounded-full"
                  key={icon}
                >
                  <span className={`${materialIconClass} text-[18px]`}>
                    {icon}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-headline-sm text-headline-sm text-inverse-on-surface font-bold tracking-tight">
              Pemerintahan
            </h4>
            <ul className="font-body-sm text-body-sm text-surface-dim flex flex-col gap-2.5">
              <li>
                <Link
                  className="hover:text-inverse-on-surface transition-colors"
                  href="/#sambutan"
                >
                  Sambutan Kepala Desa
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-inverse-on-surface transition-colors"
                  href="/#sotk"
                >
                  Struktur Organisasi (SOTK)
                </Link>
              </li>
            </ul>
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
              Kantor Pelayanan
            </h4>
            <div className="font-body-sm text-body-sm text-surface-dim flex flex-col gap-2">
              <p>Jl. Raya Utama Kantor Balai Desa No. 01</p>
              <p>Kecamatan Nusantara, Kode Pos 61253</p>
              <p className="font-label-sm text-label-sm text-secondary-fixed-dim pt-1">
                Senin – Jumat: 08.00 – 15.30 WIB
              </p>
            </div>
            <div className="pt-1">
              <a
                className="font-label-md text-label-md text-secondary-fixed hover:text-inverse-on-surface inline-flex items-center gap-2 transition-colors"
                href="tel:+6281234567890"
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
            © 2025 Pemerintah Desa. Seluruh hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
}
