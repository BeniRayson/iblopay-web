import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BilletsService } from '../../services/billets.service';
import { EvenementsService } from '../../services/evenements.service';
import { Billet, Evenement, Organisateur, Lieu, TypeEvenement, VenteHistorique } from '../../models/evenements.model';
import { ExportUtilsService, ColonneExport, LigneExport } from '../../core/export-utils.service';

type TypeRapportEvenements = 'BILLETS' | 'REVENUS_ORGANISATEURS' | 'EVENEMENTS';

@Component({
  selector: 'app-rapports-evenements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rapports-evenements.component.html',
  styleUrl: './rapports-evenements.component.scss'
})
export class RapportsEvenementsComponent implements OnInit {
  isLoading = true;

  billets: Billet[] = [];
  evenements: Evenement[] = [];
  organisateurs: Organisateur[] = [];
  lieux: Lieu[] = [];
  historique: VenteHistorique[] = [];

  typeRapport: TypeRapportEvenements = 'BILLETS';
  dateDebut = '';
  dateFin = '';
  typeEvenement: '' | TypeEvenement = '';
  statut = '';
  recherche = '';

  colonnes: ColonneExport[] = [];
  lignes: LigneExport[] = [];

  currentPage = 1;
  pageSize = 30;

  ligneDetailAffichee: LigneExport | null = null;

  constructor(
    private billetsService: BilletsService,
    private evenementsService: EvenementsService,
    private exportUtils: ExportUtilsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.evenementsService.getEvenements().subscribe(e => {
      this.evenements = e;
      this.evenementsService.getOrganisateurs().subscribe(o => {
        this.organisateurs = o;
        this.evenementsService.getLieux().subscribe(l => {
          this.lieux = l;
          this.evenementsService.getHistorique().subscribe(h => {
            this.historique = h;
            this.billetsService.getAll().subscribe(billets => {
              this.billets = billets;
              this.genererRapport();
              this.isLoading = false;
            });
          });
        });
      });
    });
  }

  changerType(type: TypeRapportEvenements): void {
    this.typeRapport = type;
    this.genererRapport();
  }

  reinitialiserFiltres(): void {
    this.dateDebut = '';
    this.dateFin = '';
    this.typeEvenement = '';
    this.statut = '';
    this.recherche = '';
    this.genererRapport();
  }

  private dansPeriode(date: Date): boolean {
    const d = new Date(date).getTime();
    if (this.dateDebut && d < new Date(this.dateDebut).getTime()) return false;
    if (this.dateFin && d > new Date(this.dateFin).getTime() + 24 * 3600000 - 1) return false;
    return true;
  }

  genererRapport(): void {
    this.currentPage = 1;
    if (this.typeRapport === 'BILLETS') this.genererRapportBillets();
    else if (this.typeRapport === 'REVENUS_ORGANISATEURS') this.genererRapportOrganisateurs();
    else this.genererRapportEvenements();
  }

  nomEvenement(id: number): string {
    return this.evenements.find(e => e.id === id)?.nom || '—';
  }

  nomLieu(id: number): string {
    return this.lieux.find(l => l.id === id)?.nom || '—';
  }

  nomOrganisateur(id: number): string {
    const o = this.organisateurs.find(x => x.id === id);
    return o ? `${o.prenom} ${o.nom}` : '—';
  }

  statutLabel(statut: string): string {
    const map: Record<string, string> = { RESERVE: 'Réservé', PAYE: 'Payé', UTILISE: 'Utilisé', ANNULE: 'Annulé' };
    return map[statut] || statut;
  }

  typeLabel(type: TypeEvenement): string {
    const map: Record<TypeEvenement, string> = { MATCH: 'Match', CONCERT: 'Concert', CONFERENCE: 'Conférence', FESTIVAL: 'Festival', AUTRE: 'Autre' };
    return map[type];
  }

  private genererRapportBillets(): void {
    this.colonnes = [
      { cle: 'reference', label: 'Référence' },
      { cle: 'evenement', label: 'Événement' },
      { cle: 'categorie', label: 'Catégorie' },
      { cle: 'client', label: 'Client' },
      { cle: 'date', label: 'Date d\'achat' },
      { cle: 'statut', label: 'Statut' },
      { cle: 'prix', label: 'Montant payé (BIF)' }
    ];
    const term = this.recherche.toLowerCase().trim();

    const lignesLive: LigneExport[] = this.billets.map(b => ({
      reference: b.numeroReference, evenement: this.nomEvenement(b.evenementId), categorie: b.categorieNom,
      client: b.clientNom, date: new Date(b.dateAchat).toLocaleString('fr-FR'), statut: this.statutLabel(b.statut),
      prix: (b.statut === 'PAYE' || b.statut === 'UTILISE') ? b.prix : 0, _date: b.dateAchat.getTime()
    }));

    const lignesHistorique: LigneExport[] = this.historique.map(h => ({
      reference: 'HIST-' + h.id, evenement: this.nomEvenement(h.evenementId), categorie: h.categorieNom,
      client: `${h.quantite} billet(s)`, date: new Date(h.date).toLocaleString('fr-FR'),
      statut: h.statut === 'VALIDE' ? 'Payé' : 'Annulé', prix: h.statut === 'VALIDE' ? h.revenu : 0, _date: h.date.getTime()
    }));

    this.lignes = [...lignesLive, ...lignesHistorique]
      .filter(l => {
        const matchDate = this.dansPeriode(new Date(l['_date'] as number));
        const matchStatut = !this.statut || l['statut'] === this.statutLabel(this.statut);
        const matchTerm = !term ||
          String(l['reference']).toLowerCase().includes(term) ||
          String(l['client']).toLowerCase().includes(term) ||
          String(l['evenement']).toLowerCase().includes(term);
        return matchDate && matchStatut && matchTerm;
      })
      .sort((a, b) => (b['_date'] as number) - (a['_date'] as number))
      .map(({ _date, ...reste }) => reste);
  }

  private genererRapportOrganisateurs(): void {
    this.colonnes = [
      { cle: 'nom', label: 'Organisateur' },
      { cle: 'entreprise', label: 'Entreprise' },
      { cle: 'nombreEvenements', label: 'Nb événements' },
      { cle: 'revenuTotal', label: 'Revenu total (BIF)' },
      { cle: 'statut', label: 'Statut' }
    ];
    const term = this.recherche.toLowerCase().trim();
    this.lignes = this.organisateurs
      .filter(o => !term || `${o.prenom} ${o.nom}`.toLowerCase().includes(term) || (o.entreprise || '').toLowerCase().includes(term))
      .sort((a, b) => (b.revenuTotal || 0) - (a.revenuTotal || 0))
      .map(o => ({
        nom: `${o.prenom} ${o.nom}`, entreprise: o.entreprise || '—', nombreEvenements: o.nombreEvenements || 0,
        revenuTotal: o.revenuTotal || 0, statut: o.statut === 'ACTIF' ? 'Actif' : 'Inactif'
      }));
  }

  private genererRapportEvenements(): void {
    this.colonnes = [
      { cle: 'nom', label: 'Événement' },
      { cle: 'type', label: 'Type' },
      { cle: 'lieu', label: 'Lieu' },
      { cle: 'organisateur', label: 'Organisateur' },
      { cle: 'date', label: 'Date' },
      { cle: 'billetsVendus', label: 'Billets vendus' },
      { cle: 'remplissage', label: 'Taux de remplissage' },
      { cle: 'revenu', label: 'Revenu (BIF)' },
      { cle: 'statut', label: 'Statut' }
    ];
    const term = this.recherche.toLowerCase().trim();
    this.lignes = this.evenements
      .filter(e => {
        const matchType = !this.typeEvenement || e.type === this.typeEvenement;
        const matchTerm = !term || e.nom.toLowerCase().includes(term);
        return matchType && matchTerm;
      })
      .map(e => {
        const billetsVendus = e.categoriesBillets.reduce((s, c) => s + c.quantiteVendue, 0);
        const revenu = e.categoriesBillets.reduce((s, c) => s + c.quantiteVendue * c.prix, 0);
        return {
          nom: e.nom, type: this.typeLabel(e.type), lieu: this.nomLieu(e.lieuId), organisateur: this.nomOrganisateur(e.organisateurId),
          date: new Date(e.dateDebut).toLocaleDateString('fr-FR'), billetsVendus,
          remplissage: (e.capaciteTotale ? Math.round((billetsVendus / e.capaciteTotale) * 100) : 0) + '%',
          revenu, statut: e.statut
        };
      });
  }

  get totalLignes(): number {
    return this.lignes.length;
  }

  get montantTotal(): number {
    if (this.typeRapport === 'BILLETS') return this.lignes.reduce((sum, l) => sum + (Number(l['prix']) || 0), 0);
    if (this.typeRapport === 'REVENUS_ORGANISATEURS') return this.lignes.reduce((sum, l) => sum + (Number(l['revenuTotal']) || 0), 0);
    if (this.typeRapport === 'EVENEMENTS') return this.lignes.reduce((sum, l) => sum + (Number(l['revenu']) || 0), 0);
    return 0;
  }

  get totalPages(): number {
    return Math.ceil(this.lignes.length / this.pageSize) || 1;
  }

  get lignesPaginees(): LigneExport[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.lignes.slice(start, start + this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  ouvrirDetailLigne(ligne: LigneExport): void {
    this.ligneDetailAffichee = ligne;
  }

  fermerDetailLigne(): void {
    this.ligneDetailAffichee = null;
  }

  exporterLigneExcel(): void {
    if (!this.ligneDetailAffichee) return;
    this.exportUtils.exporterExcel(this.colonnes, [this.ligneDetailAffichee], `detail_${this.typeRapport.toLowerCase()}`, 'Détail');
  }

  imprimerLigne(): void {
    if (!this.ligneDetailAffichee) return;
    const titres: Record<TypeRapportEvenements, string> = {
      BILLETS: 'Détail du billet', REVENUS_ORGANISATEURS: 'Détail de l\'organisateur', EVENEMENTS: 'Détail de l\'événement'
    };
    this.exportUtils.imprimer(titres[this.typeRapport], 'IBLOPAY — Espace Événements', [], this.colonnes, [this.ligneDetailAffichee]);
  }

  exporterExcel(): void {
    if (this.lignes.length === 0) return;
    this.exportUtils.exporterExcel(this.colonnes, this.lignes, `rapport_evenements_${this.typeRapport.toLowerCase()}`, this.typeRapport);
  }

  imprimer(): void {
    const titres: Record<TypeRapportEvenements, string> = {
      BILLETS: 'Rapport des billets vendus', REVENUS_ORGANISATEURS: 'Rapport des revenus par organisateur', EVENEMENTS: 'Rapport des événements'
    };
    const filtres: string[] = [];
    if (this.dateDebut) filtres.push(`Du ${new Date(this.dateDebut).toLocaleDateString('fr-FR')}`);
    if (this.dateFin) filtres.push(`au ${new Date(this.dateFin).toLocaleDateString('fr-FR')}`);
    if (this.typeEvenement) filtres.push(`Type : ${this.typeLabel(this.typeEvenement)}`);
    if (this.statut) filtres.push(`Statut : ${this.statutLabel(this.statut)}`);
    if (this.recherche) filtres.push(`Recherche : "${this.recherche}"`);
    this.exportUtils.imprimer(titres[this.typeRapport], 'IBLOPAY — Espace Événements', filtres, this.colonnes, this.lignes);
  }
}
