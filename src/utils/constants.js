export const CODE_ACCES = "1234";

export const STORAGE_KEY = "lutece_consultant_docs";

export const defaultDocs = () => [
  {
    id: Date.now() - 1000,
    date: new Date().toLocaleString("fr-FR"),
    title: "Dossier #402 - Filature Secteur XVI",
    type: "Rapport d'enquête",
    description:
      "Surveillance discrète menée du 10 au 14 août. Observation des déplacements et vérification des fréquentations.",
  },
  {
    id: Date.now(),
    date: new Date().toLocaleString("fr-FR"),
    title: "Audit Cyber - Entreprise Alpha",
    type: "Dossier confidentiel",
    description:
      "Analyse des traces numériques et identification des brèches de sécurité potentielles.",
  },
];

export const switchTextInButton = (status) =>
  status === "Disponible" ? "Assigner à une mission" : "Libérer du terrain";
