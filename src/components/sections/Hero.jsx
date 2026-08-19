import { useEffect, useRef } from "preact/hooks";
import AccentLine from "../common/AccentLine";
import Button from "../common/Button";

const STATS = [
  { value: "25+", label: "Années d'expérience" },
  { value: "98%", label: "Taux de réussite" },
  { value: "250+", label: "Dossiers résolus" },
];

export default function Hero() {
  const heroBgRef = useRef(null);

  useEffect(() => {
    const hero = heroBgRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !hero) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroBgRef}
      class="hero-bg min-h-screen flex items-center relative"
    >
      <div class="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-(--bg)"></div>
      <div class="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 relative z-10">
        <div class="max-w-3xl">
          <AccentLine className="animate-fade-up" />
          <p class="text-(--accent) tracking-[0.4em] uppercase text-xs mt-6 mb-6 animate-fade-up delay-1">
            Agence de Détectives Privés — Paris XVI
          </p>
          <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-8 animate-fade-up delay-2">
            La discrétion
            <br />
            <span class="text-(--muted)">au service de</span>
            <br />
            l'excellence
          </h1>
          <p class="text-(--muted) text-lg lg:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up delay-3">
            Depuis plus de 25 ans, nous menons des investigations avec une rigueur
            absolue pour une clientèle exigeante. Confidentialité et résultats
            garantis.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 animate-fade-up delay-4">
            <Button as="a" href="#contact" className="text-center">
              Contactez-nous
            </Button>
            <a
              class="px-10 py-4 text-sm tracking-wider text-(--muted) hover:text-(--fg) transition-colors uppercase text-center"
              href="#services"
            >
              Découvrir nos services
            </a>
          </div>
        </div>

        {/* Hero stats */}
        <div class="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-(--border) max-w-2xl animate-fade-up delay-5">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <span class="font-display text-4xl lg:text-5xl text-(--accent)">
                {stat.value}
              </span>
              <p class="text-xs text-(--muted) tracking-wider uppercase mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-6">
        <div class="w-px h-16 bg-linear-to-b from-(--accent) to-transparent"></div>
      </div>
    </section>
  );
}
