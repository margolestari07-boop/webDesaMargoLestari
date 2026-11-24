import { Plus_Jakarta_Sans } from "next/font/google";
import { PageTransition } from "@/components/motion/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicSiteSettings } from "@/lib/site-settings";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-portal",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700", "800"],
});

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Pengaturan desa dibaca sekali di layout lalu diteruskan ke header
  // dan footer sebagai props. Bila belum ada pengaturan terbit, komponen
  // memakai fallback statis yang sama seperti sebelumnya.
  const settings = await getPublicSiteSettings();

  return (
    <div className={`${plusJakarta.variable} portal-reference-font`}>
      <a className="skip-link" href="#main-content">
        Langsung ke konten
      </a>
      <SiteHeader settings={settings} />
      <PageTransition>{children}</PageTransition>
      <SiteFooter settings={settings} />
    </div>
  );
}
