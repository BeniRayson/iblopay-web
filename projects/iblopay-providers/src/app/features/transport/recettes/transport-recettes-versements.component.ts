import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Onglet = 'Paiements' | 'Versements' | 'Comparatif Recettes / Versements' | 'Rapport par carte';
type Statut = 'Synchronisé' | 'En attente' | 'Échec';
interface Paiement {
  id: string;
  date: string;
  bus: string;
  modele: string;
  chauffeur: string;
  itineraire: string;
  montant: number;
  carte: string;
  statut: Statut;
  synchronisation: string;
}
interface Versement {
  id: string;
  date: string;
  bus: string;
  chauffeur: string;
  montant: number;
  mode: 'POS';
  statut: Statut;
}
interface LigneComparatif {
  bus: string;
  recettes: number;
  versements: number;
  ecart: number;
  taux: number;
}

@Component({
  selector: 'app-transport-recettes-versements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport-recettes-versements.component.html',
  styleUrls: ['./transport-recettes-versements.component.scss']
})
export class TransportRecettesVersementsComponent {
  readonly onglets: Onglet[] = ['Paiements', 'Versements', 'Comparatif Recettes / Versements', 'Rapport par carte'];
  ongletActif: Onglet = 'Paiements';
  periode: 'Toutes' | 'Jour' | 'Semaine' | 'Mois' = 'Toutes';
  vehiculeFiltre = 'Tous';
  itineraireFiltre = 'Tous';
  statutFiltre = 'Tous';
  rechercheCarte = '';
  page = 1;
  readonly taillePage = 8;
  selectionId: string | null = null;
  rapportCarteOuvert = true;
  message = '';

  // Jeu de données pour la maquette. À remplacer par les résultats de l'API IBLOPAY.
  paiements: Paiement[] = [
    { id: 'POS-20250611-0842', date: '11/06/2025 08:42', bus: 'BK 7320', modele: 'Yutong ZK6128', chauffeur: 'Ndayishimiye Jean', itineraire: 'Bujumbura - Gitega', montant: 2500, carte: '4582', statut: 'Synchronisé', synchronisation: '11/06/2025 08:44' },
    { id: 'POS-20250611-0837', date: '11/06/2025 08:37', bus: 'TK 4587', modele: 'Toyota Coaster', chauffeur: 'Hakizimana Patrick', itineraire: 'Bujumbura - Rumonge', montant: 1800, carte: '7812', statut: 'Synchronisé', synchronisation: '11/06/2025 08:39' },
    { id: 'POS-20250609-0821', date: '09/06/2025 08:21', bus: 'BK 6412', modele: 'Hyundai County', chauffeur: 'Niyonsaba Eric', itineraire: 'Bujumbura - Muyinga', montant: 2200, carte: '6521', statut: 'Synchronisé', synchronisation: '09/06/2025 08:23' },
    { id: 'POS-20250608-0755', date: '08/06/2025 07:55', bus: 'TK 6721', modele: 'Isuzu NPR', chauffeur: 'Nkurunziza Fabrice', itineraire: 'Bujumbura - Ngozi', montant: 1500, carte: '9933', statut: 'En attente', synchronisation: 'En attente' },
    { id: 'POS-20250607-0732', date: '07/06/2025 07:32', bus: 'BK 3842', modele: 'Toyota Hiace', chauffeur: 'Nsabimana Didier', itineraire: 'Bujumbura - Kayanza', montant: 2900, carte: '4471', statut: 'Synchronisé', synchronisation: '07/06/2025 07:34' },
    { id: 'POS-20250607-0658', date: '07/06/2025 06:58', bus: 'TK 5298', modele: 'King Long', chauffeur: 'Uwimana Samuel', itineraire: 'Bujumbura - Muramvya', montant: 1700, carte: '2208', statut: 'Échec', synchronisation: 'Échec' },
    { id: 'POS-20250606-0623', date: '06/06/2025 06:23', bus: 'BK 9017', modele: 'Hino RK8', chauffeur: 'Manirakiza Léon', itineraire: 'Bujumbura - Gitega', montant: 2000, carte: '7710', statut: 'Synchronisé', synchronisation: '06/06/2025 06:25' },
    { id: 'POS-20250606-0547', date: '06/06/2025 05:47', bus: 'TK 3361', modele: 'Toyota Hiace', chauffeur: 'Niyonkuru Vivien', itineraire: 'Bujumbura - Rumonge', montant: 1600, carte: '5583', statut: 'Synchronisé', synchronisation: '06/06/2025 05:49' },
    { id: 'POS-20250605-2215', date: '05/06/2025 22:15', bus: 'BK 7320', modele: 'Yutong ZK6128', chauffeur: 'Biramahire J. Claude', itineraire: 'Bujumbura - Muyinga', montant: 2100, carte: '1122', statut: 'Synchronisé', synchronisation: '05/06/2025 22:17' },
    { id: 'POS-20250605-2143', date: '05/06/2025 21:43', bus: 'TK 4587', modele: 'Toyota Coaster', chauffeur: 'Habimana Christian', itineraire: 'Bujumbura - Ngozi', montant: 1900, carte: '3345', statut: 'En attente', synchronisation: 'En attente' },
    { id: 'POS-20250604-1200', date: '04/06/2025 12:00', bus: 'BK 6412', modele: 'Hyundai County', chauffeur: 'Niyonsaba Eric', itineraire: 'Bujumbura - Muyinga', montant: 2400, carte: '4582', statut: 'Synchronisé', synchronisation: '04/06/2025 12:02' },
    { id: 'POS-20250603-1345', date: '03/06/2025 13:45', bus: 'TK 6721', modele: 'Isuzu NPR', chauffeur: 'Nkurunziza Fabrice', itineraire: 'Bujumbura - Gitega', montant: 2100, carte: '4582', statut: 'Synchronisé', synchronisation: '03/06/2025 13:47' }
  ];

  versements: Versement[] = [
    { id: 'VER-001', date: '11/06/2025 17:00', bus: 'BK 7320', chauffeur: 'Ndayishimiye Jean', montant: 1860000, mode: 'POS', statut: 'Synchronisé' },
    { id: 'VER-002', date: '11/06/2025 16:20', bus: 'TK 4587', chauffeur: 'Hakizimana Patrick', montant: 1480000, mode: 'POS', statut: 'Synchronisé' },
    { id: 'VER-003', date: '10/06/2025 17:10', bus: 'BK 6412', chauffeur: 'Niyonsaba Eric', montant: 1020000, mode: 'POS', statut: 'En attente' },
    { id: 'VER-004', date: '09/06/2025 18:05', bus: 'TK 6721', chauffeur: 'Nkurunziza Fabrice', montant: 980000, mode: 'POS', statut: 'Synchronisé' },
    { id: 'VER-005', date: '08/06/2025 17:30', bus: 'BK 3842', chauffeur: 'Nsabimana Didier', montant: 720000, mode: 'POS', statut: 'Synchronisé' },
    { id: 'VER-006', date: '07/06/2025 16:40', bus: 'TK 5298', chauffeur: 'Uwimana Samuel', montant: 610000, mode: 'POS', statut: 'Échec' }
  ];

  get vehicules(): string[] { return [...new Set(this.paiements.map(p => p.bus))].sort(); }
  get itineraires(): string[] { return [...new Set(this.paiements.map(p => p.itineraire))].sort(); }
  get paiementsFiltres(): Paiement[] {
    const carte = this.rechercheCarte.trim().toLowerCase().replace(/\*/g, '');
    return this.paiements.filter(p =>
      (this.vehiculeFiltre === 'Tous' || p.bus === this.vehiculeFiltre) &&
      (this.itineraireFiltre === 'Tous' || p.itineraire === this.itineraireFiltre) &&
      (this.statutFiltre === 'Tous' || p.statut === this.statutFiltre) &&
      (!carte || p.carte.toLowerCase().includes(carte)) &&
      this.correspondPeriode(p.date)
    );
  }
  get versementsFiltres(): Versement[] {
    return this.versements.filter(v =>
      (this.vehiculeFiltre === 'Tous' || v.bus === this.vehiculeFiltre) &&
      (this.statutFiltre === 'Tous' || v.statut === this.statutFiltre) &&
      this.correspondPeriode(v.date)
    );
  }
  get totalPages(): number {
    const n = this.ongletActif === 'Versements' ? this.versementsFiltres.length : this.paiementsFiltres.length;
    return Math.max(1, Math.ceil(n / this.taillePage));
  }
  get paiementsAffiches(): Paiement[] {
    const debut = (this.page - 1) * this.taillePage;
    return this.paiementsFiltres.slice(debut, debut + this.taillePage);
  }
  get versementsAffiches(): Versement[] {
    const debut = (this.page - 1) * this.taillePage;
    return this.versementsFiltres.slice(debut, debut + this.taillePage);
  }
  get pagesVisibles(): number[] {
    const debut = Math.max(1, Math.min(this.page - 2, this.totalPages - 4));
    return Array.from({ length: Math.min(5, this.totalPages) }, (_, i) => debut + i);
  }
  get debutAffichage(): number {
    const n = this.ongletActif === 'Versements' ? this.versementsFiltres.length : this.paiementsFiltres.length;
    return n ? (this.page - 1) * this.taillePage + 1 : 0;
  }
  get finAffichage(): number {
    const n = this.ongletActif === 'Versements' ? this.versementsFiltres.length : this.paiementsFiltres.length;
    return Math.min(this.page * this.taillePage, n);
  }
  get selection(): Paiement | undefined { return this.paiements.find(p => p.id === this.selectionId); }
  get paiementsSynchronises(): number { return this.paiementsFiltres.filter(p => p.statut === 'Synchronisé').length; }
  get paiementsAttente(): number { return this.paiementsFiltres.filter(p => p.statut === 'En attente').length; }
  get paiementsEchec(): number { return this.paiementsFiltres.filter(p => p.statut === 'Échec').length; }
  get totalPaiements(): number { return this.paiementsFiltres.reduce((t, p) => t + p.montant, 0); }
  get montantMoyen(): number { return this.paiementsFiltres.length ? Math.round(this.totalPaiements / this.paiementsFiltres.length) : 0; }
  get tauxSynchronisation(): number { return this.paiementsFiltres.length ? Math.round(this.paiementsSynchronises / this.paiementsFiltres.length * 100) : 0; }
  get donutStyle(): string {
    const total = this.paiementsFiltres.length || 1;
    const a = this.paiementsSynchronises / total * 100;
    const b = a + this.paiementsAttente / total * 100;
    return `conic-gradient(#53ad8b 0% ${a}%, #eeb96a ${a}% ${b}%, #d9858c ${b}% 100%)`;
  }
  get comparatif(): LigneComparatif[] {
    return this.vehicules
      .filter(bus => this.vehiculeFiltre === 'Tous' || this.vehiculeFiltre === bus)
      .map(bus => {
        const recettes = this.paiementsFiltres.filter(p => p.bus === bus).reduce((s, p) => s + p.montant, 0);
        const versements = this.versementsFiltres.filter(v => v.bus === bus).reduce((s, v) => s + v.montant, 0);
        const ecart = recettes - versements;
        return { bus, recettes, versements, ecart, taux: recettes > 0 ? Math.round(versements / recettes * 100) : 0 };
      });
  }
  get carteRecherche(): string { return this.rechercheCarte.trim().replace(/\*/g, ''); }
  get paiementsCarte(): Paiement[] {
    const carte = this.carteRecherche || this.selection?.carte || '';
    return carte ? this.paiements.filter(p => p.carte.includes(carte)) : [];
  }
  get montantCarte(): number { return this.paiementsCarte.reduce((s, p) => s + p.montant, 0); }

  definirOnglet(onglet: Onglet): void { this.ongletActif = onglet; this.page = 1; this.message = ''; }
  filtrer(): void { this.page = 1; }
  changerPage(numero: number): void { if (numero >= 1 && numero <= this.totalPages) this.page = numero; }
  voirPaiement(p: Paiement): void { this.selectionId = p.id; }
  statutClass(s: Statut): string {
    return s === 'Synchronisé' ? 'status-success' : s === 'En attente' ? 'status-wait' : 'status-error';
  }
  formatBif(n: number): string { return `${new Intl.NumberFormat('fr-FR').format(n)} BIF`; }
  private dateDepuisTexte(texte: string): Date {
    const partie = texte.split(' ')[0] ?? '';
    const morceaux = partie.split('/');
    const jour = Number(morceaux[0] ?? 1);
    const mois = Number(morceaux[1] ?? 1);
    const annee = Number(morceaux[2] ?? 2025);
    return new Date(annee, mois - 1, jour);
  }
  private correspondPeriode(dateTexte: string): boolean {
    if (this.periode === 'Toutes') return true;
    // Données fictives : périodes calculées par rapport à la dernière transaction connue.
    const dates = [...this.paiements.map(p => this.dateDepuisTexte(p.date)), ...this.versements.map(v => this.dateDepuisTexte(v.date))];
    const reference = new Date(Math.max(...dates.map(d => d.getTime())));
    const d = this.dateDepuisTexte(dateTexte);
    const delta = (reference.getTime() - d.getTime()) / 86400000;
    if (this.periode === 'Jour') return delta >= 0 && delta < 1;
    if (this.periode === 'Semaine') return delta >= 0 && delta < 7;
    return d.getMonth() === reference.getMonth() && d.getFullYear() === reference.getFullYear();
  }
  exporterCsv(): void {
    const separateur = ';';
    const entetes = this.ongletActif === 'Versements'
      ? ['Date', 'Véhicule', 'Chauffeur', 'Montant BIF', 'Mode', 'Statut']
      : ['Date', 'Véhicule', 'Chauffeur', 'Itinéraire', 'Montant BIF', 'Carte', 'Statut'];
    const lignes = this.ongletActif === 'Versements'
      ? this.versementsFiltres.map(v => [v.date, v.bus, v.chauffeur, String(v.montant), v.mode, v.statut])
      : this.paiementsFiltres.map(p => [p.date, p.bus, p.chauffeur, p.itineraire, String(p.montant), '**** ' + p.carte, p.statut]);
    const echapper = (valeur: string) => '"' + valeur.replace(/"/g, '""') + '"';
    const csv = [entetes, ...lignes].map(l => l.map(echapper).join(separateur)).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' }));
    const lien = document.createElement('a');
    lien.href = url;
    lien.download = this.ongletActif === 'Versements' ? 'versements.csv' : 'paiements.csv';
    document.body.appendChild(lien);
    lien.click();
    lien.remove();
    URL.revokeObjectURL(url);
  }
  forcerSynchronisation(id: string): void {
    this.message = `Demande de synchronisation de ${id} : connexion à l'API nécessaire.`;
  }
}
