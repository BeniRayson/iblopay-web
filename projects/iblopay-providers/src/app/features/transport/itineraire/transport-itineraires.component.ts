import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Onglet = 'Statistiques' | 'Top 5 des bus' | 'Évolution des recettes';
type Statut = 'Actif' | 'Inactif';

interface Itineraire {
  id: number;
  depart: string;
  arrivee: string;
  tarif: number;
  paiements: number;
  recettes: number;
  statut: Statut;
  couleur: string;
  distanceKm: number;
  duree: string;
  frequence: string;
  maj: string;
  evolution: number[];
}
interface BusItineraire { immatriculation: string; transactions: number; recettes: number; }

@Component({
  selector: 'app-transport-itineraires',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport-itineraires.component.html',
  styleUrls: ['./transport-itineraires.component.scss']
})
export class TransportItinerairesComponent {
  // Conserver exactement le nom du fichier dans assets/images.
  readonly imagePaysage = 'assets/images/bus itineraire.png';
  readonly couleurs = ['#2e87d8', '#26a78b', '#6084cf', '#c27f45', '#805fc8', '#b68b45'];
  readonly onglets: Onglet[] = ['Statistiques', 'Top 5 des bus', 'Évolution des recettes'];
  ongletActif: Onglet = 'Statistiques';
  recherche = '';
  statutFiltre = 'Tous';
  filtresOuverts = false;
  page = 1;
  readonly taillePage = 10;
  selectionId: number | null = null;
  modeEdition = false;
  formulaireOuvert = false;
  message = '';
  brouillon = { depart: '', arrivee: '', tarif: null as number | null, statut: 'Actif' as Statut };

  itineraires: Itineraire[] = [
    { id: 1, depart: 'Bujumbura', arrivee: 'Gitega', tarif: 2500, paiements: 856, recettes: 2140000, statut: 'Actif', couleur: '#e3a22e', distanceKm: 120, duree: '3 h 15 min', frequence: '4 fois / jour', maj: '10/06/2025 14:32', evolution: [90,155,110,155,220,145,185,200,250,205,170,225,270,258,195,185,245,270,300,260,238,285] },
    { id: 2, depart: 'Bujumbura', arrivee: 'Rumonge', tarif: 1800, paiements: 642, recettes: 1155600, statut: 'Actif', couleur: '#20a386', distanceKm: 80, duree: '1 h 45 min', frequence: '6 fois / jour', maj: '10/06/2025 10:15', evolution: [70,90,110,105,145,130,180,175,165,205,198,175,210,205,190,225,230,245,230,255,250,275] },
    { id: 3, depart: 'Bujumbura', arrivee: 'Muyinga', tarif: 2200, paiements: 580, recettes: 1276000, statut: 'Actif', couleur: '#347ce1', distanceKm: 190, duree: '4 h 10 min', frequence: '3 fois / jour', maj: '09/06/2025 08:20', evolution: [75,110,125,120,105,145,160,170,175,190,210,190,220,245,210,225,260,255,270,260,290,310] },
    { id: 4, depart: 'Bujumbura', arrivee: 'Ngozi', tarif: 1500, paiements: 498, recettes: 747000, statut: 'Actif', couleur: '#d35b74', distanceKm: 135, duree: '2 h 50 min', frequence: '5 fois / jour', maj: '09/06/2025 16:10', evolution: [60,75,65,95,110,100,120,130,135,145,125,150,165,170,160,175,195,185,205,195,225,230] },
    { id: 5, depart: 'Bujumbura', arrivee: 'Kayanza', tarif: 2900, paiements: 432, recettes: 1252800, statut: 'Actif', couleur: '#8d65bc', distanceKm: 98, duree: '2 h 25 min', frequence: '4 fois / jour', maj: '08/06/2025 11:30', evolution: [80,90,125,135,140,125,160,150,180,170,195,180,215,220,210,235,245,230,275,255,285,290] },
    { id: 6, depart: 'Bujumbura', arrivee: 'Muramvya', tarif: 1700, paiements: 356, recettes: 605200, statut: 'Actif', couleur: '#d99a2e', distanceKm: 55, duree: '1 h 25 min', frequence: '5 fois / jour', maj: '08/06/2025 12:22', evolution: [45,50,70,90,85,105,110,125,105,130,140,150,155,140,165,170,160,190,185,200,195,210] },
    { id: 7, depart: 'Bujumbura', arrivee: 'Ruyigi', tarif: 2100, paiements: 298, recettes: 625800, statut: 'Actif', couleur: '#418caf', distanceKm: 167, duree: '3 h 45 min', frequence: '2 fois / jour', maj: '07/06/2025 15:08', evolution: [50,80,65,110,90,120,125,135,140,155,145,160,175,170,185,180,205,220,200,230,220,245] },
    { id: 8, depart: 'Bujumbura', arrivee: 'Cibitoke', tarif: 1800, paiements: 264, recettes: 475200, statut: 'Actif', couleur: '#67a846', distanceKm: 78, duree: '1 h 55 min', frequence: '3 fois / jour', maj: '07/06/2025 09:42', evolution: [40,65,60,75,90,80,100,105,110,125,115,130,140,135,145,150,160,155,175,170,180,195] },
    { id: 9, depart: 'Bujumbura', arrivee: 'Rusizi', tarif: 2400, paiements: 242, recettes: 580800, statut: 'Actif', couleur: '#ce6986', distanceKm: 29, duree: '45 min', frequence: '8 fois / jour', maj: '06/06/2025 17:19', evolution: [45,70,75,90,100,95,105,125,120,140,145,135,155,170,165,180,175,190,185,205,215,210] },
    { id: 10, depart: 'Bujumbura', arrivee: 'Makamba', tarif: 1600, paiements: 198, recettes: 316800, statut: 'Actif', couleur: '#458bd1', distanceKm: 165, duree: '3 h 35 min', frequence: '2 fois / jour', maj: '06/06/2025 08:50', evolution: [30,45,55,50,60,65,75,70,85,80,95,105,100,110,115,120,130,125,140,150,145,160] },
    { id: 11, depart: 'Gitega', arrivee: 'Ngozi', tarif: 1800, paiements: 310, recettes: 558000, statut: 'Actif', couleur: '#5a98bd', distanceKm: 92, duree: '2 h 10 min', frequence: '3 fois / jour', maj: '05/06/2025 12:15', evolution: [40,60,90,80,110,115,100,120,130,145,135,155,170,180,175,190,200,195,205,220,235,250] },
    { id: 12, depart: 'Gitega', arrivee: 'Ruyigi', tarif: 1700, paiements: 216, recettes: 367200, statut: 'Inactif', couleur: '#9d91ae', distanceKm: 71, duree: '1 h 50 min', frequence: '—', maj: '04/06/2025 11:20', evolution: [100,90,85,80,75,65,55,45,35,30,25,15,10,5,0,0,0,0,0,0,0,0] }
  ];

  readonly busTop: BusItineraire[] = [
    { immatriculation: 'BK 7320', transactions: 248, recettes: 620000 },
    { immatriculation: 'TK 4587', transactions: 198, recettes: 495000 },
    { immatriculation: 'BK 6412', transactions: 176, recettes: 440000 },
    { immatriculation: 'TK 6721', transactions: 142, recettes: 355000 },
    { immatriculation: 'BK 3842', transactions: 98, recettes: 245000 }
  ];

  get itinerairesFiltres(): Itineraire[] {
    const terme = this.recherche.trim().toLocaleLowerCase('fr');
    return this.itineraires.filter(i =>
      (this.statutFiltre === 'Tous' || i.statut === this.statutFiltre) &&
      (!terme || `${i.depart} ${i.arrivee}`.toLocaleLowerCase('fr').includes(terme))
    );
  }
  get totalPages(): number { return Math.max(1, Math.ceil(this.itinerairesFiltres.length / this.taillePage)); }
  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, index) => index + 1); }
  get itinerairesAffiches(): Itineraire[] {
    const debut = (this.page - 1) * this.taillePage;
    return this.itinerairesFiltres.slice(debut, debut + this.taillePage);
  }
  get selection(): Itineraire | undefined { return this.itineraires.find(i => i.id === this.selectionId); }
  get totalPaiements(): number { return this.itineraires.reduce((s, i) => s + i.paiements, 0); }
  get totalRecettes(): number { return this.itineraires.reduce((s, i) => s + i.recettes, 0); }
  get tarifMoyen(): number {
    if (!this.itineraires.length) return 0;
    return Math.round(this.itineraires.reduce((s, i) => s + i.tarif, 0) / this.itineraires.length);
  }
  get nbActifs(): number { return this.itineraires.filter(i => i.statut === 'Actif').length; }
  get pointsEvolution(): string {
    const v = this.selection?.evolution ?? [];
    return v.map((n, index) => `${35 + (index * 460) / Math.max(1, v.length - 1)},${167 - (n / 400) * 144}`).join(' ');
  }
  get remplissageEvolution(): string { return `35,167 ${this.pointsEvolution} 495,167`; }
  get revenuParBus(): number { return this.busTop.reduce((s, bus) => s + bus.recettes, 0); }

  formatBif(value: number): string {
    return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value)} BIF`;
  }
  filtrer(): void { this.page = 1; }
  changerPage(p: number): void { if (p >= 1 && p <= this.totalPages) this.page = p; }
  afficherDetail(itineraire: Itineraire): void {
    this.selectionId = itineraire.id;
    this.ongletActif = 'Statistiques';
    this.formulaireOuvert = false;
    this.message = '';
  }
  retourListe(): void { this.selectionId = null; }
  nouvelItineraire(): void {
    this.modeEdition = false;
    this.brouillon = { depart: '', arrivee: '', tarif: null, statut: 'Actif' };
    this.formulaireOuvert = true;
    this.message = '';
  }
  modifierSelection(): void {
    const i = this.selection;
    if (!i) return;
    this.modeEdition = true;
    this.brouillon = { depart: i.depart, arrivee: i.arrivee, tarif: i.tarif, statut: i.statut };
    this.formulaireOuvert = true;
  }
  annuler(): void {
    this.formulaireOuvert = false;
    this.modeEdition = false;
    this.brouillon = { depart: '', arrivee: '', tarif: null, statut: 'Actif' };
    this.message = '';
  }
  enregistrer(): void {
    const depart = this.brouillon.depart.trim();
    const arrivee = this.brouillon.arrivee.trim();
    const tarif = Number(this.brouillon.tarif);
    if (!depart || !arrivee || depart.toLocaleLowerCase('fr') === arrivee.toLocaleLowerCase('fr') || !Number.isFinite(tarif) || tarif <= 0) {
      this.message = 'Saisissez deux lieux différents et un tarif valide supérieur à zéro.';
      return;
    }
    const existant = this.itineraires.find(i => i.depart.toLocaleLowerCase('fr') === depart.toLocaleLowerCase('fr') && i.arrivee.toLocaleLowerCase('fr') === arrivee.toLocaleLowerCase('fr') && (!this.modeEdition || i.id !== this.selectionId));
    if (existant) { this.message = 'Cet itinéraire existe déjà.'; return; }
    if (this.modeEdition && this.selection) {
      const id = this.selection.id;
      this.itineraires = this.itineraires.map(i => i.id === id ? { ...i, depart, arrivee, tarif, statut: this.brouillon.statut } : i);
      this.message = 'Itinéraire modifié (données de démonstration).';
    } else {
      const id = Math.max(0, ...this.itineraires.map(i => i.id)) + 1;
      this.itineraires = [...this.itineraires, {
        id, depart, arrivee, tarif, statut: this.brouillon.statut,
        paiements: 0, recettes: 0, couleur: this.couleurs[id % this.couleurs.length] ?? '#7b9fca',
        distanceKm: 0, duree: 'À définir', frequence: 'À définir',
        maj: new Date().toLocaleString('fr-FR'), evolution: Array(22).fill(0)
      }];
      this.selectionId = id;
      this.recherche = '';
      this.statutFiltre = 'Tous';
      this.page = this.totalPages;
      this.message = 'Nouvel itinéraire enregistré (données de démonstration).';
    }
    this.formulaireOuvert = false;
    this.modeEdition = false;
  }
}
