export default function Footer({ onOpenAdmin }) {
  return (
    <footer class="py-12 bg-(--bg-elevated) border-t border-(--border)">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 border border-(--accent) flex items-center justify-center">
              <svg
                class="w-5 h-5 text-(--accent)"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>
            <div>
              <span class="font-display text-lg font-semibold tracking-wide text-(--fg)">
                Lutèce
              </span>
              <span class="block text-[10px] tracking-[0.3em] text-(--muted) uppercase">
                Investigations
              </span>
            </div>
          </div>

          {/* Legal links */}
          <div class="flex flex-wrap justify-center gap-6 text-sm text-(--muted)">
            <a class="hover:text-(--fg) transition-colors" href="#">
              Mentions légales
            </a>
            <a class="hover:text-(--fg) transition-colors" href="#">
              Politique de confidentialité
            </a>
            <a class="hover:text-(--fg) transition-colors" href="#">
              CGU
            </a>
          </div>

          {/* Copyright */}
          <p class="text-xs text-(--muted)">2024 Lutèce Investigations. Tous droits réservés.</p>
        </div>
      </div>

      {/* Bouton Consultant */}
      <div class="py-6 text-center">
        <button
          class="relative group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-(--muted) hover:text-(--accent) transition-colors"
          id="adminBtn"
          onClick={onOpenAdmin}
        >
          Espace Consultants
        </button>
      </div>
    </footer>
  );
}
