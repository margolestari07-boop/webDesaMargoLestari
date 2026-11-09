import { Plus_Jakarta_Sans } from "next/font/google";
import { PageTransition } from "@/components/motion/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-portal",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700", "800"],
});

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${plusJakarta.variable} portal-reference-font`}>
      <a className="skip-link" href="#main-content">
        Langsung ke konten
      </a>
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
      <SiteFooter />
    </div>
  );
}
