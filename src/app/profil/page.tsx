import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/table";
import { Reveal } from "@/components/motion/reveal";
import { siteIdentity } from "@/data/site";
import { villageProfileContent } from "@/data/village-profile";

export const metadata: Metadata = {
  title: "Profil Desa",
  description:
    "Identitas wilayah dan informasi profil Desa Margo Lestari yang tersedia dan telah dikonfirmasi.",
};

const regionRows = [
  { label: "Desa", value: siteIdentity.name, needsVerification: false },
  {
    label: "Kecamatan",
    value: siteIdentity.subdistrict.default,
    needsVerification: siteIdentity.subdistrict.needsVerification,
  },
  {
    label: "Kabupaten",
    value: siteIdentity.district,
    needsVerification: false,
  },
  { label: "Provinsi", value: siteIdentity.province, needsVerification: false },
];

export default function ProfilePage() {
  return (
    <div className="profile-page container">
      <nav aria-label="Breadcrumb" className="profile-breadcrumb">
        <Link href="/">Beranda</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Profil Desa</span>
      </nav>

      <header aria-labelledby="profile-title" className="profile-heading">
        <p className="section-kicker">Identitas Desa</p>
        <h1 className="profile-title" id="profile-title">
          {siteIdentity.name}
        </h1>
        <p className="profile-intro">
          Profil desa sedang disusun bersama pihak desa. Informasi yang belum
          dikonfirmasi tidak ditampilkan sebagai fakta.
        </p>
      </header>

      <div className="profile-overview">
        <Reveal>
          <section aria-labelledby="region-title" className="profile-region">
            <p className="section-kicker">Wilayah</p>
            <h2 className="profile-section-title" id="region-title">
              Identitas wilayah
            </h2>
            <Table label="Identitas wilayah Desa Margo Lestari">
              <caption className="visually-hidden">
                Identitas wilayah Desa Margo Lestari
              </caption>
              <TableBody>
                {regionRows.map((row) => (
                  <TableRow key={row.label}>
                    <TableHeaderCell scope="row">{row.label}</TableHeaderCell>
                    <TableCell>
                      <span>{row.value}</span>
                      {row.needsVerification ? (
                        <Badge className="profile-region-badge" tone="warning">
                          Perlu diverifikasi
                        </Badge>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="profile-verification-note">
              Dokumen proposal juga menyebut Kecamatan{" "}
              {siteIdentity.subdistrict.conflict}. Nama kecamatan perlu
              dikonfirmasi oleh pihak desa sebelum menjadi identitas final.
            </p>
          </section>
        </Reveal>

        <Reveal className="profile-photo-panel" delay={0.06}>
          <p className="section-kicker">Dokumentasi</p>
          <h2 className="profile-section-title">Foto desa</h2>
          {villageProfileContent.photoUrl ? (
            <Image
              alt={`Dokumentasi ${siteIdentity.name}`}
              className="profile-photo-image"
              height={900}
              src={villageProfileContent.photoUrl}
              sizes="(max-width: 820px) 100vw, 45vw"
              unoptimized
              width={1200}
            />
          ) : (
            <div className="profile-photo-placeholder">
              <Badge>Belum tersedia</Badge>
              <p>
                Foto Desa Margo Lestari akan ditambahkan setelah disediakan dan
                dikonfirmasi oleh pihak desa.
              </p>
            </div>
          )}
        </Reveal>
      </div>

      <section aria-label="Visi dan misi desa" className="profile-content-grid">
        <Reveal>
          {villageProfileContent.vision ? (
            <section aria-labelledby="vision-title" className="profile-value">
              <p className="section-kicker">Arah Desa</p>
              <h2 className="profile-section-title" id="vision-title">
                Visi
              </h2>
              <p>{villageProfileContent.vision}</p>
            </section>
          ) : (
            <EmptyState
              description="Visi resmi belum tercantum pada dokumen sumber dan menunggu konfirmasi pemerintah desa."
              title="Visi desa belum tersedia"
            />
          )}
        </Reveal>
        <Reveal delay={0.05}>
          {villageProfileContent.mission.length > 0 ? (
            <section aria-labelledby="mission-title" className="profile-value">
              <p className="section-kicker">Arah Desa</p>
              <h2 className="profile-section-title" id="mission-title">
                Misi
              </h2>
              <ol>
                {villageProfileContent.mission.map((mission) => (
                  <li key={mission}>{mission}</li>
                ))}
              </ol>
            </section>
          ) : (
            <EmptyState
              description="Misi resmi belum tercantum pada dokumen sumber dan menunggu konfirmasi pemerintah desa."
              title="Misi desa belum tersedia"
            />
          )}
        </Reveal>
      </section>

      {villageProfileContent.description ? (
        <Reveal className="profile-description">
          <h2 className="profile-section-title">Tentang desa</h2>
          <p>{villageProfileContent.description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
