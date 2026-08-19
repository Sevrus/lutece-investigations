import { useState } from "preact/hooks";
import { CODE_ACCES } from "../../utils/constants";

export default function AdminModal({ isOpen, onClose }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const pdfFiles = [
    {
      id: 1,
      title: "Rapport d'Investigation #042",
      url: "https://res.cloudinary.com/tgvh6w6c/image/upload/FR_2026_PLF_VA_PGM_109.pdf"
    }
  ];

  if (!isOpen) {
    return (
      <div class="fixed inset-0 z-60 hidden" id="adminModal"></div>
    );
  }

  const handleLogin = () => {
    if (pass === CODE_ACCES) {
      setLoggedIn(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPass("");
    setError(false);
  };

  const handleClose = () => {
    handleLogout();
    onClose();
  };

  return (
    <div
      class="fixed inset-0 z-60 bg-(--bg) bg-opacity-95 flex items-center justify-center p-6"
      id="adminModal"
      onClick={handleClose}
    >
      <div
        class="w-full max-w-4xl bg-(--bg-elevated) border border-(--border) p-8 max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          class="absolute top-4 right-4 text-(--muted) hover:text-(--fg) z-10"
          id="closeAdmin"
          onClick={handleClose}
        >
          ✕ Fermer
        </button>

        {!loggedIn ? (
          <div class="max-w-sm mx-auto py-12" id="loginView">
            <h3 class="font-display text-2xl mb-6 text-center">
              Identification Requise
            </h3>
            <input
              class="w-full bg-transparent border border-(--border) px-4 py-3 mb-4 text-(--fg) outline-none"
              id="adminPass"
              placeholder="Code d'accès"
              type="password"
              value={pass}
              onInput={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button class="btn-primary w-full" id="loginBtn" onClick={handleLogin}>
              Se connecter
            </button>
            {error && (
              <p class="text-red-500 text-xs mt-4 text-center" id="loginError">
                Code incorrect.
              </p>
            )}
          </div>
        ) : (
          <div id="messagesView" class="pt-8">
            <div class="flex justify-between items-center mb-6 border-b border-(--border) pb-4">
              <h3 class="font-display text-3xl">
                Espace Consultants — Dossiers & Rapports
              </h3>
              <button
                class="text-xs text-(--accent) border border-(--accent) px-3 py-1 hover:bg-(--accent) hover:text-(--bg) transition-all"
                id="logoutBtn"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </div>

            {/* Affichage des PDF */}
            <div class="space-y-8" id="pdfList">
              {pdfFiles.length === 0 ? (
                <p class="text-(--muted) text-center py-10">
                  Aucun document enregistré pour le moment.
                </p>
              ) : (
                pdfFiles.map((pdf) => (
                  <div
                    key={pdf.id}
                    class="border border-(--border) p-4 bg-(--bg) flex flex-col gap-3"
                  >
                    <div class="flex justify-between items-center">
                      <h4 class="font-display text-xl text-(--accent)">{pdf.title}</h4>
                      <a
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-xs text-(--muted) hover:text-(--fg) underline"
                      >
                        Ouvrir en plein écran ↗
                      </a>
                    </div>

                    {/* Le lecteur PDF intégré */}
                    <div class="w-full h-[60vh] border border-(--border) bg-neutral-900 rounded-sm overflow-hidden">
                      <iframe
                        src={`${pdf.url}#toolbar=0&navpanes=0&scrollbar=0`}
                        class="w-full h-full"
                        title={pdf.title}
                      >
                        Votre navigateur ne supporte pas la lecture de PDF.
                      </iframe>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
