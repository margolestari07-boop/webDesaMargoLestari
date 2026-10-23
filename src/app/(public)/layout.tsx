import { PageTransition } from "@/components/motion/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteIdentity } from "@/data/site";
import { getPublicSiteSettings } from "@/lib/site-settings";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getPublicSiteSettings();
  const identity = {
    name: settings?.village_name ?? siteIdentity.name,
    regionSignature: settings
      ? `${settings.regency} · ${settings.province}`
      : siteIdentity.regionSignature,
    regency: settings ? `Kabupaten ${settings.regency}` : siteIdentity.district,
    province: settings
      ? `Provinsi ${settings.province}`
      : siteIdentity.province,
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Langsung ke konten
      </a>
      <SiteHeader identity={identity} />
      <main id="main-content">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter identity={identity} />
    </>
  );
}
