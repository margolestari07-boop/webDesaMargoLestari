import { siteIdentity } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <strong>{siteIdentity.name}</strong>
          <span>
            {siteIdentity.district}, {siteIdentity.province}
          </span>
        </div>
        <p className="footer-note">
          Informasi yang belum diverifikasi oleh pihak desa tidak ditampilkan
          sebagai fakta resmi.
        </p>
      </div>
    </footer>
  );
}
