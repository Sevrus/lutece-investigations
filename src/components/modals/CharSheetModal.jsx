import { switchTextInButton } from "../../utils/constants";

export default function CharSheetModal({ member, onClose, onToggleMission }) {
  if (!member) {
    return <div class="fixed inset-0 z-70 hidden" id="charModal"></div>;
  }

  const forces = member.forces || [];
  const faiblesses = member.faiblesses || [];

  return (
    <div
      class="fixed inset-0 z-70 bg-(--bg) bg-opacity-95 flex items-center justify-center p-6"
      id="charModal"
    >
      <div class="w-full max-w-2xl bg-(--bg-elevated) border border-(--border) p-8 max-h-[90vh] overflow-y-auto relative">
        <button
          class="absolute top-4 right-4 text-(--muted) hover:text-(--fg)"
          onClick={onClose}
        >
          ✕
        </button>

        <div class="space-y-6" id="charContent">
          <div class="accent-line"></div>
          <h2 class="font-display text-4xl mt-4">{member.nom}</h2>
          <p class="text-(--accent) uppercase tracking-widest text-xs">
            {member.role}
          </p>

          {/* Forces & Faiblesses */}
          <div class="grid grid-cols-2 gap-4 border-y border-(--border) py-4 my-6">
            <div>
              <h4 class="text-xs uppercase text-(--muted) tracking-wider">
                Forces
              </h4>
              <ul class="mt-1 text-(--fg) font-display text-lg space-y-0.5">
                {forces.length > 0 ? (
                  forces.map((f) => <li key={f}>✦ {f}</li>)
                ) : (
                  <li class="text-sm text-(--muted)">—</li>
                )}
              </ul>
            </div>
            <div>
              <h4 class="text-xs uppercase text-(--muted) tracking-wider">
                Faiblesses
              </h4>
              <ul class="mt-1 text-(--fg) font-display text-lg space-y-0.5">
                {faiblesses.length > 0 ? (
                  faiblesses.map((f) => <li key={f}>✦ {f}</li>)
                ) : (
                  <li class="text-sm text-(--muted)">—</li>
                )}
              </ul>
            </div>
          </div>

          {/* Apparence */}
          <div>
            <h4 class="text-xs uppercase text-(--fg) mb-2">Apparence</h4>
            <p
              class="text-sm text-(--muted) leading-relaxed"
              style={{ whiteSpace: "pre-line" }}
            >
              {member.apparence}
            </p>
          </div>

          {/* Dossier de fond */}
          <div>
            <h4 class="text-xs uppercase text-(--fg) mb-2">Dossier de fond</h4>
            <p
              class="text-sm text-(--muted) leading-relaxed"
              style={{ whiteSpace: "pre-line" }}
            >
              {member.background}
            </p>
          </div>

          {/* Information confidentielle */}
          {member.status !== "Disponible" && (
            <div class="bg-(--bg) p-4 border-l-2 border-(--accent)">
              <h4 class="text-xs uppercase text-(--accent) mb-1">
                Information Confidentielle
              </h4>
              <p class="text-sm italic">{member.secret}</p>
            </div>
          )}

          {/* Bouton de mission */}
          <button
            id="modal-mission-btn"
            class="btn-primary w-full mt-4"
            onClick={() => onToggleMission(member.id)}
          >
            {switchTextInButton(member.status)}
          </button>
        </div>
      </div>
    </div>
  );
}
