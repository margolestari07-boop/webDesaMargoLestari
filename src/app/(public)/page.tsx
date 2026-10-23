import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { siteIdentity } from "@/data/site";

const informationLinks = [
  { href: "/profil", label: "Profil desa" },
  { href: "/sejarah", label: "Sejarah" },
  { href: "/potensi", label: "Potensi" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/berita", label: "Berita" },
  { href: "/galeri", label: "Galeri" },
  { href: "/layanan", label: "Informasi layanan" },
  { href: "/transparansi", label: "Transparansi" },
  { href: "/lokasi", label: "Lokasi desa" },
  { href: "/kontak", label: "Kontak" },
];

export default function Home() {
  return (
    <>
      <section aria-labelledby="home-title" className="home-hero container">
        <p className="hero-topline">Pusat informasi {siteIdentity.name}</p>
        <div className="hero-grid">
          <Reveal>
            <h1 className="hero-title" id="home-title">
              Mengenal desa,
              <br />
              <em>cerita yang bertumbuh.</em>
            </h1>
          </Reveal>
          <Reveal className="hero-aside" delay={0.08}>
            <p>
              Satu ruang untuk mengenal sejarah, kegiatan, dan informasi{" "}
              {siteIdentity.name}. Materi yang belum dikonfirmasi pihak desa
              akan ditandai dan tidak disajikan sebagai fakta.
            </p>
            <a className="text-link" href="#direktori">
              Jelajahi informasi
              <ArrowDownRight aria-hidden="true" size={17} strokeWidth={1.7} />
            </a>
          </Reveal>
        </div>
        <div
          aria-label="Area foto desa akan diisi setelah materi resmi tersedia"
          className="hero-placeholder"
          role="img"
        >
          <p>
            Foto {siteIdentity.name} akan ditambahkan setelah disediakan dan
            divalidasi oleh pihak desa.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="directory-title"
        className="directory-section container"
        id="direktori"
      >
        <Reveal>
          <p className="section-kicker">Jelajahi</p>
          <h2 className="section-title" id="directory-title">
            Informasi desa, tersusun dalam satu tempat.
          </h2>
          <p className="directory-intro">
            Pilih bagian yang ingin Anda kenali. Halaman akan diisi bertahap
            dengan materi yang telah dikumpulkan dan dikonfirmasi bersama pihak
            desa.
          </p>
        </Reveal>
        <nav aria-label="Direktori informasi desa">
          <Stagger className="directory-list" staggerChildren={0.035}>
            {informationLinks.map((item) => (
              <Link className="directory-item" href={item.href} key={item.href}>
                <span>{item.label}</span>
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
              </Link>
            ))}
          </Stagger>
        </nav>
        <Reveal className="portal-note">
          <p>
            <strong>Catatan informasi.</strong> Dokumen proyek mencatat
            perbedaan penyebutan kecamatan antara{" "}
            {siteIdentity.subdistrict.default}
            dan {siteIdentity.subdistrict.conflict}. Informasi ini perlu
            diverifikasi sebelum dipublikasikan sebagai identitas final.
          </p>
          <p>
            Data demografi, potensi terperinci, koordinat, jenis layanan, dan
            rincian keuangan belum tersedia untuk ditampilkan.
          </p>
        </Reveal>
      </section>
    </>
  );
}
