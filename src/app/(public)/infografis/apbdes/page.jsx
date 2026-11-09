import Link from "next/link";
import {
  ExpenseAllocationCard,
  RevenueSourceCard,
} from "@/components/apbdes-cards";

export const metadata = {
  title: "Infografis APBDes Desa Sukamaju",
};

const materialIconClass = "material-symbols-outlined";

const expenseAllocations = [
  {
    icon: "account_balance",
    iconContainerClass:
      "bg-surface-container-low text-primary group-hover:bg-primary-fixed flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
    badge: "Bidang 01",
    badgeClass: "bg-surface-container text-on-surface-variant font-semibold",
    title: "Penyelenggaraan Pemerintahan Desa",
    description: "Siltap, tunjangan aparatur, operasional kantor BPD & RT/RW.",
    amount: "Rp 642.500.000",
    amountColor: "text-primary",
    percent: "32,4%",
    barColor: "bg-primary",
    barWidth: "32.4%",
    budget: "Pagu: Rp 670.000.000",
    achievement: "95,8% Tercapai",
  },
  {
    icon: "engineering",
    iconContainerClass:
      "bg-surface-container-low text-secondary group-hover:bg-secondary-fixed flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
    badge: "Porsi Terbesar",
    badgeClass: "bg-secondary-fixed text-on-secondary-fixed font-bold",
    title: "Pelaksanaan Pembangunan Desa",
    description:
      "Irigasi tersier 1.200m, rabat beton jalan tani RW 03, sanitasi jamban sehat.",
    amount: "Rp 815.200.000",
    amountColor: "text-secondary",
    percent: "41,1%",
    barColor: "bg-secondary",
    barWidth: "41.1%",
    budget: "Pagu: Rp 880.000.000",
    achievement: "92,6% Tercapai",
  },
  {
    icon: "groups",
    iconContainerClass:
      "bg-surface-container-low text-primary group-hover:bg-primary-fixed flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
    badge: "Bidang 03",
    badgeClass: "bg-surface-container text-on-surface-variant font-semibold",
    title: "Pembinaan Kemasyarakatan",
    description:
      "Festival seni budaya desa, sarana karang taruna & posyandu terpadu.",
    amount: "Rp 186.000.000",
    amountColor: "text-primary",
    percent: "9,4%",
    barColor: "bg-primary",
    barWidth: "9.4%",
    budget: "Pagu: Rp 195.000.000",
    achievement: "95,3% Tercapai",
  },
  {
    icon: "storefront",
    iconContainerClass:
      "bg-surface-container-low text-secondary group-hover:bg-secondary-fixed flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
    badge: "Bidang 04",
    badgeClass: "bg-surface-container text-on-surface-variant font-semibold",
    title: "Pemberdayaan Masyarakat",
    description:
      "Pelatihan bibit unggul jagung, ketahanan pangan, dan permodalan UMKM.",
    amount: "Rp 264.700.000",
    amountColor: "text-secondary",
    percent: "13,3%",
    barColor: "bg-secondary",
    barWidth: "13.3%",
    budget: "Pagu: Rp 285.000.000",
    achievement: "92,8% Tercapai",
  },
  {
    icon: "health_and_safety",
    iconContainerClass:
      "bg-surface-container-low text-primary group-hover:bg-primary-fixed flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
    badge: "Bidang 05",
    badgeClass: "bg-surface-container text-on-surface-variant font-semibold",
    title: "Penanggulangan Bencana & Mendesak",
    description:
      "BLT Dana Desa (KPM miskin ekstrem), tanggap kemarau & pompa air.",
    amount: "Rp 77.000.000",
    amountColor: "text-primary",
    percent: "3,8%",
    barColor: "bg-primary",
    barWidth: "3.8%",
    budget: "Pagu: Rp 94.850.000",
    achievement: "81,1% Tercapai",
  },
];

const revenueSources = [
  {
    accent: "bg-primary",
    title: "Dana Desa (APBN Pusat)",
    percent: "48%",
    percentColor: "text-primary",
    amount: "Rp 1.046.520.000",
    description:
      "Alokasi afirmasi & kinerja untuk pembangunan infrastruktur desa.",
  },
  {
    accent: "bg-primary-container",
    title: "Alokasi Dana Desa (ADD)",
    percent: "34%",
    percentColor: "text-primary-container",
    amount: "Rp 741.285.000",
    description:
      "Transfer APBD Kabupaten untuk penghasilan tetap dan kantor desa.",
  },
  {
    accent: "bg-secondary-fixed-dim",
    title: "Pendapatan Asli Desa (PADes)",
    percent: "12%",
    percentColor: "text-secondary",
    amount: "Rp 261.630.000",
    description:
      "Hasil sewa aset tanah kas desa, pasar desa, & bagi laba BUMDes.",
  },
  {
    accent: "bg-secondary-fixed",
    title: "Bagi Hasil Pajak & Retribusi",
    percent: "6%",
    percentColor: "text-secondary",
    amount: "Rp 130.815.000",
    description: "Penerimaan bagi hasil PBB-P2 dan retribusi daerah kabupaten.",
  },
];

function HistoricalChart() {
  return (
    <svg
      aria-label="Grafik pendapatan dan belanja APBDes tahun 2020 sampai 2024"
      className="h-72 w-full"
      fill="none"
      role="img"
      viewBox="0 0 760 260"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        stroke="#dee3e5"
        strokeDasharray="4 4"
        strokeWidth="1"
        x1="50"
        x2="740"
        y1="30"
        y2="30"
      />
      <text
        fill="#707881"
        fontFamily="Plus Jakarta Sans"
        fontSize="11"
        textAnchor="end"
        x="40"
        y="34"
      >
        2.4M
      </text>
      <line
        stroke="#dee3e5"
        strokeDasharray="4 4"
        strokeWidth="1"
        x1="50"
        x2="740"
        y1="80"
        y2="80"
      />
      <text
        fill="#707881"
        fontFamily="Plus Jakarta Sans"
        fontSize="11"
        textAnchor="end"
        x="40"
        y="84"
      >
        2.0M
      </text>
      <line
        stroke="#dee3e5"
        strokeDasharray="4 4"
        strokeWidth="1"
        x1="50"
        x2="740"
        y1="130"
        y2="130"
      />
      <text
        fill="#707881"
        fontFamily="Plus Jakarta Sans"
        fontSize="11"
        textAnchor="end"
        x="40"
        y="134"
      >
        1.6M
      </text>
      <line
        stroke="#dee3e5"
        strokeDasharray="4 4"
        strokeWidth="1"
        x1="50"
        x2="740"
        y1="180"
        y2="180"
      />
      <text
        fill="#707881"
        fontFamily="Plus Jakarta Sans"
        fontSize="11"
        textAnchor="end"
        x="40"
        y="184"
      >
        1.2M
      </text>
      <line
        stroke="#bfc7d1"
        strokeWidth="1.5"
        x1="50"
        x2="740"
        y1="220"
        y2="220"
      />
      <g className="transition-transform hover:opacity-90">
        <rect fill="#005d90" height="101" rx="6" width="34" x="95" y="119" />
        <rect fill="#4cd6fb" height="98" rx="6" width="34" x="135" y="122" />
        <text
          fill="#171c1e"
          fontFamily="Plus Jakarta Sans"
          fontSize="13"
          fontWeight="700"
          textAnchor="middle"
          x="132"
          y="240"
        >
          2020
        </text>
        <text
          fill="#005d90"
          fontFamily="Plus Jakarta Sans"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="112"
          y="112"
        >
          1.62M
        </text>
        <text
          fill="#00677d"
          fontFamily="Plus Jakarta Sans"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="152"
          y="115"
        >
          1.58M
        </text>
      </g>
      <g className="transition-transform hover:opacity-90">
        <rect fill="#005d90" height="111" rx="6" width="34" x="230" y="109" />
        <rect fill="#4cd6fb" height="108" rx="6" width="34" x="270" y="112" />
        <text
          fill="#171c1e"
          fontFamily="Plus Jakarta Sans"
          fontSize="13"
          fontWeight="700"
          textAnchor="middle"
          x="267"
          y="240"
        >
          2021
        </text>
        <text
          fill="#005d90"
          fontFamily="Plus Jakarta Sans"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="247"
          y="102"
        >
          1.78M
        </text>
        <text
          fill="#00677d"
          fontFamily="Plus Jakarta Sans"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="287"
          y="105"
        >
          1.74M
        </text>
      </g>
      <g className="transition-transform hover:opacity-90">
        <rect fill="#005d90" height="121" rx="6" width="34" x="365" y="99" />
        <rect fill="#4cd6fb" height="118" rx="6" width="34" x="405" y="102" />
        <text
          fill="#171c1e"
          fontFamily="Plus Jakarta Sans"
          fontSize="13"
          fontWeight="700"
          textAnchor="middle"
          x="402"
          y="240"
        >
          2022
        </text>
        <text
          fill="#005d90"
          fontFamily="Plus Jakarta Sans"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="382"
          y="92"
        >
          1.94M
        </text>
        <text
          fill="#00677d"
          fontFamily="Plus Jakarta Sans"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="422"
          y="95"
        >
          1.89M
        </text>
      </g>
      <g className="transition-transform hover:opacity-90">
        <rect fill="#005d90" height="130" rx="6" width="34" x="500" y="90" />
        <rect fill="#4cd6fb" height="127" rx="6" width="34" x="540" y="93" />
        <text
          fill="#171c1e"
          fontFamily="Plus Jakarta Sans"
          fontSize="13"
          fontWeight="700"
          textAnchor="middle"
          x="537"
          y="240"
        >
          2023
        </text>
        <text
          fill="#005d90"
          fontFamily="Plus Jakarta Sans"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="517"
          y="83"
        >
          2.08M
        </text>
        <text
          fill="#00677d"
          fontFamily="Plus Jakarta Sans"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="557"
          y="86"
        >
          2.03M
        </text>
      </g>
      <g className="transition-transform hover:opacity-90">
        <rect fill="#005d90" height="136" rx="6" width="34" x="635" y="84" />
        <rect fill="#4cd6fb" height="124" rx="6" width="34" x="675" y="96" />
        <text
          fill="#005d90"
          fontFamily="Plus Jakarta Sans"
          fontSize="13"
          fontWeight="800"
          textAnchor="middle"
          x="672"
          y="240"
        >
          2024 (Aktif)
        </text>
        <text
          fill="#005d90"
          fontFamily="Plus Jakarta Sans"
          fontSize="10"
          fontWeight="800"
          textAnchor="middle"
          x="652"
          y="77"
        >
          2.18M
        </text>
        <text
          fill="#00677d"
          fontFamily="Plus Jakarta Sans"
          fontSize="10"
          fontWeight="800"
          textAnchor="middle"
          x="692"
          y="89"
        >
          1.98M
        </text>
      </g>
    </svg>
  );
}

export default function ApbdesPage() {
  return (
    <main className="bg-surface font-body-md text-on-surface min-h-[calc(100vh-80px)] w-full pt-20 antialiased">
      <div className="flex w-full flex-col">
        <div className="relative w-full overflow-hidden pb-16">
          <div className="from-primary-fixed/40 via-surface-container-low/60 pointer-events-none absolute top-0 left-1/2 -z-10 h-[380px] w-[1200px] -translate-x-1/2 bg-gradient-to-b to-transparent blur-3xl" />
          <div className="px-gutter gap-space-xl mx-auto flex max-w-7xl flex-col">
            <section className="flex flex-col gap-6 pt-6">
              <nav className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                <Link
                  className="hover:text-primary flex items-center gap-1 transition-colors"
                  href="/"
                >
                  <span className={`${materialIconClass} text-[16px]`}>
                    home
                  </span>
                  Beranda
                </Link>
                <span className="text-outline-variant">/</span>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/infografis"
                >
                  Infografis
                </Link>
                <span className="text-outline-variant">/</span>
                <span className="text-primary font-bold">
                  Transparansi APBDes
                </span>
              </nav>

              <div className="flex flex-col justify-between gap-6 pb-2 lg:flex-row lg:items-end">
                <div className="flex max-w-3xl flex-col gap-3">
                  <div className="font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed inline-flex items-center gap-2 self-start rounded-full px-3 py-1 shadow-sm">
                    <span
                      className={`${materialIconClass} text-secondary text-[16px]`}
                    >
                      verified
                    </span>
                    <span>
                      Keterbukaan Informasi Publik • UU Desa No. 6/2014
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Infografis APBDes Desa Sukamaju
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Keterbukaan informasi publik pengelolaan keuangan Desa
                    Sukamaju yang akuntabel, transparan, dan berkeadilan bagi
                    seluruh warga.
                  </p>
                </div>
                <div className="bg-surface-container-lowest flex items-center gap-4 self-start rounded-2xl p-4 shadow-sm lg:self-end">
                  <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <span className={`${materialIconClass} text-[24px]`}>
                      account_balance
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Status APBDes
                    </span>
                    <span className="font-label-lg text-label-lg text-primary font-bold">
                      TA 2024 (Realisasi Berjalan)
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      Audit Terakhir: 15 Okt 2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest flex flex-col items-stretch justify-between gap-4 rounded-2xl p-4 shadow-sm md:flex-row md:items-center md:p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-surface-container-low flex items-center gap-2 rounded-full px-4 py-2.5">
                    <span
                      className={`${materialIconClass} text-secondary text-[20px]`}
                    >
                      calendar_today
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Tahun:
                    </span>
                    <select
                      className="font-label-md text-label-md text-on-surface cursor-pointer bg-transparent pr-1 font-bold focus:outline-none"
                      defaultValue="2024"
                      id="fiscal-year-select"
                    >
                      <option value="2024">2024 (Aktif)</option>
                      <option value="2023">2023 (Laporan Selesai)</option>
                      <option value="2022">2022 (Laporan Selesai)</option>
                      <option value="2021">2021 (Laporan Selesai)</option>
                    </select>
                  </div>
                  <div className="bg-surface-container-low flex items-center gap-2 rounded-full px-4 py-2.5">
                    <span
                      className={`${materialIconClass} text-secondary text-[20px]`}
                    >
                      timelapse
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Tahapan:
                    </span>
                    <select
                      className="font-label-md text-label-md text-on-surface cursor-pointer bg-transparent pr-1 font-bold focus:outline-none"
                      defaultValue="Semester II (Realisasi Berjalan)"
                    >
                      <option>Semester II (Realisasi Berjalan)</option>
                      <option>Semester I (Final)</option>
                      <option>Rencana Penetapan Awal</option>
                    </select>
                  </div>
                  <span className="bg-surface-variant mx-1 hidden h-6 w-px xl:inline-block" />
                  <div className="font-label-sm text-label-sm text-on-surface-variant hidden items-center gap-1.5 xl:flex">
                    <span className="bg-secondary-fixed-dim h-2 w-2 animate-pulse rounded-full" />
                    Sinkronisasi SISKEUDES Online
                  </div>
                </div>
                <button
                  className="font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full px-6 py-3 shadow-md transition-all hover:shadow-lg active:scale-95"
                  type="button"
                >
                  <span className={`${materialIconClass} text-[20px]`}>
                    download
                  </span>
                  <span>Unduh Dokumen APBDes Resmi (PDF)</span>
                </button>
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase">
                    Ikhtisar Pelaksanaan
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Ringkasan Realisasi APBDes Tahun 2024
                  </h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Update data buku kas umum per 30 November 2024
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-surface-container-lowest relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl p-6 shadow-sm md:p-8">
                  <div className="bg-primary/5 pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary-fixed text-primary flex h-10 w-10 items-center justify-center rounded-2xl">
                        <span className={`${materialIconClass} text-[22px]`}>
                          payments
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          Operasional Desa
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Pendapatan Desa vs Belanja Desa
                        </p>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed rounded-full px-3 py-1 font-bold">
                      Surplus Berjalan
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="bg-surface-container-low flex flex-col gap-2 rounded-2xl p-4">
                      <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-between">
                        <span>Total Pendapatan</span>
                        <span className="text-primary font-bold">101,0%</span>
                      </div>
                      <div className="font-headline-sm text-headline-sm text-primary font-bold">
                        Rp 2.180.250.000
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">
                        Target: Rp 2.158.400.000
                      </div>
                      <div className="bg-surface-variant mt-1 h-2 w-full overflow-hidden rounded-full">
                        <div className="bg-primary h-full w-full rounded-full" />
                      </div>
                    </div>
                    <div className="bg-surface-container-low flex flex-col gap-2 rounded-2xl p-4">
                      <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-between">
                        <span>Total Belanja</span>
                        <span className="text-secondary font-bold">93,4%</span>
                      </div>
                      <div className="font-headline-sm text-headline-sm text-secondary font-bold">
                        Rp 1.985.400.000
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">
                        Pagu: Rp 2.124.850.000
                      </div>
                      <div className="bg-surface-variant mt-1 h-2 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-secondary h-full rounded-full"
                          style={{ width: "93.4%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container flex items-center justify-between gap-4 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`${materialIconClass} text-secondary text-[24px]`}
                      >
                        trending_up
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Surplus Anggaran Riil
                        </span>
                        <span className="font-label-md text-label-md text-on-surface">
                          Selisih Pendapatan di atas Realisasi Belanja
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-sm text-headline-sm text-secondary font-bold">
                        +Rp 194.850.000
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl p-6 shadow-sm md:p-8">
                  <div className="bg-secondary-fixed/30 pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary-fixed text-secondary flex h-10 w-10 items-center justify-center rounded-2xl">
                        <span className={`${materialIconClass} text-[22px]`}>
                          account_balance_wallet
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          Pembiayaan Desa
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Penerimaan &amp; Pengeluaran Pembiayaan
                        </p>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant rounded-full px-3 py-1 font-semibold">
                      Siklus Modal
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="bg-surface-container-low flex flex-col gap-2 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-on-surface">
                          Penerimaan Pembiayaan (SiLPA TA 2023)
                        </span>
                        <span className="font-label-sm text-label-sm text-primary font-bold">
                          100% Terealisasi
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          Rp 45.000.000
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Anggaran: Rp 45.000.000
                        </span>
                      </div>
                      <div className="bg-surface-variant h-1.5 w-full overflow-hidden rounded-full">
                        <div className="bg-primary-container h-full w-full rounded-full" />
                      </div>
                    </div>
                    <div className="bg-surface-container-low flex flex-col gap-2 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-on-surface">
                          Pengeluaran (Penyertaan Modal BUMDes)
                        </span>
                        <span className="font-label-sm text-label-sm text-secondary font-bold">
                          100% Tersalurkan
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          Rp 11.450.000
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Alokasi: Rp 11.450.000
                        </span>
                      </div>
                      <div className="bg-surface-variant h-1.5 w-full overflow-hidden rounded-full">
                        <div className="bg-secondary-fixed-dim h-full w-full rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-surface-container flex flex-col rounded-2xl p-3.5">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Pembiayaan Netto
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface font-bold">
                        Rp 33.550.000
                      </span>
                    </div>
                    <div className="bg-primary-fixed/40 flex flex-col rounded-2xl p-3.5">
                      <span className="font-label-sm text-label-sm text-on-primary-fixed-variant font-medium">
                        Estimasi SiLPA Akhir TA
                      </span>
                      <span className="font-label-lg text-label-lg text-primary font-bold">
                        Rp 228.400.000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest flex flex-col gap-6 rounded-3xl p-6 shadow-sm md:p-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary mb-1 inline-flex items-center gap-1.5 font-bold">
                    <span className={`${materialIconClass} text-[16px]`}>
                      monitoring
                    </span>
                    HISTORI 5 TAHUN
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Tren Perkembangan APBDes dari Tahun ke Tahun (2020 – 2024)
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Grafik komparasi alokasi pendapatan dan belanja desa selama
                    5 tahun anggaran terakhir.
                  </p>
                </div>
                <div className="bg-surface-container-low flex items-center gap-4 self-start rounded-full px-4 py-2 md:self-auto">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary inline-block h-3.5 w-3.5 rounded-full" />
                    <span className="font-label-sm text-label-sm text-on-surface">
                      Pendapatan
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-secondary-fixed-dim inline-block h-3.5 w-3.5 rounded-full" />
                    <span className="font-label-sm text-label-sm text-on-surface">
                      Belanja
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low/50 w-full overflow-x-auto rounded-2xl p-4 md:p-6">
                <div className="flex min-w-[640px] flex-col gap-2">
                  <HistoricalChart />
                </div>
              </div>
              <div className="bg-primary-fixed/30 flex flex-col items-start gap-4 rounded-2xl p-4 sm:flex-row sm:items-center md:p-5">
                <div className="bg-primary text-on-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <span className={`${materialIconClass} text-[20px]`}>
                    insights
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-primary-fixed font-bold">
                    Catatan Analisis Perkembangan Fiskal
                  </span>
                  <p className="font-body-sm text-body-sm text-on-primary-fixed-variant leading-relaxed">
                    Pertumbuhan rata-rata APBDes Desa Sukamaju mencatatkan
                    kenaikan{" "}
                    <strong className="text-primary font-bold">
                      +7,8% per tahun
                    </strong>{" "}
                    selama periode 2020–2024. Peningkatan ini didorong oleh
                    kenaikan transfer Dana Desa pusat serta lonjakan kontribusi
                    dividen Pendapatan Asli Desa (PADes) dari unit usaha BUMDes
                    Sukamaju Makmur.
                  </p>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase">
                    Alokasi Anggaran Belanja
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    5 Bidang Penyerapan Belanja Desa
                  </h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Total Realisasi Belanja: <strong>Rp 1.985.400.000</strong>{" "}
                  (93,4% dari Pagu)
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {expenseAllocations.map((item) => (
                  <ExpenseAllocationCard item={item} key={item.title} />
                ))}
                <div className="from-primary to-primary-container text-on-primary flex flex-col justify-between gap-4 rounded-3xl bg-gradient-to-br p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary-fixed tracking-wider uppercase">
                      Tata Kelola Dana Desa
                    </span>
                    <span
                      className={`${materialIconClass} text-secondary-fixed-dim text-[24px]`}
                    >
                      verified_user
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-headline-sm text-headline-sm font-bold">
                      100% Bebas Korupsi &amp; Pungutan
                    </span>
                    <p className="font-body-sm text-body-sm text-primary-fixed leading-relaxed">
                      Setiap item kegiatan dilaporkan secara terbuka di papan
                      proyek fisik desa dan diawasi langsung oleh Badan
                      Permusyawaratan Desa (BPD).
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      className="font-label-md text-label-md text-secondary-fixed inline-flex items-center gap-2 transition-colors hover:text-white"
                      href="#laporan-warga"
                    >
                      <span>Pelajari Mekanisme Pengawasan</span>
                      <span className={`${materialIconClass} text-[16px]`}>
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest flex flex-col gap-8 rounded-3xl p-6 shadow-sm md:p-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase">
                    Struktur Penerimaan Fiskal
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Sumber Pendapatan Desa (TA 2024)
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Total pendapatan terealisasi mencapai Rp 2.180.250.000 dari
                    beragam pos resmi.
                  </p>
                </div>
                <span className="font-label-sm text-label-sm bg-surface-container-low text-on-surface-variant self-start rounded-full px-4 py-2 font-bold md:self-auto">
                  Target 101,0% Tercapai
                </span>
              </div>
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="flex flex-col items-center justify-center p-4 lg:col-span-5">
                  <div className="relative flex h-64 w-64 items-center justify-center">
                    <svg
                      aria-label="Diagram donat proporsi sumber pendapatan"
                      className="h-full w-full -rotate-90"
                      role="img"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="38"
                        stroke="#eff4f6"
                        strokeWidth="12"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="38"
                        stroke="#005d90"
                        strokeDasharray="114.6 238.76"
                        strokeDashoffset="0"
                        strokeWidth="12"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="38"
                        stroke="#0077b6"
                        strokeDasharray="81.18 238.76"
                        strokeDashoffset="-114.6"
                        strokeWidth="12"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="38"
                        stroke="#4cd6fb"
                        strokeDasharray="28.65 238.76"
                        strokeDashoffset="-195.78"
                        strokeWidth="12"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        fill="transparent"
                        r="38"
                        stroke="#b3ebff"
                        strokeDasharray="14.32 238.76"
                        strokeDashoffset="-224.43"
                        strokeWidth="12"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Realisasi
                      </span>
                      <span className="font-headline-md text-headline-md text-on-surface font-extrabold">
                        2.18 M
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">
                        100% Akuntabel
                      </span>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-outline mt-3 text-center">
                    Visualisasi proporsi perolehan kas transfer dan kas mandiri
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                  {revenueSources.map((item) => (
                    <RevenueSourceCard item={item} key={item.title} />
                  ))}
                </div>
              </div>
            </section>

            <section
              className="bg-surface-container-lowest flex flex-col items-center justify-between gap-8 rounded-3xl p-6 shadow-sm md:p-10 lg:flex-row"
              id="laporan-warga"
            >
              <div className="flex max-w-2xl flex-col gap-4">
                <div className="font-label-sm text-label-sm text-error bg-error-container/40 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 font-bold">
                  <span
                    className={`${materialIconClass} text-error text-[16px]`}
                  >
                    gavel
                  </span>
                  <span>Kanal Partisipasi &amp; Pengawasan Warga</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Warga Berhak Mengawasi Setiap Rupiah Anggaran Desa
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Apakah Anda menemukan ketidaksesuaian antara infografis ini
                  dengan realisasi proyek di lapangan? Sampaikan aspirasi atau
                  laporan tertutup Anda secara aman kepada{" "}
                  <strong>Tim Aspirasi Badan Permusyawaratan Desa (BPD)</strong>{" "}
                  demi integritas Desa Sukamaju.
                </p>
                <div className="font-label-md text-label-md text-on-surface flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`${materialIconClass} text-secondary text-[20px]`}
                    >
                      check_circle
                    </span>
                    Kerahasiaan Pelapor Terlindungi
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`${materialIconClass} text-secondary text-[20px]`}
                    >
                      check_circle
                    </span>
                    Tindak Lanjut Maksimal 3x24 Jam
                  </div>
                </div>
              </div>
              <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
                <button
                  className="font-label-lg text-label-lg bg-primary text-on-primary hover:bg-primary-container inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-4 shadow-md transition-all hover:shadow-lg active:scale-95"
                  type="button"
                >
                  <span className={`${materialIconClass} text-[22px]`}>
                    record_voice_over
                  </span>
                  <span>Laporkan Temuan ke BPD</span>
                </button>
                <span className="font-label-md text-label-md text-on-surface bg-surface-container-low inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-center">
                  <span className={`${materialIconClass} text-[20px]`}>
                    menu_book
                  </span>
                  <span>Regulasi Perdes APBDes 2024</span>
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
