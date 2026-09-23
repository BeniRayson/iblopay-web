import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type RapportId = 'bus' | 'itineraire' | 'chauffeur' | 'comparatif' | 'horsligne' | 'performance';
type Ligne = Record<string, string | number>;
interface CarteRapport {
  id: RapportId;
  titre: string;
  description: string;
  icone: string;
  couleur: string;
  etiquettes: [string, string, string];
  chiffres: [string, string, string];
}
interface BusRapport {
  id: number;
  bus: string;
  type: string;
  marque: string;
  immatriculation: string;
  taxi: string;
  recettes: number;
  versements: number;
  transactions: number;
  date: string;
  km: number;
  consommation: number; // litres de carburant (0 si électrique)
  energie: 'Thermique' | 'Électrique' | 'Hybride';
  electriciteKwh: number; // kWh consommés, 0 si thermique
  horsligne: number;
  echec: number;
  chauffeur: string;
  itineraire: string;
}

@Component({
  selector: 'app-transport-rapports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport-rapports.component.html',
  styleUrls: ['./transport-rapports.component.scss']
})
export class TransportRapportsComponent {
  // Données de démonstration : à remplacer par le service API IBLOPAY.
  debut = '2025-06-01';
  fin = '2025-06-30';
  vehicule = 'Tous';
  typeBus = 'Tous';
  marque = 'Toutes';
  rechercheBus = '';
  rechercheAppliquee = '';
  idActif: RapportId = 'bus';
  page = 1;
  taillePage = 20;
  ligneDetail: Ligne | null = null;
  message = '';
  readonly tailles = [10, 20, 50];
  readonly formatMontant = (n: number): string => new Intl.NumberFormat('fr-FR').format(n) + ' FBU';

  readonly cartes: CarteRapport[] = [
    { id: 'bus', titre: 'Recettes par bus', description: 'Revenus et versements par véhicule', icone: 'fa-bus', couleur: 'bleu', etiquettes: ['Total recettes', 'Taux de recouvrement', 'Nb. paiements'], chiffres: ['48 520 000 FBU', '85,0 %', '2 486'] },
    { id: 'itineraire', titre: 'Recettes par itinéraire', description: 'Performances des trajets et recettes', icone: 'fa-route', couleur: 'vert', etiquettes: ['Total recettes', 'Taux de recouvrement', 'Nb. paiements'], chiffres: ['42 180 000 FBU', '82,7 %', '1 932'] },
    { id: 'chauffeur', titre: 'Recettes par chauffeur', description: 'Revenus et taux de recouvrement', icone: 'fa-user-tie', couleur: 'violet', etiquettes: ['Total recettes', 'Taux de recouvrement', 'Nb. paiements'], chiffres: ['6 340 000 FBU', '80,5 %', '1 248'] },
    { id: 'comparatif', titre: 'Recettes contre versements', description: 'Comparaison par bus', icone: 'fa-scale-balanced', couleur: 'orange', etiquettes: ['Écart total', 'Taux de recouvrement', 'Nb. paiements'], chiffres: ['6 340 000 FBU', '86,9 %', '1 685'] },
    { id: 'horsligne', titre: 'Paiements hors-ligne', description: 'Paiements en attente et en échec', icone: 'fa-wifi', couleur: 'rose', etiquettes: ['En attente', 'En échec', 'Taux de synchronisation'], chiffres: ['37', '12', '98,4 %'] },
    { id: 'performance', titre: 'Performance des véhicules', description: 'Thermiques, électriques et hybrides', icone: 'fa-bus-simple', couleur: 'cyan', etiquettes: ['Kilométrage', 'Carburant / électricité', 'Motorisations'], chiffres: ['Selon filtres', 'L et kWh séparés', '3 catégories'] }
  ];

  readonly busDonnees: BusRapport[] = [
    { id: 1, bus: 'BK 7320', type: 'Coaster', marque: 'Toyota', immatriculation: 'T 7320 A', taxi: '—', recettes: 8520000, versements: 7240000, transactions: 420, date: '2025-06-11', km: 4820, consommation: 380, energie: 'Thermique', electriciteKwh: 0, horsligne: 4, echec: 1, chauffeur: 'Ndayishimiye Jean', itineraire: 'Bujumbura → Gitega' },
    { id: 2, bus: 'TK 4587', type: 'Mini bus', marque: 'Toyota', immatriculation: 'T 4587 B', taxi: '—', recettes: 7960000, versements: 6780000, transactions: 386, date: '2025-06-10', km: 3920, consommation: 0, energie: 'Électrique', electriciteKwh: 620, horsligne: 6, echec: 2, chauffeur: 'Hakizimana Patrick', itineraire: 'Bujumbura → Rumonge' },
    { id: 3, bus: 'BK 6412', type: 'Coaster', marque: 'Hyundai', immatriculation: 'T 6412 C', taxi: '—', recettes: 6980000, versements: 5920000, transactions: 360, date: '2025-06-09', km: 4610, consommation: 355, energie: 'Thermique', electriciteKwh: 0, horsligne: 2, echec: 1, chauffeur: 'Niyonsaba Eric', itineraire: 'Bujumbura → Muyinga' },
    { id: 4, bus: 'TK 6721', type: 'Mini bus', marque: 'Isuzu', immatriculation: 'T 6721 D', taxi: '—', recettes: 6120000, versements: 5260000, transactions: 310, date: '2025-06-08', km: 3550, consommation: 272, energie: 'Hybride', electriciteKwh: 205, horsligne: 3, echec: 0, chauffeur: 'Nkurunziza Fabrice', itineraire: 'Bujumbura → Ngozi' },
    { id: 5, bus: 'BK 3842', type: 'Coaster', marque: 'Toyota', immatriculation: 'T 3842 E', taxi: '—', recettes: 5870000, versements: 5020000, transactions: 298, date: '2025-06-07', km: 3490, consommation: 260, energie: 'Thermique', electriciteKwh: 0, horsligne: 4, echec: 1, chauffeur: 'Nsabimana Didier', itineraire: 'Bujumbura → Kayanza' },
    { id: 6, bus: 'TK 5298', type: 'Mini bus', marque: 'King Long', immatriculation: 'T 5298 F', taxi: '—', recettes: 5430000, versements: 4680000, transactions: 270, date: '2025-06-06', km: 3280, consommation: 240, energie: 'Thermique', electriciteKwh: 0, horsligne: 3, echec: 2, chauffeur: 'Uwimana Samuel', itineraire: 'Bujumbura → Muramvya' },
    { id: 7, bus: 'BK 7210', type: 'Coaster', marque: 'Hyundai', immatriculation: 'T 7210 G', taxi: '—', recettes: 4980000, versements: 4240000, transactions: 255, date: '2025-06-05', km: 3050, consommation: 230, energie: 'Hybride', electriciteKwh: 177, horsligne: 1, echec: 0, chauffeur: 'Manirakiza Léon', itineraire: 'Bujumbura → Ruyigi' },
    { id: 8, bus: 'TK 8320', type: 'Mini bus', marque: 'Toyota', immatriculation: 'T 8320 H', taxi: '—', recettes: 4670000, versements: 3980000, transactions: 243, date: '2025-06-04', km: 2900, consommation: 0, energie: 'Électrique', electriciteKwh: 460, horsligne: 2, echec: 1, chauffeur: 'Niyonkuru Vivien', itineraire: 'Bujumbura → Cibitoke' },
    { id: 9, bus: 'BK 5931', type: 'Coaster', marque: 'Isuzu', immatriculation: 'T 5931 I', taxi: '—', recettes: 4320000, versements: 3710000, transactions: 220, date: '2025-06-03', km: 2790, consommation: 215, energie: 'Thermique', electriciteKwh: 0, horsligne: 1, echec: 0, chauffeur: 'Biramahire J. Claude', itineraire: 'Bujumbura → Rusizi' },
    { id: 10, bus: 'TK 4478', type: 'Mini bus', marque: 'Toyota', immatriculation: 'T 4478 J', taxi: '—', recettes: 4120000, versements: 3560000, transactions: 209, date: '2025-06-02', km: 2600, consommation: 208, energie: 'Thermique', electriciteKwh: 0, horsligne: 2, echec: 1, chauffeur: 'Habimana Christian', itineraire: 'Bujumbura → Makamba' },
    { id: 11, bus: 'BK 3410', type: 'Coaster', marque: 'Toyota', immatriculation: 'T 3410 K', taxi: '—', recettes: 3890000, versements: 3240000, transactions: 191, date: '2025-06-12', km: 2500, consommation: 198, energie: 'Hybride', electriciteKwh: 129, horsligne: 2, echec: 0, chauffeur: 'Rukundo Jean Bosco', itineraire: 'Bujumbura → Gitega' },
    { id: 12, bus: 'TK 6002', type: 'Mini bus', marque: 'Isuzu', immatriculation: 'T 6002 L', taxi: '—', recettes: 3650000, versements: 3090000, transactions: 179, date: '2025-06-13', km: 2360, consommation: 0, energie: 'Électrique', electriciteKwh: 390, horsligne: 1, echec: 1, chauffeur: 'Mugisha Emmanuel', itineraire: 'Bujumbura → Ngozi' }
  ];

  // 12 lignes supplémentaires fictives pour démontrer 20 lignes/page et la pagination.
  // À supprimer lorsque les données réelles proviendront de l'API.
  get exemplesSupplementaires(): BusRapport[] {
    const modeles: Array<{ type: string; marque: string; energie: BusRapport['energie'] }> = [
      { type: 'Taxi', marque: 'Nissan', energie: 'Électrique' },
      { type: 'Bus', marque: 'Yutong', energie: 'Électrique' },
      { type: 'Taxi', marque: 'Toyota', energie: 'Hybride' },
      { type: 'Mini bus', marque: 'Toyota', energie: 'Thermique' }
    ];
    return Array.from({ length: 12 }, (_, index): BusRapport => {
      const n = index + 13;
      const modele = modeles[index % modeles.length]!;
      const km = 1100 + index * 110;
      const recettes = 3100000 - index * 95000;
      return {
        id: n, bus: `TEST ${String(n).padStart(3, '0')}`, type: modele.type,
        marque: modele.marque, immatriculation: `DEMO ${n}`,
        taxi: modele.type === 'Taxi' ? `Place ${index + 1}` : '—',
        recettes, versements: Math.round(recettes * 0.87),
        transactions: 140 - index * 5, date: `2025-06-${String(13 + index).padStart(2, '0')}`,
        km, consommation: modele.energie === 'Électrique' ? 0 : 85 + index * 7,
        energie: modele.energie,
        electriciteKwh: modele.energie === 'Thermique' ? 0 : 195 + index * 18,
        horsligne: index % 3, echec: index % 2,
        chauffeur: `Chauffeur test ${n}`, itineraire: 'Trajet de démonstration'
      };
    });
  }

  get toutesDonnees(): BusRapport[] {
    return [...this.busDonnees, ...this.exemplesSupplementaires];
  }

  get vehicules(): string[] { return [...new Set(this.toutesDonnees.map(b => b.bus))]; }
  get types(): string[] { return [...new Set(this.toutesDonnees.map(b => b.type))]; }
  get marques(): string[] { return [...new Set(this.toutesDonnees.map(b => b.marque))]; }
  get actif(): CarteRapport { return this.cartes.find(c => c.id === this.idActif) ?? this.cartes[0]!; }

  private get busesFiltrees(): BusRapport[] {
    const rechercheLocale = this.rechercheAppliquee.toLowerCase();
    return this.toutesDonnees.filter(b =>
      (!this.debut || b.date >= this.debut) && (!this.fin || b.date <= this.fin) &&
      (this.vehicule === 'Tous' || b.bus === this.vehicule) &&
      (this.typeBus === 'Tous' || b.type === this.typeBus) &&
      (this.marque === 'Toutes' || b.marque === this.marque) &&
      (!rechercheLocale || `${b.bus} ${b.chauffeur} ${b.itineraire} ${b.type} ${b.marque} ${b.immatriculation}`.toLowerCase().includes(rechercheLocale))
    );
  }

  get colonnes(): { cle: string; libelle: string }[] {
    switch (this.idActif) {
      case 'itineraire': return [
        { cle: 'trajet', libelle: 'Itinéraire' }, { cle: 'bus', libelle: 'Bus' },
        { cle: 'transactions', libelle: 'Paiements' }, { cle: 'recettes', libelle: 'Recettes (FBU)' },
        { cle: 'versements', libelle: 'Versements (FBU)' }, { cle: 'taux', libelle: 'Taux de recouvrement' }];
      case 'chauffeur': return [
        { cle: 'chauffeur', libelle: 'Chauffeur' }, { cle: 'bus', libelle: 'Bus' },
        { cle: 'transactions', libelle: 'Paiements' }, { cle: 'recettes', libelle: 'Recettes (FBU)' },
        { cle: 'versements', libelle: 'Versements (FBU)' }, { cle: 'taux', libelle: 'Taux de recouvrement' }];
      case 'comparatif': return [
        { cle: 'bus', libelle: 'Bus' }, { cle: 'recettes', libelle: 'Recettes (FBU)' },
        { cle: 'versements', libelle: 'Versements (FBU)' }, { cle: 'ecart', libelle: 'Écart (FBU)' },
        { cle: 'taux', libelle: 'Taux de recouvrement' }];
      case 'horsligne': return [
        { cle: 'bus', libelle: 'Bus' }, { cle: 'chauffeur', libelle: 'Chauffeur' },
        { cle: 'transactions', libelle: 'Paiements' }, { cle: 'attente', libelle: 'En attente' },
        { cle: 'echec', libelle: 'En échec' }, { cle: 'synchronisation', libelle: 'Taux de synchronisation' }];
      case 'performance': return [
        { cle: 'bus', libelle: 'Bus' }, { cle: 'type', libelle: 'Type de bus' },
        { cle: 'km', libelle: 'Km parcourus' }, { cle: 'energie', libelle: 'Motorisation' },
        { cle: 'consommation', libelle: 'Carburant (L)' }, { cle: 'electriciteKwh', libelle: 'Électricité (kWh)' },
        { cle: 'recettes', libelle: 'Recettes (FBU)' }, { cle: 'rendement', libelle: 'FBU/km' }];
      default: return [
        { cle: 'bus', libelle: 'Bus' }, { cle: 'type', libelle: 'Type de bus' },
        { cle: 'marque', libelle: 'Marque' }, { cle: 'immatriculation', libelle: 'Immatriculation' },
        { cle: 'taxi', libelle: 'Espace (Taxi)' }, { cle: 'recettes', libelle: 'Recettes (FBU)' },
        { cle: 'versements', libelle: 'Versements (FBU)' }, { cle: 'ecart', libelle: 'Écart (FBU)' },
        { cle: 'taux', libelle: 'Taux de recouvrement' }];
    }
  }

  get lignes(): Ligne[] {
    return this.busesFiltrees.map(b => {
      const taux = b.recettes ? (b.versements / b.recettes) * 100 : 0;
      const tauxSync = b.transactions ? (1 - (b.horsligne + b.echec) / b.transactions) * 100 : 100;
      return {
        id: b.id, bus: b.bus, type: b.type, marque: b.marque,
        immatriculation: b.immatriculation, taxi: b.taxi,
        chauffeur: b.chauffeur, trajet: b.itineraire, transactions: b.transactions,
        recettes: b.recettes, versements: b.versements, ecart: b.recettes - b.versements,
        taux: taux.toFixed(1) + ' %', attente: b.horsligne, echec: b.echec,
        synchronisation: tauxSync.toFixed(1) + ' %', km: b.km,
        consommation: b.energie === 'Électrique' ? '—' : b.consommation,
        electriciteKwh: b.energie === 'Thermique' ? '—' : b.electriciteKwh, energie: b.energie,
        rendement: b.km ? Math.round(b.recettes / b.km) : 0
      };
    });
  }

  get totalLignes(): number { return this.lignes.length; }
  get pages(): number { return Math.max(1, Math.ceil(this.totalLignes / this.taillePage)); }
  get numerosPages(): number[] { return Array.from({ length: this.pages }, (_, i) => i + 1); }
  get lignesPage(): Ligne[] {
    const debut = (this.page - 1) * this.taillePage;
    return this.lignes.slice(debut, debut + this.taillePage);
  }
  get premiereLigne(): number { return this.totalLignes ? (this.page - 1) * this.taillePage + 1 : 0; }
  get derniereLigne(): number { return Math.min(this.page * this.taillePage, this.totalLignes); }
  get totalRecettes(): number { return this.busesFiltrees.reduce((s, b) => s + b.recettes, 0); }
  get totalVersements(): number { return this.busesFiltrees.reduce((s, b) => s + b.versements, 0); }
  get totalTransactions(): number { return this.busesFiltrees.reduce((s, b) => s + b.transactions, 0); }
  get ecart(): number { return this.totalRecettes - this.totalVersements; }
  get tauxMoyen(): string { return (this.totalRecettes ? this.totalVersements / this.totalRecettes * 100 : 0).toFixed(1) + ' %'; }
  get statistiques(): { libelle: string; valeur: string; icone: string; teinte: string }[] {
    if (this.idActif === 'horsligne') {
      const b = this.busesFiltrees;
      const attente = b.reduce((s, r) => s + r.horsligne, 0);
      const echec = b.reduce((s, r) => s + r.echec, 0);
      const taux = this.totalTransactions ? ((1 - (attente + echec) / this.totalTransactions) * 100).toFixed(1) + ' %' : '0 %';
      return [
        { libelle: 'Paiements', valeur: String(this.totalTransactions), icone: 'fa-receipt', teinte: 'bleu' },
        { libelle: 'En attente', valeur: String(attente), icone: 'fa-hourglass-half', teinte: 'orange' },
        { libelle: 'En échec', valeur: String(echec), icone: 'fa-triangle-exclamation', teinte: 'rose' },
        { libelle: 'Taux de synchronisation', valeur: taux, icone: 'fa-wifi', teinte: 'vert' }
      ];
    }
    if (this.idActif === 'performance') {
      const b = this.busesFiltrees;
      return [
        { libelle: 'Bus sélectionnés', valeur: String(b.length), icone: 'fa-bus', teinte: 'bleu' },
        { libelle: 'Km parcourus', valeur: new Intl.NumberFormat('fr-FR').format(b.reduce((s, r) => s + r.km, 0)), icone: 'fa-road', teinte: 'vert' },
        { libelle: 'Carburant (L)', valeur: new Intl.NumberFormat('fr-FR').format(b.reduce((s, r) => s + r.consommation, 0)), icone: 'fa-gas-pump', teinte: 'orange' },
        { libelle: 'Électricité (kWh)', valeur: new Intl.NumberFormat('fr-FR').format(b.reduce((s, r) => s + r.electriciteKwh, 0)), icone: 'fa-bolt', teinte: 'violet' },
        { libelle: 'Électriques / hybrides', valeur: String(b.filter(r => r.energie !== 'Thermique').length), icone: 'fa-car-side', teinte: 'menthe' }
      ];
    }
    return [
      { libelle: 'Total recettes', valeur: this.formatMontant(this.totalRecettes), icone: 'fa-calendar-days', teinte: 'bleu' },
      { libelle: 'Total versements', valeur: this.formatMontant(this.totalVersements), icone: 'fa-wallet', teinte: 'vert' },
      { libelle: 'Écart', valeur: this.formatMontant(this.ecart), icone: 'fa-scale-balanced', teinte: 'rose' },
      { libelle: 'Taux de recouvrement moyen', valeur: this.tauxMoyen, icone: 'fa-circle-dollar-to-slot', teinte: 'menthe' },
      { libelle: 'Nombre de paiements', valeur: new Intl.NumberFormat('fr-FR').format(this.totalTransactions), icone: 'fa-receipt', teinte: 'bleu' }
    ];
  }

  ouvrirRapport(id: RapportId): void {
    this.idActif = id;
    this.page = 1;
    this.ligneDetail = null;
    this.message = '';
    // La carte conduit directement au rapport correspondant.
    window.setTimeout(() => document.getElementById('rapport-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }
  appliquerFiltres(): void {
    if (this.debut && this.fin && this.debut > this.fin) {
      this.message = 'La date de début doit précéder la date de fin.';
      return;
    }
    this.rechercheAppliquee = this.rechercheBus.trim();
    this.page = 1;
    this.ligneDetail = null;
    this.message = '';
  }
  filtreChange(): void { this.appliquerFiltres(); }
  changerPage(p: number): void { if (p >= 1 && p <= this.pages) this.page = p; }
  changerTaille(): void { this.page = 1; }
  afficherDetail(ligne: Ligne): void { this.ligneDetail = ligne; }
  fermerDetail(): void { this.ligneDetail = null; }

  formaterCellule(cle: string, valeur: string | number): string {
    if (['recettes', 'versements', 'ecart'].includes(cle) && typeof valeur === 'number') {
      return new Intl.NumberFormat('fr-FR').format(valeur);
    }
    if (['km', 'consommation', 'electriciteKwh', 'rendement', 'transactions'].includes(cle) && typeof valeur === 'number') {
      return new Intl.NumberFormat('fr-FR').format(valeur);
    }
    return String(valeur);
  }

  exporterCSV(): void {
    const colonnes = this.colonnes;
    const quote = (v: string): string => '"' + v.replace(/"/g, '""') + '"';
    const lignes = [colonnes.map(c => quote(c.libelle)).join(';'),
      ...this.lignes.map(l => colonnes.map(c => quote(this.formaterCellule(c.cle, l[c.cle] ?? ''))).join(';'))];
    const blob = new Blob(['\ufeff' + lignes.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    this.telecharger(blob, 'rapport-' + this.idActif + '.csv');
  }
  exporterExcel(): void {
    // Format HTML compatible Excel, sans dépendance externe.
    const esc = (v: string): string => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const head = this.colonnes.map(c => '<th>' + esc(c.libelle) + '</th>').join('');
    const body = this.lignes.map(l => '<tr>' + this.colonnes.map(c => '<td>' + esc(this.formaterCellule(c.cle, l[c.cle] ?? '')) + '</td>').join('') + '</tr>').join('');
    const html = '<html><head><meta charset="utf-8"></head><body><table border="1"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></body></html>';
    this.telecharger(new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel;charset=utf-8' }), 'rapport-' + this.idActif + '.xls');
  }
  /** Imprime uniquement les colonnes et lignes actuellement filtrées (toutes les pages). */
  imprimerTableau(): void {
    const fenetre = window.open('', '_blank', 'width=1100,height=760');
    if (!fenetre) {
      this.message = 'Autorisez les fenêtres contextuelles pour imprimer ou enregistrer en PDF.';
      return;
    }
    const echapper = (valeur: string): string => valeur
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const entetes = this.colonnes.map(c => `<th>${echapper(c.libelle)}</th>`).join('');
    const lignes = this.lignes.map(l =>
      '<tr>' + this.colonnes.map(c =>
        `<td>${echapper(this.formaterCellule(c.cle, l[c.cle] ?? ''))}</td>`
      ).join('') + '</tr>'
    ).join('');
    const description = [
      this.debut ? `Du ${this.debut}` : '',
      this.fin ? `au ${this.fin}` : '',
      this.vehicule !== 'Tous' ? `Véhicule : ${this.vehicule}` : '',
      this.typeBus !== 'Tous' ? `Type : ${this.typeBus}` : '',
      this.marque !== 'Toutes' ? `Marque : ${this.marque}` : '',
      this.rechercheAppliquee ? `Recherche : ${this.rechercheAppliquee}` : '',
    ].filter(Boolean).join(' | ');
    const documentImpression = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<title>${echapper(this.actif.titre)}</title><style>
@page{size:landscape;margin:12mm}body{font-family:Arial,sans-serif;color:#253950;margin:0}
h1{font-size:18px;margin:0 0 6px}.meta{font-size:10px;color:#64758a;margin-bottom:14px}
table{width:100%;border-collapse:collapse;font-size:10px}th,td{padding:7px;border:1px solid #dfe5ec;text-align:left}
th{background:#eaf2f9}tr:nth-child(even){background:#f4f8fc}
</style></head><body><h1>${echapper(this.actif.titre)}</h1>
<div class="meta">${echapper(description)} | ${this.lignes.length} résultats</div>
<table><thead><tr>${entetes}</tr></thead><tbody>${lignes}</tbody></table></body></html>`;
    fenetre.document.open();
    fenetre.document.write(documentImpression);
    fenetre.document.close();
    fenetre.focus();
    fenetre.addEventListener('afterprint', () => fenetre.close());
    fenetre.setTimeout(() => fenetre.print(), 350);
  }
  /** Choisir « Enregistrer au format PDF » dans la fenêtre d'impression. */
  exporterPDF(): void { this.imprimerTableau(); }
  private telecharger(blob: Blob, nom: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nom;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
}
