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


const kaur = [
  ["Kaur TU & Umum", "JEMADI"],
  ["Kaur Keuangan", "ARDI SONJAYA"],
];

const kasi = [
  ["Kasi Pemerintahan", "KURNIADI"],
  ["Kasi Kesejahteraan", "SUSTIANA"],
  ["Kasi Pelayanan", "SENI"],
  ["Kasi Perencanaan", "MISNGADI"],
];

const hamlets = [
  ["1", "Dusun 1", "KAMSIDI"],
  ["2", "Dusun 2", "SODRI SANJAYA"],
  ["3", "Dusun 3", "KOMARONI"],
  ["4", "Dusun 4", "SUTRISNO"],
];

const ethics = [
  ["north", "Sebelah Utara", "Desa Karang Rejo dan Sumber Jaya"],
  ["south", "Sebelah Selatan", "Desa Gedung Harapan"],
  ["west", "Sebelah Barat", "Desa Marga Agung, Desa Marga Karya dan Desa Rejo Mulyo"],
  ["east", "Sebelah Timur", "Desa Margodadi, Sumber Jaya dan Gedung Harapan"],
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
                </div>
                <h1 className="font-display text-display text-on-surface tracking-tight">
                  Profil{" "}
                  <span className="text-primary-container">Desa Margo Lestari</span>
                </h1>
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
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Sejarah &amp; Perkembangan{" "}
                  <span className="text-primary-container">Desa Margo Lestari</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                <div className="lg:col-span-12">
                  <p className="font-body-md text-body-md text-on-surface-variant text-justify leading-relaxed">
                    Desa Margo Lestari merupakan pemekaran dari Desa/Kelurahan
                    Gedung Meneng Labuhan Ratu Kecamatan Kedaton sehubungan Desa
                    Gedung Meneng Labuhan Ratu masuk wilayah Kodya Bandar Lampung
                    maka pada tahun 1986 di bentuklah menjadi Desa persiapan Margo
                    Lestari Kecamatan Tanjung Bintang dengan mengangkat pejabat
                    sementara yaitu Bapak R.Suparno dengan luas wilayah 1.011.5 Ha
                    terdiri dari 4 Dusun dengan jumlah penduduk 1.938 jiwa.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface w-full py-16 lg:py-24" id="sotk-bagan">
            <div className="px-gutter mx-auto flex max-w-7xl flex-col gap-12">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div className="flex max-w-2xl flex-col gap-2">
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
                    <div className="bg-surface-container-lowest relative flex w-80 flex-col items-center gap-3 rounded-[24px] p-6 text-center shadow-md">
                      <span className="font-label-sm text-label-sm bg-primary text-on-primary rounded-full px-4 py-1 font-bold tracking-wider uppercase">
                        Pimpinan Puncak
                      </span>
                      <div className="flex flex-col">
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          SONJAYA
                        </h3>
                        <span className="font-label-lg text-label-lg text-primary font-bold">
                          Kepala Desa Margo Lestari
                        </span>
                      </div>
                    </div>

                  </div>
                  <div className="bg-primary h-8 w-0.5" />
                  <div className="bg-surface-container-lowest flex w-72 flex-col items-center gap-2 rounded-[22px] p-5 text-center shadow-sm">
                    <span className="font-label-sm text-label-sm bg-surface-container text-primary rounded-full px-3 py-1 font-bold uppercase">
                      Unsur Pimpinan Staf
                    </span>
                    <div className="flex flex-col">
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">
                        SUTRISNO
                      </h4>
                      <span className="font-label-md text-label-md text-primary font-bold">
                        Sekretaris Desa (Sekdes)
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <div className="bg-primary h-8 w-0.5" />
                    <div className="bg-outline-variant h-0.5 w-4/5" />
                  </div>
                  <div className="grid w-full grid-cols-1 items-stretch gap-4 pt-2 xl:grid-cols-[minmax(0,4fr)_minmax(0,3fr)] xl:gap-6">
                    <div className="bg-surface-container-lowest/60 flex h-full flex-col gap-4 rounded-[24px] p-6">
                      <div className="flex items-center justify-between pb-2">
                        <span className="font-label-lg text-label-lg text-primary flex items-center gap-2 font-bold">
                          <Icon className="text-[20px]" name="engineering" />
                          Pelaksana Teknis (Kasi)
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Lapangan &amp; Warga
                        </span>
                      </div>
                      <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-4">
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
                    <div className="bg-surface-container-lowest/60 flex h-full flex-col gap-4 rounded-[24px] p-6">
                      <div className="flex items-center justify-between gap-2 pb-2">
                        <span className="font-label-lg text-label-lg text-primary flex items-center gap-2 font-bold whitespace-nowrap">
                          <Icon className="text-[20px]" name="assignment" />
                          Pelaksana Urusan (Kaur)
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Sekretariat
                        </span>
                      </div>
                      <div className="flex flex-wrap items-start justify-center gap-3">
                        {kaur.map(([role, name, duties]) => (
                          <div
                            className="bg-surface-container-lowest flex w-full flex-col gap-1 rounded-xl p-4 text-center shadow-sm md:w-auto md:basis-1/3"
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
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Panel Geografis &amp;{" "}
                  <span className="text-primary-container">
                    Demografi Wilayah
                  </span>
                </h2>
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
                      Letak Geografis Desa Margo Lestari terletak di antara:
                    </p>
                  </div>
                  <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-4">
                    {ethics.map(([icon, direction, place, region]) => (
                      <div
                        className="bg-surface-container-low flex h-full flex-col gap-1 rounded-xl p-4"
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
                    <span>Koordinat:  LS,  BT</span>
                    <span>Ketinggian:  mdpl</span>
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
                        1.011.5{" "}
                        <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                          Ha
                        </span>
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Pertanian 45,58%, Pemukiman 9,69%
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
                        1.587{" "}
                        <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                          Jiwa
                        </span>
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        952 Kepala Keluarga (KK)
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
                        90{" "}
                        <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                          Km
                        </span>
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Waktu tempuh ±2,5 Jam
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
                            1 Km (5 Menit)
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
                          Peta Topografi &amp; Batas Wilayah Desa Margo Lestari
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
                    Pemerintah Desa Margo Lestari membuka ruang seluas-luasnya bagi
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
