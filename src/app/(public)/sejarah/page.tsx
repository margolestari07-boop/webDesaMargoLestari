import type { Metadata } from "next";
import Link from "next/link";
import { Stagger } from "@/components/motion/stagger";
import { historyEntries } from "@/data/history";
import { siteIdentity } from "@/data/site";

export const metadata: Metadata = {
  title: "Sejarah Desa",
  description:
    "Linimasa sejarah Desa Margo Lestari berdasarkan informasi dalam dokumen proposal.",
};

export default function HistoryPage() {
  return (
    <div className="profile-page container">
      <nav aria-label="Breadcrumb" className="profile-breadcrumb">
        <Link href="/">Beranda</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Sejarah Desa</span>
      </nav>

      <header aria-labelledby="history-title" className="profile-heading">
        <p className="section-kicker">Catatan sejarah</p>
        <h1 className="profile-title" id="history-title">
          Jejak {siteIdentity.name}
        </h1>
        <p className="profile-intro">
          Riwayat yang tersedia dirangkum dalam linimasa singkat. Informasi
          mengikuti dokumen proposal dan menunggu validasi pihak desa.
        </p>
      </header>

      <section aria-labelledby="history-timeline-title">
        <div className="history-section-heading">
          <p className="section-kicker">Kronologi</p>
          <h2 className="profile-section-title" id="history-timeline-title">
            Dari asal-usul hingga desa persiapan
          </h2>
        </div>

        <Stagger className="history-timeline">
          {historyEntries.map((entry) => (
            <article className="history-entry" key={entry.title}>
              <p className="history-entry-period">
                {entry.year ? (
                  <time dateTime={entry.year}>{entry.year}</time>
                ) : (
                  entry.period
                )}
              </p>
              <div className="history-entry-content">
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </div>
            </article>
          ))}
        </Stagger>
      </section>

      <p className="history-source-note">
        Sumber: Analisis Proposal Website Desa Margo Lestari, bagian sejarah
        singkat. Rincian riwayat lain belum ditambahkan karena belum tersedia
        dalam sumber yang ditinjau.
      </p>
    </div>
  );
}
