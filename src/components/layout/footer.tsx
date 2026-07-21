import { navLinks, services } from "../../data/siteData";

export function Footer() {
  return (
    <footer className="mx-auto mt-20 w-full max-w-6xl border-t border-black/10 px-5 py-10 text-sm text-neutral-600 sm:px-8 sm:py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-extrabold tracking-[0.16em] text-black uppercase sm:text-sm">
            Jyothi Power Projects
          </p>
          <p className="mt-3 leading-relaxed">Designed with Excellence.</p>
        </div>
        <div>
          <p className="font-medium text-black">Quick Links</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a className="hover:text-black" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium text-black">Services</p>
          <ul className="mt-3 space-y-2">
            {services.slice(0, 5).map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium text-black">Contact</p>
          <p className="mt-3">Vanasthalipuram, Hyderabad, Telangana, India</p>
          <a
            className="mt-2 block break-all hover:text-black"
            href="mailto:jyothipowerprojectshyd@gmail.com"
          >
            jyothipowerprojectshyd@gmail.com
          </a>
        </div>
      </div>
      <p className="mt-8 border-t border-black/10 pt-5 text-xs sm:mt-10 sm:pt-6">
        Copyright {new Date().getFullYear()} Jyothi Power Projects. All rights
        reserved.
      </p>
    </footer>
  );
}
