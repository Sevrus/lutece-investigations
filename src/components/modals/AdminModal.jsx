import { useState } from "preact/hooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { CODE_ACCES, STORAGE_KEY, defaultDocs } from "../../utils/constants";

export default function AdminModal({ isOpen, onClose }) {
  const [docs] = useLocalStorage(STORAGE_KEY, defaultDocs);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

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
    >
      <div class="w-full max-w-4xl bg-(--bg-elevated) border border-(--border) p-8 max-h-[80vh] overflow-y-auto relative">
        <button
          class="absolute top-4 right-4 text-(--muted) hover:text-(--fg)"
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
          <div id="messagesView">
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

            <div class="space-y-4" id="messagesList">
              {docs.length === 0 ? (
                <p class="text-(--muted) text-center py-10">
                  Aucun dossier enregistré pour le moment.
                </p>
              ) : (
                docs.map((doc) => (
                  <div
                    key={doc.id}
                    class="border border-(--border) p-4"
                  >
                    <div class="flex justify-between items-start gap-4">
                      <h4 class="font-display text-lg">{doc.title}</h4>
                      <span class="text-[10px] uppercase tracking-widest text-(--accent) whitespace-nowrap">
                        {doc.type}
                      </span>
                    </div>
                    <p class="text-xs text-(--muted) mt-1">{doc.date}</p>
                    <p class="text-sm text-(--muted) mt-2 leading-relaxed">
                      {doc.description}
                    </p>
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
