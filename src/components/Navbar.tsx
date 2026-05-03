import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const Navbar = () => {
  const c = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Carte", href: "#carte" },
    { label: "Avis", href: "#avis" },
    { label: "Infos", href: "#infos" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display text-xl text-primary-foreground">
          <span className={scrolled ? "text-foreground" : "text-primary-foreground"}>
            L'Auberge <span className="italic font-normal">des Sources</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-sm tracking-wider uppercase transition-colors ${
                scrolled
                  ? "text-foreground/70 hover:text-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${c.phoneHref}`}
            className="inline-flex items-center gap-2 px-5 py-2 bg-auberge-burgundy text-primary-foreground font-body tracking-wider uppercase text-xs rounded-sm hover:bg-auberge-burgundy/90 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            Réserver
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-body text-sm tracking-wider uppercase text-foreground/70 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${c.phoneHref}`}
                className="inline-flex items-center gap-2 px-5 py-2 bg-auberge-burgundy text-primary-foreground font-body tracking-wider uppercase text-xs rounded-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                Réserver
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
