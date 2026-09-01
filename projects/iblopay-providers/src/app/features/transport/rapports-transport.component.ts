import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { TransportService } from '../../services/transport.service';
import { Course, Vehicule, Chauffeur, TypeVehicule, LigneBus, ZoneTaxi } from '../../models/transport.model';
import { ExportUtilsService, ColonneExport, LigneExport } from '../../core/export-utils.service';

type TypeRapportTransport = 'COURSES' | 'REVENUS_CHAUFFEURS' | 'FLOTTE';

@Component({
  selector: 'app-rapports-transport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rapports-transport.component.html',
  styleUrl: './rapports-transport.component.scss'
})
export class RapportsTransportComponent implements OnInit {
  isLoading = true;

  courses: Course[] = [];
  vehicules: Vehicule[] = [];
  chauffeurs: Chauffeur[] = [];
  lignesBus: LigneBus[] = [];
  zones: ZoneTaxi[] = [];
  historique: import('../../models/transport.model').TrajetHistorique[] = [];

  typeRapport: TypeRapportTransport = 'COURSES';
  dateDebut = '';
  dateFin = '';
  typeVehicule: '' | TypeVehicule = '';
  statut = '';
  recherche = '';

  colonnes: ColonneExport[] = [];
  lignes: LigneExport[] = [];

  currentPage = 1;
  pageSize = 30;

  // ─── DÉTAIL D'UNE LIGNE DE RAPPORT ─────────────────────────
  ligneDetailAffichee: LigneExport | null = null;

  constructor(
    private coursesService: CoursesService,
    private transportService: TransportService,
    private exportUtils: ExportUtilsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.transportService.getVehicules().subscribe(v => {
      this.vehicules = v;
      this.transportService.getChauffeurs().subscribe(c => {
        this.chauffeurs = c;
        this.transportService.getLignes().subscribe(l => {
          this.lignesBus = l;
          this.transportService.getZones().subscribe(z => {
            this.zones = z;
            this.transportService.getHistorique().subscribe(h => {
              this.historique = h;
              this.coursesService.getAll().subscribe(courses => {
                this.courses = courses;
                this.genererRapport();
                this.isLoading = false;
              });
            });
          });
        });
      });
    });
  }

  changerType(type: TypeRapportTransport): void {
    this.typeRapport = type;
    this.genererRapport();
  }

  reinitialiserFiltres(): void {
    this.dateDebut = '';
    this.dateFin = '';
    this.typeVehicule = '';
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
    if (this.typeRapport === 'COURSES') this.genererRapportCourses();
    else if (this.typeRapport === 'REVENUS_CHAUFFEURS') this.genererRapportChauffeurs();
    else this.genererRapportFlotte();
  }

  nomVehicule(id?: number): string {
    if (!id) return '—';
    return this.vehicules.find(v => v.id === id)?.matricule || '—';
  }

  nomChauffeur(id?: number): string {
    if (!id) return '—';
    const c = this.chauffeurs.find(x => x.id === id);
    return c ? `${c.prenom} ${c.nom}` : '—';
  }

  statutLabel(statut: string): string {
    const map: Record<string, string> = {
      DEMANDE: 'Demande reçue', ACCEPTEE: 'Véhicule assigné', EN_COURS: 'En cours', TERMINEE: 'Terminée', ANNULEE: 'Annulée'
    };
    return map[statut] || statut;
  }

  motorisationLabel(m: string): string {
    const map: Record<string, string> = { ESSENCE: 'Essence', DIESEL: 'Diesel', ELECTRIQUE: 'Électrique', HYBRIDE: 'Hybride' };
    return map[m] || m;
  }

  /** Consommation totale à ce jour, formatée avec la bonne unité (L pour thermique, kWh pour électrique). */
  consommationFormatee(v: Vehicule): string {
    const total = (v.kilometrage / 100) * v.consommationMoyenne100km;
    const unite = v.motorisation === 'ELECTRIQUE' ? 'kWh' : 'L';
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(total) + ' ' + unite;
  }

  private genererRapportCourses(): void {
    this.colonnes = [
      { cle: 'reference', label: 'Référence' },
      { cle: 'type', label: 'Type' },
      { cle: 'client', label: 'Client' },
      { cle: 'trajet', label: 'Trajet' },
      { cle: 'vehicule', label: 'Véhicule' },
      { cle: 'chauffeur', label: 'Chauffeur' },
      { cle: 'date', label: 'Date de demande' },
      { cle: 'statut', label: 'Statut' },
      { cle: 'prix', label: 'Montant payé (BIF)' }
    ];
    const term = this.recherche.toLowerCase().trim();

    // Courses en cours/récentes (données live)
    const lignesLive: LigneExport[] = this.courses.map(c => ({
      reference: c.numeroReference,
      type: c.type === 'BUS' ? 'Bus' : 'Taxi',
      client: c.clientNom,
      trajet: `${c.depart} → ${c.destination}`,
      vehicule: this.nomVehicule(c.vehiculeId),
      chauffeur: this.nomChauffeur(c.chauffeurId),
      date: new Date(c.dateDemande).toLocaleString('fr-FR'),
      statut: this.statutLabel(c.statut),
      prix: c.statut === 'TERMINEE' ? c.prix : 0,
      _date: c.dateDemande.getTime()
    }));

    // Historique complet des trajets passés (bus & taxi)
    const lignesHistorique: LigneExport[] = this.historique.map(h => {
      const nomTrajet = h.ligneId
        ? (this.lignesBus.find(l => l.id === h.ligneId)?.nom || 'Trajet bus')
        : (this.zones.find(z => z.id === h.zoneId)?.nom || 'Zone taxi');
      return {
        reference: 'HIST-' + h.id,
        type: h.type === 'BUS' ? 'Bus' : 'Taxi',
        client: h.type === 'BUS' ? `${h.passagers} passager(s)` : 'Client',
        trajet: nomTrajet,
        vehicule: this.nomVehicule(h.vehiculeId),
        chauffeur: this.nomChauffeur(h.chauffeurId),
        date: new Date(h.date).toLocaleString('fr-FR'),
        statut: h.statut === 'TERMINE' ? 'Terminée' : 'Annulée',
        prix: h.statut === 'TERMINE' ? h.revenu : 0,
        _date: h.date.getTime()
      };
    });

    const toutesLesLignes = [...lignesLive, ...lignesHistorique];

    this.lignes = toutesLesLignes
      .filter(l => {
        const matchDate = this.dansPeriode(new Date(l['_date'] as number));
        const matchType = !this.typeVehicule || l['type'] === (this.typeVehicule === 'BUS' ? 'Bus' : 'Taxi');
        const matchStatut = !this.statut || l['statut'] === this.statutLabel(this.statut);
        const matchTerm = !term ||
          String(l['reference']).toLowerCase().includes(term) ||
          String(l['client']).toLowerCase().includes(term) ||
          String(l['trajet']).toLowerCase().includes(term);
        return matchDate && matchType && matchStatut && matchTerm;
      })
      .sort((a, b) => (b['_date'] as number) - (a['_date'] as number))
      .map(({ _date, ...reste }) => reste);
  }

  private genererRapportChauffeurs(): void {
    this.colonnes = [
      { cle: 'nom', label: 'Chauffeur' },
      { cle: 'vehicule', label: 'Véhicule' },
      { cle: 'nombreCourses', label: 'Nb trajets' },
      { cle: 'revenuTotal', label: 'Revenu total (BIF)' },
      { cle: 'note', label: 'Note' },
      { cle: 'statut', label: 'Statut' }
    ];
    const term = this.recherche.toLowerCase().trim();
    this.lignes = this.chauffeurs
      .filter(c => !term || `${c.prenom} ${c.nom}`.toLowerCase().includes(term))
      .sort((a, b) => (b.revenuTotal || 0) - (a.revenuTotal || 0))
      .map(c => ({
        nom: `${c.prenom} ${c.nom}`,
        vehicule: this.nomVehicule(c.vehiculeId),
        nombreCourses: c.nombreCourses || 0,
        revenuTotal: c.revenuTotal || 0,
        note: c.note || 0,
        statut: c.statut === 'ACTIF' ? 'Actif' : 'Inactif'
      }));
  }

  private genererRapportFlotte(): void {
    this.colonnes = [
      { cle: 'matricule', label: 'Matricule' },
      { cle: 'type', label: 'Type' },
      { cle: 'modele', label: 'Modèle' },
      { cle: 'chauffeur', label: 'Chauffeur' },
      { cle: 'kilometrage', label: 'Kilométrage parcouru' },
      { cle: 'motorisation', label: 'Motorisation' },
      { cle: 'consommation', label: 'Consommation totale' },
      { cle: 'statut', label: 'Statut' }
    ];
    const term = this.recherche.toLowerCase().trim();
    this.lignes = this.vehicules
      .filter(v => {
        const matchType = !this.typeVehicule || v.type === this.typeVehicule;
        const matchTerm = !term || v.matricule.toLowerCase().includes(term) || v.marqueModele.toLowerCase().includes(term);
        return matchType && matchTerm;
      })
      .map(v => ({
        matricule: v.matricule,
        type: v.type === 'BUS' ? 'Bus' : 'Taxi',
        modele: v.marqueModele,
        chauffeur: this.nomChauffeur(v.chauffeurId),
        kilometrage: v.kilometrage,
        motorisation: this.motorisationLabel(v.motorisation),
        consommation: this.consommationFormatee(v),
        statut: v.statut
      }));
  }

  get totalLignes(): number {
    return this.lignes.length;
  }

  get montantTotal(): number {
    if (this.typeRapport === 'COURSES') {
      return this.lignes.reduce((sum, l) => sum + (Number(l['prix']) || 0), 0);
    }
    if (this.typeRapport === 'REVENUS_CHAUFFEURS') {
      return this.lignes.reduce((sum, l) => sum + (Number(l['revenuTotal']) || 0), 0);
    }
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

  // ─── DÉTAIL D'UNE LIGNE (clic) ──────────────────────────────
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
    const titres: Record<TypeRapportTransport, string> = {
      COURSES: 'Détail de la course',
      REVENUS_CHAUFFEURS: 'Détail du chauffeur',
      FLOTTE: 'Détail du véhicule'
    };
    this.exportUtils.imprimer(titres[this.typeRapport], 'IBLOPAY — Espace Transport', [], this.colonnes, [this.ligneDetailAffichee]);
  }

  exporterExcel(): void {
    if (this.lignes.length === 0) return;
    this.exportUtils.exporterExcel(this.colonnes, this.lignes, `rapport_transport_${this.typeRapport.toLowerCase()}`, this.typeRapport);
  }

  imprimer(): void {
    const titres: Record<TypeRapportTransport, string> = {
      COURSES: 'Rapport des courses (bus & taxis)',
      REVENUS_CHAUFFEURS: 'Rapport des revenus par chauffeur',
      FLOTTE: 'Rapport de la flotte (kilométrage & consommation)'
    };
    const filtres: string[] = [];
    if (this.dateDebut) filtres.push(`Du ${new Date(this.dateDebut).toLocaleDateString('fr-FR')}`);
    if (this.dateFin) filtres.push(`au ${new Date(this.dateFin).toLocaleDateString('fr-FR')}`);
    if (this.typeVehicule) filtres.push(`Type : ${this.typeVehicule === 'BUS' ? 'Bus' : 'Taxi'}`);
    if (this.statut) filtres.push(`Statut : ${this.statutLabel(this.statut)}`);
    if (this.recherche) filtres.push(`Recherche : "${this.recherche}"`);
    this.exportUtils.imprimer(titres[this.typeRapport], 'IBLOPAY — Espace Transport', filtres, this.colonnes, this.lignes);
  }
}
