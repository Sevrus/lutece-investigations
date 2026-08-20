import {useEffect, useState} from "preact/hooks";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "../../firebase";

export default function AdminModal({ isOpen, onClose }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const [pdfFiles, setPdfFiles] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    if (!loggedIn) return;

    const docsRef = ref(db, 'consultantDocs');
    const unsubscribe = onValue(docsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedDocs = Object.entries(data).map(([key, val]) => ({
          id: key,
          ...val
        }));
        setPdfFiles(loadedDocs.reverse());
      } else {
        setPdfFiles([]);
      }
    });

    return () => unsubscribe();
  }, [loggedIn]);

  if (!isOpen) {
    return <div class="fixed inset-0 z-60 hidden" id="adminModal"></div>;
  }

  const handleLogin = () => {
    const CODE_ACCES = import.meta.env.VITE_CODE_ACCES_CONSULTANT;

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

  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    const newDocRef = push(ref(db, 'consultantDocs'));
    try {
     await set(newDocRef, {
      title: newTitle,
      url: newUrl,
      date: new Date().toLocaleDateString('fr-FR')
    });
    } catch (error) {
      console.error(error);
    }

    setNewTitle("");
    setNewUrl("");
  };

  const handleDeleteDocument = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer ce document de l'espace consultant ?")) {
      try {
        await remove(ref(db, `consultantDocs/${id}`));
      } catch (error) {
        console.error("Erreur lors de la suppression du document.", error);
      }
    }
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

            {/* --- Formulaire d'ajout pour le MJ --- */}
            <div class="mb-8 p-6 border border-(--border) bg-black/20">
              <h4 class="text-xs uppercase tracking-wider text-(--accent) mb-4">Ajouter un document</h4>
              <form onSubmit={handleAddDocument} class="flex gap-4">
                <input
                  type="text"
                  placeholder="Titre du rapport"
                  value={newTitle}
                  onInput={(e) => setNewTitle(e.target.value)}
                  class="flex-1 bg-transparent border border-(--border) px-3 py-2 text-sm text-(--fg) outline-none"
                />
                <input
                  type="url"
                  placeholder="URL du PDF (Cloudinary, Drive...)"
                  value={newUrl}
                  onInput={(e) => setNewUrl(e.target.value)}
                  class="flex-1 bg-transparent border border-(--border) px-3 py-2 text-sm text-(--fg) outline-none"
                />
                <button type="submit" class="text-xs border border-(--accent) text-(--accent) px-4 hover:bg-(--accent) hover:text-(--bg) transition-colors">
                  Publier
                </button>
              </form>
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
                    {/* Bouton de suppression */}
                    <button
                      onClick={() => handleDeleteDocument(pdf.id)}
                      class="absolute top-4 right-4 text-(--muted) hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Supprimer
                    </button>

                   <div class="flex flex-col pr-8">
                      <span class="text-[10px] text-(--accent) uppercase mb-1">{pdf.date}</span>
                      <div class="flex justify-between items-center">
                        <h4 class="font-display text-xl text-(--fg)">{pdf.title}</h4>
                        <a
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-xs text-(--muted) hover:text-(--fg) underline"
                        >
                          Ouvrir ↗
                        </a>
                      </div>
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
