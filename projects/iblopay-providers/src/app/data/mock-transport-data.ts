import { Vehicule, Chauffeur, LigneBus, ZoneTaxi, Course, IncidentTransport, TrajetHistorique } from '../models/transport.model';

// ─── LIGNES DE BUS ──────────────────────────────────────────
export const MOCK_LIGNES_BUS: LigneBus[] = [
  { id: 1, nom: 'Ligne A — Centre-ville', code: 'LGA', arrets: ['Marché Central', 'Rohero', 'Mutanga Nord', 'Kinindo'], tarif: 800, distanceKm: 12, dureeMinutesEstimee: 35, frequenceMinutes: 15, statut: 'ACTIVE' },
  { id: 2, nom: 'Ligne B — Kanyosha', code: 'LGB', arrets: ['Marché Central', 'Musaga', 'Kanyosha', 'Kajiji'], tarif: 900, distanceKm: 15, dureeMinutesEstimee: 40, frequenceMinutes: 20, statut: 'ACTIVE' },
  { id: 3, nom: 'Ligne C — Kamenge', code: 'LGC', arrets: ['Marché Central', 'Buyenzi', 'Ngagara', 'Kamenge'], tarif: 700, distanceKm: 9, dureeMinutesEstimee: 25, frequenceMinutes: 12, statut: 'ACTIVE' },
  { id: 4, nom: 'Ligne D — Gitega', code: 'LGD', arrets: ['Gitega Centre', 'Nyamugari', 'Shombo'], tarif: 1500, distanceKm: 28, dureeMinutesEstimee: 55, frequenceMinutes: 30, statut: 'INACTIVE' }
];

// ─── ZONES TAXI ─────────────────────────────────────────────
export const MOCK_ZONES_TAXI: ZoneTaxi[] = [
  { id: 1, nom: 'Zone Centre-ville', tarification: 'COMPTEUR', tarifBase: 2000, tarifParKm: 800, statut: 'ACTIVE' },
  { id: 2, nom: 'Zone Aéroport', tarification: 'FORFAIT', tarifBase: 15000, forfaitMoyen: 15000, statut: 'ACTIVE' },
  { id: 3, nom: 'Zone Gitega', tarification: 'COMPTEUR', tarifBase: 1500, tarifParKm: 600, statut: 'ACTIVE' }
];

// ─── CHAUFFEURS ─────────────────────────────────────────────
export const MOCK_CHAUFFEURS: Chauffeur[] = [
  { id: 1, nom: 'Nshimirimana', prenom: 'Pascal', telephone: '+257 79 200 001', adresse: 'Quartier Buyenzi, Bujumbura', numeroPermis: 'BDI-PC-10234', permisValidite: new Date('2027-03-15'), vehiculeId: 1, statut: 'ACTIF', note: 4.6, nombreCourses: 1240, revenuTotal: 992000, dateEmbauche: new Date('2023-02-01') },
  { id: 2, nom: 'Barakana', prenom: 'Emmanuel', telephone: '+257 79 200 002', adresse: 'Quartier Ngagara, Bujumbura', numeroPermis: 'BDI-PC-10891', permisValidite: new Date('2026-11-20'), vehiculeId: 2, statut: 'ACTIF', note: 4.3, nombreCourses: 980, revenuTotal: 882000, dateEmbauche: new Date('2023-05-14') },
  { id: 3, nom: 'Ndikumana', prenom: 'Joseline', telephone: '+257 79 200 003', adresse: 'Quartier Kinindo, Bujumbura', numeroPermis: 'BDI-PC-11023', permisValidite: new Date('2026-08-01'), vehiculeId: 3, statut: 'ACTIF', note: 4.8, nombreCourses: 1510, revenuTotal: 1057000, dateEmbauche: new Date('2022-09-10') },
  { id: 4, nom: 'Hatungimana', prenom: 'Willy', telephone: '+257 79 200 004', adresse: 'Quartier Musaga, Bujumbura', numeroPermis: 'BDI-PC-11455', permisValidite: new Date('2025-12-05'), vehiculeId: 4, statut: 'ACTIF', note: 4.1, nombreCourses: 640, revenuTotal: 448000, dateEmbauche: new Date('2024-01-20') },
  { id: 5, nom: 'Irakoze', prenom: 'Sandrine', telephone: '+257 79 300 005', adresse: 'Quartier Rohero, Bujumbura', numeroPermis: 'BDI-PC-20044', permisValidite: new Date('2027-06-10'), vehiculeId: 5, statut: 'ACTIF', note: 4.7, nombreCourses: 2100, revenuTotal: 18900000, dateEmbauche: new Date('2021-11-03') },
  { id: 6, nom: 'Manirakiza', prenom: 'David', telephone: '+257 79 300 006', adresse: 'Quartier Kamenge, Bujumbura', numeroPermis: 'BDI-PC-20567', permisValidite: new Date('2026-04-18'), vehiculeId: 6, statut: 'ACTIF', note: 4.4, nombreCourses: 1780, revenuTotal: 14240000, dateEmbauche: new Date('2022-07-22') },
  { id: 7, nom: 'Bigirimana', prenom: 'Alice', telephone: '+257 79 300 007', adresse: 'Quartier Mutanga, Bujumbura', numeroPermis: 'BDI-PC-20892', permisValidite: new Date('2025-09-30'), statut: 'INACTIF', note: 4.0, nombreCourses: 320, revenuTotal: 2560000, dateEmbauche: new Date('2024-03-11') }
];

// ─── VÉHICULES (BUS + TAXIS) ────────────────────────────────
export const MOCK_VEHICULES: Vehicule[] = [
  { id: 1, type: 'BUS', matricule: 'BJ-2201-A', marqueModele: 'Toyota Coaster', capacite: 30, statut: 'EN_SERVICE', chauffeurId: 1, ligneId: 1, kilometrage: 84500, motorisation: 'DIESEL', consommationMoyenne100km: 19.5, dateDerniereMaintenance: new Date('2026-06-01'), prochaineMaintenanceKm: 90000, dateMiseEnService: new Date('2023-01-15') },
  { id: 2, type: 'BUS', matricule: 'BJ-2202-A', marqueModele: 'Toyota Coaster', capacite: 30, statut: 'EN_SERVICE', chauffeurId: 2, ligneId: 2, kilometrage: 102300, motorisation: 'DIESEL', consommationMoyenne100km: 20.2, dateDerniereMaintenance: new Date('2026-05-12'), prochaineMaintenanceKm: 108000, dateMiseEnService: new Date('2022-11-02') },
  { id: 3, type: 'BUS', matricule: 'BJ-2203-A', marqueModele: 'Isuzu NPR', capacite: 24, statut: 'EN_SERVICE', chauffeurId: 3, ligneId: 3, kilometrage: 65400, motorisation: 'DIESEL', consommationMoyenne100km: 17.8, dateDerniereMaintenance: new Date('2026-07-05'), prochaineMaintenanceKm: 72000, dateMiseEnService: new Date('2023-06-20') },
  { id: 4, type: 'BUS', matricule: 'BJ-2204-A', marqueModele: 'Toyota Coaster', capacite: 30, statut: 'EN_PANNE', chauffeurId: 4, ligneId: 1, kilometrage: 118900, motorisation: 'DIESEL', consommationMoyenne100km: 21.4, dateDerniereMaintenance: new Date('2026-03-22'), prochaineMaintenanceKm: 120000, dateMiseEnService: new Date('2021-09-08') },
  { id: 5, type: 'TAXI', matricule: 'BJ-5011-T', marqueModele: 'Toyota Corolla', statut: 'EN_COURSE', chauffeurId: 5, zoneId: 1, kilometrage: 56200, motorisation: 'ESSENCE', consommationMoyenne100km: 7.6, dateDerniereMaintenance: new Date('2026-07-18'), prochaineMaintenanceKm: 60000, dateMiseEnService: new Date('2023-04-01') },
  { id: 6, type: 'TAXI', matricule: 'BJ-5012-T', marqueModele: 'Toyota Vitz', statut: 'DISPONIBLE', chauffeurId: 6, zoneId: 1, kilometrage: 71800, motorisation: 'ESSENCE', consommationMoyenne100km: 6.9, dateDerniereMaintenance: new Date('2026-06-25'), prochaineMaintenanceKm: 78000, dateMiseEnService: new Date('2022-12-14') },
  { id: 7, type: 'TAXI', matricule: 'BJ-5013-T', marqueModele: 'Toyota Corolla', statut: 'DISPONIBLE', zoneId: 2, kilometrage: 38900, motorisation: 'ESSENCE', consommationMoyenne100km: 7.8, dateDerniereMaintenance: new Date('2026-07-01'), prochaineMaintenanceKm: 45000, dateMiseEnService: new Date('2024-02-10') },
  { id: 8, type: 'TAXI', matricule: 'BJ-5014-T', marqueModele: 'Toyota Vitz', statut: 'EN_MAINTENANCE', zoneId: 3, kilometrage: 94500, motorisation: 'ESSENCE', consommationMoyenne100km: 7.1, dateDerniereMaintenance: new Date('2026-08-10'), prochaineMaintenanceKm: 96000, dateMiseEnService: new Date('2021-05-19') },
  { id: 9, type: 'BUS', matricule: 'BJ-2205-A', marqueModele: 'Isuzu NPR', capacite: 24, statut: 'AU_DEPOT', ligneId: 3, kilometrage: 12300, motorisation: 'DIESEL', consommationMoyenne100km: 18.1, dateDerniereMaintenance: new Date('2026-08-01'), prochaineMaintenanceKm: 20000, dateMiseEnService: new Date('2026-01-05') },
  { id: 10, type: 'TAXI', matricule: 'BJ-5015-T', marqueModele: 'Nissan Leaf (électrique)', statut: 'DISPONIBLE', zoneId: 1, kilometrage: 21400, motorisation: 'ELECTRIQUE', consommationMoyenne100km: 15.2, dateDerniereMaintenance: new Date('2026-07-28'), prochaineMaintenanceKm: 30000, dateMiseEnService: new Date('2024-08-12') }
];

// ─── COURSES (BUS + TAXIS) ──────────────────────────────────
export const MOCK_COURSES: Course[] = [
  { id: 1, numeroReference: 'CRS-9001', type: 'TAXI', clientNom: 'Ndayishimiye Jean', clientTelephone: '+257 79 400 001', vehiculeId: 5, chauffeurId: 5, depart: 'Avenue de la Mission, Rohero', destination: 'Aéroport International de Bujumbura', distanceKm: 11, prix: 10800, statut: 'EN_COURS', progression: 62, dateDemande: new Date(Date.now() - 18 * 60000), dateDebut: new Date(Date.now() - 12 * 60000) },
  { id: 2, numeroReference: 'CRS-9002', type: 'TAXI', clientNom: 'Bukuru Marie', clientTelephone: '+257 79 400 002', vehiculeId: 6, chauffeurId: 6, depart: 'Marché Central', destination: 'Quartier Kinindo', distanceKm: 6, prix: 6800, statut: 'DEMANDE', progression: 0, dateDemande: new Date(Date.now() - 2 * 60000) },
  { id: 3, numeroReference: 'CRS-9003', type: 'BUS', clientNom: 'Passagers Ligne A', clientTelephone: '-', vehiculeId: 1, chauffeurId: 1, ligneId: 1, depart: 'Marché Central', destination: 'Kinindo', distanceKm: 12, prix: 800, statut: 'EN_COURS', progression: 40, dateDemande: new Date(Date.now() - 25 * 60000), dateDebut: new Date(Date.now() - 20 * 60000) },
  { id: 4, numeroReference: 'CRS-9004', type: 'BUS', clientNom: 'Passagers Ligne C', clientTelephone: '-', vehiculeId: 3, chauffeurId: 3, ligneId: 3, depart: 'Marché Central', destination: 'Kamenge', distanceKm: 9, prix: 700, statut: 'EN_COURS', progression: 85, dateDemande: new Date(Date.now() - 22 * 60000), dateDebut: new Date(Date.now() - 18 * 60000) },
  { id: 5, numeroReference: 'CRS-8998', type: 'TAXI', clientNom: 'Hakizimana Eric', clientTelephone: '+257 79 400 003', vehiculeId: 5, chauffeurId: 5, depart: 'Quartier Buyenzi', destination: 'Quartier Musaga', distanceKm: 8, prix: 8400, statut: 'TERMINEE', progression: 100, dateDemande: new Date(Date.now() - 90 * 60000), dateDebut: new Date(Date.now() - 85 * 60000), dateFin: new Date(Date.now() - 60 * 60000) },
  { id: 6, numeroReference: 'CRS-8995', type: 'TAXI', clientNom: 'Niyonzima Alice', clientTelephone: '+257 79 400 004', destination: 'Quartier Ngagara', depart: 'Quartier Rohero', distanceKm: 5, prix: 6000, statut: 'ANNULEE', progression: 0, dateDemande: new Date(Date.now() - 120 * 60000) },
  { id: 7, numeroReference: 'CRS-9005', type: 'TAXI', clientNom: 'Irakoze Patrick', clientTelephone: '+257 79 400 005', depart: 'Quartier Kanyosha', destination: 'Marché Central', distanceKm: 7, prix: 7600, statut: 'ACCEPTEE', progression: 5, dateDemande: new Date(Date.now() - 4 * 60000) },
  { id: 8, numeroReference: 'CRS-9006', type: 'BUS', clientNom: 'Passagers Ligne B', clientTelephone: '-', vehiculeId: 2, chauffeurId: 2, ligneId: 2, depart: 'Marché Central', destination: 'Kajiji', distanceKm: 15, prix: 900, statut: 'EN_COURS', progression: 20, dateDemande: new Date(Date.now() - 8 * 60000), dateDebut: new Date(Date.now() - 5 * 60000) }
];

// ─── HISTORIQUE DES TRAJETS (pour l'historique par ligne/zone + rapports) ────
function genererHistorique(): TrajetHistorique[] {
  const historique: TrajetHistorique[] = [];
  let id = 1;
  const now = Date.now();
  const jour = 24 * 3600000;

  // Bus : lignes 1, 2, 3 (actives) — 3 véhicules/chauffeurs correspondants
  const busConfig: { ligneId: number; vehiculeId: number; chauffeurId: number; tarif: number }[] = [
    { ligneId: 1, vehiculeId: 1, chauffeurId: 1, tarif: 800 },
    { ligneId: 2, vehiculeId: 2, chauffeurId: 2, tarif: 900 },
    { ligneId: 3, vehiculeId: 3, chauffeurId: 3, tarif: 700 }
  ];
  for (const cfg of busConfig) {
    for (let j = 0; j < 25; j++) {
      const passagers = 12 + Math.floor(Math.random() * 18);
      historique.push({
        id: id++, ligneId: cfg.ligneId, type: 'BUS', vehiculeId: cfg.vehiculeId, chauffeurId: cfg.chauffeurId,
        date: new Date(now - Math.floor(Math.random() * 20 * jour) - j * 3 * 3600000),
        dureeMinutes: 25 + Math.floor(Math.random() * 20),
        passagers,
        revenu: passagers * cfg.tarif,
        statut: Math.random() > 0.05 ? 'TERMINE' : 'ANNULE'
      });
    }
  }

  // Taxi : zones 1, 2, 3 — véhicules 5, 6, 7
  const taxiConfig: { zoneId: number; vehiculeId: number; chauffeurId: number }[] = [
    { zoneId: 1, vehiculeId: 5, chauffeurId: 5 },
    { zoneId: 1, vehiculeId: 6, chauffeurId: 6 },
    { zoneId: 2, vehiculeId: 7, chauffeurId: 5 }
  ];
  for (const cfg of taxiConfig) {
    for (let j = 0; j < 20; j++) {
      const distance = 3 + Math.floor(Math.random() * 12);
      historique.push({
        id: id++, zoneId: cfg.zoneId, type: 'TAXI', vehiculeId: cfg.vehiculeId, chauffeurId: cfg.chauffeurId,
        date: new Date(now - Math.floor(Math.random() * 20 * jour) - j * 4 * 3600000),
        dureeMinutes: 10 + Math.floor(Math.random() * 25),
        passagers: 1 + Math.floor(Math.random() * 3),
        revenu: 2000 + distance * 800,
        statut: Math.random() > 0.08 ? 'TERMINE' : 'ANNULE'
      });
    }
  }

  return historique.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export const MOCK_HISTORIQUE_TRAJETS: TrajetHistorique[] = genererHistorique();

// ─── INCIDENTS ──────────────────────────────────────────────
export const MOCK_INCIDENTS_TRANSPORT: IncidentTransport[] = [
  { id: 1, vehiculeId: 4, type: 'PANNE', description: 'Panne moteur signalée sur l\'Avenue du Peuple Murundi — bus immobilisé.', statut: 'EN_COURS', dateSignalement: new Date(Date.now() - 3 * 3600000) },
  { id: 2, vehiculeId: 8, type: 'RETARD', description: 'Taxi indisponible en raison d\'un entretien programmé plus long que prévu.', statut: 'OUVERT', dateSignalement: new Date(Date.now() - 5 * 3600000) },
  { id: 3, vehiculeId: 2, type: 'RECLAMATION', description: 'Passager signale un dépassement d\'horaire de 20 minutes sur la Ligne B.', statut: 'RESOLU', dateSignalement: new Date(Date.now() - 26 * 3600000) }
];
