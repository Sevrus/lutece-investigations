import {useEffect, useState} from "preact/hooks";
import { ref, onValue, set } from "firebase/database";
import { db } from "../../firebase";
import AccentLine from "../common/AccentLine";
import Reveal from "../common/Reveal";
import CharSheetModal from "../modals/CharSheetModal";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import rawTeamData from "../../data/team.json";

export default function Team() {
  const [members, setMembers] = useState(() => rawTeamData.map((m) => ({ ...m })));
  const [selectedId, setSelectedId] = useState(null);

  const selectedMember = members.find((m) => m.id === selectedId) || null;

  useEffect(() => {
    const teamRef = ref(db, 'teamStatus');
    const unsubscribe = onValue(teamRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMembers((prev) =>
          prev.map((m) => (data[m.id] ? { ...m, status: data[m.id] } : m))
        );
      }
    });

    return () => unsubscribe();
  }, []);

  const openCharSheet = (id) => {
    const member = members.find((m) => m.id === id);
    if (!member || !member.operational) return;
    setSelectedId(id);
  };

  const closeCharSheet = () => setSelectedId(null);

const toggleMission = async (id) => {
    const member = members.find((m) => m.id === id);
    if (!member) return;

    const newStatus = member.status === "Disponible" ? "En mission" : "Disponible";

    try {
        await set(ref(db, `teamStatus/${id}`), newStatus);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  return (
    <section class="py-24 lg:py-32 bg-(--bg) relative" id="equipe">
      <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-(--border) to-transparent"></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal className="text-center mb-16 lg:mb-20">
          <AccentLine className="mx-auto" />
          <p class="text-(--accent) tracking-[0.4em] uppercase text-xs mt-6 mb-4">
            Notre Équipe
          </p>
          <h2 class="font-display text-4xl lg:text-5xl font-semibold">
            Des experts à votre service
          </h2>
          <p class="text-(--muted) mt-6 max-w-2xl mx-auto">
            Une équipe pluridisciplinaire composée d'anciennes forces de l'ordre,
            juristes et spécialistes de l'investigation, tous formés aux méthodes
            les plus rigoureuses.
          </p>
        </Reveal>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" id="teamGrid">
          {members.map((member) => (
            <TeamCard key={member.id} member={member} onOpen={openCharSheet} />
          ))}
        </div>
      </div>

      <CharSheetModal
        member={selectedMember}
        onClose={closeCharSheet}
        onToggleMission={toggleMission}
      />
    </section>
  );
}

function TeamCard({ member, onOpen }) {
  const ref = useScrollReveal();

  const gridClasses = member.id === 'marc'
    ? 'lg:col-span-2 lg:row-span-2'
    : '';

  const blurClass = member.status === "En mission" ? "mission-blur" : "";
  const cursorClass = member.operational ? "cursor-pointer" : "cursor-default";
  const isTall = member.lgRowSpan === 2;

  const statusClass =
    member.status === "Disponible"
      ? "border-[var(--accent)] text-[var(--accent)]"
      : "border-red-500 text-red-500";

  return (
    <div
      ref={ref}
      class={`team-card reveal ${gridClasses} ${cursorClass}`}
      onClick={member.operational ? () => onOpen(member.id) : undefined}
    >
      <div class={`h-48 overflow-hidden relative ${isTall ? "lg:h-80" : ""}`}>
        {member.operational && (
          <div
            id={`status-${member.id}`}
            class={`absolute top-4 left-4 z-10 text-[9px] uppercase tracking-widest px-2 py-1 border bg-(--bg) ${statusClass}`}
          >
            {member.status}
          </div>
        )}
          <div
            id={`location-${member.id}`}
            class={`absolute top-4 right-4 z-10 text-[9px] uppercase tracking-widest px-2 py-1 border bg-(--bg)`}
          >
            {member.location}
          </div>
        <img
          id={`img-${member.id}`}
          src={`/${member.image}`}
          alt={member.nom}
          class={`w-full h-full object-cover transition-filter duration-500 ${blurClass}`}
        />
      </div>
      <div class={`p-6 lg:p-8 ${isTall ? "lg:p-8" : ""}`}>
        <p class="text-(--accent) text-xs tracking-[0.3em] uppercase mb-2">
          {member.role}
        </p>
        <h3 class={`font-display text-xl ${isTall ? "lg:text-3xl" : ""} mb-3`}>
          {member.nom}
        </h3>
        <p class="text-(--muted) text-sm leading-relaxed description">
          {member.description}
        </p>
        {member.specialites && member.specialites.length > 0 && (
          <div class="flex flex-wrap gap-4 mt-6">
            {member.specialites.map((s) => (
              <span
                key={s}
                class="text-xs text-(--muted) px-3 py-1 border border-(--border)"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
