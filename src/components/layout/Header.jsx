import { useEffect, useState } from "preact/hooks";

const NAV_LINKS = [
  { href: "#equipe", label: "Équipe" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.pageYOffset > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        id="header"
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8, 8, 8, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <nav class="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a class="flex items-center gap-3 group" href="#">
              <img
                alt="logo agence"
                class="w-20 h-20 lg:w-20 lg:h-20 text-(--accent) group-hover:text-(--bg) transition-colors"
                src="/images/logo_agence_petit.webp"
              />
              <div>
                <span class="font-display text-lg lg:text-xl font-semibold tracking-wide text-(--fg)">
                  Lutèce
                </span>
                <span class="block text-[10px] lg:text-xs tracking-[0.3em] text-(--muted) uppercase">
                  Investigations
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div class="hidden lg:flex items-center gap-12">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  class="nav-link text-sm tracking-wider uppercase"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
              <a class="btn-primary" href="#contact">
                Prendre Rendez-vous
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label="Menu"
              class="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              id="menuBtn"
              onClick={toggleMenu}
            >
              <span
                class="w-6 h-px bg-(--fg) transition-all duration-300"
                style={
                  menuOpen
                    ? { transform: "rotate(45deg) translate(3px, 3px)" }
                    : { transform: "none" }
                }
              ></span>
              <span
                class="w-6 h-px bg-(--fg) transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              ></span>
              <span
                class="h-px bg-(--fg) transition-all duration-300"
                style={
                  menuOpen
                    ? { transform: "rotate(-45deg) translate(2px, -2px)", width: "24px" }
                    : { transform: "none", width: "16px" }
                }
              ></span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        class={`mobile-menu fixed inset-0 bg-(--bg) z-40 flex flex-col items-center justify-center gap-8 ${
          menuOpen ? "open" : ""
        }`}
        id="mobileMenu"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            class="font-display text-3xl text-(--fg) hover:text-(--accent) transition-colors mobile-link"
            href={link.href}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <a class="btn-primary mt-4 mobile-link" href="#contact" onClick={closeMenu}>
          Prendre Rendez-vous
        </a>
      </div>
    </>
  );
}
