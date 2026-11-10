import Link from "next/link";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Reveal } from "../../../components/motion/reveal";
import { Stagger } from "../../../components/motion/stagger";

const metrics = [
  { icon: "groups", label: "Total penduduk" },
  { icon: "cottage", label: "Kepala keluarga" },
  { icon: "wc", label: "Komposisi jenis kelamin" },
  { icon: "bolt", label: "Kelompok usia produktif" },
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
              <Badge tone="warning" className="font-label-sm text-label-sm">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-base"
                >
                  info
                </span>
                Data menunggu verifikasi
              </Badge>
              <h1 className="font-display text-display text-on-surface max-w-4xl tracking-tight">
                Infografis Kependudukan Desa Margo Lestari
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Informasi demografi desa akan ditampilkan setelah sumber data
                resmi diverifikasi. Angka yang belum terkonfirmasi tidak
                ditampilkan sebagai data faktual.
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
                Pembaruan data belum tersedia
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
                    Belum tersedia
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                    Menunggu data terverifikasi.
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
            title="Distribusi penduduk berdasarkan wilayah"
            description="Rincian jumlah penduduk dan satuan wilayah akan ditampilkan setelah data resmi tersedia."
          />
          <DataEmptyState
            title="Data wilayah belum tersedia"
            description="Nama wilayah, jumlah penduduk, dan rincian RT/RW belum ditampilkan karena datanya belum terverifikasi."
          />
        </Reveal>
      </section>

      <section className="bg-surface-container-lowest w-full py-8 md:py-10">
        <Reveal className="px-gutter mx-auto max-w-7xl">
          <SectionTitle
            kicker="Ekonomi & mata pencaharian"
            title="Informasi pekerjaan warga"
            description="Ringkasan pekerjaan dan kegiatan ekonomi hanya akan ditampilkan jika didukung sumber data desa yang terverifikasi."
          />
          <DataEmptyState
            title="Data mata pencaharian belum tersedia"
            description="Belum ada rincian pekerjaan atau angka ekonomi yang dapat ditampilkan sebagai informasi terverifikasi."
          />
        </Reveal>
      </section>

      <section className="bg-surface w-full py-8 md:py-10">
        <Reveal className="px-gutter mx-auto max-w-7xl">
          <SectionTitle
            kicker="Demografi warga"
            title="Usia & tingkat pendidikan"
            description="Informasi kelompok usia dan pendidikan tidak ditampilkan sampai data yang sesuai tersedia dan terkonfirmasi."
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <DataEmptyState
              title="Data kelompok usia belum tersedia"
              description="Rincian demografi berdasarkan kelompok usia menunggu verifikasi pemerintah desa."
            />
            <DataEmptyState
              title="Data pendidikan belum tersedia"
              description="Rincian tingkat pendidikan warga menunggu verifikasi pemerintah desa."
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
