import { Lieu, Organisateur, Evenement, Billet, VenteHistorique, ReclamationEvenement } from '../models/evenements.model';

// ─── LIEUX ──────────────────────────────────────────────────
export const MOCK_LIEUX: Lieu[] = [
  { id: 1, nom: 'Stade Prince Louis Rwagasore', ville: 'Bujumbura', adresse: 'Avenue du Stade, Bujumbura', type: 'Stade', capaciteMax: 22000, statut: 'ACTIF' },
  { id: 2, nom: 'Palais des Congrès de Kigobe', ville: 'Bujumbura', adresse: 'Kigobe, Bujumbura', type: 'Salle de conférence', capaciteMax: 1200, statut: 'ACTIF' },
  { id: 3, nom: 'Esplanade du Lac Tanganyika', ville: 'Bujumbura', adresse: 'Plage de Bujumbura', type: 'Plein air', capaciteMax: 8000, statut: 'ACTIF' },
  { id: 4, nom: 'Salle Kigobe Événements', ville: 'Bujumbura', adresse: 'Kigobe Nord, Bujumbura', type: 'Salle de concert', capaciteMax: 2500, statut: 'ACTIF' },
  { id: 5, nom: 'Stade de Gitega', ville: 'Gitega', adresse: 'Centre-ville, Gitega', type: 'Stade', capaciteMax: 9000, statut: 'INACTIF' }
];

// ─── ORGANISATEURS ──────────────────────────────────────────
export const MOCK_ORGANISATEURS: Organisateur[] = [
  { id: 1, nom: 'Nkurunziza', prenom: 'Alexis', telephone: '+257 79 600 001', adresse: 'Quartier Rohero, Bujumbura', entreprise: 'Fédération Burundaise de Football', email: 'a.nkurunziza@fbf.bi', statut: 'ACTIF', nombreEvenements: 18, revenuTotal: 42500000, dateInscription: new Date('2022-03-01') },
  { id: 2, nom: 'Hakizimana', prenom: 'Claudine', telephone: '+257 79 600 002', adresse: 'Quartier Kinindo, Bujumbura', entreprise: 'Burundi Live Events', email: 'claudine.h@blevents.bi', statut: 'ACTIF', nombreEvenements: 25, revenuTotal: 68200000, dateInscription: new Date('2021-08-15') },
  { id: 3, nom: 'Ndayishimiye', prenom: 'Eric', telephone: '+257 79 600 003', adresse: 'Quartier Kabondo, Gitega', entreprise: 'Gitega Culture & Arts', email: 'eric.n@gitegaculture.bi', statut: 'ACTIF', nombreEvenements: 9, revenuTotal: 15300000, dateInscription: new Date('2023-01-20') },
  { id: 4, nom: 'Irakoze', prenom: 'Divine', telephone: '+257 79 600 004', adresse: 'Quartier Kanyosha, Bujumbura', entreprise: 'DI Productions', email: 'divine.i@diprod.bi', statut: 'INACTIF', nombreEvenements: 4, revenuTotal: 3200000, dateInscription: new Date('2024-05-02') }
];

// ─── ÉVÉNEMENTS ─────────────────────────────────────────────
const dansNJours = (n: number) => new Date(Date.now() + n * 24 * 3600000);
const ilYANJours = (n: number) => new Date(Date.now() - n * 24 * 3600000);

export const MOCK_EVENEMENTS: Evenement[] = [
  {
    id: 1, nom: 'Burundi vs Ouganda — Éliminatoires CAN', type: 'MATCH', lieuId: 1, organisateurId: 1,
    dateDebut: dansNJours(2), dateFin: dansNJours(2), description: 'Match éliminatoire pour la Coupe d\'Afrique des Nations.',
    capaciteTotale: 22000,
    categoriesBillets: [
      { nom: 'Populaire', prix: 5000, quantiteDisponible: 15000, quantiteVendue: 11200 },
      { nom: 'Tribune', prix: 12000, quantiteDisponible: 5000, quantiteVendue: 4100 },
      { nom: 'VIP', prix: 30000, quantiteDisponible: 2000, quantiteVendue: 950 }
    ],
    statut: 'PROGRAMME', dateCreation: ilYANJours(20)
  },
  {
    id: 2, nom: 'Concert Khadja Nin — Retour aux sources', type: 'CONCERT', lieuId: 3, organisateurId: 2,
    dateDebut: dansNJours(5), dateFin: dansNJours(5), description: 'Concert exceptionnel au bord du lac Tanganyika.',
    capaciteTotale: 8000,
    categoriesBillets: [
      { nom: 'Standard', prix: 15000, quantiteDisponible: 6000, quantiteVendue: 3800 },
      { nom: 'Premium', prix: 35000, quantiteDisponible: 2000, quantiteVendue: 1450 }
    ],
    statut: 'PROGRAMME', dateCreation: ilYANJours(15)
  },
  {
    id: 3, nom: 'Sommet Numérique Burundi 2026', type: 'CONFERENCE', lieuId: 2, organisateurId: 2,
    dateDebut: new Date(Date.now() - 3 * 3600000), dateFin: new Date(Date.now() + 5 * 3600000), description: 'Conférence sur l\'innovation numérique et le paiement mobile.',
    capaciteTotale: 1200,
    categoriesBillets: [
      { nom: 'Standard', prix: 20000, quantiteDisponible: 900, quantiteVendue: 860 },
      { nom: 'VIP', prix: 50000, quantiteDisponible: 300, quantiteVendue: 275 }
    ],
    statut: 'EN_COURS', dateCreation: ilYANJours(30)
  },
  {
    id: 4, nom: 'Festival Kigobe Nights', type: 'FESTIVAL', lieuId: 4, organisateurId: 3,
    dateDebut: ilYANJours(10), dateFin: ilYANJours(9), description: 'Festival de musique urbaine et traditionnelle.',
    capaciteTotale: 2500,
    categoriesBillets: [
      { nom: 'Standard', prix: 8000, quantiteDisponible: 2000, quantiteVendue: 1980 },
      { nom: 'VIP', prix: 20000, quantiteDisponible: 500, quantiteVendue: 500 }
    ],
    statut: 'TERMINE', dateCreation: ilYANJours(40)
  },
  {
    id: 5, nom: 'Gala de Charité Gitega', type: 'AUTRE', lieuId: 5, organisateurId: 3,
    dateDebut: dansNJours(12), dateFin: dansNJours(12), description: 'Soirée de levée de fonds pour les écoles rurales.',
    capaciteTotale: 800,
    categoriesBillets: [
      { nom: 'Standard', prix: 25000, quantiteDisponible: 600, quantiteVendue: 120 },
      { nom: 'Table VIP', prix: 150000, quantiteDisponible: 20, quantiteVendue: 4 }
    ],
    statut: 'ANNULE', dateCreation: ilYANJours(8)
  },
  {
    id: 6, nom: 'Match Amical — Vital\'O vs LLB', type: 'MATCH', lieuId: 1, organisateurId: 1,
    dateDebut: dansNJours(20), dateFin: dansNJours(20), description: 'Match amical de préparation.',
    capaciteTotale: 22000,
    categoriesBillets: [
      { nom: 'Populaire', prix: 3000, quantiteDisponible: 18000, quantiteVendue: 420 },
      { nom: 'Tribune', prix: 8000, quantiteDisponible: 4000, quantiteVendue: 90 }
    ],
    statut: 'PROGRAMME', dateCreation: ilYANJours(2)
  }
];

// ─── BILLETS (VENTES EN TEMPS RÉEL) ──────────────────────────
export const MOCK_BILLETS: Billet[] = [
  { id: 1, numeroReference: 'BIL-7001', evenementId: 1, categorieNom: 'Tribune', clientNom: 'Ndayikeza Gilbert', clientTelephone: '+257 79 700 001', prix: 12000, statut: 'PAYE', dateAchat: new Date(Date.now() - 40 * 60000) },
  { id: 2, numeroReference: 'BIL-7002', evenementId: 1, categorieNom: 'VIP', clientNom: 'Bukuru Salomé', clientTelephone: '+257 79 700 002', prix: 30000, statut: 'PAYE', dateAchat: new Date(Date.now() - 25 * 60000) },
  { id: 3, numeroReference: 'BIL-7003', evenementId: 3, categorieNom: 'Standard', clientNom: 'Nzeyimana Aline', clientTelephone: '+257 79 700 003', prix: 20000, statut: 'UTILISE', dateAchat: new Date(Date.now() - 5 * 3600000), dateUtilisation: new Date(Date.now() - 2 * 3600000) },
  { id: 4, numeroReference: 'BIL-7004', evenementId: 3, categorieNom: 'VIP', clientNom: 'Manirakiza Fabrice', clientTelephone: '+257 79 700 004', prix: 50000, statut: 'UTILISE', dateAchat: new Date(Date.now() - 6 * 3600000), dateUtilisation: new Date(Date.now() - 1 * 3600000) },
  { id: 5, numeroReference: 'BIL-7005', evenementId: 2, categorieNom: 'Premium', clientNom: 'Irambona Christelle', clientTelephone: '+257 79 700 005', prix: 35000, statut: 'RESERVE', dateAchat: new Date(Date.now() - 10 * 60000) },
  { id: 6, numeroReference: 'BIL-7006', evenementId: 2, categorieNom: 'Standard', clientNom: 'Bigirimana Yves', clientTelephone: '+257 79 700 006', prix: 15000, statut: 'PAYE', dateAchat: new Date(Date.now() - 55 * 60000) },
  { id: 7, numeroReference: 'BIL-7007', evenementId: 1, categorieNom: 'Populaire', clientNom: 'Havyarimana Nadine', clientTelephone: '+257 79 700 007', prix: 5000, statut: 'ANNULE', dateAchat: new Date(Date.now() - 120 * 60000) },
  { id: 8, numeroReference: 'BIL-7008', evenementId: 3, categorieNom: 'Standard', clientNom: 'Ndikumana Pacifique', clientTelephone: '+257 79 700 008', prix: 20000, statut: 'PAYE', dateAchat: new Date(Date.now() - 3 * 60000) }
];

// ─── HISTORIQUE DES VENTES (pour l'historique par événement + rapports) ────
function genererHistorique(): VenteHistorique[] {
  const historique: VenteHistorique[] = [];
  let id = 1;
  const now = Date.now();
  const jour = 24 * 3600000;

  const configs = [
    { evenementId: 1, categorie: 'Populaire', prix: 5000 },
    { evenementId: 1, categorie: 'Tribune', prix: 12000 },
    { evenementId: 1, categorie: 'VIP', prix: 30000 },
    { evenementId: 2, categorie: 'Standard', prix: 15000 },
    { evenementId: 2, categorie: 'Premium', prix: 35000 },
    { evenementId: 3, categorie: 'Standard', prix: 20000 },
    { evenementId: 3, categorie: 'VIP', prix: 50000 },
    { evenementId: 4, categorie: 'Standard', prix: 8000 },
    { evenementId: 4, categorie: 'VIP', prix: 20000 }
  ];

  for (const cfg of configs) {
    for (let j = 0; j < 16; j++) {
      const quantite = 1 + Math.floor(Math.random() * 4);
      historique.push({
        id: id++,
        evenementId: cfg.evenementId,
        categorieNom: cfg.categorie,
        date: new Date(now - Math.floor(Math.random() * 25 * jour) - j * 3 * 3600000),
        quantite,
        revenu: quantite * cfg.prix,
        statut: Math.random() > 0.06 ? 'VALIDE' : 'ANNULE'
      });
    }
  }

  return historique.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export const MOCK_HISTORIQUE_VENTES: VenteHistorique[] = genererHistorique();

// ─── RÉCLAMATIONS ────────────────────────────────────────────
export const MOCK_RECLAMATIONS_EVENEMENTS: ReclamationEvenement[] = [
  { id: 1, evenementId: 1, type: 'BILLET_INVALIDE', description: 'Un billet VIP a été refusé au contrôle malgré un paiement confirmé.', statut: 'EN_COURS', dateSignalement: new Date(Date.now() - 2 * 3600000) },
  { id: 2, evenementId: 3, type: 'PROBLEME_ACCES', description: 'File d\'attente très longue à l\'entrée principale de la conférence.', statut: 'OUVERT', dateSignalement: new Date(Date.now() - 1 * 3600000) },
  { id: 3, evenementId: 4, type: 'RECLAMATION', description: 'Retard de 30 minutes au démarrage du festival.', statut: 'RESOLU', dateSignalement: new Date(Date.now() - 30 * 3600000) }
];
