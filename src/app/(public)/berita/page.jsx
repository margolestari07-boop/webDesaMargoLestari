import Link from "next/link";
import { NewsArchive } from "@/components/news-archive";
import { NewsCard } from "@/components/news-card";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata = {
  title: "Warta & Berita Desa Sukamaju",
};

const materialIconClass = "material-symbols-outlined";

const articles = [
  {
    category: "Pembangunan",
    categoryClass: "bg-primary-container text-on-primary",
    date: "24 Okt 2025",
    readTime: "4 mnt baca",
    title:
      "Penyelesaian Pembangunan Saluran Irigasi Tersier Dusun Krajan untuk Ketahanan Pangan",
    excerpt:
      "Proyek swadaya saluran tersier sepanjang 650 meter resmi tuntas, mengairi lebih dari 45 hektar lahan persawahan warga secara merata.",
    author: "Admin Desa",
    authorIcon: "person",
    imageAlt:
      "Suasana gotong royong warga desa dan pekerja konstruksi menyelesaikan saluran irigasi beton bertingkat di tepi sawah hijau Sukamaju dengan pencahayaan pagi hari yang cerah dan estetika fotografi jurnalistik Indonesia.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrWO4O_yK-zDoMq7t5d245S0X0PURQOX6qJBTKZR7xZBpLz7h4C2A5h3Pm4MuGx7uka9HzZzmQtSDntMR_u0mKFgWGxdpz1JLDmKp50Ui9d9YcsqbTpA1g3TyziOvs6osw0d2H6YjbT3CmRCg3Z1sz-Gg0-VCZaGyktFfv_eUmSpWniqcfeFS23JYSTIGLrTcOywVJiZqA49Rjn8sZzweznuPAk0zFHc-GkiJdTw3Zy6YY-OfdhtfR",
  },
  {
    category: "Kesehatan",
    categoryClass: "bg-secondary text-on-secondary",
    date: "22 Okt 2025",
    readTime: "3 mnt baca",
    title:
      "Pelaksanaan Posyandu Balita & Pencegahan Stunting Serentak di 4 Dusun",
    excerpt:
      "Pemdes bersama Puskesmas mendistribusikan paket PMT bergizi dan vitamin bagi 180 balita serta penyuluhan gizi keluarga muda.",
    author: "Bidan & Pokja IV",
    authorIcon: "vaccines",
    imageAlt:
      "Petugas kesehatan dan kader posyandu wanita berkerudung sedang menimbang balita dan memberikan vitamin tambahan di balai serbaguna desa, penuh kehangatan dan nuansa kepedulian masyarakat desa.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADFJSlZ2hIuBIetlnKGoce5v2hm2O0CNguzT0Fdkq2TWkYWWySsdJqyRq7VbWdLFPrPCnYoFEhhs5g6I_4y-L9QVZAKgyseYJCjNJf22MtakBOkvkSG-2eOy8bTUxioYjPCSkryDS8egktcvUY7ml2HLeDCHDjTcaTK95A2Cn2totavuXsfMx6nDmDb-c4f83MWuaf0gfY2sV3T9cBE9XxfVgt2yZrAl8Vh_1GjVofthiGmXfD4BHH",
  },
  {
    category: "Pertanian",
    categoryClass:
      "bg-secondary-container text-on-secondary-container font-bold",
    date: "19 Okt 2025",
    readTime: "5 mnt baca",
    title:
      "Pelatihan Budidaya Pertanian Organik Bersama Kelompok Tani Makmur Sejahtera",
    excerpt:
      "Mengurangi ketergantungan pupuk kimia dengan pemanfaatan limbah ternak mandiri dan pestisida nabati ramah lingkungan.",
    author: "Gapoktan",
    authorIcon: "eco",
    imageAlt:
      "Kelompok tani petani desa Sukamaju berkumpul di saung persawahan memeriksa pupuk kompos organik hasil fermentasi mandiri didampingi penyuluh pertanian lapangan dalam suasana sejuk asri.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAITj9v2AN1NYw6489onDlpHm83_kPrHo30VhjsP5mhMTi_EY4CSa3Px4Mx73LdFco1tpU3GBqfYX-XlcOv5jQsIhvwU4JSj9O1UykQhk3pZgRW_oHD83Os0dBbqgflskMkmIApr3Iw7lnMzpiA6kTlQ8wzPdSDoevOtF7Y2iLEUaIY39qs92kQS4uE00YaABJUL2Vu2RbvYsOHhFVathIXFS-r5UBfJGGPV9r5-AQ7RJhocQpkPGRH",
  },
  {
    category: "Pengumuman",
    categoryClass: "bg-tertiary-container text-on-tertiary-container",
    date: "15 Okt 2025",
    readTime: "2 mnt baca",
    title:
      "Sosialisasi Pemutakhiran Data Terpadu Kesejahteraan Sosial (DTKS) Tahun 2025",
    excerpt:
      "Warga diimbau memeriksa kesesuaian data kependudukan dan status bantuan sosial tunai di kantor balai desa sebelum batas akhir.",
    author: "Kasi Kesejahteraan",
    authorIcon: "campaign",
    imageAlt:
      "Warga desa berkumpul dengan tertib di aula kantor balai desa Sukamaju memperhatikan pemaparan data kependudukan dan bantuan sosial di proyektor oleh staf aparatur desa.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbBSCG9D-etAipPTATs2YSM0VWP3ioE_aBtwzIz5Lx6OkfTZJz4BdPnMmemn0OIIs6NmVfeMTvqn25U-CD8eKI9FUYyNQ4Ebf6j-uScNCMBV9kWK30V_TqFJKduJZWpCB-Ed4AOR3rv9WURA8TsrwylLh9i9FnhuE20YwqQEDGe_aghYd3-8NyCrvK2WOPcPcELJecHQOmN6lWFac58BcZFqalu0RmQFri9wvv2avy4RtnwNLZ2i9i",
  },
  {
    category: "Kemasyarakatan",
    categoryClass: "bg-primary-fixed text-on-primary-fixed-variant font-bold",
    date: "11 Okt 2025",
    readTime: "3 mnt baca",
    title:
      "Gotong Royong Kebersihan Lingkungan Menyambut Musim Penghujan di Dusun Wonorejo",
    excerpt:
      "Aksi serentak normalisasi gorong-gorong dan pemangkasan dahan pohon rimbun untuk mengantisipasi potensi genangan air.",
    author: "Kadus Wonorejo",
    authorIcon: "diversity_3",
    imageAlt:
      "Masyarakat pedesaan bergotong royong membersihkan selokan dan jalan desa sambil tersenyum rukun di bawah naungan pohon rindang perkampungan Jawa yang bersih.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8nQ4kJsgHa1xZK5Ivb1SjCHI7QiEv85euQn3msBWQplj7mkWMiaSk4TiGrdxUwakMyf44N-0ljrxDDWEPE47H4VFobHOYIUpTc-tJ1NNnJlEwv72FPj3hcsSuVfjEzRwWaLMdmMIeaR8KI_hzA7ym30-7dyw23t4Kb7whzNnfyljkmNVfWOirtDKzUI5FPaSlrfg-PRxhcsvpq9NaByCR5Sjfd0nurKLwnkB9BuWEUeD75LzymjhK",
  },
  {
    category: "UMKM & Ekonomi",
    categoryClass: "bg-secondary-fixed text-on-secondary-fixed font-bold",
    date: "05 Okt 2025",
    readTime: "4 mnt baca",
    title:
      "BUMDes Sukamaju Makmur Buka Pelatihan Pemasaran Digital untuk Pengrajin Bambu",
    excerpt:
      "Membuka akses etalase marketplace nasional dan standarisasi kemasan produk anyaman bambu khas Dusun Sidomulyo.",
    author: "BUMDes",
    authorIcon: "storefront",
    imageAlt:
      "Pengrajin anyaman bambu desa sedang menata keranjang dan hiasan rumah estetik dibantu anak muda desa yang mengambil foto produk menggunakan ponsel pintar untuk e-commerce.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBm0hs2BBDjkX2Z2VSyRZnBuWBxiI4HHVSNt3sTk8EoslYnjIaS1WU4rq-U7qZJjKkFwBUfkU7OrFuiqd1HqOsy6Vs-nBnZ1ldGR4pKnUTLVNP6bHFPaunp0HDAPiGa1wPyE74aP__tvqCGcFAvSPA8CdkBJllWnHhS1xpoPa4hEaK8DnspDr3zxf_y6HB0iHtSP17aO5MLdr-010rci7Uv2ENQs8Y0RGc7lpvZigve-XRKNP7TMmST",
  },
  {
    category: "Pemerintahan",
    categoryClass: "bg-primary-container text-on-primary",
    date: "28 Sep 2025",
    readTime: "6 mnt baca",
    title:
      "Musyawarah Rencana Pembangunan Desa (Musrenbangdes) Penetapan RKPDes 2026",
    excerpt:
      "Forum warga menyepakati 7 program prioritas infrastruktur jalan usaha tani dan pemberdayaan generasi muda desa.",
    author: "BPD & Pemdes",
    authorIcon: "account_balance",
    imageAlt:
      "Pertemuan musyawarah desa di pendopo kantor desa dihadiri Kepala Desa, perwakilan BPD, tokoh adat, dan perempuan desa mendiskusikan rancangan rencana kerja desa dengan tertib dan demokratis.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKTjUcmhP8oW7JGxLjEZTYusr2ZJkD6ETZXGhw3SDZRvTHlAe9ktTEGl6pm2srYZjqy63hP7O93GT1A72Yrif_IMGSWyGd73bfCHm1Y-mRuVz_6GypVV3d0hZEKpYRV8nqL2wzIbqcVXfwW_W21vj4D3G1OFQ8QiEkVjgXHn6JdKSFGfeuLgX3yAzjEmPYnQMedNjkCotJucHcB52_tLYzQJuvE9ObXflCjeyWoNQnaMJenLwC1Bg_",
  },
  {
    category: "Pendidikan & Pemuda",
    categoryClass: "bg-tertiary text-on-tertiary",
    date: "20 Sep 2025",
    readTime: "3 mnt baca",
    title:
      "Karang Taruna Gelar Festival Literasi Digital dan Beasiswa Pelajar Berprestasi",
    excerpt:
      "Peningkatan kecakapan digital pemuda desa melalui pelatihan komputer dasar dan apresiasi bagi 25 siswa berprestasi.",
    author: "Karang Taruna",
    authorIcon: "school",
    imageAlt:
      "Pemuda karang taruna dan pelajar sekolah menengah desa sedang belajar bersama di ruang multimedia perpustakaan desa, tampak antusias di depan laptop dengan sertifikat apresiasi terpasang.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5UL5DNXKXgtrJiUaJAt-H4Xx2uKUHEx-zznXMO3EL1aD-z703rUGCiH65TPgRPnKUZy3i3V6GGLncRbY6aiYOHJp0cuT-r5AiMJOGyUpd9CbeN9aXdvkXmYX_Cy8k0yknvRXHyhi2gsbB4drGrMYWJboytFmBIiXFfVcXcqyfWC8KjOrHSQCG-lqC87L2J9egpS0Hz9rGF0o3yWeD48BPOBDl3UuMGOvCHHRIBU8aKEUzKCLiD55z",
  },
  {
    category: "Kebudayaan",
    categoryClass: "bg-secondary text-on-secondary",
    date: "14 Sep 2025",
    readTime: "5 mnt baca",
    title:
      "Semarak Gelar Budaya Bersih Desa dan Sedekah Bumi Sukamaju Berlangsung Khidmat",
    excerpt:
      "Tradisi tahunan ungkapan syukur panen raya dimeriahkan kirab gunungan hasil bumi dan pagelaran seni karawitan lokal.",
    author: "Lembaga Adat",
    authorIcon: "festival",
    imageAlt:
      "Pawai kirab budaya sedekah bumi desa dengan arak-arakan gunungan sayur dan buah raksasa yang diiringi gamelan karawitan oleh masyarakat berpakaian adat Jawa tradisional yang meriah dan khidmat.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEz6ll5D5lCx3rCLJeSkxD74QEo4XeC9WQlMnzJY4MQy8XMB6cEFzbjp80_sRiNmadzmB-JSg3Yrd6nxVc14-W9vkvI3G-UqfOMdoPy8F3LSD6EBMLtIVtriyAP8zWXIDk-EfDOlG9YI_dOxrPzpZQD8Zz9dlRvJWPbux7qxEaDy_uwBZd0ocEe_m7LQoMO3dt7ZBUOH8IBhJj3dhXfFHR6vZPiLYy4o7MWtAUB6NvGoDn6kw4cUo1",
  },
];

const popularNews = [
  {
    title: "Panduan Layanan Surat Keterangan Usaha (SKU) Mandiri Online",
    imageAlt:
      "Pelayanan pembuatan kartu keluarga dan surat pengantar di ruang pelayanan paten kantor desa Sukamaju oleh pegawai ramah kepada warga lansia.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBo67dRn_oDGYTd_tQYh69H4AwDbEUdtfpvlF_2HGGzPcc8We2YhhkFpC8ACiyzqSxtApQmBXpc36KHHAaT4_3jr_NhENMzOnyYGzRmK8XHgKHCNYEhnC3Ab_ROAS0Md4eV6I5xCZa7RGbrjK2gQ2a4CAHOMeoDOO0NYjtwV1EzQF2VASapi1J6RIC1_SyDTJFv3xst7PYnpmYmV8NNu3FEnvzxz6D0omwUnh0-zE0ToL1bFPYgZRxh",
    views: "1.420 dibaca",
    date: "02 Okt",
  },
  {
    title: "Hasil Panen Raya Padi Dusun Sukaresmi Naik 15% Musim Ini",
    imageAlt:
      "Panen raya padi sawah menguning di Sukamaju dengan latar perbukitan hijau dan langit biru cerah petani bersyukur bersama.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFL-bd9ZigExtu-UZcrKjMQFEhA4ewK9O2vqo_rz8wOiIvaUcoO0Od3peSsahAt4Q_uKWwlo92wIgWYMVAY2TOFB9A5OdqRRVQXgfg_kkwKmJ_rLwpk-QcMZjFhJGUfqQAv44mueT00pQAOKdwPu7dnfiYEjIQbgwSHXQdATdMoBvAZxn53TnuexMSUfeJ3KqcpZ3QSXGTnuRxns6iqzaUt3EjviSyP6T2tMt7Zbvx57dkpBmNnBcl",
    views: "980 dibaca",
    date: "26 Sep",
  },
  {
    title: "Laporan Realisasi Transparansi APBDes Triwulan III Sukamaju",
    imageAlt:
      "Papan baliho infografis transparansi realisasi APBDes terpasang jelas di depan kantor balai desa dibaca warga desa yang melintas.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSKWD8YnlSfvlxZ6Y_4lIJfcOJ4WUoTeklJOB3RXfMJwRCNJ0jv-nyyju5Hfs-6B7enLKq6jqUatllfAzezzLWzUJuQ2m_E1bHxqSHf_rytOB3ByHPEV89whDFEdf-AHCRtGbpYMA1TIXby0iudMMP9xZVCMtiUnzO2mgChIl2iA0biHNOUYTwm6Qge_G_cWbknlWOR2Iss75B1adGZOS5xgzGt3q3AxcI-NpopS_1SttLo7KgFTjk",
    views: "845 dibaca",
    date: "18 Sep",
  },
  {
    title: "Juara 1 Lomba Kebun Gizi Pekarangan Tingkat Kecamatan",
    imageAlt:
      "Anak-anak dan ibu kader PKK sedang menyiram bibit tanaman sayur di kebun gizi pekarangan rumah desa Sukamaju.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLIqi0B2Ikd1f4JRIUgql2VSk_HM3wx-mVrTamYVmu_E9ueTBKZoYHsrBZ-0an8SnBAwZTP_08U3O3a90_sZarOBGylNCUiZRNS-dN1Bneh2sTndE3V2kmstF5ZkFp0nznJVz7ImqF1EMKCyDyV-vSWwqgcKY0JPn8_xnjuwIPL-i_aclVGdIFNmJIOdSdPXPZlnh15RKkHX2-zBo1Yqwi_YjCLPxJPYYvM169rQ_3FufbiKD6WB2l",
    views: "720 dibaca",
    date: "10 Sep",
  },
];

export default function BeritaPage() {
  return (
    <main className="bg-surface min-h-[calc(100vh-80px)] w-full pt-20">
      <div className="flex w-full flex-col">
        <section className="from-surface-container-low via-surface to-surface w-full bg-gradient-to-b pb-10">
          <div className="px-gutter mx-auto max-w-7xl pt-8">
            <nav
              aria-label="Breadcrumb"
              className="font-label-md text-label-md text-on-surface-variant mb-6 flex items-center gap-2"
            >
              <Link
                className="hover:text-primary flex items-center gap-1.5 transition-colors"
                href="/"
              >
                <span className={`${materialIconClass} text-[18px]`}>home</span>
                <span>Beranda</span>
              </Link>
              <span
                className={`${materialIconClass} text-outline-variant text-[14px]`}
              >
                chevron_right
              </span>
              <span className="text-primary font-semibold">
                Berita &amp; Pengumuman
              </span>
            </nav>
            <div className="flex max-w-3xl flex-col gap-3">

              <h1 className="font-display text-display text-on-surface leading-tight tracking-tight">
                Warta &amp; Berita{" "}
                <span className="text-primary-container">Desa Sukamaju</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-1 leading-relaxed">
                Informasi aktual seputar pembangunan desa, kegiatan
                kemasyarakatan, inovasi pertanian, pelayanan publik, dan
                transparansi pemerintahan Desa Sukamaju.
              </p>
            </div>
            <div className="bg-surface-container-lowest mt-8 flex flex-col gap-4 rounded-2xl p-3 shadow-md">
              <div className="relative flex w-full items-center">
                <span
                  className={`${materialIconClass} text-primary pointer-events-none absolute left-4 text-[22px]`}
                >
                  search
                </span>
                <input
                  className="font-body-md text-body-md text-on-surface placeholder:text-outline bg-surface-container-low focus:bg-surface-container-lowest w-full rounded-xl py-3.5 pr-28 pl-12 shadow-inner transition-all focus:outline-none"
                  placeholder="Cari judul berita, agenda, atau kata kunci..."
                  type="text"
                />
                <button className="font-label-md text-label-md bg-primary-container text-on-primary hover:bg-primary absolute right-2 rounded-lg px-5 py-2.5 shadow-sm transition-colors">
                  Cari
                </button>
              </div>
              <div className="flex scrollbar-none items-center gap-2 overflow-x-auto pb-1.5 text-nowrap">
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 px-2">
                  <span className={`${materialIconClass} text-[16px]`}>
                    tune
                  </span>
                  Kategori:
                </span>
                <button className="font-label-sm text-label-sm bg-primary-container text-on-primary rounded-full px-4 py-1.5 shadow-sm transition-all hover:opacity-95">
                  Semua Kategori
                </button>
                <button className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded-full px-4 py-1.5 transition-colors">
                  Pembangunan
                </button>
                <button className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded-full px-4 py-1.5 transition-colors">
                  Kegiatan Warga
                </button>
                <button className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded-full px-4 py-1.5 transition-colors">
                  Pertanian &amp; UMKM
                </button>
                <button className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded-full px-4 py-1.5 transition-colors">
                  Pengumuman
                </button>
                <button className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded-full px-4 py-1.5 transition-colors">
                  Kesehatan / Posyandu
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface w-full pb-20">
          <div className="px-gutter mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-8">
              <div className="bg-surface-container-low flex flex-col justify-between gap-3 rounded-2xl px-5 py-3 sm:flex-row sm:items-center">
                <div className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                  <span className="bg-primary-container h-2 w-2 rounded-full" />
                  <span>
                    Menampilkan <strong className="text-on-surface">1–9</strong>{" "}
                    dari <strong className="text-on-surface">48</strong> Berita
                    Terbit
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <label
                    className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap"
                    htmlFor="sortNews"
                  >
                    Urutkan:
                  </label>
                  <div className="relative">
                    <select
                      className="font-label-sm text-label-sm text-on-surface bg-surface-container-lowest cursor-pointer appearance-none rounded-lg py-1.5 pr-8 pl-3 shadow-sm focus:outline-none"
                      defaultValue="Terbaru (Default)"
                      id="sortNews"
                    >
                      <option>Terbaru (Default)</option>
                      <option>Terpopuler</option>
                      <option>Terlama</option>
                    </select>
                    <span
                      className={`${materialIconClass} text-on-surface-variant pointer-events-none absolute top-1.5 right-2 text-[18px]`}
                    >
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {articles.map((article) => (
                  <NewsCard article={article} key={article.title} />
                ))}
              </div>
              <div className="bg-surface-container-lowest mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl p-5 shadow-sm sm:flex-row">
                <p className="font-body-sm text-body-sm text-on-surface-variant text-center sm:text-left">
                  Halaman <span className="text-on-surface font-bold">1</span>{" "}
                  dari <span className="text-on-surface font-bold">12</span>{" "}
                  halaman{" "}
                  <span className="text-outline-variant font-normal">
                    | Total 108 artikel berita terarsip
                  </span>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <button
                    aria-label="Halaman Sebelumnya"
                    className="font-label-sm text-label-sm bg-surface-container text-outline flex cursor-not-allowed items-center gap-1 rounded-xl px-3 py-2 opacity-60"
                    disabled
                  >
                    <span className={`${materialIconClass} text-[18px]`}>
                      chevron_left
                    </span>
                    <span className="hidden md:inline">Sebelumnya</span>
                  </button>
                  <button
                    aria-current="page"
                    className="font-label-md text-label-md bg-primary-container text-on-primary h-10 w-10 rounded-xl font-bold shadow-md"
                  >
                    1
                  </button>
                  <button className="font-label-md text-label-md bg-surface-container text-on-surface hover:bg-surface-variant h-10 w-10 rounded-xl transition-colors">
                    2
                  </button>
                  <button className="font-label-md text-label-md bg-surface-container text-on-surface hover:bg-surface-variant h-10 w-10 rounded-xl transition-colors">
                    3
                  </button>
                  <button className="font-label-md text-label-md bg-surface-container text-on-surface hover:bg-surface-variant hidden h-10 w-10 items-center justify-center rounded-xl transition-colors sm:inline-flex">
                    4
                  </button>
                  <button className="font-label-md text-label-md bg-surface-container text-on-surface hover:bg-surface-variant hidden h-10 w-10 items-center justify-center rounded-xl transition-colors md:inline-flex">
                    5
                  </button>
                  <span className="text-on-surface-variant px-1 font-bold">
                    ...
                  </span>
                  <button className="font-label-md text-label-md bg-surface-container text-on-surface hover:bg-surface-variant h-10 w-10 rounded-xl transition-colors">
                    12
                  </button>
                  <button
                    aria-label="Halaman Berikutnya"
                    className="font-label-sm text-label-sm bg-surface-container text-on-surface hover:bg-primary-container hover:text-on-primary flex items-center gap-1 rounded-xl px-3 py-2 shadow-sm transition-colors"
                  >
                    <span className="hidden md:inline">Berikutnya</span>
                    <span className={`${materialIconClass} text-[18px]`}>
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <aside className="flex w-full flex-col gap-6 lg:col-span-4">
              <NewsArchive />
              <div className="bg-surface-container-lowest flex flex-col gap-4 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2.5 pb-2">
                  <span className="bg-secondary-container text-on-secondary-container flex h-8 w-8 items-center justify-center rounded-full">
                    <span className={`${materialIconClass} text-[18px]`}>
                      trending_up
                    </span>
                  </span>
                  <div className="flex flex-col">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Berita Populer
                    </h2>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Paling banyak dibaca warga
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3.5">
                  {popularNews.map((article) => (
                    <div
                      className="group hover:bg-surface-container-low flex items-center gap-3 rounded-2xl p-2 transition-colors"
                      key={article.title}
                    >
                      <div className="bg-surface-container h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <img
                          alt={article.imageAlt}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src={article.image}
                        />
                      </div>
                      <div className="flex min-w-0 flex-col gap-1">
                        <h4 className="font-label-md text-label-md text-on-surface group-hover:text-primary-container line-clamp-2 font-bold transition-colors">
                          {article.title}
                        </h4>
                        <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                          <span>{article.views}</span>
                          <span>•</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="from-primary-container to-primary text-on-primary relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-gradient-to-br p-6 shadow-lg">
                <div className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-white/10" />
                <div className="flex items-center gap-3">
                  <span className="text-on-primary flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                    <span className={`${materialIconClass} text-[24px]`}>
                      mark_email_unread
                    </span>
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                      Warta Mingguan
                    </h3>
                    <span className="font-label-sm text-label-sm text-secondary-fixed">
                      Langsung ke ponsel warga
                    </span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-primary/90 leading-relaxed">
                  Dapatkan intisari keputusan musyawarah, jadwal pelayanan
                  keliling posyandu, dan agenda kerja bakti rutin setiap Jumat
                  pagi.
                </p>
                <NewsletterForm />
                <span className="font-label-sm text-label-sm text-on-primary/75 text-center">
                  Layanan gratis &amp; bebas spam dari Humas Desa Sukamaju
                </span>
              </div>

              <div className="bg-surface-container-low flex flex-col gap-3.5 rounded-3xl p-6">
                <div className="flex items-center gap-2.5">
                  <span className="bg-surface-container-highest text-primary flex h-8 w-8 items-center justify-center rounded-full">
                    <span className={`${materialIconClass} text-[20px]`}>
                      feed
                    </span>
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Kanal Redaksi Warga
                  </h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Punya agenda kemasyarakatan RT/RW, dokumentasi kegiatan dusun,
                  atau rilis prestasi warga yang ingin diliput di Warta Desa?
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <a
                    className="font-label-md text-label-md text-on-surface bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary flex items-center gap-2.5 rounded-xl p-3 shadow-sm transition-colors"
                    href="mailto:redaksi@desasukamaju.id"
                  >
                    <span
                      className={`${materialIconClass} text-primary text-[20px]`}
                    >
                      alternate_email
                    </span>
                    <span className="truncate">redaksi@desasukamaju.id</span>
                  </a>
                  <a
                    className="font-label-md text-label-md text-on-surface bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary flex items-center gap-2.5 rounded-xl p-3 shadow-sm transition-colors"
                    href="https://wa.me/6281234567890"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span
                      className={`${materialIconClass} text-secondary text-[20px]`}
                    >
                      chat
                    </span>
                    <span>WhatsApp Humas: 0812-3456-7890</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
