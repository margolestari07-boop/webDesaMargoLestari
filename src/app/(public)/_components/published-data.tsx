import type { Tables } from "@/types/database";
import type {
  getPublishedApbdes,
  getPublishedHome,
  getPublishedPopulation,
  getPublishedProfile,
} from "@/lib/content/published";

type PopulationPublished = Awaited<ReturnType<typeof getPublishedPopulation>>;
type ProfilePublished = Awaited<ReturnType<typeof getPublishedProfile>>;
type HomePublished = Awaited<ReturnType<typeof getPublishedHome>>;
type ApbdesPublished = Awaited<ReturnType<typeof getPublishedApbdes>>;

function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "Belum tersedia";
  return value.toLocaleString("id-ID");
}

function formatRupiah(value: number | null | undefined): string {
  if (value === null || value === undefined) return "Belum tersedia";
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function BlockShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className="bg-surface-container-low mx-auto w-full max-w-7xl px-6 py-10"
    >
      <h2 className="font-headline-md text-headline-md text-on-surface">
        {title}
      </h2>
      <div className="mt-4 grid gap-2">{children}</div>
    </section>
  );
}

function NotAvailable({ what }: { what: string }) {
  return <p className="text-on-surface-variant">Belum tersedia — {what}.</p>;
}

/** Blok data terbit untuk Beranda: teks hero terbit + angka kependudukan. */
export function PublishedHomeBlock({
  home,
  population,
}: {
  home: HomePublished;
  population: PopulationPublished;
}) {
  const report = population?.data.report;
  return (
    <BlockShell title="Data terbit">
      {home?.data.content?.hero_title ? (
        <p className="text-on-surface text-lg font-semibold">
          {home.data.content.hero_title}
        </p>
      ) : null}
      {home?.data.content?.hero_subtitle ? (
        <p className="text-on-surface-variant">
          {home.data.content.hero_subtitle}
        </p>
      ) : null}
      {home?.data.content?.help_phone ? (
        <p className="text-on-surface-variant">
          Bantuan administrasi: {home.data.content.help_phone}
        </p>
      ) : null}
      {report ? (
        <p className="text-on-surface-variant">
          Penduduk {formatNumber(report.total_population)} jiwa ·{" "}
          {formatNumber(report.total_households)} KK · Periode{" "}
          {report.period_label}
          {report.source_name ? ` · Sumber: ${report.source_name}` : ""}
        </p>
      ) : (
        <NotAvailable what="belum ada laporan Kependudukan yang diterbitkan" />
      )}
    </BlockShell>
  );
}

/** Blok data terbit untuk halaman Profil Desa. */
export function PublishedProfileBlock({
  profile,
  officers,
}: {
  profile: ProfilePublished;
  officers: Tables<"village_officers">[] | null;
}) {
  const content = profile?.data.content;
  const boundaries = profile?.data.boundaries ?? [];
  const documents = profile?.data.documents ?? [];
  const hasAnything =
    Boolean(content?.history_text) ||
    boundaries.length > 0 ||
    documents.length > 0 ||
    (officers?.length ?? 0) > 0;

  return (
    <BlockShell title="Data profil terbit">
      {!hasAnything ? (
        <NotAvailable what="belum ada konten Profil Desa yang diterbitkan" />
      ) : (
        <>
          {content?.history_text ? (
            <p className="text-on-surface whitespace-pre-line">
              {content.history_text}
            </p>
          ) : null}
          {boundaries.length > 0 ? (
            <ul>
              {boundaries.map((item) => (
                <li key={item.id} className="text-on-surface-variant">
                  {item.direction === "north"
                    ? "Utara"
                    : item.direction === "south"
                      ? "Selatan"
                      : item.direction === "east"
                        ? "Timur"
                        : "Barat"}
                  : {item.label}
                </li>
              ))}
            </ul>
          ) : null}
          {content?.area_value !== null &&
          content?.area_value !== undefined ? (
            <p className="text-on-surface-variant">
              Luas wilayah: {content.area_value} {content.area_unit ?? ""}
            </p>
          ) : null}
          {documents.length > 0 ? (
            <ul>
              {documents.map((item) => (
                <li key={item.id} className="text-on-surface-variant">
                  {item.title} ({item.doc_type})
                </li>
              ))}
            </ul>
          ) : null}
          {officers && officers.length > 0 ? (
            <ul>
              {officers
                .filter((item) => item.is_active)
                .map((item) => (
                  <li key={item.id} className="text-on-surface-variant">
                    {item.full_name} — {item.position}
                  </li>
                ))}
            </ul>
          ) : null}
        </>
      )}
    </BlockShell>
  );
}

/** Blok data terbit untuk halaman Infografis Kependudukan. */
export function PublishedPopulationBlock({
  population,
}: {
  population: PopulationPublished;
}) {
  const report = population?.data.report;
  const areaUses = population?.data.areaUses ?? [];
  const occupations = population?.data.occupations ?? [];
  return (
    <BlockShell title="Laporan kependudukan terbit">
      {!report ? (
        <NotAvailable what="belum ada laporan Kependudukan yang diterbitkan" />
      ) : (
        <>
          <p className="text-on-surface">
            {report.period_label} · Total penduduk{" "}
            {formatNumber(report.total_population)} jiwa ·{" "}
            {formatNumber(report.total_households)} KK · Laki-laki{" "}
            {formatNumber(report.male_count)} · Perempuan{" "}
            {formatNumber(report.female_count)}
            {report.source_name ? ` · Sumber: ${report.source_name}` : ""}
          </p>
          {areaUses.length > 0 ? (
            <ul>
              {areaUses.map((item) => (
                <li key={item.id} className="text-on-surface-variant">
                  {item.category}
                  {item.area_value !== null
                    ? `: ${item.area_value} ${item.area_unit ?? ""}`
                    : ""}
                </li>
              ))}
            </ul>
          ) : null}
          {occupations.length > 0 ? (
            <ul>
              {occupations.map((item) => (
                <li key={item.id} className="text-on-surface-variant">
                  {item.name}
                  {item.person_count !== null
                    ? `: ${formatNumber(item.person_count)} orang`
                    : ""}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </BlockShell>
  );
}

/** Blok data terbit untuk halaman Infografis APBDes. */
export function PublishedApbdesBlock({
  apbdes,
}: {
  apbdes: ApbdesPublished;
}) {
  const report = apbdes?.data.report;
  const realizations = apbdes?.data.realizations ?? [];
  const spendingFields = apbdes?.data.spendingFields ?? [];
  const revenueSources = apbdes?.data.revenueSources ?? [];
  return (
    <BlockShell title="Laporan APBDes terbit">
      {!report ? (
        <NotAvailable what="belum ada laporan APBDes yang diterbitkan" />
      ) : (
        <>
          <p className="text-on-surface">
            Tahun anggaran {report.fiscal_year} · {report.period_label}
            {report.source_document
              ? ` · Dokumen sumber: ${report.source_document}`
              : ""}
          </p>
          {realizations.length > 0 ? (
            <ul>
              {realizations.map((item) => (
                <li key={item.id} className="text-on-surface-variant">
                  {item.label} ({item.kind}): pagu{" "}
                  {formatRupiah(item.budget)}, realisasi{" "}
                  {formatRupiah(item.realization)}
                </li>
              ))}
            </ul>
          ) : null}
          {spendingFields.length > 0 ? (
            <ul>
              {spendingFields.map((item) => (
                <li key={item.id} className="text-on-surface-variant">
                  {item.field_name}: pagu {formatRupiah(item.budget)},
                  realisasi {formatRupiah(item.realization)}
                </li>
              ))}
            </ul>
          ) : null}
          {revenueSources.length > 0 ? (
            <ul>
              {revenueSources.map((item) => (
                <li key={item.id} className="text-on-surface-variant">
                  {item.source_name}: pagu {formatRupiah(item.budget)},
                  realisasi {formatRupiah(item.realization)}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </BlockShell>
  );
}
