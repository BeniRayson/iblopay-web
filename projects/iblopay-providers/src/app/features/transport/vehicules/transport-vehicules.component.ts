import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Statut = 'Actif' | 'Maintenance' | 'Hors service' | 'Inactif';
type TypeVehicule = 'Bus' | 'Minibus';
type Onglet = 'Résumé' | 'Transactions' | 'Kilométrage' | 'Versements' | 'Itinéraires';
type ModeModal = 'ajouter' | 'modifier' | 'statut' | 'chauffeur' | 'supprimer';

interface Bus {
  id: number;
  type: TypeVehicule;
  matricule: string;
  modele: string;
  statut: Statut;
  chauffeur: string;
  km: number;
  recettes: number;
  sync: string;
  syncEtat: 'ok' | 'attention' | 'retard';
  motorisation: string;
  consommation: string;
  recettesSemaine: number;
  recettesMois: number;
  versementsMois: number;
  itineraire: string;
}

interface Mouvement {
  heure: string;
  type: string;
  montant: number;
}

@Component({
  selector: 'app-transport-vehicules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport-vehicules.component.html',
  styleUrls: ['./transport-vehicules.component.scss']
})
export class TransportVehiculesComponent {
  readonly imageBus = 'assets/images/bus1.jpg';

  typeFiltre = 'Tous';
  statutFiltre = 'Tous';
  chauffeurFiltre = 'Tous';
  recherche = '';
  page = 1;
  readonly taillePage = 6;

  onglet: Onglet = 'Résumé';
  readonly onglets: Onglet[] = ['Résumé', 'Transactions', 'Kilométrage', 'Versements', 'Itinéraires'];
  modal: ModeModal | null = null;
  message = '';
  brouillon: Bus = this.busVide();

  readonly chauffeurs: string[] = [
    'Ndayishimiye J.', 'Hakizimana P.', 'Niyonsaba E.', 'Nkurunziza F.',
    'Nsabimana D.', 'Uwimana S.', 'Manirakiza L.', 'Niyonkuru V.'
  ];

  vehicules: Bus[] = [
    { id: 1, type: 'Bus', matricule: 'BK 7320', modele: 'Hino RK8', statut: 'Actif', chauffeur: 'Ndayishimiye J.', km: 620000, recettes: 250000, sync: 'Aujourd’hui 10:42', syncEtat: 'ok', motorisation: 'Diesel', consommation: '22 L/100km', recettesSemaine: 1780000, recettesMois: 7560000, versementsMois: 5980000, itineraire: 'Bujumbura - Gitega' },
    { id: 2, type: 'Bus', matricule: 'TK 4587', modele: 'Toyota Coaster', statut: 'Actif', chauffeur: 'Hakizimana P.', km: 540000, recettes: 180000, sync: 'Aujourd’hui 08:15', syncEtat: 'ok', motorisation: 'Diesel', consommation: '18 L/100km', recettesSemaine: 1300000, recettesMois: 5980000, versementsMois: 5120000, itineraire: 'Bujumbura - Rumonge' },
    { id: 3, type: 'Bus', matricule: 'BK 6412', modele: 'Hyundai County', statut: 'Maintenance', chauffeur: 'Niyonsaba E.', km: 480000, recettes: 120000, sync: 'Hier 16:30', syncEtat: 'attention', motorisation: 'Diesel', consommation: '20 L/100km', recettesSemaine: 980000, recettesMois: 4760000, versementsMois: 4300000, itineraire: 'Bujumbura - Muyinga' },
    { id: 4, type: 'Bus', matricule: 'TK 6721', modele: 'Isuzu NPR', statut: 'Actif', chauffeur: 'Nkurunziza F.', km: 420000, recettes: 210000, sync: 'Aujourd’hui 09:12', syncEtat: 'ok', motorisation: 'Diesel', consommation: '19 L/100km', recettesSemaine: 1420000, recettesMois: 5200000, versementsMois: 4890000, itineraire: 'Bujumbura - Ngozi' },
    { id: 5, type: 'Minibus', matricule: 'BK 3842', modele: 'Toyota Hiace', statut: 'Hors service', chauffeur: 'Nsabimana D.', km: 310000, recettes: 0, sync: 'Hier 14:20', syncEtat: 'retard', motorisation: 'Diesel', consommation: '12 L/100km', recettesSemaine: 500000, recettesMois: 2050000, versementsMois: 1940000, itineraire: 'Bujumbura - Kayanza' },
    { id: 6, type: 'Bus', matricule: 'TK 5298', modele: 'King Long', statut: 'Inactif', chauffeur: 'Uwimana S.', km: 290000, recettes: 90000, sync: 'Avant-hier 17:45', syncEtat: 'attention', motorisation: 'Diesel', consommation: '21 L/100km', recettesSemaine: 720000, recettesMois: 2900000, versementsMois: 2650000, itineraire: 'Bujumbura - Gitega' },
    { id: 7, type: 'Bus', matricule: 'BK 9017', modele: 'Hino RK8', statut: 'Actif', chauffeur: 'Manirakiza L.', km: 260000, recettes: 145000, sync: 'Aujourd’hui 10:12', syncEtat: 'ok', motorisation: 'Diesel', consommation: '22 L/100km', recettesSemaine: 1020000, recettesMois: 3900000, versementsMois: 3700000, itineraire: 'Bujumbura - Rumonge' },
    { id: 8, type: 'Minibus', matricule: 'TK 3361', modele: 'Toyota Hiace', statut: 'Maintenance', chauffeur: 'Niyonkuru V.', km: 240000, recettes: 0, sync: 'Hier 11:10', syncEtat: 'attention', motorisation: 'Diesel', consommation: '12 L/100km', recettesSemaine: 400000, recettesMois: 1900000, versementsMois: 1800000, itineraire: 'Bujumbura - Ngozi' },
    { id: 9, type: 'Bus', matricule: 'BK 1103', modele: 'Hyundai County', statut: 'Actif', chauffeur: '—', km: 210000, recettes: 110000, sync: 'Aujourd’hui 09:22', syncEtat: 'ok', motorisation: 'Diesel', consommation: '20 L/100km', recettesSemaine: 760000, recettesMois: 3200000, versementsMois: 3000000, itineraire: 'Bujumbura - Gitega' },
    { id: 10, type: 'Bus', matricule: 'TK 2240', modele: 'King Long', statut: 'Actif', chauffeur: '—', km: 195000, recettes: 98000, sync: 'Aujourd’hui 08:55', syncEtat: 'ok', motorisation: 'Diesel', consommation: '21 L/100km', recettesSemaine: 700000, recettesMois: 3000000, versementsMois: 2850000, itineraire: 'Bujumbura - Muyinga' }
  ];

  selectionId = 1;

  readonly historique: Mouvement[] = [
    { heure: '10:42', type: 'Paiement par carte', montant: 2500 },
    { heure: '10:31', type: 'Paiement par carte', montant: 1800 },
    { heure: '09:12', type: 'Versement', montant: 120000 },
    { heure: '08:35', type: 'Paiement par carte', montant: 2500 }
  ];

  readonly courbe: number[] = [
    28, 26, 37, 30, 36, 40, 46, 30, 25, 35,
    33, 49, 42, 48, 47, 56, 52, 61, 47, 43,
    56, 51, 48, 64, 59, 70, 66, 75, 72, 84
  ];

  get filtres(): Bus[] {
    const recherche = this.recherche.trim().toLocaleLowerCase('fr');
    return this.vehicules.filter(b =>
      (this.typeFiltre === 'Tous' || b.type === this.typeFiltre) &&
      (this.statutFiltre === 'Tous' || b.statut === this.statutFiltre) &&
      (this.chauffeurFiltre === 'Tous' || b.chauffeur === this.chauffeurFiltre) &&
      (!recherche || `${b.matricule} ${b.modele}`.toLocaleLowerCase('fr').includes(recherche))
    );
  }

  get pages(): number {
    return Math.max(1, Math.ceil(this.filtres.length / this.taillePage));
  }

  get numerosPages(): number[] {
    return Array.from({ length: this.pages }, (_, i) => i + 1);
  }

  get lignes(): Bus[] {
    const pageCourante = Math.min(Math.max(1, this.page), this.pages);
    return this.filtres.slice((pageCourante - 1) * this.taillePage, pageCourante * this.taillePage);
  }

  get debut(): number {
    return this.filtres.length ? (Math.min(this.page, this.pages) - 1) * this.taillePage + 1 : 0;
  }

  get fin(): number {
    return Math.min(Math.min(this.page, this.pages) * this.taillePage, this.filtres.length);
  }

  get selection(): Bus | undefined {
    return this.vehicules.find(b => b.id === this.selectionId);
  }

  get taux(): number {
    const b = this.selection;
    return b && b.recettesMois > 0
      ? Math.min(100, Math.round((b.versementsMois / b.recettesMois) * 100))
      : 0;
  }

  get points(): string {
    return this.courbe.map((v, i) => `${28 + i * 16.6},${132 - v * 1.24}`).join(' ');
  }

  get surface(): string {
    return `28,132 ${this.points} 509.4,132`;
  }

  get chauffeursDisponibles(): string[] {
    return [...new Set([...this.chauffeurs, ...this.vehicules.map(b => b.chauffeur)])]
      .filter(c => c !== '—');
  }

  formatBif(v: number): string {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(v) + ' BIF';
  }

  formatNombre(v: number): string {
    return new Intl.NumberFormat('fr-FR').format(v);
  }

  filtrer(): void {
    this.page = 1;
  }

  changerPage(p: number): void {
    if (Number.isInteger(p) && p >= 1 && p <= this.pages) {
      this.page = p;
    }
  }

  selectionner(b: Bus): void {
    this.selectionId = b.id;
    this.onglet = 'Résumé';
    this.message = '';
  }

  ouvrir(mode: ModeModal, b?: Bus): void {
    if (b) this.selectionId = b.id;
    const selection = this.selection;
    if (mode !== 'ajouter' && !selection) {
      this.message = 'Sélectionnez d’abord un véhicule.';
      return;
    }
    this.brouillon = mode === 'ajouter' ? this.busVide() : { ...selection! };
    this.message = '';
    this.modal = mode;
  }

  fermer(): void {
    this.modal = null;
    this.message = '';
  }

  enregistrer(): void {
    const mode = this.modal;
    if (!mode) return;

    // La suppression ne nécessite pas la validation des champs du formulaire.
    if (mode === 'supprimer') {
      this.vehicules = this.vehicules.filter(v => v.id !== this.selectionId);
      this.selectionId = this.vehicules[0]?.id ?? 0;
      this.finaliser('Véhicule supprimé des données de démonstration.');
      return;
    }

    const b: Bus = {
      ...this.brouillon,
      matricule: this.brouillon.matricule.trim(),
      modele: this.brouillon.modele.trim()
    };

    if (!b.matricule || !b.modele) {
      this.message = 'Renseignez le matricule et le modèle.';
      return;
    }

    if (this.vehicules.some(v =>
      v.id !== (mode === 'ajouter' ? -1 : this.selectionId) &&
      v.matricule.toLocaleLowerCase('fr') === b.matricule.toLocaleLowerCase('fr')
    )) {
      this.message = 'Ce matricule existe déjà.';
      return;
    }

    if (mode === 'ajouter') {
      b.id = Math.max(0, ...this.vehicules.map(v => v.id)) + 1;
      this.vehicules = [...this.vehicules, b];
      this.selectionId = b.id;
    } else {
      this.vehicules = this.vehicules.map(v =>
        v.id === this.selectionId ? { ...b, id: v.id } : v
      );
    }

    this.finaliser('Modifications effectuées dans les données de démonstration.');
  }

  synchroniser(b: Bus): void {
    this.vehicules = this.vehicules.map(v =>
      v.id === b.id ? { ...v, sync: 'À l’instant', syncEtat: 'ok' } : v
    );
    this.message = `Synchronisation simulée pour ${b.matricule}.`;
  }

  actualiser(): void {
    this.page = Math.min(this.page, this.pages);
    this.message = 'Affichage actualisé. Données de démonstration, sans connexion API.';
  }

  imageErreur(event: Event): void {
    const image = event.target;
    if (image instanceof HTMLImageElement) {
      image.style.visibility = 'hidden';
    }
  }

  private finaliser(message: string): void {
    this.modal = null;
    this.page = 1;
    this.message = `${message} Ces données ne sont pas enregistrées sur le serveur.`;
  }

  private busVide(): Bus {
    return {
      id: 0,
      type: 'Bus',
      matricule: '',
      modele: '',
      statut: 'Actif',
      chauffeur: '—',
      km: 0,
      recettes: 0,
      sync: 'Jamais',
      syncEtat: 'attention',
      motorisation: 'Diesel',
      consommation: '—',
      recettesSemaine: 0,
      recettesMois: 0,
      versementsMois: 0,
      itineraire: '—'
    };
  }
}
