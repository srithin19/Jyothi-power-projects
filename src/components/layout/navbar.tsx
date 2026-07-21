import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navbarLinks } from "../../data/siteData";
import { cn } from "../../utils/cn";

export function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[70] px-6 sm:px-8">
      <div className="mx-auto mt-2 flex h-16 w-full max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/88 px-5 shadow-[0_10px_28px_rgba(18,34,58,0.1)] backdrop-blur-2xl sm:px-6">
        <a
          href="#top"
          className="pr-3 text-sm font-semibold tracking-tight text-black sm:text-base"
        >
          Jyothi Power Projects
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {navbarLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-neutral-600 transition hover:bg-[#EAF3FF] hover:text-[#1B2A3D]",
                active === link.href &&
                  "bg-[#EAF2FC] text-[#1B2A3D] hover:text-[#1B2A3D]",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black transition hover:border-[#bfd4ef] hover:bg-[#eaf3ff] hover:text-[#1b2a3d] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pt-2 pb-3 md:hidden"
          >
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
              <div className="rounded-2xl border border-black/10 bg-white/95 p-2 shadow-[0_12px_30px_rgba(18,34,58,0.12)] backdrop-blur-xl">
                {navbarLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActive(link.href);
                      setOpen(false);
                    }}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm text-neutral-700 transition hover:bg-[#EAF3FF] hover:text-[#1B2A3D]",
                      active === link.href && "bg-[#EAF2FC] text-[#1B2A3D]",
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
