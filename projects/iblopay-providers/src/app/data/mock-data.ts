import { ServiceInstitution, Formulaire, SoumissionFormulaire, RendementGlobal, RendementParService, ServiceIndicateurs, Workflow, CompteUtilisateur } from '../models/provider.model';

// Génère une image d'aperçu de document factice (SVG en data-URI) — évite toute dépendance réseau.
function apercuDocument(texte: string, couleur = '#2563eb'): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='200'>
    <rect width='320' height='200' rx='10' fill='#eef2ff'/>
    <rect x='10' y='10' width='300' height='180' rx='8' fill='#ffffff' stroke='${couleur}' stroke-width='2'/>
    <circle cx='55' cy='60' r='22' fill='${couleur}' opacity='0.25'/>
    <rect x='95' y='45' width='170' height='10' rx='4' fill='${couleur}' opacity='0.35'/>
    <rect x='95' y='63' width='120' height='8' rx='4' fill='${couleur}' opacity='0.2'/>
    <rect x='30' y='100' width='260' height='8' rx='4' fill='#cbd5e1'/>
    <rect x='30' y='118' width='260' height='8' rx='4' fill='#cbd5e1'/>
    <rect x='30' y='136' width='180' height='8' rx='4' fill='#cbd5e1'/>
    <text x='160' y='178' font-family='Arial' font-size='12' fill='${couleur}' text-anchor='middle' font-weight='bold'>${texte}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export const MOCK_SERVICES: ServiceInstitution[] = [
  {
    id: 1, nom: 'Demande de certificat', code: 'CERT-001',
    description: 'Délivrance d\'un certificat administratif pour les citoyens.',
    categorie: 'Certificats', sousCategorie: 'Résidence', prix: 5000, devise: 'BIF',
    documentsRequis: ['Pièce d\'identité', 'Photo récente'],
    statut: 'ACTIF', formulaireId: 1, workflowId: 1,
    dateCreation: new Date('2025-03-10'), demandesRecues: 1240, demandesTraitees: 1180
  },
  {
    id: 2, nom: 'Demande d\'autorisation', code: 'AUTH-002',
    description: 'Autorisation d\'exercice d\'une activité réglementée.',
    categorie: 'Autorisations', sousCategorie: 'Commerce', prix: 15000, devise: 'BIF',
    documentsRequis: ['Pièce d\'identité', 'Justificatif de domicile', 'Plan d\'activité'],
    statut: 'ACTIF', formulaireId: 2, workflowId: 2,
    dateCreation: new Date('2025-04-02'), demandesRecues: 680, demandesTraitees: 520
  },
  {
    id: 3, nom: 'Demande de licence', code: 'LIC-003',
    description: 'Licence d\'exploitation commerciale.',
    categorie: 'Licences', sousCategorie: 'Exploitation', prix: 25000, devise: 'BIF',
    documentsRequis: ['Registre de commerce', 'Pièce d\'identité'],
    statut: 'ACTIF', formulaireId: 3, workflowId: 3,
    dateCreation: new Date('2025-05-18'), demandesRecues: 538, demandesTraitees: 403
  },
  {
    id: 4, nom: 'Demande d\'attestation', code: 'ATT-004',
    description: 'Attestation de résidence ou de situation.',
    categorie: 'Attestations', prix: 3000, devise: 'BIF',
    documentsRequis: ['Pièce d\'identité'],
    statut: 'BROUILLON', dateCreation: new Date('2026-07-01'), demandesRecues: 0, demandesTraitees: 0
  },
  {
    id: 5, nom: 'Abonnement transport urbain', code: 'TRANS-005',
    description: 'Abonnement mensuel pour le réseau de bus urbain.',
    categorie: 'Transport', sousCategorie: 'Ligne A — Centre-ville', prix: 12000, devise: 'BIF',
    documentsRequis: ['Pièce d\'identité', 'Photo récente'],
    statut: 'ACTIF', formulaireId: 4, workflowId: 4,
    dateCreation: new Date('2025-09-01'), demandesRecues: 3120, demandesTraitees: 2985
  }
];

export const MOCK_FORMULAIRES: Formulaire[] = [
  {
    id: 1, institutionId: 1, serviceId: 1, nom: 'Formulaire — Demande de certificat',
    code: 'FORM-CERT-001', version: 2, statut: 'PUBLIE', createdAt: new Date('2025-03-10'),
    champs: [
      { id: 'c1', typeChamp: 'TEXTE', label: 'Nom complet', code: 'nom_complet', obligatoire: true, ordre: 1 },
      { id: 'c2', typeChamp: 'TELEPHONE', label: 'Numéro téléphone', code: 'telephone', obligatoire: true, ordre: 2 },
      { id: 'c3', typeChamp: 'SELECT', label: 'Type de certificat', code: 'type_certificat', obligatoire: true, ordre: 3, configuration: { options: ['Naissance', 'Résidence', 'Célibat'] } },
      { id: 'c4', typeChamp: 'FICHIER', label: 'Pièce d\'identité', code: 'piece_identite', obligatoire: true, ordre: 4 }
    ]
  },
  {
    id: 2, institutionId: 1, serviceId: 2, nom: 'Formulaire — Demande d\'autorisation',
    code: 'FORM-AUTH-002', version: 1, statut: 'PUBLIE', createdAt: new Date('2025-04-02'),
    champs: [
      { id: 'c1', typeChamp: 'TEXTE', label: 'Nom de l\'entreprise', code: 'entreprise', obligatoire: true, ordre: 1 },
      { id: 'c2', typeChamp: 'ADRESSE', label: 'Adresse d\'exploitation', code: 'adresse', obligatoire: true, ordre: 2 },
      { id: 'c3', typeChamp: 'EMAIL', label: 'Email de contact', code: 'email', obligatoire: false, ordre: 3 }
    ]
  },
  {
    id: 4, institutionId: 1, serviceId: 5, nom: 'Formulaire — Abonnement transport',
    code: 'FORM-TRANS-005', version: 1, statut: 'PUBLIE', createdAt: new Date('2025-09-01'),
    champs: [
      { id: 'c1', typeChamp: 'TEXTE', label: 'Nom complet', code: 'nom_complet', obligatoire: true, ordre: 1 },
      { id: 'c2', typeChamp: 'SELECT', label: 'Ligne préférée', code: 'ligne', obligatoire: true, ordre: 2, configuration: { options: ['Ligne A — Centre-ville', 'Ligne B — Kanyosha', 'Ligne C — Kamenge'] } },
      { id: 'c3', typeChamp: 'FICHIER', label: 'Photo récente', code: 'photo', obligatoire: true, ordre: 3 }
    ]
  }
];

export const MOCK_SOUMISSIONS: SoumissionFormulaire[] = [
  {
    id: 1001, numeroReference: 'REQ-2026-1001', formulaireId: 1, serviceId: 1, serviceNom: 'Demande de certificat',
    utilisateurNom: 'Ndayishimiye Jean', utilisateurTelephone: '+257 79 000 001',
    statut: 'EN_VERIFICATION', etapeActuelle: 'Vérification',
    dateSoumission: new Date('2026-08-15'), dateMaj: new Date('2026-08-16'), montant: 5000, montantPaye: true,
    reponses: [
      { label: 'Type de certificat', valeur: 'Résidence', type: 'TEXTE' },
      { label: 'Pièce d\'identité', valeur: 'CNI_ndayishimiye.jpg', type: 'FICHIER', nomFichier: 'CNI_ndayishimiye.jpg', apercuUrl: apercuDocument('Pièce d\'identité') }
    ]
  },
  {
    id: 1002, numeroReference: 'REQ-2026-1002', formulaireId: 1, serviceId: 1, serviceNom: 'Demande de certificat',
    utilisateurNom: 'Niyonzima Alice', utilisateurTelephone: '+257 79 000 002',
    statut: 'TERMINE', etapeActuelle: 'Terminé',
    dateSoumission: new Date('2026-08-10'), dateMaj: new Date('2026-08-13'), montant: 5000, montantPaye: true,
    reponses: [
      { label: 'Type de certificat', valeur: 'Naissance', type: 'TEXTE' },
      { label: 'Pièce d\'identité', valeur: 'CNI_niyonzima.jpg', type: 'FICHIER', nomFichier: 'CNI_niyonzima.jpg', apercuUrl: apercuDocument('Pièce d\'identité', '#16a34a') }
    ]
  },
  {
    id: 1003, numeroReference: 'REQ-2026-1003', formulaireId: 2, serviceId: 2, serviceNom: 'Demande d\'autorisation',
    utilisateurNom: 'Hakizimana Eric', utilisateurTelephone: '+257 79 000 003',
    statut: 'EN_TRAITEMENT', etapeActuelle: 'Traitement',
    dateSoumission: new Date('2026-08-12'), dateMaj: new Date('2026-08-17'), montant: 15000, montantPaye: true,
    reponses: [
      { label: 'Nom de l\'entreprise', valeur: 'Ets Amahoro', type: 'TEXTE' },
      { label: 'Adresse d\'exploitation', valeur: 'Avenue de la Mission, Gitega', type: 'TEXTE' },
      { label: 'Justificatif de domicile', valeur: 'justificatif.pdf', type: 'FICHIER', nomFichier: 'justificatif.pdf', apercuUrl: apercuDocument('Justificatif domicile', '#7c3aed') }
    ]
  },
  {
    id: 1004, numeroReference: 'REQ-2026-1004', formulaireId: 1, serviceId: 1, serviceNom: 'Demande de certificat',
    utilisateurNom: 'Irakoze Patrick', utilisateurTelephone: '+257 79 000 004',
    statut: 'REJETE', etapeActuelle: 'Vérification',
    dateSoumission: new Date('2026-08-09'), dateMaj: new Date('2026-08-10'), montant: 5000, montantPaye: false,
    reponses: [
      { label: 'Type de certificat', valeur: 'Célibat', type: 'TEXTE' },
      { label: 'Pièce d\'identité', valeur: 'CNI_irakoze.jpg', type: 'FICHIER', nomFichier: 'CNI_irakoze.jpg', apercuUrl: apercuDocument('Pièce d\'identité', '#dc2626') }
    ]
  },
  {
    id: 1005, numeroReference: 'REQ-2026-1005', formulaireId: 3, serviceId: 3, serviceNom: 'Demande de licence',
    utilisateurNom: 'Bukuru Marie', utilisateurTelephone: '+257 79 000 005',
    statut: 'SOUMIS', etapeActuelle: 'Soumission',
    dateSoumission: new Date('2026-08-18'), dateMaj: new Date('2026-08-18'), montant: 25000, montantPaye: false,
    reponses: [
      { label: 'Registre de commerce', valeur: 'registre.pdf', type: 'FICHIER', nomFichier: 'registre.pdf', apercuUrl: apercuDocument('Registre de commerce', '#ea580c') }
    ]
  },
  {
    id: 1006, numeroReference: 'REQ-2026-1006', formulaireId: 2, serviceId: 2, serviceNom: 'Demande d\'autorisation',
    utilisateurNom: 'Nzeyimana Claude', utilisateurTelephone: '+257 79 000 006',
    statut: 'EN_VALIDATION', etapeActuelle: 'Validation',
    dateSoumission: new Date('2026-08-14'), dateMaj: new Date('2026-08-17'), montant: 15000, montantPaye: true,
    reponses: [{ label: 'Nom de l\'entreprise', valeur: 'Garage Nzeyimana', type: 'TEXTE' }]
  },
  {
    id: 1007, numeroReference: 'REQ-2026-1007', formulaireId: 4, serviceId: 5, serviceNom: 'Abonnement transport urbain',
    utilisateurNom: 'Ndayishimiye Jean', utilisateurTelephone: '+257 79 000 001',
    statut: 'TERMINE', etapeActuelle: 'Terminé',
    dateSoumission: new Date('2026-08-05'), dateMaj: new Date('2026-08-06'), montant: 12000, montantPaye: true,
    reponses: [
      { label: 'Ligne préférée', valeur: 'Ligne A — Centre-ville', type: 'TEXTE' },
      { label: 'Photo récente', valeur: 'photo_jean.jpg', type: 'FICHIER', nomFichier: 'photo_jean.jpg', apercuUrl: apercuDocument('Photo récente', '#0891b2') }
    ]
  },
  {
    id: 1008, numeroReference: 'REQ-2026-1008', formulaireId: 4, serviceId: 5, serviceNom: 'Abonnement transport urbain',
    utilisateurNom: 'Bukuru Marie', utilisateurTelephone: '+257 79 000 005',
    statut: 'EN_TRAITEMENT', etapeActuelle: 'Traitement',
    dateSoumission: new Date('2026-08-16'), dateMaj: new Date('2026-08-17'), montant: 12000, montantPaye: true,
    reponses: [{ label: 'Ligne préférée', valeur: 'Ligne B — Kanyosha', type: 'TEXTE' }]
  }
];

export const MOCK_RENDEMENT_GLOBAL: RendementGlobal = {
  demandesRecues: 2458,
  demandesTraitees: 2103,
  enAttente: 245,
  rejetees: 110,
  tempsMoyenTraitementJours: 2.4,
  tauxTraitement: 85.6,
  revenusGeneres: 18450000
};

export const MOCK_RENDEMENT_SERVICES: RendementParService[] = [
  { serviceId: 1, serviceNom: 'Certificat', demandes: 1240, traitees: 1180, enAttente: 60, tempsMoyenJours: 1.8 },
  { serviceId: 2, serviceNom: 'Autorisation', demandes: 680, traitees: 520, enAttente: 160, tempsMoyenJours: 3.2 },
  { serviceId: 3, serviceNom: 'Licence', demandes: 538, traitees: 403, enAttente: 135, tempsMoyenJours: 4.1 },
  { serviceId: 5, serviceNom: 'Transport urbain', demandes: 3120, traitees: 2985, enAttente: 95, tempsMoyenJours: 0.6 }
];

// ─── WORKFLOWS & COMPTES INTERNES (STAFF) ─────────────────────
// Chaque workflow décrit les étapes de traitement d'un service, et chaque
// étape est rattachée à un ou plusieurs comptes (secrétaire, agent de
// vérification, validateur...) créés par l'admin, avec leurs droits.

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: 1, serviceId: 1, nom: 'Workflow — Demande de certificat', statut: 'ACTIF',
    description: 'Circuit de traitement standard pour les certificats administratifs.',
    dateCreation: new Date('2025-03-10'),
    etapes: [
      { id: 'w1e1', nom: 'Soumission', code: 'SOUMIS', ordre: 1, responsable: 'Citoyen', delaiHeures: 0, actions: ['Soumettre'], notifications: true, ceQuIlValide: 'Dépôt initial du dossier par le citoyen.', comptesAssignesIds: [] },
      { id: 'w1e2', nom: 'Vérification', code: 'EN_VERIFICATION', ordre: 2, responsable: 'Secrétaire', delaiHeures: 24, actions: ['Vérifier', 'Demander complément'], notifications: true, ceQuIlValide: 'Complétude du dossier et conformité des pièces jointes.', comptesAssignesIds: [5001] },
      { id: 'w1e3', nom: 'Validation', code: 'EN_VALIDATION', ordre: 3, responsable: 'Validateur', delaiHeures: 24, actions: ['Approuver', 'Rejeter'], notifications: true, ceQuIlValide: 'Validation finale de la conformité réglementaire.', comptesAssignesIds: [5002] },
      { id: 'w1e4', nom: 'Délivrance', code: 'TERMINE', ordre: 4, responsable: 'Agent de guichet', delaiHeures: 12, actions: ['Délivrer le document'], notifications: true, ceQuIlValide: 'Remise du certificat final au demandeur.', comptesAssignesIds: [5003] }
    ]
  },
  {
    id: 2, serviceId: 2, nom: 'Workflow — Demande d\'autorisation', statut: 'ACTIF',
    description: 'Circuit de traitement pour les autorisations d\'activité réglementée.',
    dateCreation: new Date('2025-04-02'),
    etapes: [
      { id: 'w2e1', nom: 'Soumission', code: 'SOUMIS', ordre: 1, responsable: 'Citoyen', delaiHeures: 0, actions: ['Soumettre'], notifications: true, ceQuIlValide: 'Dépôt initial du dossier.', comptesAssignesIds: [] },
      { id: 'w2e2', nom: 'Vérification', code: 'EN_VERIFICATION', ordre: 2, responsable: 'Secrétaire', delaiHeures: 24, actions: ['Vérifier'], notifications: true, ceQuIlValide: 'Vérification des justificatifs de domicile et d\'activité.', comptesAssignesIds: [5004] },
      { id: 'w2e3', nom: 'Traitement', code: 'EN_TRAITEMENT', ordre: 3, responsable: 'Agent de traitement', delaiHeures: 48, actions: ['Instruire le dossier'], notifications: true, ceQuIlValide: 'Instruction technique du plan d\'activité.', comptesAssignesIds: [5005] },
      { id: 'w2e4', nom: 'Validation', code: 'APPROUVE', ordre: 4, responsable: 'Superviseur', delaiHeures: 24, actions: ['Approuver', 'Rejeter'], notifications: true, ceQuIlValide: 'Décision finale d\'octroi de l\'autorisation.', comptesAssignesIds: [5006] }
    ]
  },
  {
    id: 3, serviceId: 3, nom: 'Workflow — Demande de licence', statut: 'ACTIF',
    description: 'Circuit de traitement des licences d\'exploitation commerciale.',
    dateCreation: new Date('2025-05-18'),
    etapes: [
      { id: 'w3e1', nom: 'Soumission', code: 'SOUMIS', ordre: 1, responsable: 'Citoyen', delaiHeures: 0, actions: ['Soumettre'], notifications: true, ceQuIlValide: 'Dépôt initial du dossier.', comptesAssignesIds: [] },
      { id: 'w3e2', nom: 'Vérification', code: 'EN_VERIFICATION', ordre: 2, responsable: 'Secrétaire', delaiHeures: 24, actions: ['Vérifier'], notifications: true, ceQuIlValide: 'Contrôle du registre de commerce et de l\'identité.', comptesAssignesIds: [5007] },
      { id: 'w3e3', nom: 'Paiement', code: 'PAIEMENT_EN_ATTENTE', ordre: 3, responsable: 'Caissier', delaiHeures: 24, actions: ['Encaisser'], notifications: true, ceQuIlValide: 'Confirmation du paiement des frais de licence.', comptesAssignesIds: [5008] },
      { id: 'w3e4', nom: 'Validation', code: 'APPROUVE', ordre: 4, responsable: 'Validateur', delaiHeures: 24, actions: ['Approuver', 'Rejeter'], notifications: true, ceQuIlValide: 'Validation finale et émission de la licence.', comptesAssignesIds: [5009] }
    ]
  },
  {
    id: 4, serviceId: 5, nom: 'Workflow — Abonnement transport urbain', statut: 'ACTIF',
    description: 'Circuit simplifié pour les abonnements mensuels de transport.',
    dateCreation: new Date('2025-09-01'),
    etapes: [
      { id: 'w4e1', nom: 'Soumission', code: 'SOUMIS', ordre: 1, responsable: 'Citoyen', delaiHeures: 0, actions: ['Soumettre'], notifications: true, ceQuIlValide: 'Dépôt de la demande d\'abonnement.', comptesAssignesIds: [] },
      { id: 'w4e2', nom: 'Traitement', code: 'EN_TRAITEMENT', ordre: 2, responsable: 'Agent de guichet', delaiHeures: 12, actions: ['Traiter', 'Émettre la carte'], notifications: true, ceQuIlValide: 'Émission de la carte d\'abonnement.', comptesAssignesIds: [5010] }
    ]
  }
];

export const MOCK_COMPTES: CompteUtilisateur[] = [
  { id: 5001, nom: 'Ndikumana', prenom: 'Aline', adresse: 'Quartier Nyakabiga, Bujumbura', telephone: '+257 79 111 001', email: 'aline.ndikumana@iblopay.bi', role: 'Secrétaire', identifiantConnexion: 'aline.ndikumana', motDePasse: '1234', statut: 'ACTIF', workflowId: 1, serviceId: 1, etapeId: 'w1e2', etapeNom: 'Vérification', droits: ['VOIR_DEMANDE', 'VOIR_DOCUMENTS', 'MODIFIER_INFOS'], dateCreation: new Date('2025-03-11') },
  { id: 5002, nom: 'Bigirimana', prenom: 'Eric', adresse: 'Avenue de la Mission, Gitega', telephone: '+257 79 111 002', email: 'eric.bigirimana@iblopay.bi', role: 'Validateur', identifiantConnexion: 'eric.bigirimana', motDePasse: '1234', statut: 'ACTIF', workflowId: 1, serviceId: 1, etapeId: 'w1e3', etapeNom: 'Validation', droits: ['VOIR_DEMANDE', 'VOIR_DOCUMENTS', 'VALIDER', 'REJETER'], dateCreation: new Date('2025-03-11') },
  { id: 5003, nom: 'Nshimirimana', prenom: 'Claudine', adresse: 'Quartier Rohero, Bujumbura', telephone: '+257 79 111 003', email: 'claudine.n@iblopay.bi', role: 'Agent de guichet', identifiantConnexion: 'claudine.nshimirimana', motDePasse: '1234', statut: 'ACTIF', workflowId: 1, serviceId: 1, etapeId: 'w1e4', etapeNom: 'Délivrance', droits: ['VOIR_DEMANDE', 'VALIDER'], dateCreation: new Date('2025-03-11') },

  { id: 5004, nom: 'Havyarimana', prenom: 'Patrick', adresse: 'Quartier Kinama, Bujumbura', telephone: '+257 79 111 004', email: 'patrick.h@iblopay.bi', role: 'Secrétaire', identifiantConnexion: 'patrick.havyarimana', motDePasse: '1234', statut: 'ACTIF', workflowId: 2, serviceId: 2, etapeId: 'w2e2', etapeNom: 'Vérification', droits: ['VOIR_DEMANDE', 'VOIR_DOCUMENTS', 'MODIFIER_INFOS'], dateCreation: new Date('2025-04-03') },
  { id: 5005, nom: 'Irakoze', prenom: 'Diane', adresse: 'Quartier Gihosha, Bujumbura', telephone: '+257 79 111 005', email: 'diane.irakoze@iblopay.bi', role: 'Agent de traitement', identifiantConnexion: 'diane.irakoze', motDePasse: '1234', statut: 'ACTIF', workflowId: 2, serviceId: 2, etapeId: 'w2e3', etapeNom: 'Traitement', droits: ['VOIR_DEMANDE', 'VOIR_DOCUMENTS'], dateCreation: new Date('2025-04-03') },
  { id: 5006, nom: 'Ntahonkuriye', prenom: 'Gérard', adresse: 'Centre-ville, Gitega', telephone: '+257 79 111 006', email: 'gerard.n@iblopay.bi', role: 'Superviseur', identifiantConnexion: 'gerard.ntahonkuriye', motDePasse: '1234', statut: 'ACTIF', workflowId: 2, serviceId: 2, etapeId: 'w2e4', etapeNom: 'Validation', droits: ['VOIR_DEMANDE', 'VOIR_DOCUMENTS', 'VALIDER', 'REJETER', 'VOIR_STATISTIQUES'], dateCreation: new Date('2025-04-03') },

  { id: 5007, nom: 'Minani', prenom: 'Chantal', adresse: 'Quartier Ngagara, Bujumbura', telephone: '+257 79 111 007', email: 'chantal.minani@iblopay.bi', role: 'Secrétaire', identifiantConnexion: 'chantal.minani', motDePasse: '1234', statut: 'ACTIF', workflowId: 3, serviceId: 3, etapeId: 'w3e2', etapeNom: 'Vérification', droits: ['VOIR_DEMANDE', 'VOIR_DOCUMENTS'], dateCreation: new Date('2025-05-19') },
  { id: 5008, nom: 'Bucumi', prenom: 'Olivier', adresse: 'Quartier Buyenzi, Bujumbura', telephone: '+257 79 111 008', email: 'olivier.bucumi@iblopay.bi', role: 'Caissier', identifiantConnexion: 'olivier.bucumi', motDePasse: '1234', statut: 'ACTIF', workflowId: 3, serviceId: 3, etapeId: 'w3e3', etapeNom: 'Paiement', droits: ['VOIR_DEMANDE', 'ENCAISSER_PAIEMENT'], dateCreation: new Date('2025-05-19') },
  { id: 5009, nom: 'Kamanzi', prenom: 'Michel', adresse: 'Quartier Kabondo, Gitega', telephone: '+257 79 111 009', email: 'michel.kamanzi@iblopay.bi', role: 'Validateur', identifiantConnexion: 'michel.kamanzi', motDePasse: '1234', statut: 'ACTIF', workflowId: 3, serviceId: 3, etapeId: 'w3e4', etapeNom: 'Validation', droits: ['VOIR_DEMANDE', 'VOIR_DOCUMENTS', 'VALIDER', 'REJETER'], dateCreation: new Date('2025-05-19') },

  { id: 5010, nom: 'Nkurunziza', prenom: 'Thierry', adresse: 'Quartier Kanyosha, Bujumbura', telephone: '+257 79 111 010', email: 'thierry.n@iblopay.bi', role: 'Agent de guichet', identifiantConnexion: 'thierry.nkurunziza', motDePasse: '1234', statut: 'ACTIF', workflowId: 4, serviceId: 5, etapeId: 'w4e2', etapeNom: 'Traitement', droits: ['VOIR_DEMANDE', 'VALIDER'], dateCreation: new Date('2025-09-02') }
];

// ─── INDICATEURS PERSONNALISÉS PAR SERVICE ───────────────────
export const MOCK_SERVICE_INDICATEURS: ServiceIndicateurs[] = [
  {
    serviceId: 5,
    categorieService: 'TRANSPORT',
    kpis: [
      { label: 'Bus en activité', valeur: '18 / 22', icon: 'fa-solid fa-bus', couleur: 'blue' },
      { label: 'Trajets effectués aujourd\'hui', valeur: '246', icon: 'fa-solid fa-route', couleur: 'purple' },
      { label: 'Revenu journalier', valeur: '2 340 000 BIF', icon: 'fa-solid fa-sack-dollar', couleur: 'green' },
      { label: 'Passagers transportés', valeur: '5 810', icon: 'fa-solid fa-users', couleur: 'orange' },
      { label: 'Distance parcourue', valeur: '3 120 km', icon: 'fa-solid fa-road', couleur: 'cyan' },
      { label: 'Incidents signalés', valeur: '2', icon: 'fa-solid fa-triangle-exclamation', couleur: 'red' }
    ],
    repartitionTitre: 'Répartition des trajets par ligne',
    repartition: [
      { label: 'Ligne A — Centre-ville', valeur: 98, couleur: '#2563eb' },
      { label: 'Ligne B — Kanyosha', valeur: 76, couleur: '#16a34a' },
      { label: 'Ligne C — Kamenge', valeur: 72, couleur: '#ea580c' }
    ]
  },
  {
    serviceId: 1,
    categorieService: 'CERTIFICATS',
    kpis: [
      { label: 'Certificats délivrés ce mois', valeur: '312', icon: 'fa-solid fa-file-circle-check', couleur: 'green' },
      { label: 'Délai moyen de délivrance', valeur: '1.8 j', icon: 'fa-regular fa-clock', couleur: 'blue' },
      { label: 'Revenu du mois', valeur: '1 560 000 BIF', icon: 'fa-solid fa-sack-dollar', couleur: 'orange' },
      { label: 'Taux de rejet', valeur: '4.2 %', icon: 'fa-solid fa-ban', couleur: 'red' }
    ],
    repartitionTitre: 'Répartition par type de certificat',
    repartition: [
      { label: 'Résidence', valeur: 142, couleur: '#2563eb' },
      { label: 'Naissance', valeur: 118, couleur: '#16a34a' },
      { label: 'Célibat', valeur: 52, couleur: '#ea580c' }
    ]
  }
];
