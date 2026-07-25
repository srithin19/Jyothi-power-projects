import { Link } from 'react-router-dom'
import { company, navLinks, services, telHref } from '../../data/siteData'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          <div>
            <p className="font-semibold tracking-[-0.01em] text-ink">
              {company.name}
            </p>
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted">
              Government infrastructure and electrical engineering across
              Telangana since 2009.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-medium text-ink">Sections</h2>
            <ul className="mt-4 space-y-2.5">
              {/*
                Router links to /#section, not bare #section anchors. The
                footer also renders on /work/<slug>, where a bare hash points
                at ids that do not exist on that page and the link goes dead.
              */}
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={`/${link.href}`}
                    className="text-sm text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium text-ink">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 5).map((service) => (
                <li key={service} className="text-sm text-muted">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-medium text-ink">Contact</h2>
            <address className="mt-4 space-y-2.5 not-italic">
              <p className="text-sm leading-relaxed text-muted">
                {company.address}
              </p>
              {company.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="block text-sm tabular-nums text-muted transition-colors duration-200 hover:text-ink"
                >
                  {phone}
                </a>
              ))}
              <a
                href={`mailto:${company.email}`}
                className="block text-sm break-all text-muted transition-colors duration-200 hover:text-ink"
              >
                {company.email}
              </a>
            </address>
          </div>
        </div>

        <p className="mt-14 border-t border-line pt-6 text-xs text-muted">
          Copyright {new Date().getFullYear()} {company.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}
