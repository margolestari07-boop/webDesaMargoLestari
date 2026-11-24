import Link from "next/link";
import {
  ExpenseAllocationCard,
  RevenueSourceCard,
} from "@/components/apbdes-cards";
import { getApbdes } from "@/lib/content/public";

export const metadata = {
  title: "Infografis APBDes Desa Margo Lestari",
};

const materialIconClass = "material-symbols-outlined";

/**
 * Data statis di bawah ini adalah fallback bila belum ada laporan APBDes
 * terbit di database. Nilai-nilainya sama dengan yang di-seed ke database
 * pada 24 Nov 2026, jadi tampilan tidak berubah saat laporan diterbitkan.
 * Deskripsi tiap bidang/sumber pendapatan adalah teks statis dari repo;
 * angka (pagu, realisasi) selalu diambil dari database bila tersedia.
 */
const fallbackRealizations = {
  income: { budget: 2158400000, realization: 2180250000 },
  spending: { budget: 2124850000, realization: 1985400000 },
  silpa: { budget: 45000000, realization: 45000000 },
  modalBumdes: { budget: 11450000, realization: 11450000 },
};

const fallbackSpending = [
  {
    name: "Penyelenggaraan Pemerintahan Desa",
    budget: 670000000,
    realization: 642500000,
  },
  {
    name: "Pelaksanaan Pembangunan Desa",
    budget: 880000000,
    realization: 815200000,
  },
  {
    name: "Pembinaan Kemasyarakatan",
    budget: 195000000,
    realization: 186000000,
  },
  {
    name: "Pemberdayaan Masyarakat",
    budget: 285000000,
    realization: 264700000,
  },
  {
    name: "Penanggulangan Bencana & Mendesak",
    budget: 94850000,
    realization: 77000000,
  },
];

const fallbackRevenue = [
  { name: "Dana Desa (APBN Pusat)", realization: 1046520000 },
  { name: "Alokasi Dana Desa (ADD)", realization: 741285000 },
  { name: "Pendapatan Asli Desa (PADes)", realization: 261630000 },
  { name: "Bagi Hasil Pajak & Retribusi", realization: 130815000 },
];

const spendingMeta = [
  {
    icon: "account_balance",
    description: "Siltap, tunjangan aparatur, operasional kantor BPD & RT/RW.",
  },
  {
    icon: "engineering",
    description:
      "Irigasi tersier 1.200m, rabat beton jalan tani RW 03, sanitasi jamban sehat.",
  },
  {
    icon: "groups",
    description:
      "Festival seni budaya desa, sarana karang taruna & posyandu terpadu.",
  },
  {
    icon: "storefront",
    description:
      "Pelatihan bibit unggul jagung, ketahanan pangan, dan permodalan UMKM.",
  },
  {
    icon: "health_and_safety",
    description: "BLT Dana Desa (KPM miskin ekstrem), tanggap kemarau & pompa air.",
  },
];

const revenueMeta = [
  {
    accent: "bg-primary",
    percentColor: "text-primary",
    description: "Alokasi afirmasi & kinerja untuk pembangunan infrastruktur desa.",
  },
  {
    accent: "bg-primary-container",
    percentColor: "text-primary-container",
    description: "Transfer APBD Kabupaten untuk penghasilan tetap dan kantor desa.",
  },
  {
    accent: "bg-secondary-fixed-dim",
    percentColor: "text-secondary",
    description: "Hasil sewa aset tanah kas desa, pasar desa, & bagi laba BUMDes.",
  },
  {
    accent: "bg-secondary-fixed",
    percentColor: "text-secondary",
    description: "Penerimaan bagi hasil PBB-P2 dan retribusi daerah kabupaten.",
  },
];

function formatRupiah(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function formatPercentId(value) {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

function achievementOf(realization, budget) {
  return budget > 0 ? (realization / budget) * 100 : 0;
}

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

/**
 * APBDes dinamis: realisasi, bidang belanja, dan sumber pendapatan dibaca
 * dari laporan APBDes di database. Grafik tren 2020-2024 masih memakai
 * data arsip statis (belum ada laporan tahunan di database).
 */
export default async function ApbdesPage() {
  const apbdes = await getApbdes();
  const report = apbdes?.report ?? null;
  const fiscalYear = report?.fiscal_year ?? 2024;
  const notes =
    report?.notes ?? "Update data buku kas umum per 30 November 2024";

  const realizations = apbdes?.realizations ?? [];
  const findRealization = (fragment) =>
    realizations.find((item) => item.label.includes(fragment));
  const income = findRealization("Pendapatan") ?? {
    budget: fallbackRealizations.income.budget,
    realization: fallbackRealizations.income.realization,
  };
  const spending = findRealization("Belanja") ?? {
    budget: fallbackRealizations.spending.budget,
    realization: fallbackRealizations.spending.realization,
  };
  const silpa = findRealization("SiLPA") ?? {
    budget: fallbackRealizations.silpa.budget,
    realization: fallbackRealizations.silpa.realization,
  };
  const modalBumdes = findRealization("Modal BUMDes") ?? {
    budget: fallbackRealizations.modalBumdes.budget,
    realization: fallbackRealizations.modalBumdes.realization,
  };

  const incomeAchievement = achievementOf(income.realization, income.budget);
  const spendingAchievement = achievementOf(
    spending.realization,
    spending.budget,
  );
  const surplus = income.realization - spending.realization;
  const netFinancing = silpa.realization - modalBumdes.realization;
  const estimatedSilpa = surplus + netFinancing;

  const spendingFields =
    apbdes?.spendingFields.length > 0
      ? apbdes.spendingFields.map((field) => ({
          name: field.field_name,
          budget: field.budget ?? 0,
          realization: field.realization ?? 0,
        }))
      : fallbackSpending;
  const totalSpendingRealization = spendingFields.reduce(
    (sum, field) => sum + field.realization,
    0,
  );
  const largestField = spendingFields.reduce(
    (max, field) => (field.realization > max.realization ? field : max),
    spendingFields[0],
  );
  const expenseAllocations = spendingFields.map((field, index) => {
    const meta = spendingMeta[index] ?? spendingMeta[0];
    const percent =
      totalSpendingRealization > 0
        ? (field.realization / totalSpendingRealization) * 100
        : 0;
    const isLargest = field === largestField;
    const color = index % 2 === 0 ? "primary" : "secondary";
    return {
      icon: meta.icon,
      iconContainerClass:
        color === "primary"
          ? "bg-surface-container-low text-primary group-hover:bg-primary-fixed group-hover:text-on-primary-fixed flex h-12 w-12 items-center justify-center rounded-2xl transition-colors"
          : "bg-surface-container-low text-secondary group-hover:bg-secondary-fixed group-hover:text-on-secondary-fixed flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
      badge: isLargest ? "Porsi Terbesar" : `Bidang 0${index + 1}`,
      badgeClass: isLargest
        ? "bg-secondary-fixed text-on-secondary-fixed font-bold"
        : "bg-surface-container text-on-surface-variant font-semibold",
      title: field.name,
      description: meta.description,
      amount: formatRupiah(field.realization),
      amountColor: color === "primary" ? "text-primary" : "text-secondary",
      percent: formatPercentId(percent),
      barColor: color === "primary" ? "bg-primary" : "bg-secondary",
      barWidth: `${percent.toFixed(1)}%`,
      budget: `Pagu: ${formatRupiah(field.budget)}`,
      achievement: `${formatPercentId(
        achievementOf(field.realization, field.budget),
      )} Tercapai`,
    };
  });

  const revenueSources =
    apbdes?.revenueSources.length > 0
      ? apbdes.revenueSources.map((source) => ({
          name: source.source_name,
          realization: source.realization ?? 0,
        }))
      : fallbackRevenue;
  const totalRevenueRealization = revenueSources.reduce(
    (sum, source) => sum + source.realization,
    0,
  );
  const revenueCards = revenueSources.map((source, index) => {
    const meta = revenueMeta[index] ?? revenueMeta[0];
    const percent =
      totalRevenueRealization > 0
        ? (source.realization / totalRevenueRealization) * 100
        : 0;
    return {
      accent: meta.accent,
      title: source.name,
      percent: `${Math.round(percent)}%`,
      percentColor: meta.percentColor,
      amount: formatRupiah(source.realization),
      description: meta.description,
    };
  });
  // Donat: keliling lingkaran r=38 adalah 2*pi*38 = 238,76.
  const donutSegments = revenueSources.map((source) => {
    const percent =
      totalRevenueRealization > 0
        ? (source.realization / totalRevenueRealization) * 100
        : 0;
    return { percent, length: (percent / 100) * 238.76 };
  });
  const donutColors = ["#005d90", "#0077b6", "#4cd6fb", "#b3ebff"];
  const donutCircles = donutSegments.reduce(
    (acc, segment, index) => {
      const offset = acc.nextOffset;
      acc.circles.push({
        ...segment,
        offset,
        color: donutColors[index % donutColors.length],
      });
      acc.nextOffset -= segment.length;
      return acc;
    },
    { circles: [], nextOffset: 0 },
  ).circles;

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
                    Infografis APBDes Desa Margo Lestari
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Keterbukaan informasi publik pengelolaan keuangan Desa
                    Margo Lestari yang akuntabel, transparan, dan berkeadilan bagi
                    seluruh warga.
                  </p>
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
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      {fiscalYear} (Aktif)
                    </span>
                  </div>
                  <span className="bg-surface-variant mx-1 hidden h-6 w-px xl:inline-block" />
                  <div className="font-label-sm text-label-sm text-on-surface-variant hidden items-center gap-1.5 xl:flex">
                    <span className="bg-secondary-fixed-dim h-2 w-2 animate-pulse rounded-full" />
                    {report?.source_document ?? "APBDes Desa Margo Lestari"}
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase">
                    Ikhtisar Pelaksanaan
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Ringkasan Realisasi APBDes Tahun {fiscalYear}
                  </h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {notes}
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
                        <span className="text-primary font-bold">
                          {formatPercentId(incomeAchievement)}
                        </span>
                      </div>
                      <div className="font-headline-sm text-headline-sm text-primary font-bold">
                        {formatRupiah(income.realization)}
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">
                        Target: {formatRupiah(income.budget)}
                      </div>
                      <div className="bg-surface-variant mt-1 h-2 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{
                            width: `${Math.min(100, incomeAchievement).toFixed(1)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="bg-surface-container-low flex flex-col gap-2 rounded-2xl p-4">
                      <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-between">
                        <span>Total Belanja</span>
                        <span className="text-secondary font-bold">
                          {formatPercentId(spendingAchievement)}
                        </span>
                      </div>
                      <div className="font-headline-sm text-headline-sm text-secondary font-bold">
                        {formatRupiah(spending.realization)}
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">
                        Pagu: {formatRupiah(spending.budget)}
                      </div>
                      <div className="bg-surface-variant mt-1 h-2 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-secondary h-full rounded-full"
                          style={{
                            width: `${spendingAchievement.toFixed(1)}%`,
                          }}
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
                        +{formatRupiah(surplus)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl p-6 shadow-sm md:p-8">
                  <div className="bg-secondary-fixed/30 pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary-fixed text-on-secondary-fixed flex h-10 w-10 items-center justify-center rounded-2xl">
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
                          {formatPercentId(
                            achievementOf(silpa.realization, silpa.budget),
                          )}{" "}
                          Terealisasi
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {formatRupiah(silpa.realization)}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Anggaran: {formatRupiah(silpa.budget)}
                        </span>
                      </div>
                      <div className="bg-surface-variant h-1.5 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-primary-container h-full rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              achievementOf(silpa.realization, silpa.budget),
                            ).toFixed(1)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="bg-surface-container-low flex flex-col gap-2 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-on-surface">
                          Pengeluaran (Penyertaan Modal BUMDes)
                        </span>
                        <span className="font-label-sm text-label-sm text-secondary font-bold">
                          {formatPercentId(
                            achievementOf(
                              modalBumdes.realization,
                              modalBumdes.budget,
                            ),
                          )}{" "}
                          Tersalurkan
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {formatRupiah(modalBumdes.realization)}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Alokasi: {formatRupiah(modalBumdes.budget)}
                        </span>
                      </div>
                      <div className="bg-surface-variant h-1.5 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-secondary-fixed-dim h-full rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              achievementOf(
                                modalBumdes.realization,
                                modalBumdes.budget,
                              ),
                            ).toFixed(1)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-surface-container flex flex-col rounded-2xl p-3.5">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Pembiayaan Netto
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface font-bold">
                        {formatRupiah(netFinancing)}
                      </span>
                    </div>
                    <div className="bg-primary-fixed/40 flex flex-col rounded-2xl p-3.5">
                      <span className="font-label-sm text-label-sm text-on-primary-fixed-variant font-medium">
                        Estimasi SiLPA Akhir TA
                      </span>
                      <span className="font-label-lg text-label-lg text-primary font-bold">
                        {formatRupiah(estimatedSilpa)}
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
                    5 tahun anggaran terakhir. Angka 2020–2023 masih dari arsip
                    statis dan perlu verifikasi ke SISKEUDES.
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
                    Pertumbuhan rata-rata APBDes Desa Margo Lestari mencatatkan
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
                  Total Realisasi Belanja:{" "}
                  <strong>{formatRupiah(spending.realization)}</strong> (
                  {formatPercentId(spendingAchievement)} dari Pagu)
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
                    Sumber Pendapatan Desa (TA {fiscalYear})
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Total pendapatan terealisasi mencapai{" "}
                    {formatRupiah(income.realization)} dari beragam pos resmi.
                  </p>
                </div>
                <span className="font-label-sm text-label-sm bg-surface-container-low text-on-surface-variant self-start rounded-full px-4 py-2 font-bold md:self-auto">
                  Target {formatPercentId(incomeAchievement)} Tercapai
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
                      {donutCircles.map((segment, index) => (
                        <circle
                          cx="50"
                          cy="50"
                          fill="transparent"
                          key={index}
                          r="38"
                          stroke={segment.color}
                          strokeDasharray={`${segment.length.toFixed(2)} 238.76`}
                          strokeDashoffset={segment.offset.toFixed(2)}
                          strokeWidth="12"
                        />
                      ))}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Realisasi
                      </span>
                      <span className="font-headline-md text-headline-md text-on-surface font-extrabold">
                        {(income.realization / 1000000).toFixed(2).replace(".", ",")}{" "}
                        M
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
                  {revenueCards.map((item) => (
                    <RevenueSourceCard item={item} key={item.title} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
