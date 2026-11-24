"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type {
  HomeRevisionData,
  PopulationRevisionData,
} from "@/lib/content/revisions";
import type { PublicSiteSettings } from "@/components/site-header";

/**
 * Beranda memakai data terbit dari database bila ada; bila belum ada
 * revisi terbit, memakai konten statis di bawah ini (fallback). Array
 * statis ini adalah data yang sama dengan yang di-seed ke database
 * pada 24 Nov 2026, jadi tampilan tidak berubah saat data diterbitkan.
 */

export type HomepageProps = {
  home: { revisionId: string; data: HomeRevisionData } | null;
  population: { revisionId: string; data: PopulationRevisionData } | null;
  settings: PublicSiteSettings;
};

type OfficerView = {
  name: string;
  role: string;
  badge: string;
  detail: string;
  badgeClass: string;
};

type GalleryView = {
  title: string;
  category: string;
  image: string;
  alt: string;
  size: string;
  tagClass: string;
  titleClass: string;
  padding: string;
};

function officerBadge(role: string): string {
  if (role === "Kepala Desa") return "Pimpinan";
  if (role === "Sekretaris Desa") return "Sekretariat";
  if (role.startsWith("Kasi ")) return role.slice(5);
  if (role.startsWith("Kaur ")) {
    return role === "Kaur TU & Umum" ? "Tata Usaha & Umum" : role.slice(5);
  }
  if (role.startsWith("Kepala Dusun ")) return role.replace("Kepala ", "");
  return role;
}

const galleryLayout = [
  {
    size: "sm:col-span-2 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-headline-sm text-headline-sm",
    padding: "p-5",
  },
  {
    size: "sm:col-span-1 row-span-2",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-headline-sm text-headline-sm",
    padding: "p-5",
  },
  {
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
  {
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
  {
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
  {
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-secondary text-on-secondary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
];

function formatId(value: number): string {
  return value.toLocaleString("id-ID");
}

function digitsOnly(value: string): string {
  return value.replaceAll(/[^0-9]/g, "");
}

const officers = [
  {
    name: "Sonjaya, S.H.",
    role: "Kepala Desa",
    badge: "Pimpinan",
    detail: "Masa Tugas: 2021 – 2029",
    badgeClass: "bg-primary-container text-on-primary",
  },
  {
    name: "Sutrisno",
    role: "Sekretaris Desa",
    badge: "Sekretariat",
    detail: "Administrasi",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Kurniadi",
    role: "Kasi Pemerintahan",
    badge: "Pemerintahan",
    detail: "Regulasi & Wilayah Desa",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Sustiana",
    role: "Kasi Kesejahteraan",
    badge: "Kesejahteraan",
    detail: "Pemberdayaan & Bansos",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Seni",
    role: "Kasi Pelayanan",
    badge: "Pelayanan",
    detail: "Layanan Warga & Kependudukan",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Misngadi",
    role: "Kaur Perencanaan",
    badge: "Perencanaan",
    detail: "Aset Desa & Tata Ruang",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Ardi Sonjaya",
    role: "Kaur Keuangan",
    badge: "Keuangan",
    detail: "APBDes & Perbendaharaan",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Jemadi",
    role: "Kaur TU & Umum",
    badge: "Tata Usaha & Umum",
    detail: "Administrasi dan urusan umum desa",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Kamsidi",
    role: "Kepala Dusun 1",
    badge: "Dusun 1",
    detail: "Wilayah Dusun 1",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Sodri Sanjaya",
    role: "Kepala Dusun 2",
    badge: "Dusun 2",
    detail: "Wilayah Dusun 2",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Komaroni",
    role: "Kepala Dusun 3",
    badge: "Dusun 3",
    detail: "Wilayah Dusun 3",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Sutrisno",
    role: "Kepala Dusun 4",
    badge: "Dusun 4",
    detail: "Wilayah Dusun 4",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
];

const gallery = [
  {
    title: "Foto Bersama Kepala Desa dan Jajaran Perangkat Desa",
    category: "Pemerintahan",
    image: "/foto-bersama-kepala-desa.jpeg",
    alt: "Foto bersama Kepala Desa dan jajaran perangkat Desa Margo Lestari.",
    size: "sm:col-span-2 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-headline-sm text-headline-sm",
    padding: "p-5",
  },
  {
    title: "Kegiatan PKK",
    category: "Kegiatan",
    image: "/tp-pkk-margo-lestari.jpeg",
    alt: "Dokumentasi kegiatan PKK Desa Margo Lestari.",
    size: "sm:col-span-1 row-span-2",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-headline-sm text-headline-sm",
    padding: "p-5",
  },
  {
    title: "Penyaluran Bantuan Pangan Beras untuk Warga Desa Margo Lestari",
    category: "Kegiatan",
    image: "/penyaluran-bantuan-desa.jpeg",
    alt: "Dokumentasi penyaluran bantuan pangan beras untuk warga Desa Margo Lestari.",
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
  {
    title: "Acara HUT RI 2024",
    category: "Kegiatan",
    image: "/acara-hut-ri.jpeg",
    alt: "Dokumentasi acara peringatan HUT RI 2024 di Desa Margo Lestari.",
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
  {
    title: "Musyawarah Perencanaan Pembangunan Desa",
    category: "Kegiatan",
    image: "/musyawarah%20desa.jpeg",
    alt: "Warm indoor setting of Indonesian village elders and neighborhood leaders engaged in peaceful consensus deliberation musyawarah warga in the balai pertemuan.",
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
  {
    title: "Pelayanan Posyandu Balita & Lansia",
    category: "Kegiatan",
    image: "/pelayanan%20posyandu.jpeg",
    alt: "Dedicated Posyandu health cadres weighing an infant baby and counseling a smiling young mother in village community center, bright clean sanitary environment.",
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-secondary text-on-secondary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
];

const materialIconClass = "material-symbols-outlined";

function RemoteImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      alt={alt}
      className={className}
      fill
      sizes={sizes}
      src={src}
      unoptimized
    />
  );
}

export default function HomepageContent({
  home,
  population,
  settings,
}: HomepageProps) {
  const sotkTrack = useRef<HTMLDivElement>(null);

  const scrollTrack = (left: number) => {
    sotkTrack.current?.scrollBy({ left, behavior: "smooth" });
  };

  const homeContent = home?.data.content ?? null;
  const heroTitle =
    homeContent?.hero_title ?? "Selamat Datang di Portal Resmi Desa Margo Lestari";
  const heroSubtitle =
    homeContent?.hero_subtitle ??
    "Mewujudkan desa yang transparan, maju, dan melayani warga dengan baik.";
  const helpPhone = homeContent?.help_phone ?? "+62 821-1439-7667";
  const helpNote =
    homeContent?.help_note ??
    "Hubungi Petugas Pelayanan Desa (Kasi Pelayanan & Operator Layanan Terpadu) untuk konsultasi berkas & persuratan.";
  const serviceHours =
    settings?.service_hours ?? "Senin – Jumat: 08.00 – 15.30 WIB";
  const [serviceDays, serviceTime] = serviceHours.includes(":")
    ? [
        serviceHours.slice(0, serviceHours.indexOf(":")),
        serviceHours.slice(serviceHours.indexOf(":") + 1).trim(),
      ]
    : [serviceHours, ""];

  const publishedOfficers = home?.data.officers ?? [];
  const officersView: OfficerView[] =
    publishedOfficers.length > 0
      ? publishedOfficers.map((officer, index) => ({
          name: officer.full_name,
          role: officer.position,
          badge: officerBadge(officer.position),
          detail: officer.description ?? "",
          badgeClass:
            index === 0
              ? "bg-primary-container text-on-primary"
              : "bg-surface-variant/90 text-on-surface",
        }))
      : officers.map((officer) => ({
          name: officer.name,
          role: officer.role,
          badge: officer.badge,
          detail: officer.detail,
          badgeClass: officer.badgeClass,
        }));

  const publishedGallery = home?.data.galleryItems ?? [];
  const assetById = new Map(
    (home?.data.mediaAssets ?? []).map((asset) => [asset.id, asset]),
  );
  const galleryView: GalleryView[] =
    publishedGallery.length > 0
      ? publishedGallery.map((item, index) => {
          const asset = item.media_asset_id
            ? assetById.get(item.media_asset_id)
            : undefined;
          // Aset Cloudinary memakai secure_url; aset Supabase Storage
          // memakai storage_path (file lokal di /public).
          const image =
            asset?.secure_url ??
            (asset?.storage_path
              ? asset.storage_path.startsWith("http")
                ? asset.storage_path
                : `/${asset.storage_path}`
              : "");
          const layout = galleryLayout[index % galleryLayout.length];
          const title = item.title ?? "";
          return {
            title,
            category: item.caption ?? "Kegiatan",
            image,
            alt: item.alt_override ?? asset?.alt_text ?? title,
            ...layout,
          };
        })
      : gallery.map((item) => ({
          title: item.title,
          category: item.category,
          image: item.image,
          alt: item.alt,
          size: item.size,
          tagClass: item.tagClass,
          titleClass: item.titleClass,
          padding: item.padding,
        }));

  const populationReport = population?.data.report ?? null;
  const totalPopulation = populationReport?.total_population ?? 2938;
  const totalHouseholds = populationReport?.total_households ?? 952;

  return (
    <main className="simple-beranda bg-surface font-body-md text-on-surface antialiased">
      <div className="bg-surface min-h-[calc(100vh-80px)] w-full pt-20">
        <div className="flex w-full flex-col">
          <section className="relative flex min-h-145 w-full flex-col justify-center overflow-hidden py-16 md:py-24">
            <div className="absolute inset-0 z-0">
              <RemoteImage
                alt="Pemandangan Alam Desa Margo Lestari"
                className="object-cover"
                sizes="100vw"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCztjVmdRTGFO0Ar9XpHJzN2Fc7JApSHymHFYrxJ9XMdmA7rMHM7m7-amiehJuwl52zmxQv7DakF8ReJekSgUtc7jFnHZd3aHl2dIiryfFs17WZvrRuFyIeVASWnWzgM3tEpj40OVM9asRaoz8RnzZ_jM5Kov41JovAQPH3g7q6vYAOG1Uhsp44x1v8-J0GzU-hIe85FtDHYs_OmFbKWdMP_ggmI3GZOrXDiAM_VXMdmzRxGWqqltY"
              />
              <div className="from-on-surface/90 via-on-surface/60 to-on-surface/50 absolute inset-0 bg-linear-to-t" />
              <div className="absolute inset-0 backdrop-blur-[2px]" />
            </div>
            <div className="px-gutter relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 text-center">
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
                <h1 className="font-display text-display text-on-primary leading-tight tracking-tight">
                  {heroTitle}
                </h1>
                <p className="font-body-lg text-body-lg text-inverse-on-surface max-w-2xl leading-relaxed">
                  {heroSubtitle}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <Link
                    className="font-label-lg text-label-lg bg-surface-container-lowest/90 text-primary-container hover:bg-surface-container-lowest inline-flex items-center justify-center rounded-full px-7 py-3.5 shadow-sm backdrop-blur-md transition-all"
                    href="#galeri"
                  >
                    <span className={`${materialIconClass} mr-2 text-[20px]`}>
                      explore
                    </span>
                    Jelajahi Desa
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-16" id="sotk">
            <div className="px-gutter mx-auto flex max-w-7xl flex-col gap-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="font-label-sm text-label-sm text-primary font-bold tracking-widest uppercase">
                    Pemerintahan Desa
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">
                    Struktur Organisasi &amp;{" "}
                    <span className="text-primary-container">
                      Perangkat Desa Margo Lestari
                    </span>
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
                    Aparatur Pemerintah Desa Margo Lestari yang berdedikasi melayani
                    segenap kebutuhan masyarakat secara profesional, transparan,
                    dan berintegritas.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    aria-label="Geser ke Kiri"
                    className="border-surface-variant/50 bg-surface-container-lowest text-on-surface hover:bg-surface-container flex h-12 w-12 items-center justify-center rounded-full border shadow-sm transition-all active:scale-95"
                    onClick={() => scrollTrack(-320)}
                    type="button"
                  >
                    <span className={`${materialIconClass} text-[20px]`}>
                      arrow_back
                    </span>
                  </button>
                  <button
                    aria-label="Geser ke Kanan"
                    className="bg-primary-container text-on-primary hover:bg-primary flex h-12 w-12 items-center justify-center rounded-full shadow-[0_4px_14px_rgba(0,119,182,0.35)] transition-all active:scale-95"
                    onClick={() => scrollTrack(320)}
                    type="button"
                  >
                    <span className={`${materialIconClass} text-[20px]`}>
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>

              <div className="group relative w-full">
                <div
                  className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 py-4 pb-6"
                  id="sotk-track"
                  ref={sotkTrack}
                >
                  {officersView.map((officer, index) => (
                    <div
                      className={`group/card bg-surface-container-lowest flex w-72.5 shrink-0 snap-start flex-col gap-4 rounded-3xl border border-transparent p-5 ${index === 0 ? "shadow-md" : "shadow-sm"} transition-all hover:-translate-y-1 hover:border-primary-container/30 hover:shadow-xl sm:w-77.5`}
                      key={`${officer.role}-${index}`}
                    >
                      <span
                        className={`font-label-sm text-label-sm w-fit rounded-full px-3 py-1 font-semibold ${officer.badgeClass}`}
                      >
                        {officer.badge}
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <h4 className="font-headline-sm text-headline-sm text-on-surface leading-snug font-bold">
                          {officer.name}
                        </h4>
                        <span className="font-label-sm text-label-sm bg-secondary-fixed/40 text-on-secondary-fixed w-fit rounded-full px-3 py-1 font-semibold">
                          {officer.role}
                        </span>
                      </div>
                      <div className="font-body-sm text-body-sm bg-surface-container-low/60 text-on-surface-variant flex flex-col gap-1 rounded-xl p-3">
                        <span>{officer.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className="bg-surface-container-low w-full py-16"
            id="layanan"
          >
            <div className="px-gutter mx-auto flex max-w-7xl flex-col gap-10">
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
                <span className="font-label-sm text-label-sm text-primary font-bold tracking-widest uppercase">
                  Statistik &amp; Demografi Wilayah
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Data Kependudukan &amp;{" "}
                  <span className="text-primary-container">Profil Wilayah</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Ringkasan data demografi, kependudukan, pembagian wilayah
                  teritorial, dan jam pelayanan resmi Pemerintah Desa Margo Lestari
                  terkini.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-surface-container-lowest flex flex-col gap-4 rounded-[20px] p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="bg-primary-fixed text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                    <span className={`${materialIconClass} text-[30px]`}>
                      groups
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                      Jumlah Penduduk
                    </span>
                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                      {formatId(totalPopulation)}{" "}
                      <span className="font-body-md text-body-md text-on-surface-variant font-medium">
                        Jiwa
                      </span>
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant border-t-0 pt-2">
                    Terdaftar resmi dalam basis data kependudukan desa.
                  </p>
                </div>
                <div className="bg-surface-container-lowest flex flex-col gap-4 rounded-[20px] p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="bg-secondary-fixed text-on-secondary-fixed flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                    <span className={`${materialIconClass} text-[30px]`}>
                      family_restroom
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                      Kepala Keluarga
                    </span>
                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                      {formatId(totalHouseholds)}{" "}
                      <span className="font-body-md text-body-md text-on-surface-variant font-medium">
                        KK
                      </span>
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant border-t-0 pt-2">
                    Tersebar di seluruh rukun warga dan dusun binaan.
                  </p>
                </div>
                <div className="bg-surface-container-lowest flex flex-col gap-4 rounded-[20px] p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="bg-tertiary-fixed text-tertiary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                    <span className={`${materialIconClass} text-[30px]`}>
                      location_on
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                      Wilayah Dusun / RT
                    </span>
                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                      4{" "}
                      <span className="font-body-md text-body-md text-on-surface-variant font-medium">
                        Dusun /
                      </span>{" "}
                      14{" "}
                      <span className="font-body-md text-body-md text-on-surface-variant font-medium">
                        RT
                      </span>
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant border-t-0 pt-2">
                    Cakupan pembagian teritorial administrasi desa.
                  </p>
                </div>
                <div className="bg-surface-container-lowest flex flex-col gap-4 rounded-[20px] p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="bg-primary-fixed-dim/40 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                    <span className={`${materialIconClass} text-[30px]`}>
                      schedule
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                      Jam Layanan Kantor
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {serviceDays}
                    </span>
                    <span className="font-label-lg text-label-lg text-primary font-semibold">
                      {serviceTime}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant border-t-0 pt-2">
                    Pelayanan tatap muka di Balai Desa Margo Lestari.
                  </p>
                </div>
              </div>
              <div className="border-secondary-fixed/30 bg-surface-container-lowest flex flex-col items-center justify-between gap-6 rounded-[20px] border p-6 text-center shadow-sm lg:flex-row lg:text-left">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <div className="bg-secondary-fixed/40 text-on-secondary-fixed flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                    <span className={`${materialIconClass} text-[30px]`}>
                      support_agent
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                      <span className="font-label-lg text-label-lg text-on-surface font-bold">
                        Butuh Bantuan Administrasi Cepat?
                      </span>
                      <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container rounded-full px-2.5 py-0.5 font-semibold">
                        Siaga 08.00 - 15.30 WIB
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {helpNote}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
                  <a
                    className="group bg-primary-container font-label-md text-label-md text-on-primary hover:bg-primary inline-flex items-center gap-2 rounded-full px-6 py-3 shadow-md transition-all active:scale-95"
                    href={`https://wa.me/${digitsOnly(helpPhone)}?text=Halo%20Admin%20Desa%20Margo%20Lestari,%20saya%20ingin%20konsultasi%20layanan%20administrasi`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      aria-hidden="true"
                      className="text-on-primary h-5 w-5 fill-current transition-transform group-hover:scale-105"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.4 8.87 7.65C8.65 7.89 8.02 8.48 8.02 9.71C8.02 10.93 8.91 12.11 9.03 12.28C9.16 12.44 10.74 14.96 13.22 15.96C15.28 16.79 15.7 16.63 16.14 16.59C16.59 16.54 17.57 16 17.77 15.42C17.97 14.85 17.97 14.36 17.91 14.25C17.85 14.15 17.7 14.09 17.47 13.98C17.25 13.86 16.16 13.33 15.96 13.25C15.76 13.17 15.61 13.14 15.46 13.36C15.31 13.58 14.88 14.09 14.75 14.25C14.62 14.4 14.49 14.42 14.26 14.31C14.04 14.2 13.1 13.89 11.98 12.9C11.11 12.12 10.52 11.16 10.4 10.94C10.27 10.72 10.38 10.6 10.5 10.49C10.6 10.38 10.74 10.2 10.85 10.07C10.96 9.94 11 9.85 11.08 9.69C11.16 9.52 11.11 9.38 11.06 9.27C11 9.16 10.55 8.06 10.36 7.62C10.18 7.18 10 7.24 9.85 7.24C9.72 7.24 9.56 7.24 9.53 7.34Z" />
                    </svg>
                    <span>Chat WhatsApp Sekarang</span>
                  </a>
                  <div className="font-label-md text-label-md bg-surface-container-low text-on-surface flex items-center gap-2 rounded-full px-4 py-3">
                    <span
                      className={`${materialIconClass} text-secondary text-[18px]`}
                    >
                      call
                    </span>
                    <span className="text-on-surface-variant">
                      {helpPhone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="bg-surface-container-low w-full py-16"
            id="galeri"
          >
            <div className="px-gutter mx-auto flex max-w-7xl flex-col gap-10">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="font-label-sm text-label-sm text-primary font-bold tracking-widest uppercase">
                    Potret Kehidupan Warga
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">
                    Dokumentasi &amp;{" "}
                    <span className="text-primary-container">Galeri Desa</span>
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
                    Rekam jejak kebersamaan, keagungan adat budaya, keelokan
                    bentang alam, dan dinamika gerak pembangunan desa.
                  </p>
                </div>
              </div>
              <div className="grid auto-rows-55 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {galleryView.map((item) => (
                  <div
                    className={`${item.size} group bg-surface-container relative row-span-1 overflow-hidden rounded-2xl shadow-sm`}
                    key={item.title}
                  >
                    <RemoteImage
                      alt={item.alt}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                      src={item.image}
                    />
                    <div
                      className={`from-on-surface/80 via-on-surface/20 absolute inset-0 flex flex-col justify-end bg-linear-to-t to-transparent p-5 opacity-90 transition-opacity ${item.padding}`}
                    >
                      <span
                        className={`font-label-sm text-label-sm mb-1 w-fit rounded-full px-3 py-1 ${item.tagClass}`}
                      >
                        {item.category}
                      </span>
                      <h4
                        className={`${item.titleClass} text-on-primary font-bold`}
                      >
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
