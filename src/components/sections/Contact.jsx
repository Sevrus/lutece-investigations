import { useState } from "preact/hooks";
import AccentLine from "../common/AccentLine";
import Reveal from "../common/Reveal";

const INFOS = [
  {
    label: "Adresse",
    value: (
      <>
        12 Avenue Victor Hugo
        <br />
        75016 Paris, France
      </>
    ),
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    label: "Téléphone",
    value: "+33 1 45 67 89 12",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: "Email",
    value: "contact@lutece-investigations.fr",
    icon: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect height="12" width="4" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Twitter",
    icon: (
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    ),
  },
  {
    label: "Instagram",
    icon: (
      <>
        <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
];

const IDLE = "idle";
const SENDING = "sending";
const SENT = "sent";

export default function Contact() {
  const [status, setStatus] = useState(IDLE);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    confidential: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(SENDING);

    // Simulation d'envoi (comme dans l'original)
    setTimeout(() => {
      setStatus(SENT);
      setTimeout(() => {
        setStatus(IDLE);
        setForm({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
          confidential: false,
        });
      }, 2000);
    }, 1500);
  };

  const buttonLabel =
    status === SENDING
      ? "Envoi en cours..."
      : status === SENT
      ? "Message envoyé"
      : "Envoyer ma demande";

  return (
    <section class="py-24 lg:py-32 bg-(--bg) relative" id="contact">
      <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-(--border) to-transparent"></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <Reveal>
            <AccentLine />
            <p class="text-(--accent) tracking-[0.4em] uppercase text-xs mt-6 mb-4">
              Contact
            </p>
            <h2 class="font-display text-4xl lg:text-5xl font-semibold mb-6">
              Prenez rendez-vous
            </h2>
            <p class="text-(--muted) leading-relaxed mb-10">
              Toutes nos consultations sont strictement confidentielles. Nous nous
              déplaçons sur rendez-vous dans nos bureaux du 16ème arrondissement ou
              à votre domicile.
            </p>

            <div class="space-y-6">
              {INFOS.map((info) => (
                <div class="flex items-start gap-4" key={info.label}>
                  <div class="w-10 h-10 border border-(--border) flex items-center justify-center shrink-0">
                    <svg
                      class="w-5 h-5 text-(--accent)"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                    >
                      {info.icon}
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-(--muted) tracking-wider uppercase mb-1">
                      {info.label}
                    </p>
                    <p class="text-(--fg)">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div class="mt-10 pt-10 border-t border-(--border)">
              <p class="text-xs text-(--muted) tracking-wider uppercase mb-4">
                Suivez-nous
              </p>
              <div class="flex gap-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    aria-label={social.label}
                    class="w-10 h-10 border border-(--border) flex items-center justify-center hover:border-(--accent) hover:text-(--accent) transition-colors"
                    href="#"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                    >
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal>
            <form class="space-y-6" id="contactForm" onSubmit={handleSubmit}>
              <div class="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    class="block text-xs text-(--muted) tracking-wider uppercase mb-2"
                    for="name"
                  >
                    Nom complet
                  </label>
                  <input
                    class="w-full bg-transparent border border-(--border) px-4 py-3 text-(--fg) transition-colors"
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    required
                    type="text"
                    value={form.name}
                    onInput={handleChange}
                  />
                </div>
                <div>
                  <label
                    class="block text-xs text-(--muted) tracking-wider uppercase mb-2"
                    for="phone"
                  >
                    Téléphone
                  </label>
                  <input
                    class="w-full bg-transparent border border-(--border) px-4 py-3 text-(--fg) transition-colors"
                    id="phone"
                    name="phone"
                    placeholder="+33 6 00 00 00 00"
                    type="tel"
                    value={form.phone}
                    onInput={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  class="block text-xs text-(--muted) tracking-wider uppercase mb-2"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="w-full bg-transparent border border-(--border) px-4 py-3 text-(--fg) transition-colors"
                  id="email"
                  name="email"
                  placeholder="votre@email.com"
                  required
                  type="email"
                  value={form.email}
                  onInput={handleChange}
                />
              </div>

              <div>
                <label
                  class="block text-xs text-(--muted) tracking-wider uppercase mb-2"
                  for="service"
                >
                  Type d'enquête
                </label>
                <select
                  class="w-full bg-(--bg) border border-(--border) px-4 py-3 text-(--fg) transition-colors"
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="personne">Enquête de personne</option>
                  <option value="entreprise">Enquête d'entreprise</option>
                  <option value="surveillance">Surveillance / Filature</option>
                  <option value="cyber">Cyber-investigation</option>
                  <option value="securite">Sécurité rapprochée</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label
                  class="block text-xs text-(--muted) tracking-wider uppercase mb-2"
                  for="message"
                >
                  Votre message
                </label>
                <textarea
                  class="w-full bg-transparent border border-(--border) px-4 py-3 text-(--fg) transition-colors resize-none"
                  id="message"
                  name="message"
                  placeholder="Décrivez brièvement votre situation..."
                  rows="5"
                  value={form.message}
                  onInput={handleChange}
                ></textarea>
              </div>

              <div class="flex items-start gap-3">
                <input
                  class="mt-1 accent-(--accent)"
                  id="confidential"
                  name="confidential"
                  required
                  type="checkbox"
                  checked={form.confidential}
                  onChange={handleChange}
                />
                <label class="text-sm text-(--muted)" for="confidential">
                  J'accepte que mes informations soient traitées de manière
                  confidentielle conformément à notre politique de protection des
                  données.
                </label>
              </div>

              <button
                class="btn-primary w-full"
                type="submit"
                disabled={status === SENDING}
                style={
                  status === SENT
                    ? { background: "var(--accent)", color: "var(--bg)" }
                    : undefined
                }
              >
                {buttonLabel}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
