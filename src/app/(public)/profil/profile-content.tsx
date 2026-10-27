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
    <span aria-hidden="true" className={`${materialIconClass} ${className}`} style={style}>
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

export default function ProfileContent({
  fontClassName,
}: {
  fontClassName: string;
}) {
  return (
    <div className={`${fontClassName} simple-beranda simple-profil bg-surface font-body-md text-on-surface antialiased`}>
      <header className="fixed left-0 top-0 z-50 w-full bg-surface/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-space-md px-gutter">
          <div className="flex shrink-0 items-center gap-3">
            <img
              alt="Logo Pemerintah Desa"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UK2JG7Zb9JjcjhZr1NqzKtur9_E3PzIr5rdRaLiwW-O3V-fsEbbBmSywnjjFVHFR0RTDZgWW7eD9-KyHBTtytXcUX0IlZl8yEKd4iZRJBhKcEva362DN3JOdWRg8TSmEcyA6Qq5tLGTsmTfdBQpNXvupqJj6dG-6PzmS1ntixdHGYowuWB3T34I3b75aphexMgcCdkX0tpC99MIUhqTkOMdtK9_GK9tQMe6ND0Dw3EmzctQbejaOrRsw"
            />
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg leading-tight tracking-tight text-on-surface">
                Pemerintah Desa
              </span>
              <span className="font-label-sm text-label-sm font-medium text-on-surface-variant">
                Sistem Informasi Pelayanan
              </span>
            </div>
          </div>
          <nav aria-label="Navigasi utama" className="hidden flex-1 items-center justify-end gap-6 xl:flex">
            <a className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface" data-path="beranda" href="#">
              Beranda
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface" data-path="profil-desa" href="#sotk">
              Profil Desa
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface" data-path="infografis" href="#layanan">
              Infografis
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface" data-path="berita" href="#">
              Berita
            </a>
          </nav>
          <div className="flex items-center gap-space-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-sm">
              <Icon className="text-[18px] text-on-primary" name="person" />
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-[calc(100vh-80px)] w-full bg-surface pt-20">
        <div className="flex w-full flex-col">
          <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface py-12 lg:py-16">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary-fixed/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-36 top-1/2 h-80 w-80 rounded-full bg-primary-fixed/40 blur-3xl" />
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-gutter">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2">
                <a className="font-label-md text-label-md flex items-center gap-1.5 text-on-surface-variant transition-colors hover:text-primary" href="#">
                  <Icon className="text-[16px]" name="home" />
                  Beranda
                </a>
                <Icon className="text-[14px] text-outline-variant" name="chevron_right" />
                <span className="font-label-md text-label-md font-bold text-primary">Profil Desa</span>
              </nav>
              <div className="flex max-w-4xl flex-col gap-4">
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-secondary-fixed/40 px-3.5 py-1">
                  <Icon className="text-[16px] text-primary" name="verified" />
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">
                    Identitas Resmi Pemerintahan Desa Sukamaju
                  </span>
                </div>
                <h1 className="font-display text-display tracking-tight text-on-surface">
                  Profil <span className="text-primary-container">Desa Sukamaju</span>
                </h1>
                <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                  Mengenal lebih dekat sejarah luhur, cita-cita pembangunan, arah kebijakan visi-misi, serta bagan struktur ketatanegaraan desa yang transparan dan melayani warga seutuhnya.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a className="font-label-md text-label-md group inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-5 py-2.5 text-primary shadow-sm transition-all hover:bg-primary hover:text-on-primary hover:shadow-md" href="#visi-misi">
                  <Icon className="text-[18px] group-hover:text-on-primary" name="flag" />
                  Visi &amp; Misi
                </a>
                <a className="font-label-md text-label-md group inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-5 py-2.5 text-primary shadow-sm transition-all hover:bg-primary hover:text-on-primary hover:shadow-md" href="#sejarah">
                  <Icon className="text-[18px] group-hover:text-on-primary" name="history_edu" />
                  Sejarah Desa
                </a>
                <a className="font-label-md text-label-md group inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-5 py-2.5 text-primary shadow-sm transition-all hover:bg-primary hover:text-on-primary hover:shadow-md" href="#sotk-bagan">
                  <Icon className="text-[18px] group-hover:text-on-primary" name="account_tree" />
                  Bagan Organisasi Desa
                </a>
                <a className="font-label-md text-label-md group inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-5 py-2.5 text-primary shadow-sm transition-all hover:bg-primary hover:text-on-primary hover:shadow-md" href="#geografis">
                  <Icon className="text-[18px] group-hover:text-on-primary" name="explore" />
                  Data Wilayah &amp; Potensi
                </a>
              </div>
            </div>
          </section>

          <section className="w-full bg-surface py-16 lg:py-24" id="visi-misi">
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-gutter">
              <div className="flex max-w-2xl flex-col gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">ARAH PEMBANGUNAN DESA</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  <span className="text-primary-container">Visi &amp; Misi</span> Pemerintahan Desa
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Pilar komitmen jangka panjang kepemimpinan desa dalam mewujudkan tata kelola berintegritas dan kesejahteraan warga yang berkeadilan sosial.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[24px] bg-surface-container-lowest p-8 shadow-xl shadow-primary/5 lg:p-12">
                <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-bl-full bg-gradient-to-bl from-secondary-fixed/50 to-transparent" />
                <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed text-primary shadow-sm">
                    <Icon className="text-[36px]" name="lightbulb" filled />
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Visi Utama Pembangunan Desa 2021 – 2027</span>
                    <p className="font-headline-md text-headline-md leading-snug text-on-surface italic">
                      “Terwujudnya Desa Sukamaju yang Mandiri, Sejahtera, Berakhlak, dan Berdaya Saing melalui Penguatan Ekonomi Berkelanjutan dan Pelayanan Digital Transparan Menuju Indonesia Emas.”
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm flex items-center gap-2 text-on-surface">
                    <Icon className="text-primary" name="format_list_bulleted" />
                    5 Pokok Misi Pembangunan Strategis
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">RPJMDes Sukamaju Periode Aktif</span>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {missions.map((mission, index) => (
                    <div className={`group flex flex-col justify-between gap-6 rounded-[20px] bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md ${index === 4 ? "lg:col-span-2" : ""}`} key={mission.icon}>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <span className="font-label-lg text-label-lg flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">0{index + 1}</span>
                          <Icon className="text-[24px] text-secondary" name={mission.icon} />
                        </div>
                        <p className="font-body-md text-body-md leading-relaxed text-on-surface">{mission.text}</p>
                      </div>
                      <div className="h-1 w-12 rounded-full bg-secondary-fixed transition-all group-hover:w-full" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-6 rounded-[24px] bg-surface-container-low p-8 md:flex-row">
                <div className="flex max-w-sm flex-col gap-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">BUDAYA APARATUR DESA</span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">Tata Nilai Pengabdian</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Prinsip moral seluruh pamong desa dalam melayani publik tanpa pamrih.</p>
                </div>
                <div className="grid w-full grid-cols-2 gap-4 md:w-auto sm:grid-cols-4">
                  {values.map(([icon, title, subtitle]) => (
                    <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest px-5 py-4 shadow-sm" key={title}>
                      <Icon className="text-[20px] text-primary" name={icon} />
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface">{title}</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">{subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-surface-container-low py-16 lg:py-24" id="sejarah">
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-gutter">
              <div className="flex max-w-2xl flex-col gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">ASAL USUL &amp; HISTORI</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Sejarah &amp; Perkembangan <span className="text-primary-container">Desa Sukamaju</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Menelusuri jejak peradaban rintisan para pendahulu dari pemukiman agraris bersahaja hingga menjelma sentra kemandirian berwawasan digital modern.
                </p>
              </div>
              <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                <div className="flex flex-col gap-8 lg:col-span-7">
                  {history.map((entry) => (
                    <div className="flex gap-4" key={entry.year}>
                      <div className="flex flex-col items-center">
                        <div className={`font-label-md text-label-md flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${entry.marker}`}>
                          {entry.year}
                        </div>
                        {entry.year !== "4" ? <div className="my-2 h-full w-0.5 bg-surface-variant" /> : null}
                      </div>
                      <div className="flex flex-col gap-2 pb-6">
                        <span className={`font-label-sm text-label-sm font-bold uppercase text-primary ${entry.periodClass ?? ""}`}>{entry.period}</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">{entry.title}</h3>
                        <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">{entry.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-6 lg:col-span-5">
                  <div className="flex flex-col overflow-hidden rounded-[24px] bg-surface-container-lowest shadow-sm">
                    <div className="relative h-56 w-full">
                      <Photo
                        alt="Black and white archival vintage photograph of traditional wooden Javanese village hall balai desa in 1950 with villagers in blangkon and traditional attire gathered peacefully under a grand banyan tree with soft daylight"
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuADwlQeq3oqLid1Iop8FHl7Ei4Mrs3JQKAh2KknQbgpC3g8usnscilPW2tqiJ99jnejgZyQR3M9RrZKWEsqMNy-Ofwrj8ooMqR6JZIiPY8IwPXo5aSIRb_Fn7FJ-_BZ7ZKikAglFnVAlGM8mN_J_1D3hwcPaC5srDZmvkpz4RnWRFWoqpVfPjMnuuSB6O3f9SuEqIRZQQNvaHBadEz52bSKlaJJSOutnDXmqDUmHWqYr8AmVKsAm6Bl"
                      />
                    </div>
                    <div className="flex flex-col gap-2 p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm font-bold text-secondary">Arsip Sejarah Balai Desa</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Foto Dok. 1952</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Pertemuan Rembug Warga pertama pasca-kemerdekaan di pelataran Balai Desa lama Sukamaju, dipimpin para pemuka adat.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col gap-4 overflow-hidden rounded-[24px] bg-primary p-8 text-on-primary shadow-md">
                    <Icon className="absolute bottom-4 right-4 text-[48px] opacity-25" name="format_quote" />
                    <span className="font-label-sm text-label-sm z-10 uppercase tracking-wider text-secondary-fixed">Nasihat Luhur Leluhur Desa</span>
                    <blockquote className="font-body-lg text-body-lg z-10 leading-relaxed italic">
                      “Ajining desa gumantung ing guyub rukune wargane, lan lakuning pamong kang resik lahir batine.”
                    </blockquote>
                    <p className="font-label-md text-label-md z-10 text-primary-fixed">
                      — Mbah Wongso Taruno (Tokoh Adat &amp; Sesepuh Desa Sukamaju)
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 rounded-[24px] bg-surface-container-lowest p-6 shadow-sm">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Tonggak Capaian Historis</span>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[["1928", "Batas Wilayah"], ["2016", "BUMDes Resmi"], ["2023", "Desa Mandiri"]].map(([year, label]) => (
                        <div className="rounded-xl bg-surface-container-low p-3" key={year}>
                          <span className="font-headline-sm text-headline-sm text-primary">{year}</span>
                          <p className="font-label-sm text-label-sm pt-1 text-on-surface-variant">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-surface py-16 lg:py-24" id="sotk-bagan">
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-gutter">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div className="flex max-w-2xl flex-col gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">KETATANEGARAAN DESA</span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    Bagan Struktur Organisasi <span className="text-primary-container">Pemerintah Desa (SOTK)</span>
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Penyelenggaraan tata pamong berdasarkan Permendagri No. 84 Tahun 2015 demi kepastian pelayanan dan akuntabilitas hierarki birokrasi desa.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="font-label-md text-label-md inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-on-primary shadow-md transition-all hover:brightness-105 hover:shadow-lg active:scale-95" type="button">
                    <Icon className="text-[18px]" name="download" />
                    Unduh SK &amp; Bagan PDF
                  </button>
                  <button className="font-label-md text-label-md inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-6 py-3 text-primary shadow-sm transition-all hover:bg-surface-container hover:shadow" type="button">
                    <Icon className="text-[18px]" name="menu_book" />
                    Lihat Tugas Pokok (Tupoksi)
                  </button>
                </div>
              </div>
              <div className="w-full overflow-x-auto rounded-[28px] bg-surface-container-low p-6 shadow-inner lg:p-12">
                <div className="flex min-w-[900px] flex-col items-center gap-8 py-4">
                  <div className="relative flex w-full items-center justify-center gap-8">
                    <div className="flex w-64 flex-col items-center gap-2 rounded-[20px] bg-surface-container-lowest p-4 text-center shadow-sm">
                      <span className="font-label-sm text-label-sm rounded-full bg-secondary-fixed/50 px-3 py-1 uppercase text-secondary">Mitra / Pengawas</span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-primary">
                        <Icon className="text-[24px]" name="gavel" />
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">Badan Permusyawaratan Desa</h4>
                      <p className="font-label-md text-label-md font-bold text-on-surface-variant">Drs. Bambang Wahyudi</p>
                      <span className="font-body-sm text-body-sm text-outline">Ketua BPD Periode 2021-2027</span>
                    </div>
                    <div className="h-0.5 w-12 bg-outline-variant" />
                    <div className="relative flex w-80 flex-col items-center gap-3 rounded-[24px] bg-surface-container-lowest p-6 text-center shadow-md">
                      <span className="font-label-sm text-label-sm rounded-full bg-primary px-4 py-1 font-bold uppercase tracking-wider text-on-primary">Pimpinan Puncak</span>
                      <div className="h-20 w-20 overflow-hidden rounded-full bg-surface-variant shadow-sm">
                        <Photo
                          alt="Official portrait photograph of an Indonesian male village head in civil service white uniform with pins and friendly confident expression, neat professional studio lighting, neutral clean background"
                          className="h-full w-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZmnpPotM21QcMDzjHg_bMb7J0t8mE37VhcDKjuhiChRnQXDQGp_uhCAkxtvQsb6XgdHwc87u-7akjCfqrZqHuKuzwSRxp5JvTNdrcJSAOyZ6EBZT0T90O288ZbsJzTi7fAy6m1kvf95m-NGBg8wrDIVRVlZ2QRgB7Y7i1ph9J5Ws0NmxjMzQlboBCQwnnSRq8V-nWD7wrmzkwBINmjB8A9WzJTmwGzlg3kpOqdlHaqdEMGU-3N8D1"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-headline-md text-headline-md text-on-surface">H. Suryadi, S.Sos.</h3>
                        <span className="font-label-lg text-label-lg font-bold text-primary">Kepala Desa Sukamaju</span>
                        <span className="font-body-sm text-body-sm pt-0.5 text-on-surface-variant">NIPD: 19740512 201201 1 004</span>
                      </div>
                    </div>
                    <div className="h-0.5 w-12 bg-outline-variant" />
                    <div className="flex w-64 flex-col items-center gap-2 rounded-[20px] bg-surface-container-lowest p-4 text-center shadow-sm">
                      <span className="font-label-sm text-label-sm rounded-full bg-secondary-fixed/50 px-3 py-1 uppercase text-secondary">Mitra Budaya</span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-primary">
                        <Icon className="text-[24px]" name="account_balance" />
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">Lembaga Adat &amp; Tokoh</h4>
                      <p className="font-label-md text-label-md font-bold text-on-surface-variant">Ki Mangun Sudiro</p>
                      <span className="font-body-sm text-body-sm text-outline">Ketua Adat Pemangku Desa</span>
                    </div>
                  </div>
                  <div className="h-8 w-0.5 bg-primary" />
                  <div className="flex w-72 flex-col items-center gap-2 rounded-[22px] bg-surface-container-lowest p-5 text-center shadow-sm">
                    <span className="font-label-sm text-label-sm rounded-full bg-surface-container px-3 py-1 font-bold uppercase text-primary">Unsur Pimpinan Staf</span>
                    <div className="h-16 w-16 overflow-hidden rounded-full bg-surface-variant shadow-sm">
                      <Photo
                        alt="Official professional portrait of an Indonesian female civil servant with hijab smiling warm and poised wearing brown ASN uniform, clear studio portrait lighting, high corporate aesthetic"
                        className="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMdr4F4x82To_fOQegYwlgjOApqiVZQAQx_AcovJUv9YHMsX8KDelMks929Y7C7sRGcRm8Cb3sE2OaGuPRhkRMxdgDH5QNKVw4ViJ6GI2Js7Bg-3S_WJHSyxQ8q717-2zD8vpzB2bIKC-jvmlRgdgwjtLYoqWXMpH_DIgmSYABMSX7pasmIOe0oojO_EiYZ1pbgpCafpW6NvxQgCxtJWTTfm6BW4PxaXvLxuCM8nfO-Vft60cx9CY2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">Siti Rahmawati, S.E.</h4>
                      <span className="font-label-md text-label-md font-bold text-primary">Sekretaris Desa (Sekdes)</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Koordinator Pelayanan &amp; Tata Usaha</span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <div className="h-8 w-0.5 bg-primary" />
                    <div className="h-0.5 w-4/5 bg-outline-variant" />
                  </div>
                  <div className="grid w-full grid-cols-2 gap-8 pt-2">
                    <div className="flex flex-col gap-4 rounded-[24px] bg-surface-container-lowest/60 p-6">
                      <div className="flex items-center justify-between pb-2">
                        <span className="font-label-lg text-label-lg flex items-center gap-2 font-bold text-primary">
                          <Icon className="text-[20px]" name="assignment" />
                          Pelaksana Urusan (Kaur)
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Sekretariat</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        {kaur.map(([role, name, duties]) => (
                          <div className="flex flex-col gap-1 rounded-xl bg-surface-container-lowest p-4 text-center shadow-sm" key={role}>
                            <span className="font-label-sm text-label-sm font-bold text-secondary">{role}</span>
                            <p className="font-label-md text-label-md font-semibold text-on-surface">{name}</p>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">{duties}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 rounded-[24px] bg-surface-container-lowest/60 p-6">
                      <div className="flex items-center justify-between pb-2">
                        <span className="font-label-lg text-label-lg flex items-center gap-2 font-bold text-primary">
                          <Icon className="text-[20px]" name="engineering" />
                          Pelaksana Teknis (Kasi)
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Lapangan &amp; Warga</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        {kasi.map(([role, name, duties]) => (
                          <div className="flex flex-col gap-1 rounded-xl bg-surface-container-lowest p-4 text-center shadow-sm" key={role}>
                            <span className="font-label-sm text-label-sm font-bold text-secondary">{role}</span>
                            <p className="font-label-md text-label-md font-semibold text-on-surface">{name}</p>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">{duties}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <div className="h-6 w-0.5 bg-outline-variant" />
                    <div className="h-0.5 w-11/12 bg-outline-variant" />
                  </div>
                  <div className="flex w-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md flex items-center gap-2 font-bold uppercase tracking-wider text-on-surface">
                        <Icon className="text-[20px] text-primary" name="holiday_village" />
                        Unsur Kewilayahan (Kepala Dusun / Kamituwo)
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Penanggung Jawab Teritorial</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {hamlets.map(([number, dusun, name, area]) => (
                        <div className="flex items-center gap-3 rounded-2xl bg-surface-container-lowest p-4 shadow-sm" key={number}>
                          <div className="font-label-md text-label-md flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed font-bold text-primary">{number}</div>
                          <div className="flex min-w-0 flex-col">
                            <span className="font-label-sm text-label-sm font-bold text-secondary">{dusun}</span>
                            <span className="font-label-md text-label-md truncate font-semibold text-on-surface">{name}</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">{area}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-surface-container-low py-16 lg:py-24" id="geografis">
            <div className="mx-auto flex max-w-7xl flex-col gap-12 px-gutter">
              <div className="flex max-w-2xl flex-col gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">DATA WILAYAH &amp; POTENSI</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Panel Geografis &amp; <span className="text-primary-container">Demografi Wilayah</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Gambaran bentang alam teritorial, letak strategis batas perbatasan, dan komposisi kependudukan Desa Sukamaju.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="flex flex-col justify-between gap-6 rounded-[24px] bg-surface-container-lowest p-8 shadow-sm lg:col-span-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Icon className="text-[24px]" name="explore" />
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Batas Wilayah Administratif</h3>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Batas yurisdiksi sesuai Peraturan Daerah Pemetaan Batas Desa.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {ethics.map(([icon, direction, place, region]) => (
                      <div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-4" key={direction}>
                        <span className="font-label-sm text-label-sm flex items-center gap-1 font-bold uppercase text-primary">
                          <Icon className="text-[16px]" name={icon} />
                          {direction}
                        </span>
                        <p className="font-label-md text-label-md text-on-surface">{place}</p>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">{region}</span>
                      </div>
                    ))}
                  </div>
                  <div className="font-label-sm text-label-sm flex items-center justify-between pt-2 text-outline">
                    <span>Koordinat: -7.4321° LS, 112.5642° BT</span>
                    <span>Ketinggian: 350 mdpl</span>
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:col-span-7">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex flex-col gap-2 rounded-[22px] bg-surface-container-lowest p-6 shadow-sm">
                      <Icon className="text-[28px] text-primary" name="square_foot" />
                      <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Luas Wilayah Total</span>
                      <span className="font-headline-md text-headline-md font-extrabold text-on-surface">842,5 <span className="font-label-md text-label-md font-normal text-on-surface-variant">Ha</span></span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Pertanian 62%, Pemukiman 28%</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-[22px] bg-surface-container-lowest p-6 shadow-sm">
                      <Icon className="text-[28px] text-secondary" name="groups" />
                      <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Jumlah Penduduk</span>
                      <span className="font-headline-md text-headline-md font-extrabold text-on-surface">6.482 <span className="font-label-md text-label-md font-normal text-on-surface-variant">Jiwa</span></span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">1.942 Kepala Keluarga (KK)</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-[22px] bg-surface-container-lowest p-6 shadow-sm">
                      <Icon className="text-[28px] text-primary-container" name="route" />
                      <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Jarak ke Ibu Kota</span>
                      <span className="font-headline-md text-headline-md font-extrabold text-on-surface">14,2 <span className="font-label-md text-label-md font-normal text-on-surface-variant">Km</span></span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Waktu tempuh ±25 Menit</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-4 rounded-[24px] bg-surface-container-lowest p-6 shadow-sm">
                    <span className="font-label-md text-label-md flex items-center gap-2 font-bold text-on-surface">
                      <Icon className="text-[20px] text-primary" name="near_me" />
                      Orbitasi &amp; Aksesibilitas Publik
                    </span>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3">
                        <Icon className="text-secondary" name="apartment" />
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface">Ke Kantor Camat</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">3,5 Km (7 Menit)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3">
                        <Icon className="text-secondary" name="local_hospital" />
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface">Ke RSUD Kabupaten</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">12 Km (20 Menit)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3">
                        <Icon className="text-secondary" name="train" />
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface">Ke Stasiun Terdekat</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">8 Km (15 Menit)</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="relative mt-2 flex h-44 w-full items-end overflow-hidden rounded-xl bg-cover bg-center p-4 shadow-inner"
                      data-location="Sukamaju Village Office Indonesia"
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoeqjQfPop7TfvXHVHJGhZyTZPlJwsArsdTGShQDj163FG_41_IYguwAQk1GemHQiGeFHaz1KxxiW30OsDcaAx8gIaYO75ELfkM6nfdTqliEwA0TV6CQqug57GjwuoXsl-tbathSpdI0TUa3DQv9YJ5Nxml4t2Dn-h7fTWENuwDcCvp6DNtOa_2V3JMySps0AbtGkaAQ4XXJrXjNRi_NGk5PLUVGm-aQQFziciM09KVPkqJv3jp8OL')" }}
                    >
                      <div className="flex items-center gap-2 rounded-full bg-surface/90 px-4 py-2 shadow-sm backdrop-blur-md">
                        <Icon className="text-[18px] text-primary" name="pin_drop" />
                        <span className="font-label-sm text-label-sm font-semibold text-on-surface">Peta Topografi &amp; Batas Wilayah Desa Sukamaju</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-surface py-12">
            <div className="mx-auto max-w-7xl px-gutter">
              <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-primary to-primary-container p-8 text-on-primary shadow-lg md:flex-row md:items-center lg:p-12">
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-secondary-container/20 blur-2xl" />
                <div className="relative z-10 flex max-w-xl flex-col gap-2">
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary-fixed">KETERBUKAAN INFORMASI PUBLIK (KIP)</span>
                  <h3 className="font-headline-lg text-headline-lg text-on-primary">
                    Butuh Dokumen Profil Lengkap atau Konsultasi Pamong Desa?
                  </h3>
                  <p className="font-body-md text-body-md leading-relaxed text-primary-fixed">
                    Pemerintah Desa Sukamaju membuka ruang seluas-luasnya bagi riset akademis, aspirasi warga, serta kunjungan studi banding antar-desa.
                  </p>
                </div>
                <div className="relative z-10 flex shrink-0 flex-col items-center gap-4 sm:flex-row">
                  <a className="font-label-md text-label-md w-full rounded-full bg-surface-container-lowest px-8 py-3.5 text-center text-primary shadow-md transition-all hover:bg-surface-container hover:shadow-lg sm:w-auto" href="#">
                    Unduh Buku Profil Desa
                  </a>
                  <a className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-full bg-primary-fixed/20 px-8 py-3.5 text-center text-on-primary transition-all hover:bg-primary-fixed/30 sm:w-auto" href="#">
                    <Icon className="text-[18px]" name="chat" />
                    Hubungi Pamong Desa
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="w-full bg-inverse-surface pb-12 pt-16 text-inverse-on-surface">
        <div className="mx-auto max-w-7xl px-gutter">
          <div className="grid grid-cols-1 gap-space-xl pb-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  alt="Logo Pemerintah Desa"
                  className="h-8 w-auto object-contain brightness-0 invert"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1UK2JG7Zb9JjcjhZr1NqzKtur9_E3PzIr5rdRaLiwW-O3V-fsEbbBmSywnjjFVHFR0RTDZgWW7eD9-KyHBTtytXcUX0IlZl8yEKd4iZRJBhKcEva362DN3JOdWRg8TSmEcyA6Qq5tLGTsmTfdBQpNXvupqJj6dG-6PzmS1ntixdHGYowuWB3T34I3b75aphexMgcCdkX0tpC99MIUhqTkOMdtK9_GK9tQMe6ND0Dw3EmzctQbejaOrRsw"
                />
                <span className="font-headline-sm text-headline-sm font-bold text-inverse-on-surface">
                  Pemerintah Desa
                </span>
              </div>
              <p className="font-body-sm text-body-sm leading-relaxed text-surface-dim">
                Mewujudkan tata kelola pemerintahan desa yang amanah, transparan, mandiri, dan berkeadaban dengan pelayanan publik terpadu ramah warga.
              </p>
              <div className="flex items-center gap-3 pt-2">
                {["mail", "call", "share"].map((icon) => (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-variant/20 text-inverse-on-surface" key={icon}>
                    <Icon className="text-[18px]" name={icon} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-headline-sm text-headline-sm font-bold tracking-tight text-inverse-on-surface">Pemerintahan</h4>
              <ul className="font-body-sm text-body-sm flex flex-col gap-2.5 text-surface-dim">
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="sambutan" href="#">Sambutan Kepala Desa</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="sotk" href="#">Struktur Organisasi (SOTK)</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="apb-desa" href="#">Transparansi APB Desa</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="berita" href="#">Warta &amp; Pengumuman</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-headline-sm text-headline-sm font-bold tracking-tight text-inverse-on-surface">Layanan Mandiri</h4>
              <ul className="font-body-sm text-body-sm flex flex-col gap-2.5 text-surface-dim">
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="administrasi" href="#">Surat Keterangan Usaha (SKU)</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="administrasi" href="#">Surat Pengantar Domisili</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="administrasi" href="#">Surat Keterangan Tidak Mampu</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="galeri" href="#">Dokumentasi Kegiatan Desa</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-headline-sm text-headline-sm font-bold tracking-tight text-inverse-on-surface">Kantor Pelayanan</h4>
              <div className="font-body-sm text-body-sm flex flex-col gap-2 text-surface-dim">
                <p>Jl. Raya Utama Kantor Balai Desa No. 01</p>
                <p>Kecamatan Nusantara, Kode Pos 61253</p>
                <p className="font-label-sm text-label-sm pt-1 text-secondary-fixed-dim">Senin – Jumat: 08.00 – 15.30 WIB</p>
              </div>
              <div className="pt-1">
                <a className="font-label-md text-label-md inline-flex items-center gap-2 text-secondary-fixed transition-colors hover:text-inverse-on-surface" data-path="kontak" href="#">
                  Hubungi Balai Desa
                  <Icon className="text-[16px]" name="arrow_forward" />
                </a>
              </div>
            </div>
          </div>
          <div className="font-body-sm text-body-sm flex flex-col items-center justify-between gap-4 pt-8 text-surface-dim md:flex-row">
            <p>© 2025 Pemerintah Desa. Seluruh hak cipta dilindungi undang-undang.</p>
            <div className="font-label-sm text-label-sm flex items-center gap-6">
              <a className="transition-colors hover:text-inverse-on-surface" href="#">Kebijakan Privasi</a>
              <a className="transition-colors hover:text-inverse-on-surface" href="#">Keterbukaan Informasi</a>
              <a className="transition-colors hover:text-inverse-on-surface" href="#">Peta Situs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
