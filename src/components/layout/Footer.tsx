export const Footer = () => {
  return (
    <div
      id="kt_app_footer"
      className="app-footer"
      style={{ borderTop: '1px solid var(--kt-card-border-color)' }}
    >
      <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
        <div className="text-dark order-2 order-md-1">
          <a
            href="https://maxscalla.com.br"
            target="_blank"
            className="text-gray-800 text-hover-primary"
            rel="noreferrer"
          >
            Desenvolvido por Max Scalla Informática | 2026
          </a>
        </div>
      </div>
    </div>
  )
}
