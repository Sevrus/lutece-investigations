import AccentLine from "../common/AccentLine";
import Reveal from "../common/Reveal";

const SERVICES = [
  {
    title: "Enquêtes de personne",
    description:
      "Localisation de personnes disparues, vérification d'identité, investigations pré-matrimoniales et recherches d'héritiers.",
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </>
    ),
  },
  {
    title: "Cyber-investigations",
    description:
      "Analyse numérique, traçabilité en ligne, récupération de données et investigation sur les réseaux sociaux et le dark web.",
    icon: (
      <>
        <rect height="14" rx="2" width="20" x="2" y="3" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
  },
  {
    title: "Sécurité rapprochée",
    description:
      "Protection de personnes, évaluation des risques, sécurisation d'événements privés et audits de sécurité résidentielle.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Enquêtes d'entreprise",
    description:
      "Détournement de fonds, concurrence déloyale, espionnage industriel, vérification d'employés et due diligence.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8M16 17H8M10 9H8" />
      </>
    ),
  },
  {
    title: "Surveillance et filature",
    description:
      "Surveillance discrète, filatures professionnelles, constatations d'adultère et monitoring d'activités suspectes.",
    icon: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Conseil et expertise",
    description:
      "Consultations confidentielles, préparation de dossiers pour avocats, assistance juridique et témoignages en tribunal.",
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
];

const TRUST = [
  { label: "Agrément officiel", value: "CNAPS — N°75-2024-A" },
  { label: "Assurance professionnelle", value: "AXA Corporate" },
  { label: "Membre", value: "Chambre Nationale des Détectives" },
];

export default function Services() {
  return (
    <section
      class="py-24 lg:py-32 bg-(--bg-elevated) relative"
      id="services"
    >
      <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-(--border) to-transparent"></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal className="text-center mb-16 lg:mb-20">
          <AccentLine className="mx-auto" />
          <p class="text-(--accent) tracking-[0.4em] uppercase text-xs mt-6 mb-4">
            Nos Services
          </p>
          <h2 class="font-display text-4xl lg:text-5xl font-semibold">
            Expertise et discrétion
          </h2>
        </Reveal>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Reveal key={service.title} className="service-card p-8 lg:p-10">
              <div class="w-12 h-12 border border-(--accent) flex items-center justify-center mb-6">
                <svg
                  class="w-6 h-6 text-(--accent)"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                >
                  {service.icon}
                </svg>
              </div>
              <h3 class="font-display text-xl mb-3">{service.title}</h3>
              <p class="text-(--muted) text-sm leading-relaxed">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Trust indicators */}
        <Reveal className="mt-20 pt-12 border-t border-(--border)">
          <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {TRUST.map((item, i) => (
              <>
                <div class="text-center" key={item.label}>
                  <p class="text-xs text-(--muted) tracking-wider uppercase mb-2">
                    {item.label}
                  </p>
                  <p class="font-display text-lg">{item.value}</p>
                </div>
                {i < TRUST.length - 1 && (
                  <div class="w-px h-8 bg-(--border) hidden lg:block"></div>
                )}
              </>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
