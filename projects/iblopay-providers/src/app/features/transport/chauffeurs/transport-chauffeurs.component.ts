import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type StatutChauffeur = 'Actif' | 'Sans véhicule' | 'En pause';
type OngletChauffeur = 'Paiement effectué par les clients' | 'Historique des versements';
type Periode = 'tout' | 'jour' | 'semaine' | 'mois';

interface Chauffeur {
  id: number;
  nom: string;
  permis: string;
  vehicule: string;
  vehiculeModele: string;
  statut: StatutChauffeur;
  recettesMois: number;
  versementsMois: number;
  dateDebut: string;
  telephone: string;
  email: string;
  adresse: string;
  photo?: string;
}

interface TransactionChauffeur {
  dateHeure: string;
  bus: string;
  itineraire: string;
  montant: number;
  carte: string;
  statut: 'Synchronisé' | 'En attente';
}

interface VersementChauffeur {
  dateHeure: string;
  montant: number;
  modePaiement: string;
  statut: 'Validé' | 'En attente';
}

@Component({
  selector: 'app-transport-chauffeurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport-chauffeurs.component.html',
  styleUrls: ['./transport-chauffeurs.component.scss']
})
export class TransportChauffeursComponent {
  readonly busImage = 'assets/images/bus1.jpg';

  statutFiltre = 'Tous';
  recherche = '';
  page = 1;
  readonly taillePage = 10;

  ongletActif: OngletChauffeur = 'Paiement effectué par les clients';
  periodePaiements: Periode = 'tout';
  periodeVersements: Periode = 'tout';
  editionOuverte = false;
  modeAjout = false;
  brouillon: Chauffeur | null = null;

  rechercheClientEnCours = false;
  clientTrouve = false;
  vehiculeTrouve = false;
  messageRechercheClient = '';
  messageRechercheVehicule = '';

  message = '';

  // Référentiel local de démonstration.
  // Dans la version connectée, remplacer ces recherches par les appels API/backend.
  readonly vehiculesReference: Array<{ immatriculation: string; modele: string }> = [
    { immatriculation: 'BK 7320', modele: 'Yutong ZK6128' },
    { immatriculation: 'TK 4587', modele: 'Toyota Coaster' },
    { immatriculation: 'BK 6412', modele: 'Hyundai County' },
    { immatriculation: 'TK 6721', modele: 'Isuzu NPR' },
    { immatriculation: 'BK 3842', modele: 'Toyota Hiace' },
    { immatriculation: 'TK 5298', modele: 'King Long' },
    { immatriculation: 'BK 9017', modele: 'Hino RK8' },
    { immatriculation: 'TK 3361', modele: 'Toyota Hiace' }
  ];

  chauffeurs: Chauffeur[] = [
    {
      id: 1,
      nom: 'Ndayishimiye Jean',
      permis: 'CP-32567',
      vehicule: 'BK 7320',
      vehiculeModele: 'Yutong ZK6128',
      statut: 'Actif',
      recettesMois: 6250000,
      versementsMois: 5980000,
      dateDebut: '12 janv. 2024',
      telephone: '+257 79 12 34 56',
      email: 'jean.ndayishimiye@busgestion.bi',
      adresse: 'Bujumbura, Burundi'
    },
    {
      id: 2,
      nom: 'Hakizimana Patrick',
      permis: 'CP-41872',
      vehicule: 'TK 4587',
      vehiculeModele: 'Toyota Coaster',
      statut: 'Actif',
      recettesMois: 3120000,
      versementsMois: 2960000,
      dateDebut: '05 mars 2024',
      telephone: '+257 68 10 22 44',
      email: 'patrick.hakizimana@busgestion.bi',
      adresse: 'Gitega, Burundi'
    },
    {
      id: 3,
      nom: 'Niyonsaba Eric',
      permis: 'CP-56231',
      vehicule: 'BK 6412',
      vehiculeModele: 'Hyundai County',
      statut: 'Actif',
      recettesMois: 2450000,
      versementsMois: 2180000,
      dateDebut: '20 févr. 2024',
      telephone: '+257 62 22 11 33',
      email: 'eric.niyonsaba@busgestion.bi',
      adresse: 'Ngozi, Burundi'
    },
    {
      id: 4,
      nom: 'Nkurunziza Fabrice',
      permis: 'CP-73912',
      vehicule: 'TK 6721',
      vehiculeModele: 'Isuzu NPR',
      statut: 'Actif',
      recettesMois: 1890000,
      versementsMois: 1620000,
      dateDebut: '14 janv. 2024',
      telephone: '+257 61 33 44 55',
      email: 'fabrice.nkurunziza@busgestion.bi',
      adresse: 'Muyinga, Burundi'
    },
    {
      id: 5,
      nom: 'Nsabimana Didier',
      permis: 'CP-84567',
      vehicule: 'BK 3842',
      vehiculeModele: 'Toyota Hiace',
      statut: 'Actif',
      recettesMois: 2760000,
      versementsMois: 2480000,
      dateDebut: '18 avr. 2024',
      telephone: '+257 69 77 88 99',
      email: 'didier.nsabimana@busgestion.bi',
      adresse: 'Kayanza, Burundi'
    },
    {
      id: 6,
      nom: 'Uwimana Samuel',
      permis: 'CP-91234',
      vehicule: 'TK 5298',
      vehiculeModele: 'King Long',
      statut: 'Actif',
      recettesMois: 2420000,
      versementsMois: 2000000,
      dateDebut: '07 mai 2024',
      telephone: '+257 71 11 22 33',
      email: 'samuel.uwimana@busgestion.bi',
      adresse: 'Rumonge, Burundi'
    },
    {
      id: 7,
      nom: 'Manirakiza Léon',
      permis: 'CP-99876',
      vehicule: 'BK 9017',
      vehiculeModele: 'Hino RK8',
      statut: 'Sans véhicule',
      recettesMois: 1860000,
      versementsMois: 1500000,
      dateDebut: '11 juin 2024',
      telephone: '+257 78 45 67 89',
      email: 'leon.manirakiza@busgestion.bi',
      adresse: 'Bujumbura, Burundi'
    },
    {
      id: 8,
      nom: 'Niyonkuru Vivien',
      permis: 'CP-10234',
      vehicule: 'TK 3361',
      vehiculeModele: 'Toyota Hiace',
      statut: 'Actif',
      recettesMois: 1980000,
      versementsMois: 1600000,
      dateDebut: '09 févr. 2024',
      telephone: '+257 65 10 10 10',
      email: 'vivien.niyonkuru@busgestion.bi',
      adresse: 'Gitega, Burundi'
    },
    {
      id: 9,
      nom: 'Biramahire J. Claude',
      permis: 'CP-11223',
      vehicule: 'BK 7320',
      vehiculeModele: 'Hino RK8',
      statut: 'En pause',
      recettesMois: 1520000,
      versementsMois: 1200000,
      dateDebut: '21 mars 2024',
      telephone: '+257 79 90 88 77',
      email: 'claude.biramahire@busgestion.bi',
      adresse: 'Bujumbura, Burundi'
    },
    {
      id: 10,
      nom: 'Habimana Christian',
      permis: 'CP-11276',
      vehicule: 'TK 4587',
      vehiculeModele: 'Toyota Coaster',
      statut: 'Actif',
      recettesMois: 1480000,
      versementsMois: 1100000,
      dateDebut: '03 janv. 2024',
      telephone: '+257 62 44 55 66',
      email: 'christian.habimana@busgestion.bi',
      adresse: 'Ngozi, Burundi'
    },
    {
      id: 11,
      nom: 'Mugisha Emmanuel',
      permis: 'CP-12654',
      vehicule: 'BK 6412',
      vehiculeModele: 'Hyundai County',
      statut: 'Actif',
      recettesMois: 2180000,
      versementsMois: 1820000,
      dateDebut: '30 avr. 2024',
      telephone: '+257 61 78 78 78',
      email: 'emmanuel.mugisha@busgestion.bi',
      adresse: 'Muyinga, Burundi'
    },
    {
      id: 12,
      nom: 'Rukundo Jean Bosco',
      permis: 'CP-13789',
      vehicule: 'TK 6721',
      vehiculeModele: 'Isuzu NPR',
      statut: 'Actif',
      recettesMois: 1760000,
      versementsMois: 1400000,
      dateDebut: '17 mai 2024',
      telephone: '+257 69 33 12 45',
      email: 'jeanbosco.rukundo@busgestion.bi',
      adresse: 'Kayanza, Burundi'
    }
  ];

  selectionId: number | null = null;

  transactions: TransactionChauffeur[] = [
    { dateHeure: '11/06/2025 08:42', bus: 'BK 7320', itineraire: 'Bujumbura - Gitega', montant: 280000, carte: '**** 4582', statut: 'Synchronisé' },
    { dateHeure: '10/06/2025 17:15', bus: 'BK 7320', itineraire: 'Bujumbura - Rumonge', montant: 320000, carte: '**** 7812', statut: 'Synchronisé' },
    { dateHeure: '09/06/2025 11:03', bus: 'BK 7320', itineraire: 'Bujumbura - Muyinga', montant: 310000, carte: '**** 6521', statut: 'Synchronisé' },
    { dateHeure: '08/06/2025 16:25', bus: 'BK 7320', itineraire: 'Bujumbura - Ngozi', montant: 290000, carte: '**** 9933', statut: 'Synchronisé' },
    { dateHeure: '07/06/2025 09:12', bus: 'BK 7320', itineraire: 'Bujumbura - Kayanza', montant: 275000, carte: '**** 4471', statut: 'Synchronisé' }
  ];

  versements: VersementChauffeur[] = [
    { dateHeure: '10/06/2025 14:20', montant: 1200000, modePaiement: 'POS', statut: 'Validé' },
    { dateHeure: '05/06/2025 13:15', montant: 1100000, modePaiement: 'POS', statut: 'Validé' },
    { dateHeure: '31/05/2025 12:40', montant: 1000000, modePaiement: 'POS', statut: 'Validé' },
    { dateHeure: '25/05/2025 11:32', montant: 980000, modePaiement: 'POS', statut: 'Validé' },
    { dateHeure: '20/05/2025 10:10', montant: 950000, modePaiement: 'POS', statut: 'Validé' }
  ];

  get selection(): Chauffeur | undefined {
    return this.chauffeurs.find(c => c.id === this.selectionId);
  }

  get chauffeursFiltres(): Chauffeur[] {
    return this.chauffeurs.filter(c => {
      const okStatut = this.statutFiltre === 'Tous' || c.statut === this.statutFiltre;
      const texte = this.recherche.trim().toLowerCase();
      const okRecherche =
        !texte ||
        c.nom.toLowerCase().includes(texte) ||
        c.permis.toLowerCase().includes(texte) ||
        c.vehicule.toLowerCase().includes(texte);

      return okStatut && okRecherche;
    });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.chauffeursFiltres.length / this.taillePage));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get chauffeursAffiches(): Chauffeur[] {
    const debut = (this.page - 1) * this.taillePage;
    return this.chauffeursFiltres.slice(debut, debut + this.taillePage);
  }

  get totalChauffeurs(): number {
    return this.chauffeurs.length;
  }

  get chauffeursActifs(): number {
    return this.chauffeurs.filter(c => c.statut === 'Actif').length;
  }

  get sansVehicule(): number {
    return this.chauffeurs.filter(c => c.statut === 'Sans véhicule').length;
  }

  get enPause(): number {
    return this.chauffeurs.filter(c => c.statut === 'En pause').length;
  }

  get pourcentageActifs(): number {
    return this.totalChauffeurs ? Math.round(this.chauffeursActifs / this.totalChauffeurs * 100) : 0;
  }
  get pourcentageSansVehicule(): number {
    return this.totalChauffeurs ? Math.round(this.sansVehicule / this.totalChauffeurs * 100) : 0;
  }
  get pourcentagePause(): number {
    return this.totalChauffeurs ? Math.round(this.enPause / this.totalChauffeurs * 100) : 0;
  }

  // Données de démonstration : la période est calculée depuis le dernier
  // enregistrement du tableau, et non depuis la date du système.
  private dateDemo(texte: string): Date {
    const datePart = texte.trim().split(/\s+/)[0] ?? '';
    const parties = datePart.split('/');
    if (parties.length !== 3) return new Date(0);

    const jour = Number(parties[0]);
    const mois = Number(parties[1]);
    const annee = Number(parties[2]);
    if (!Number.isInteger(jour) || !Number.isInteger(mois) ||
        !Number.isInteger(annee) || jour < 1 || jour > 31 ||
        mois < 1 || mois > 12) {
      return new Date(0);
    }
    const resultat = new Date(annee, mois - 1, jour);
    // Vérifie aussi les dates impossibles, comme 31/02.
    if (resultat.getDate() !== jour || resultat.getMonth() !== mois - 1 ||
        resultat.getFullYear() !== annee) return new Date(0);
    return resultat;
  }

  private filtrePeriode<T extends { dateHeure: string }>(donnees: T[], periode: Periode): T[] {
    if (periode === 'tout' || !donnees.length) return donnees;
    const reference = donnees.reduce((max, ligne) => {
      const valeur = this.dateDemo(ligne.dateHeure).getTime();
      return Math.max(max, valeur);
    }, 0);
    const dateRef = new Date(reference);
    const debut = new Date(dateRef);
    if (periode === 'jour') {
      // déjà positionnée au jour de référence
    } else if (periode === 'semaine') {
      const jourISO = (debut.getDay() + 6) % 7;
      debut.setDate(debut.getDate() - jourISO);
    } else {
      debut.setDate(1);
    }
    debut.setHours(0, 0, 0, 0);
    return donnees.filter(ligne => {
      const date = this.dateDemo(ligne.dateHeure).getTime();
      return date >= debut.getTime() && date <= reference;
    });
  }

  get paiementsFiltres(): TransactionChauffeur[] {
    return this.filtrePeriode(this.transactions, this.periodePaiements);
  }
  get versementsFiltres(): VersementChauffeur[] {
    return this.filtrePeriode(this.versements, this.periodeVersements);
  }

  get tauxRecouvrement(): number {
    const c = this.selection;
    if (!c || !c.recettesMois) return 0;
    return Math.round((c.versementsMois / c.recettesMois) * 1000) / 10;
  }

  get recetteJournaliere(): number {
    return this.totalDernierJour(this.transactions);
  }

  get versementJournalier(): number {
    return this.totalDernierJour(this.versements);
  }

  get versementMoisCalcule(): number {
    if (!this.versements.length) return 0;
    const dates = this.versements.map(v => this.dateDemo(v.dateHeure));
    const reference = new Date(Math.max(...dates.map(d => d.getTime())));
    return this.versements
      .filter(v => {
        const d = this.dateDemo(v.dateHeure);
        return d.getFullYear() === reference.getFullYear() && d.getMonth() === reference.getMonth();
      })
      .reduce((total, v) => total + v.montant, 0);
  }

  private totalDernierJour<T extends { dateHeure: string; montant: number }>(donnees: T[]): number {
    if (!donnees.length) return 0;
    const dates = donnees.map(d => this.dateDemo(d.dateHeure));
    const reference = new Date(Math.max(...dates.map(d => d.getTime())));
    return donnees
      .filter(ligne => {
        const d = this.dateDemo(ligne.dateHeure);
        return d.getFullYear() === reference.getFullYear()
          && d.getMonth() === reference.getMonth()
          && d.getDate() === reference.getDate();
      })
      .reduce((total, ligne) => total + ligne.montant, 0);
  }

  get initialesSelection(): string {
    const nom = this.selection?.nom ?? '';
    return nom.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase();
  }

  get statutOptions(): string[] {
    return ['Tous', 'Actif', 'Sans véhicule', 'En pause'];
  }

  selectChauffeur(chauffeur: Chauffeur): void {
    this.selectionId = chauffeur.id;
    this.ongletActif = 'Paiement effectué par les clients';
  }

  changerPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
    }
  }

  filtrer(): void {
    this.page = 1;
  }

  setOnglet(onglet: OngletChauffeur): void {
    this.ongletActif = onglet;
  }

  actualiser(): void {
    this.message = 'Affichage actualisé (données de démonstration).';
  }

  modifier(): void {
    if (this.selection) this.edit(this.selection);
  }

  supprimer(): void {
    if (this.selection) this.remove(this.selection);
  }

  ajouter(): void {
    this.modeAjout = true;
    this.clientTrouve = false;
    this.vehiculeTrouve = false;
    this.messageRechercheClient = '';
    this.messageRechercheVehicule = '';
    this.brouillon = {
      id: 0,
      nom: '',
      permis: '',
      vehicule: '',
      vehiculeModele: '',
      statut: 'Actif',
      recettesMois: 0,
      versementsMois: 0,
      dateDebut: '',
      telephone: '',
      email: '',
      adresse: ''
    };
    this.editionOuverte = true;
  }

  rechercherClientParTelephone(): void {
    if (!this.modeAjout || !this.brouillon) return;

    const telephone = this.normaliserTelephone(this.brouillon.telephone);
    this.clientTrouve = false;
    this.messageRechercheClient = '';

    // Effacer les anciennes données pendant une nouvelle recherche.
    this.brouillon.nom = '';
    this.brouillon.email = '';
    this.brouillon.adresse = '';

    if (telephone.length < 8) {
      return;
    }

    this.rechercheClientEnCours = true;

    // Démonstration locale : `chauffeurs` joue le rôle du référentiel clients.
    // Avec le backend, remplacer ce bloc par l'appel API qui cherche le client par téléphone.
    const client = this.chauffeurs.find(
      c => this.normaliserTelephone(c.telephone) === telephone
    );

    this.rechercheClientEnCours = false;

    if (!client) {
      this.messageRechercheClient = 'Aucun client trouvé avec ce numéro.';
      return;
    }

    this.brouillon.nom = client.nom;
    this.brouillon.email = client.email;
    this.brouillon.adresse = client.adresse;
    this.clientTrouve = true;
    this.messageRechercheClient = 'Client trouvé. Les informations ont été récupérées automatiquement.';
  }

  rechercherVehiculeParImmatriculation(): void {
    if (!this.brouillon) return;

    const immatriculation = this.normaliserImmatriculation(this.brouillon.vehicule);
    this.brouillon.vehiculeModele = '';
    this.vehiculeTrouve = false;
    this.messageRechercheVehicule = '';

    if (immatriculation.length < 4) {
      return;
    }

    const vehicule = this.vehiculesReference.find(
      v => this.normaliserImmatriculation(v.immatriculation) === immatriculation
    );

    if (!vehicule) {
      this.messageRechercheVehicule = 'Immatriculation non trouvée.';
      return;
    }

    this.brouillon.vehicule = vehicule.immatriculation;
    this.brouillon.vehiculeModele = vehicule.modele;
    this.vehiculeTrouve = true;
    this.messageRechercheVehicule = `Véhicule trouvé : ${vehicule.modele}.`;
  }

  private normaliserTelephone(value: string): string {
    return (value ?? '').replace(/\D/g, '');
  }

  private normaliserImmatriculation(value: string): string {
    return (value ?? '').replace(/\s+/g, '').toUpperCase();
  }

  private dateDebutAutomatique(): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date()).replace('.', '');
  }

  voir(chauffeur: Chauffeur): void {
    this.selectChauffeur(chauffeur);
  }

  fermerDetails(): void {
    this.selectionId = null;
    this.ongletActif = 'Paiement effectué par les clients';
  }

  edit(chauffeur: Chauffeur): void {
    this.modeAjout = false;
    this.clientTrouve = true;
    this.vehiculeTrouve = true;
    this.messageRechercheClient = '';
    this.messageRechercheVehicule = '';
    this.brouillon = { ...chauffeur };
    this.editionOuverte = true;
  }

  annulerEdition(): void {
    this.editionOuverte = false;
    this.brouillon = null;
    this.clientTrouve = false;
    this.vehiculeTrouve = false;
    this.messageRechercheClient = '';
    this.messageRechercheVehicule = '';
    this.rechercheClientEnCours = false;
  }

  enregistrer(): void {
    if (!this.brouillon) return;

    const telephoneValide = !!this.brouillon.telephone.trim();
    const identiteValide = !!this.brouillon.nom.trim();
    const permisValide = !!this.brouillon.permis.trim();
    const vehiculeValide = !!this.brouillon.vehicule.trim() && !!this.brouillon.vehiculeModele.trim();

    if (!telephoneValide || !identiteValide || !permisValide || !vehiculeValide) {
      this.message = 'Veuillez compléter les informations obligatoires du chauffeur.';
      return;
    }

    if (this.modeAjout && (!this.clientTrouve || !this.vehiculeTrouve)) {
      this.message = 'Le téléphone et l’immatriculation doivent être reconnus avant l’ajout.';
      return;
    }

    const donnees: Chauffeur = {
      ...this.brouillon,
      nom: this.brouillon.nom.trim(),
      permis: this.brouillon.permis.trim(),
      vehicule: this.brouillon.vehicule.trim().toUpperCase(),
      vehiculeModele: this.brouillon.vehiculeModele.trim(),
      telephone: this.brouillon.telephone.trim(),
      email: this.brouillon.email.trim(),
      adresse: this.brouillon.adresse.trim(),
      recettesMois: Math.max(0, Number(this.brouillon.recettesMois) || 0),
      versementsMois: Math.max(0, Number(this.brouillon.versementsMois) || 0),
      dateDebut: this.modeAjout ? this.dateDebutAutomatique() : this.brouillon.dateDebut
    };

    if (this.modeAjout) {
      donnees.id = Math.max(0, ...this.chauffeurs.map(c => c.id)) + 1;
      this.chauffeurs = [...this.chauffeurs, donnees];
      this.message = 'Chauffeur ajouté avec succès (données locales de démonstration).';
    } else {
      this.chauffeurs = this.chauffeurs.map(c => c.id === donnees.id ? donnees : c);
      this.message = 'Chauffeur modifié avec succès (données locales de démonstration).';
    }

    this.selectionId = donnees.id;
    this.annulerEdition();
  }

  remove(chauffeur: Chauffeur): void {
    if (!window.confirm(`Supprimer le chauffeur ${chauffeur.nom} ?`)) return;
    this.chauffeurs = this.chauffeurs.filter(c => c.id !== chauffeur.id);
    if (this.selectionId === chauffeur.id) this.fermerDetails();
    this.page = Math.min(this.page, this.totalPages);
    this.message = 'Chauffeur supprimé (données locales de démonstration).';
  }

  formatBif(value: number): string {
    return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value)} BIF`;
  }

  statutClass(statut: string): string {
    switch (statut) {
      case 'Actif':
        return 'statut-actif';
      case 'Sans véhicule':
        return 'statut-sans-vehicule';
      case 'En pause':
        return 'statut-pause';
      default:
        return '';
    }
  }
}