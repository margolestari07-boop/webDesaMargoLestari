import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageTransition } from "@/components/motion/page-transition";
import "./globals.css";

const editorial = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Desa Margo Lestari",
    template: "%s | Desa Margo Lestari",
  },
  description:
    "Pusat informasi Desa Margo Lestari. Informasi yang belum diverifikasi pihak desa akan ditandai dengan jelas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${editorial.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Langsung ke konten
        </a>
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}
