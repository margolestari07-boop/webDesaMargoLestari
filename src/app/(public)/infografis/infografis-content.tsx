import Link from "next/link";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Reveal } from "../../../components/motion/reveal";
import { Stagger } from "../../../components/motion/stagger";

const metrics = [
  {
    icon: "groups",
    label: "Total penduduk",
    value: "3.062 jiwa",
    detail: "Sumber: Profil Desa 2025",
  },
  {
    icon: "cottage",
    label: "Kepala keluarga",
    value: "952 KK",
    detail: "Sumber: Profil Desa Margo Lestari.",
  },
  {
    icon: "wc",
    label: "Komposisi jenis kelamin",
    value: "1.587 / 1.475",
    detail: "Laki-laki / perempuan · 51,8% / 48,2%",
  },
  {
    icon: "bolt",
    label: "Kelompok usia produktif",
    value: null,
    detail: "Data kelompok usia belum terverifikasi.",
  },
];

const occupations = [
  { label: "Petani", count: 661, percentage: 31.2 },
  { label: "Pegawai lepas", count: 515, percentage: 24.3 },
  { label: "Buruh", count: 215, percentage: 10.2 },
  { label: "Lainnya", count: 189, percentage: 8.9 },
  { label: "Pedagang", count: 136, percentage: 6.4 },
  { label: "Wiraswasta", count: 136, percentage: 6.4 },
  { label: "Pegawai swasta", count: 112, percentage: 5.3 },
  { label: "Tukang", count: 54, percentage: 2.5 },
  { label: "Swasta", count: 48, percentage: 2.3 },
  { label: "Guru / tenaga pendidik", count: 15, percentage: 0.7 },
  { label: "Angkutan (supir)", count: 12, percentage: 0.6 },
  { label: "PNS", count: 6, percentage: 0.3 },
  { label: "Pensiunan", count: 6, percentage: 0.3 },
  { label: "Bidan", count: 4, percentage: 0.2 },
  { label: "Perawat", count: 4, percentage: 0.2 },
  { label: "TNI / Polri", count: 3, percentage: 0.1 },
  { label: "Jasa persewaan", count: 2, percentage: 0.1 },
];

function DataEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-surface-container-lowest border-outline-variant/50 flex min-h-52 flex-col justify-center rounded-3xl border p-6 shadow-sm md:p-8">
      <span
        aria-hidden="true"
        className="material-symbols-outlined text-primary mb-3 text-3xl"
      >
        info
      </span>
      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">
        {title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function SectionTitle({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <p className="font-label-sm text-label-sm text-primary mb-2 font-bold tracking-wider uppercase">
        {kicker}
      </p>
      <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
        {title}
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function InfografisContent() {
  return (
    <main className="simple-beranda simple-infografis bg-surface font-body-md text-on-surface min-h-[calc(100vh-80px)] w-full pt-20 antialiased">
      <section className="bg-surface-bright relative w-full overflow-hidden py-8 md:py-12">
        <div
          aria-hidden="true"
          className="bg-secondary-fixed/25 pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          className="bg-primary-fixed/20 pointer-events-none absolute top-12 left-1/3 h-80 w-80 rounded-full blur-3xl"
        />
        <Reveal className="px-gutter relative z-10 mx-auto max-w-7xl">
          <nav
            aria-label="Breadcrumb"
            className="font-label-sm text-label-sm text-on-surface-variant mb-8 flex items-center gap-2"
          >
            <Link
              className="hover:text-primary flex items-center gap-1 transition-colors"
              href="/"
            >
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-base"
              >
                home
              </span>
              Beranda
            </Link>
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-sm"
            >
              chevron_right
            </span>
            <span>Infografis</span>
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-sm"
            >
              chevron_right
            </span>
            <span className="text-primary font-bold">Kependudukan</span>
          </nav>

          <div className="grid grid-cols-1 items-end justify-between gap-8 lg:grid-cols-12">
            <div className="flex flex-col items-start gap-4 lg:col-span-8">
              <Badge tone="neutral" className="font-label-sm text-label-sm">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-base"
                >
                  description
                </span>
                Sumber: Profil Desa Margo Lestari Tahun 2025
              </Badge>
              <h1 className="font-display text-display text-on-surface max-w-4xl tracking-tight">
                Infografis Kependudukan Desa Margo Lestari
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Ringkasan berikut merujuk pada Profil Desa Margo Lestari 2025.
                Rincian yang memiliki perbedaan antarbagian diberi catatan dan
                tidak disajikan sebagai angka final.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end">
              <div className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex items-center gap-2 rounded-full px-3.5 py-2">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-primary text-base"
                >
                  update
                </span>
                Data terakhir diperbarui: Maret 2025
              </div>
              <Button
                className="font-label-md text-label-md rounded-full"
                disabled
                variant="secondary"
              >
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-lg"
                >
                  cloud_download
                </span>
                Rekap data belum tersedia
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <section aria-label="Ringkasan data kependudukan" className="w-full py-8">
        <div className="px-gutter mx-auto max-w-7xl">
          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <article
                className="bg-surface-container-lowest flex min-h-48 flex-col justify-between rounded-2xl p-6 shadow-sm"
                key={metric.label}
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <h2 className="font-label-md text-label-md text-on-surface-variant">
                    {metric.label}
                  </h2>
                  <span className="bg-primary-fixed/50 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-xl"
                    >
                      {metric.icon}
                    </span>
                  </span>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {metric.value ?? "Belum tersedia"}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                    {metric.detail}
                  </p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-surface w-full py-8 md:py-10">
        <Reveal className="px-gutter mx-auto max-w-7xl">
          <SectionTitle
            kicker="Geografi & teritorial"
            title="Profil wilayah desa"
            description="Ringkasan luas dan jumlah dusun merujuk pada Profil Desa Margo Lestari 2025."
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm md:p-8">
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Luas wilayah menurut profil desa
              </p>
              <p className="font-display text-display text-on-surface mt-2 font-extrabold">
                1.011,5 <span className="font-label-md text-label-md">Ha</span>
              </p>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <span className="text-primary font-bold">4 dusun</span>
                <span>Kepadatan: sekitar 303 jiwa/km²</span>
              </div>
            </article>
            <DataEmptyState
              title="Rincian penggunaan lahan perlu diverifikasi"
              description="Jumlah rincian lahan pada tabel (1.116 Ha) berbeda dari luas keseluruhan pada Profil Desa (1.011,5 Ha). Karena itu, rincian per kategori belum ditampilkan sebagai angka final."
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-surface-container-lowest w-full py-8 md:py-10">
        <Reveal className="px-gutter mx-auto max-w-7xl">
          <SectionTitle
            kicker="Ekonomi & mata pencaharian"
            title="Pekerjaan warga yang tercatat"
            description="Rincian berikut disalin dari Profil Desa Margo Lestari 2025; totalnya merujuk pada warga yang tercatat bekerja."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="bg-surface-container rounded-3xl p-6 shadow-sm lg:col-span-4">
              <span
                className="material-symbols-outlined text-primary mb-4 text-3xl"
                aria-hidden="true"
              >
                agriculture
              </span>
              <p className="font-label-sm text-label-sm text-primary font-bold tracking-wider uppercase">
                Total tercatat
              </p>
              <p className="font-display text-display text-on-surface mt-2 font-extrabold">
                2.118 <span className="font-label-md text-label-md">jiwa</span>
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed">
                Angka ini adalah jumlah dalam tabel pekerjaan, bukan total
                penduduk desa.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-3xl p-6 shadow-sm md:p-8 lg:col-span-8">
              <div className="flex flex-col gap-4">
                {occupations.map((occupation) => (
                  <div className="flex flex-col gap-1.5" key={occupation.label}>
                    <div className="font-label-sm text-label-sm flex items-center justify-between gap-4">
                      <span className="text-on-surface">
                        {occupation.label}
                      </span>
                      <span className="text-on-surface text-right font-bold">
                        {occupation.count} jiwa (
                        {occupation.percentage.toFixed(1).replace(".", ",")}%)
                      </span>
                    </div>
                    <div className="bg-surface-container-highest h-2.5 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${occupation.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-surface w-full py-8 md:py-10">
        <Reveal className="px-gutter mx-auto max-w-7xl">
          <SectionTitle
            kicker="Keadaan sosial desa"
            title="Usia & tingkat pendidikan"
            description="Data usia belum dicantumkan pada sumber yang dipakai. Tabel pendidikan pada prototipe memiliki selisih dengan jumlah penduduk dan tetap ditandai untuk verifikasi."
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <DataEmptyState
              title="Data kelompok usia belum tersedia"
              description="Rincian demografi berdasarkan kelompok usia belum tersedia dalam sumber Profil Desa 2025 yang digunakan."
            />
            <DataEmptyState
              title="Tabel pendidikan menunggu verifikasi"
              description="Jumlah pada tabel pendidikan adalah 2.938 jiwa, berbeda dari total penduduk 3.062 jiwa. Rincian tingkat pendidikan belum ditampilkan sebagai data final."
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-surface w-full py-8 md:py-12">
        <Reveal className="px-gutter mx-auto max-w-7xl">
          <div className="from-primary via-primary-container to-secondary text-on-primary relative overflow-hidden rounded-3xl bg-linear-to-br p-8 shadow-xl md:p-12">
            <div
              aria-hidden="true"
              className="bg-secondary-fixed/20 pointer-events-none absolute -right-16 -bottom-16 h-80 w-80 rounded-full blur-2xl"
            />
            <div className="relative z-10 max-w-3xl">
              <Badge className="mb-4 border-white/30 bg-white/15 text-white">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-base"
                >
                  fact_check
                </span>
                Transparansi data
              </Badge>
              <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-white">
                Data yang jelas, setelah terverifikasi
              </h2>
              <p className="font-body-md text-body-md text-surface-container-low mt-3 leading-relaxed">
                Informasi pada halaman ini akan diperbarui setelah pemerintah
                desa mengonfirmasi sumber dan periode datanya.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
