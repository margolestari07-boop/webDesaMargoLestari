export function SiteFooter({
  identity,
}: {
  identity: { name: string; regency: string; province: string };
}) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <strong>{identity.name}</strong>
          <span>
            {identity.regency}, {identity.province}
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
