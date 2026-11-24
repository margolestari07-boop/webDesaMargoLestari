import type { Metadata } from "next";
import Link from "next/link";
import { Stagger } from "@/components/motion/stagger";
import { historyEntries } from "@/data/history";
import { siteIdentity } from "@/data/site";
import { getPublishedProfile } from "@/lib/content/published";

export const metadata: Metadata = {
  title: "Sejarah Desa",
  description:
    "Linimasa sejarah Desa Margo Lestari berdasarkan informasi dalam dokumen proposal.",
};

/**
 * Sejarah dinamis: narasi sejarah dibaca dari revisi Profil terbit di
 * database bila ada; linimasa tetap memakai data statis dari dokumen
 * proposal sampai admin mengisi linimasa di database.
 */
export default async function HistoryPage() {
  const profile = await getPublishedProfile();
  const historyText =
    profile?.data.content?.history_text ??
    "Desa Margo Lestari merupakan pemekaran dari Desa/Kelurahan Gedung Meneng Labuhan Ratu Kecamatan Kedaton sehubungan Desa Gedung Meneng Labuhan Ratu masuk wilayah Kodya Bandar Lampung maka pada tahun 1986 di bentuklah menjadi Desa persiapan Margo Lestari Kecamatan Tanjung Bintang dengan mengangkat pejabat sementara yaitu Bapak R.Suparno dengan luas wilayah 1.011,5 Ha terdiri dari 4 Dusun dengan jumlah penduduk 1.938 jiwa.";

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

      <section aria-labelledby="history-narrative-title">
        <div className="history-section-heading">
          <p className="section-kicker">Narasi</p>
          <h2 className="profile-section-title" id="history-narrative-title">
            Sejarah singkat desa
          </h2>
        </div>
        <p className="profile-intro">{historyText}</p>
      </section>

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
