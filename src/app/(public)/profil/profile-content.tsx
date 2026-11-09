import Link from "next/link";
import type { CSSProperties } from "react";

const missions = [
  {
    icon: "hub",
    text: "Menyelenggarakan tata kelola pemerintahan desa yang bersih, transparan, akuntabel, dan berbasis teknologi digital.",
  },
  {
    icon: "storefront",
    text: "Meningkatkan kesejahteraan ekonomi masyarakat melalui penguatan BUMDes, pertanian modern, dan pariwisata lokal.",
  },
  {
    icon: "health_and_safety",
    text: "Meningkatkan kualitas sumber daya manusia melalui pelayanan kesehatan prima, pengentasan stunting, dan pendidikan.",
  },
  {
    icon: "diversity_3",
    text: "Memelihara dan melestarikan nilai-nilai kearifan lokal, adat istiadat, dan gotong royong kebhinekaan warga desa.",
  },
  {
    icon: "nature_people",
    text: "Membangun infrastruktur desa yang merata, berkelanjutan, dan berwawasan lingkungan hijau guna mendukung ketahanan pangan dan konektivitas antardusun.",
  },
];

const values = [
  ["shield", "Integritas", "Jujur & Teguh"],
  ["visibility", "Transparansi", "Keterbukaan"],
  ["handshake", "Gotong Royong", "Kebersamaan"],
  ["bolt", "Inovasi", "Solutif & Cepat"],
];

const history = [
  {
    year: "1",
    period: "Awal Abad ke-19 (Tahun 1884)",
    title: "Prakarsa Babat Alas Ki Demang Sastrowijoyo",
    text: "Wilayah Sukamaju bermula dari hamparan lembah subur diapit dua aliran sungai irigasi alami. Dipimpin oleh Ki Demang Sastrowijoyo bersama para tetua perintis, dibuka pemukiman terpadu yang diberi nama “Sukamaju” sebagai doa agar siapa pun yang bermukim senantiasa gemar memajukan budi pekerti serta peradaban bercocok tanam.",
    marker: "bg-primary text-on-primary shadow-md",
  },
  {
    year: "2",
    period: "1945 – 1950",
    title: "Masa Perjuangan & Konsolidasi Pamong",
    text: "Di era revolusi fisik, lumbung padi Sukamaju menjadi penopang logistik pasukan gerilya kemerdekaan. Balai desa pertama kali difungsikan secara resmi pada tahun 1950 melalui pembentukan musyawarah rembug desa demokratis perdana untuk memilih Lurah pertama secara aklamasi warga.",
    marker: "bg-surface-container-highest text-primary",
  },
  {
    year: "3",
    period: "2004 – 2014",
    title: "Era Kebangkitan Otonomi & BUMDes",
    text: "Lahirnya UU Desa mempercepat lompatan pembangunan. Sukamaju mendirikan BUMDes “Maju Bersama” yang mengelola distribusi hasil panen, agrowisata edukasi, serta unit simpan pinjam produktif yang membebaskan ratusan petani dari jerat tengkulak.",
    marker: "bg-surface-container-highest text-primary",
  },
  {
    year: "4",
    period: "2021 – Sekarang",
    title: "Transformasi Desa Cerdas & Tata Kelola Berintegritas",
    text: "Kini Desa Sukamaju memadukan kearifan lokal luhur dengan sistem pelayanan administrasi terpadu online, transparansi anggaran publik melalui anjungan mandiri, serta peningkatan indeks desa membangun berstatus Desa Mandiri Nasional.",
    marker: "bg-secondary-fixed-dim text-on-secondary-fixed",
    periodClass: "text-secondary",
  },
];

const kaur = [
  ["Kaur TU & Umum", "Agus Pranoto, A.Md.", "Persuratan & Aset"],
  ["Kaur Keuangan", "Dewi Anggraini, S.Ak.", "Bendahara & APBDes"],
  ["Kaur Perencanaan", "Rian Hidayat, S.P.", "RPJM & RKPDes"],
];

const kasi = [
  ["Kasi Pemerintahan", "Gunawan Wibowo, S.H.", "Ketentraman & Batas"],
  ["Kasi Kesejahteraan", "Tri Wahyuni, S.Sos.", "Bansos & Posyandu"],
  ["Kasi Pelayanan", "Farhan Fauzi, S.Kom.", "Administrasi Kependudukan"],
];

const hamlets = [
  ["1", "Dusun Krajan", "M. Supardi", "6 RW / 22 RT"],
  ["2", "Dusun Sukosari", "Hadi Prayitno", "4 RW / 16 RT"],
  ["3", "Dusun Wonorejo", "Ahmad Basori", "5 RW / 18 RT"],
  ["4", "Dusun Sidomulyo", "Teguh Santoso", "4 RW / 14 RT"],
];

const ethics = [
  ["north", "Sebelah Utara", "Desa Karanganyar", "Kecamatan Lereng Asri"],
  ["south", "Sebelah Selatan", "Desa Sumbermakmur", "Kecamatan Pantai Indah"],
  ["west", "Sebelah Barat", "Hutan Lindung Gunung", "Wilayah Perhutani RPH"],
  ["east", "Sebelah Timur", "Aliran Sungai Brantas", "Batas Alam Kabupaten"],
];

const materialIconClass = "material-symbols-outlined";

function Icon({
  name,
  className = "",
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  const style = filled
    ? ({ fontVariationSettings: "'FILL' 1" } as CSSProperties)
    : undefined;

  return (
    <span
      aria-hidden="true"
      className={`${materialIconClass} ${className}`}
      style={style}
    >
      {name}
    </span>
  );
}

function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return <img alt={alt} className={className} src={src} />;
}

export default function ProfileContent() {
  return (
    <main className="simple-beranda simple-profil bg-surface font-body-md text-on-surface antialiased">
      <div className="bg-surface min-h-[calc(100vh-80px)] w-full pt-20">
        <div className="flex w-full flex-col">
          <section className="from-surface-container-low via-surface to-surface relative w-full overflow-hidden bg-gradient-to-b py-12 lg:py-16">
            <div className="bg-secondary-fixed/30 pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl" />
            <div className="bg-primary-fixed/40 pointer-events-none absolute top-1/2 -left-36 h-80 w-80 rounded-full blur-3xl" />
            <div className="px-gutter relative z-10 mx-auto flex max-w-7xl flex-col gap-6">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2">
                <Link
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary flex items-center gap-1.5 transition-colors"
                  href="/"
                >
                  <Icon className="text-[16px]" name="home" />
                  Beranda
                </Link>
                <Icon
                  className="text-outline-variant text-[14px]"
                  name="chevron_right"
                />
                <span className="font-label-md text-label-md text-primary font-bold">
                  Profil Desa
                </span>
              </nav>
              <div className="flex max-w-4xl flex-col gap-4">
                <div className="bg-secondary-fixed/40 inline-flex items-center gap-2 self-start rounded-full px-3.5 py-1">
                  <Icon className="text-primary text-[16px]" name="verified" />
                  <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">
                    Identitas Resmi Pemerintahan Desa Sukamaju
                  </span>
                </div>
                <h1 className="font-display text-display text-on-surface tracking-tight">
                  Profil{" "}
                  <span className="text-primary-container">Desa Sukamaju</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Mengenal lebih dekat sejarah luhur, cita-cita pembangunan,
                  arah kebijakan visi-misi, serta bagan struktur ketatanegaraan
                  desa yang transparan dan melayani warga seutuhnya.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link
                  className="font-label-md text-label-md group bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 shadow-sm transition-all hover:shadow-md"
                  href="#visi-misi"
                >
                  <Icon
                    className="group-hover:text-on-primary text-[18px]"
                    name="flag"
                  />
                  Visi &amp; Misi
                </Link>
                <Link
                  className="font-label-md text-label-md group bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 shadow-sm transition-all hover:shadow-md"
                  href="#sejarah"
                >
                  <Icon
                    className="group-hover:text-on-primary text-[18px]"
                    name="history_edu"
                  />
                  Sejarah Desa
                </Link>
                <Link
                  className="font-label-md text-label-md group bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 shadow-sm transition-all hover:shadow-md"
                  href="#sotk-bagan"
                >
                  <Icon
                    className="group-hover:text-on-primary text-[18px]"
                    name="account_tree"
                  />
                  Bagan Organisasi Desa
                </Link>
                <Link
                  className="font-label-md text-label-md group bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 shadow-sm transition-all hover:shadow-md"
                  href="#geografis"
                >
                  <Icon
                    className="group-hover:text-on-primary text-[18px]"
                    name="explore"
                  />
                  Data Wilayah &amp; Potensi
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-surface w-full py-16 lg:py-24" id="visi-misi">
            <div className="px-gutter mx-auto flex max-w-7xl flex-col gap-12">
              <div className="flex max-w-2xl flex-col gap-2">
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                  ARAH PEMBANGUNAN DESA
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  <span className="text-primary-container">
                    Visi &amp; Misi
                  </span>{" "}
                  Pemerintahan Desa
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Pilar komitmen jangka panjang kepemimpinan desa dalam
                  mewujudkan tata kelola berintegritas dan kesejahteraan warga
                  yang berkeadilan sosial.
                </p>
              </div>
              <div className="bg-surface-container-lowest shadow-primary/5 relative overflow-hidden rounded-[24px] p-8 shadow-xl lg:p-12">
                <div className="from-secondary-fixed/50 pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-bl-full bg-gradient-to-bl to-transparent" />
                <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center">
                  <div className="bg-primary-fixed text-primary flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-sm">
                    <Icon className="text-[36px]" name="lightbulb" filled />
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase">
                      Visi Utama Pembangunan Desa 2021 – 2027
                    </span>
                    <p className="font-headline-md text-headline-md text-on-surface leading-snug italic">
                      “Terwujudnya Desa Sukamaju yang Mandiri, Sejahtera,
                      Berakhlak, dan Berdaya Saing melalui Penguatan Ekonomi
                      Berkelanjutan dan Pelayanan Digital Transparan Menuju
                      Indonesia Emas.”
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                    <Icon
                      className="text-primary"
                      name="format_list_bulleted"
                    />
                    5 Pokok Misi Pembangunan Strategis
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    RPJMDes Sukamaju Periode Aktif
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {missions.map((mission, index) => (
                    <div
                      className={`group bg-surface-container-lowest flex flex-col justify-between gap-6 rounded-[20px] p-6 shadow-sm transition-shadow hover:shadow-md ${index === 4 ? "lg:col-span-2" : ""}`}
                      key={mission.icon}
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <span className="font-label-lg text-label-lg bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors">
                            0{index + 1}
                          </span>
                          <Icon
                            className="text-secondary text-[24px]"
                            name={mission.icon}
                          />
                        </div>
                        <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                          {mission.text}
                        </p>
                      </div>
                      <div className="bg-secondary-fixed h-1 w-12 rounded-full transition-all group-hover:w-full" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-surface-container-low flex flex-col items-center justify-between gap-6 rounded-[24px] p-8 md:flex-row">
                <div className="flex max-w-sm flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase">
                    BUDAYA APARATUR DESA
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">
                    Tata Nilai Pengabdian
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Prinsip moral seluruh pamong desa dalam melayani publik
                    tanpa pamrih.
                  </p>
                </div>
                <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 md:w-auto">
                  {values.map(([icon, title, subtitle]) => (
                    <div
                      className="bg-surface-container-lowest flex items-center gap-3 rounded-xl px-5 py-4 shadow-sm"
                      key={title}
                    >
                      <Icon className="text-primary text-[20px]" name={icon} />
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface">
                          {title}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {subtitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className="bg-surface-container-low w-full py-16 lg:py-24"
            id="sejarah"
          >
            <div className="px-gutter mx-auto flex max-w-7xl flex-col gap-12">
              <div className="flex max-w-2xl flex-col gap-2">
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                  ASAL USUL &amp; HISTORI
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Sejarah &amp; Perkembangan{" "}
                  <span className="text-primary-container">Desa Sukamaju</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Menelusuri jejak peradaban rintisan para pendahulu dari
                  pemukiman agraris bersahaja hingga menjelma sentra kemandirian
                  berwawasan digital modern.
                </p>
              </div>
              <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                <div className="flex flex-col gap-8 lg:col-span-7">
                  {history.map((entry) => (
                    <div className="flex gap-4" key={entry.year}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`font-label-md text-label-md flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${entry.marker}`}
                        >
                          {entry.year}
                        </div>
                        {entry.year !== "4" ? (
                          <div className="bg-surface-variant my-2 h-full w-0.5" />
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-2 pb-6">
                        <span
                          className={`font-label-sm text-label-sm text-primary font-bold uppercase ${entry.periodClass ?? ""}`}
                        >
                          {entry.period}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          {entry.title}
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          {entry.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-6 lg:col-span-5">
                  <div className="bg-surface-container-lowest flex flex-col overflow-hidden rounded-[24px] shadow-sm">
                    <div className="relative h-56 w-full">
                      <Photo
                        alt="Black and white archival vintage photograph of traditional wooden Javanese village hall balai desa in 1950 with villagers in blangkon and traditional attire gathered peacefully under a grand banyan tree with soft daylight"
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuADwlQeq3oqLid1Iop8FHl7Ei4Mrs3JQKAh2KknQbgpC3g8usnscilPW2tqiJ99jnejgZyQR3M9RrZKWEsqMNy-Ofwrj8ooMqR6JZIiPY8IwPXo5aSIRb_Fn7FJ-_BZ7ZKikAglFnVAlGM8mN_J_1D3hwcPaC5srDZmvkpz4RnWRFWoqpVfPjMnuuSB6O3f9SuEqIRZQQNvaHBadEz52bSKlaJJSOutnDXmqDUmHWqYr8AmVKsAm6Bl"
                      />
                    </div>
                    <div className="flex flex-col gap-2 p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-secondary font-bold">
                          Arsip Sejarah Balai Desa
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Foto Dok. 1952
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Pertemuan Rembug Warga pertama pasca-kemerdekaan di
                        pelataran Balai Desa lama Sukamaju, dipimpin para pemuka
                        adat.
                      </p>
                    </div>
                  </div>
                  <div className="bg-primary text-on-primary relative flex flex-col gap-4 overflow-hidden rounded-[24px] p-8 shadow-md">
                    <Icon
                      className="absolute right-4 bottom-4 text-[48px] opacity-25"
                      name="format_quote"
                    />
                    <span className="font-label-sm text-label-sm text-secondary-fixed z-10 tracking-wider uppercase">
                      Nasihat Luhur Leluhur Desa
                    </span>
                    <blockquote className="font-body-lg text-body-lg z-10 leading-relaxed italic">
                      “Ajining desa gumantung ing guyub rukune wargane, lan
                      lakuning pamong kang resik lahir batine.”
                    </blockquote>
                    <p className="font-label-md text-label-md text-primary-fixed z-10">
                      — Mbah Wongso Taruno (Tokoh Adat &amp; Sesepuh Desa
                      Sukamaju)
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest flex flex-col gap-4 rounded-[24px] p-6 shadow-sm">
                    <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
                      Tonggak Capaian Historis
                    </span>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        ["1928", "Batas Wilayah"],
                        ["2016", "BUMDes Resmi"],
                        ["2023", "Desa Mandiri"],
                      ].map(([year, label]) => (
                        <div
                          className="bg-surface-container-low rounded-xl p-3"
                          key={year}
                        >
                          <span className="font-headline-sm text-headline-sm text-primary">
                            {year}
                          </span>
                          <p className="font-label-sm text-label-sm text-on-surface-variant pt-1">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface w-full py-16 lg:py-24" id="sotk-bagan">
            <div className="px-gutter mx-auto flex max-w-7xl flex-col gap-12">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div className="flex max-w-2xl flex-col gap-2">
                  <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                    KETATANEGARAAN DESA
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    Bagan Struktur Organisasi{" "}
                    <span className="text-primary-container">
                      Pemerintah Desa (SOTK)
                    </span>
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Penyelenggaraan tata pamong berdasarkan Permendagri No. 84
                    Tahun 2015 demi kepastian pelayanan dan akuntabilitas
                    hierarki birokrasi desa.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    className="font-label-md text-label-md bg-primary text-on-primary inline-flex items-center gap-2 rounded-full px-6 py-3 shadow-md transition-all hover:shadow-lg hover:brightness-105 active:scale-95"
                    type="button"
                  >
                    <Icon className="text-[18px]" name="download" />
                    Unduh SK &amp; Bagan PDF
                  </button>
                  <button
                    className="font-label-md text-label-md bg-surface-container-lowest text-primary hover:bg-surface-container inline-flex items-center gap-2 rounded-full px-6 py-3 shadow-sm transition-all hover:shadow"
                    type="button"
                  >
                    <Icon className="text-[18px]" name="menu_book" />
                    Lihat Tugas Pokok (Tupoksi)
                  </button>
                </div>
              </div>
              <div className="bg-surface-container-low w-full overflow-x-auto rounded-[28px] p-6 shadow-inner lg:p-12">
                <div className="flex min-w-[900px] flex-col items-center gap-8 py-4">
                  <div className="relative flex w-full items-center justify-center gap-8">
                    <div className="bg-surface-container-lowest flex w-64 flex-col items-center gap-2 rounded-[20px] p-4 text-center shadow-sm">
                      <span className="font-label-sm text-label-sm bg-secondary-fixed/50 text-secondary rounded-full px-3 py-1 uppercase">
                        Mitra / Pengawas
                      </span>
                      <div className="bg-surface-container text-primary flex h-12 w-12 items-center justify-center rounded-full">
                        <Icon className="text-[24px]" name="gavel" />
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">
                        Badan Permusyawaratan Desa
                      </h4>
                      <p className="font-label-md text-label-md text-on-surface-variant font-bold">
                        Drs. Bambang Wahyudi
                      </p>
                      <span className="font-body-sm text-body-sm text-outline">
                        Ketua BPD Periode 2021-2027
                      </span>
                    </div>
                    <div className="bg-outline-variant h-0.5 w-12" />
                    <div className="bg-surface-container-lowest relative flex w-80 flex-col items-center gap-3 rounded-[24px] p-6 text-center shadow-md">
                      <span className="font-label-sm text-label-sm bg-primary text-on-primary rounded-full px-4 py-1 font-bold tracking-wider uppercase">
                        Pimpinan Puncak
                      </span>
                      <div className="bg-surface-variant h-20 w-20 overflow-hidden rounded-full shadow-sm">
                        <Photo
                          alt="Official portrait photograph of an Indonesian male village head in civil service white uniform with pins and friendly confident expression, neat professional studio lighting, neutral clean background"
                          className="h-full w-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZmnpPotM21QcMDzjHg_bMb7J0t8mE37VhcDKjuhiChRnQXDQGp_uhCAkxtvQsb6XgdHwc87u-7akjCfqrZqHuKuzwSRxp5JvTNdrcJSAOyZ6EBZT0T90O288ZbsJzTi7fAy6m1kvf95m-NGBg8wrDIVRVlZ2QRgB7Y7i1ph9J5Ws0NmxjMzQlboBCQwnnSRq8V-nWD7wrmzkwBINmjB8A9WzJTmwGzlg3kpOqdlHaqdEMGU-3N8D1"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          H. Suryadi, S.Sos.
                        </h3>
                        <span className="font-label-lg text-label-lg text-primary font-bold">
                          Kepala Desa Sukamaju
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant pt-0.5">
                          NIPD: 19740512 201201 1 004
                        </span>
                      </div>
                    </div>
                    <div className="bg-outline-variant h-0.5 w-12" />
                    <div className="bg-surface-container-lowest flex w-64 flex-col items-center gap-2 rounded-[20px] p-4 text-center shadow-sm">
                      <span className="font-label-sm text-label-sm bg-secondary-fixed/50 text-secondary rounded-full px-3 py-1 uppercase">
                        Mitra Budaya
                      </span>
                      <div className="bg-surface-container text-primary flex h-12 w-12 items-center justify-center rounded-full">
                        <Icon className="text-[24px]" name="account_balance" />
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">
                        Lembaga Adat &amp; Tokoh
                      </h4>
                      <p className="font-label-md text-label-md text-on-surface-variant font-bold">
                        Ki Mangun Sudiro
                      </p>
                      <span className="font-body-sm text-body-sm text-outline">
                        Ketua Adat Pemangku Desa
                      </span>
                    </div>
                  </div>
                  <div className="bg-primary h-8 w-0.5" />
                  <div className="bg-surface-container-lowest flex w-72 flex-col items-center gap-2 rounded-[22px] p-5 text-center shadow-sm">
                    <span className="font-label-sm text-label-sm bg-surface-container text-primary rounded-full px-3 py-1 font-bold uppercase">
                      Unsur Pimpinan Staf
                    </span>
                    <div className="bg-surface-variant h-16 w-16 overflow-hidden rounded-full shadow-sm">
                      <Photo
                        alt="Official professional portrait of an Indonesian female civil servant with hijab smiling warm and poised wearing brown ASN uniform, clear studio portrait lighting, high corporate aesthetic"
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMdr4F4x82To_fOQegYwlgjOApqiVZQAQx_AcovJUv9YHMsX8KDelMks929Y7C7sRGcRm8Cb3sE2OaGuPRhkRMxdgDH5QNKVw4ViJ6GI2Js7Bg-3S_WJHSyxQ8q717-2zD8vpzB2bIKC-jvmlRgdgwjtLYoqWXMpH_DIgmSYABMSX7pasmIOe0oojO_EiYZ1pbgpCafpW6NvxQgCxtJWTTfm6BW4PxaXvLxuCM8nfO-Vft60cx9CY2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">
                        Siti Rahmawati, S.E.
                      </h4>
                      <span className="font-label-md text-label-md text-primary font-bold">
                        Sekretaris Desa (Sekdes)
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Koordinator Pelayanan &amp; Tata Usaha
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <div className="bg-primary h-8 w-0.5" />
                    <div className="bg-outline-variant h-0.5 w-4/5" />
                  </div>
                  <div className="grid w-full grid-cols-2 gap-8 pt-2">
                    <div className="bg-surface-container-lowest/60 flex flex-col gap-4 rounded-[24px] p-6">
                      <div className="flex items-center justify-between pb-2">
                        <span className="font-label-lg text-label-lg text-primary flex items-center gap-2 font-bold">
                          <Icon className="text-[20px]" name="assignment" />
                          Pelaksana Urusan (Kaur)
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Sekretariat
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        {kaur.map(([role, name, duties]) => (
                          <div
                            className="bg-surface-container-lowest flex flex-col gap-1 rounded-xl p-4 text-center shadow-sm"
                            key={role}
                          >
                            <span className="font-label-sm text-label-sm text-secondary font-bold">
                              {role}
                            </span>
                            <p className="font-label-md text-label-md text-on-surface font-semibold">
                              {name}
                            </p>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {duties}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest/60 flex flex-col gap-4 rounded-[24px] p-6">
                      <div className="flex items-center justify-between pb-2">
                        <span className="font-label-lg text-label-lg text-primary flex items-center gap-2 font-bold">
                          <Icon className="text-[20px]" name="engineering" />
                          Pelaksana Teknis (Kasi)
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Lapangan &amp; Warga
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        {kasi.map(([role, name, duties]) => (
                          <div
                            className="bg-surface-container-lowest flex flex-col gap-1 rounded-xl p-4 text-center shadow-sm"
                            key={role}
                          >
                            <span className="font-label-sm text-label-sm text-secondary font-bold">
                              {role}
                            </span>
                            <p className="font-label-md text-label-md text-on-surface font-semibold">
                              {name}
                            </p>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {duties}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <div className="bg-outline-variant h-6 w-0.5" />
                    <div className="bg-outline-variant h-0.5 w-11/12" />
                  </div>
                  <div className="flex w-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface flex items-center gap-2 font-bold tracking-wider uppercase">
                        <Icon
                          className="text-primary text-[20px]"
                          name="holiday_village"
                        />
                        Unsur Kewilayahan (Kepala Dusun / Kamituwo)
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Penanggung Jawab Teritorial
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {hamlets.map(([number, dusun, name, area]) => (
                        <div
                          className="bg-surface-container-lowest flex items-center gap-3 rounded-2xl p-4 shadow-sm"
                          key={number}
                        >
                          <div className="font-label-md text-label-md bg-primary-fixed text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold">
                            {number}
                          </div>
                          <div className="flex min-w-0 flex-col">
                            <span className="font-label-sm text-label-sm text-secondary font-bold">
                              {dusun}
                            </span>
                            <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                              {name}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {area}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="bg-surface-container-low w-full py-16 lg:py-24"
            id="geografis"
          >
            <div className="px-gutter mx-auto flex max-w-7xl flex-col gap-12">
              <div className="flex max-w-2xl flex-col gap-2">
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                  DATA WILAYAH &amp; POTENSI
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Panel Geografis &amp;{" "}
                  <span className="text-primary-container">
                    Demografi Wilayah
                  </span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Gambaran bentang alam teritorial, letak strategis batas
                  perbatasan, dan komposisi kependudukan Desa Sukamaju.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="bg-surface-container-lowest flex flex-col justify-between gap-6 rounded-[24px] p-8 shadow-sm lg:col-span-5">
                  <div className="flex flex-col gap-2">
                    <div className="text-primary flex items-center gap-2">
                      <Icon className="text-[24px]" name="explore" />
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Batas Wilayah Administratif
                      </h3>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Batas yurisdiksi sesuai Peraturan Daerah Pemetaan Batas
                      Desa.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {ethics.map(([icon, direction, place, region]) => (
                      <div
                        className="bg-surface-container-low flex flex-col gap-1 rounded-xl p-4"
                        key={direction}
                      >
                        <span className="font-label-sm text-label-sm text-primary flex items-center gap-1 font-bold uppercase">
                          <Icon className="text-[16px]" name={icon} />
                          {direction}
                        </span>
                        <p className="font-label-md text-label-md text-on-surface">
                          {place}
                        </p>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {region}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="font-label-sm text-label-sm text-outline flex items-center justify-between pt-2">
                    <span>Koordinat: -7.4321° LS, 112.5642° BT</span>
                    <span>Ketinggian: 350 mdpl</span>
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:col-span-7">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="bg-surface-container-lowest flex flex-col gap-2 rounded-[22px] p-6 shadow-sm">
                      <Icon
                        className="text-primary text-[28px]"
                        name="square_foot"
                      />
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                        Luas Wilayah Total
                      </span>
                      <span className="font-headline-md text-headline-md text-on-surface font-extrabold">
                        842,5{" "}
                        <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                          Ha
                        </span>
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Pertanian 62%, Pemukiman 28%
                      </p>
                    </div>
                    <div className="bg-surface-container-lowest flex flex-col gap-2 rounded-[22px] p-6 shadow-sm">
                      <Icon
                        className="text-secondary text-[28px]"
                        name="groups"
                      />
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                        Jumlah Penduduk
                      </span>
                      <span className="font-headline-md text-headline-md text-on-surface font-extrabold">
                        6.482{" "}
                        <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                          Jiwa
                        </span>
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        1.942 Kepala Keluarga (KK)
                      </p>
                    </div>
                    <div className="bg-surface-container-lowest flex flex-col gap-2 rounded-[22px] p-6 shadow-sm">
                      <Icon
                        className="text-primary-container text-[28px]"
                        name="route"
                      />
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                        Jarak ke Ibu Kota
                      </span>
                      <span className="font-headline-md text-headline-md text-on-surface font-extrabold">
                        14,2{" "}
                        <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                          Km
                        </span>
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Waktu tempuh ±25 Menit
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest flex flex-1 flex-col justify-center gap-4 rounded-[24px] p-6 shadow-sm">
                    <span className="font-label-md text-label-md text-on-surface flex items-center gap-2 font-bold">
                      <Icon
                        className="text-primary text-[20px]"
                        name="near_me"
                      />
                      Orbitasi &amp; Aksesibilitas Publik
                    </span>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="bg-surface-container-low flex items-center gap-3 rounded-xl p-3">
                        <Icon className="text-secondary" name="apartment" />
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-on-surface font-bold">
                            Ke Kantor Camat
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            3,5 Km (7 Menit)
                          </span>
                        </div>
                      </div>
                      <div className="bg-surface-container-low flex items-center gap-3 rounded-xl p-3">
                        <Icon
                          className="text-secondary"
                          name="local_hospital"
                        />
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-on-surface font-bold">
                            Ke RSUD Kabupaten
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            12 Km (20 Menit)
                          </span>
                        </div>
                      </div>
                      <div className="bg-surface-container-low flex items-center gap-3 rounded-xl p-3">
                        <Icon className="text-secondary" name="train" />
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-on-surface font-bold">
                            Ke Stasiun Terdekat
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            8 Km (15 Menit)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="relative mt-2 flex h-44 w-full items-end overflow-hidden rounded-xl bg-cover bg-center p-4 shadow-inner"
                      data-location="Sukamaju Village Office Indonesia"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoeqjQfPop7TfvXHVHJGhZyTZPlJwsArsdTGShQDj163FG_41_IYguwAQk1GemHQiGeFHaz1KxxiW30OsDcaAx8gIaYO75ELfkM6nfdTqliEwA0TV6CQqug57GjwuoXsl-tbathSpdI0TUa3DQv9YJ5Nxml4t2Dn-h7fTWENuwDcCvp6DNtOa_2V3JMySps0AbtGkaAQ4XXJrXjNRi_NGk5PLUVGm-aQQFziciM09KVPkqJv3jp8OL')",
                      }}
                    >
                      <div className="bg-surface/90 flex items-center gap-2 rounded-full px-4 py-2 shadow-sm backdrop-blur-md">
                        <Icon
                          className="text-primary text-[18px]"
                          name="pin_drop"
                        />
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                          Peta Topografi &amp; Batas Wilayah Desa Sukamaju
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface w-full py-12">
            <div className="px-gutter mx-auto max-w-7xl">
              <div className="from-primary to-primary-container text-on-primary relative flex flex-col justify-between gap-8 overflow-hidden rounded-[28px] bg-gradient-to-r p-8 shadow-lg md:flex-row md:items-center lg:p-12">
                <div className="bg-secondary-container/20 pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full blur-2xl" />
                <div className="relative z-10 flex max-w-xl flex-col gap-2">
                  <span className="font-label-sm text-label-sm text-secondary-fixed font-bold tracking-wider uppercase">
                    KETERBUKAAN INFORMASI PUBLIK (KIP)
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-on-primary">
                    Butuh Dokumen Profil Lengkap atau Konsultasi Pamong Desa?
                  </h3>
                  <p className="font-body-md text-body-md text-primary-fixed leading-relaxed">
                    Pemerintah Desa Sukamaju membuka ruang seluas-luasnya bagi
                    riset akademis, aspirasi warga, serta kunjungan studi
                    banding antar-desa.
                  </p>
                </div>
                <div className="relative z-10 flex shrink-0 flex-col items-center gap-4 sm:flex-row">
                  <span className="font-label-md text-label-md bg-surface-container-lowest text-primary hover:bg-surface-container inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-center shadow-md transition-all hover:shadow-lg sm:w-auto">
                    Unduh Buku Profil Desa
                  </span>
                  <a
                    className="font-label-md text-label-md bg-primary-fixed/20 text-on-primary hover:bg-primary-fixed/30 flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-center transition-all sm:w-auto"
                    href="tel:+6281234567890"
                  >
                    <Icon className="text-[18px]" name="chat" />
                    Hubungi Pamong Desa
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
