import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemandesService } from '../../services/demandes.service';
import { ServicesService } from '../../services/services.service';
import { WorkflowsService } from '../../services/workflows.service';
import { SoumissionFormulaire, ServiceInstitution, CompteUtilisateur, Workflow } from '../../models/provider.model';
import { ExportUtilsService } from '../../core/export-utils.service';

type TypeRapport = 'DEMANDES' | 'REVENUS' | 'COMPTES';

interface ColonneRapport {
  cle: string;
  label: string;
}

interface LigneRapport {
  [cle: string]: string | number;
}

const STATUTS_LABELS: Record<string, string> = {
  SOUMIS: 'Soumis', PAIEMENT_EN_ATTENTE: 'Paiement en attente', RECU: 'Reçu',
  EN_VERIFICATION: 'En vérification', EN_VALIDATION: 'En validation', EN_TRAITEMENT: 'En traitement',
  APPROUVE: 'Approuvé', REJETE: 'Rejeté', TERMINE: 'Terminé'
};

// Libellé de l'étape du dossier (distinct du statut global) quand aucune étape
// de workflow précise n'est trouvée pour la demande.
const ETAPE_FALLBACK_LABELS: Record<string, string> = {
  SOUMIS: 'Dossier déposé, en attente de prise en charge',
  PAIEMENT_EN_ATTENTE: "En attente du paiement du demandeur",
  RECU: 'Dossier réceptionné par le service',
  EN_VERIFICATION: 'Vérification des pièces en cours',
  EN_VALIDATION: 'En attente de validation du responsable',
  EN_TRAITEMENT: 'Traitement du dossier en cours',
  APPROUVE: 'Dossier approuvé, finalisation en cours',
  REJETE: 'Dossier clôturé (rejeté)',
  TERMINE: 'Dossier clôturé (terminé)'
};

@Component({
  selector: 'app-rapports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rapports.component.html',
  styleUrl: './rapports.component.scss'
})
export class RapportsComponent implements OnInit {
  isLoading = true;

  // Données brutes
  demandes: SoumissionFormulaire[] = [];
  services: ServiceInstitution[] = [];
  comptes: CompteUtilisateur[] = [];
  workflows: Workflow[] = [];

  // Filtres
  typeRapport: TypeRapport = 'DEMANDES';
  dateDebut = '';
  dateFin = '';
  serviceId = '';
  statut = '';
  role = '';
  recherche = '';

  // Résultats
  colonnes: ColonneRapport[] = [];
  lignes: LigneRapport[] = [];

  // Pagination
  currentPage = 1;
  pageSize = 15;

  readonly statutsDisponibles = Object.keys(STATUTS_LABELS);

  constructor(
    private demandesService: DemandesService,
    private servicesService: ServicesService,
    private workflowsService: WorkflowsService,
    private exportUtils: ExportUtilsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.servicesService.getAll().subscribe(services => {
      this.services = services;
      this.demandesService.getAll().subscribe(demandes => {
        this.demandes = demandes;
        this.workflowsService.getAllComptes().subscribe(comptes => {
          this.comptes = comptes;
          this.workflowsService.getAll().subscribe(workflows => {
            this.workflows = workflows;
            this.genererRapport();
            this.isLoading = false;
          });
        });
      });
    });
  }

  // ─── FILTRES ───────────────────────────────────────────────
  changerType(type: TypeRapport): void {
    this.typeRapport = type;
    this.currentPage = 1;
    this.genererRapport();
  }

  reinitialiserFiltres(): void {
    this.dateDebut = '';
    this.dateFin = '';
    this.serviceId = '';
    this.statut = '';
    this.role = '';
    this.recherche = '';
    this.currentPage = 1;
    this.genererRapport();
  }

  get rolesDisponibles(): string[] {
    return [...new Set(this.comptes.map(c => c.role))].sort();
  }

  private dansPeriode(date: Date): boolean {
    const d = new Date(date).getTime();
    if (this.dateDebut && d < new Date(this.dateDebut).getTime()) return false;
    if (this.dateFin && d > new Date(this.dateFin).getTime() + 24 * 3600 * 1000 - 1) return false;
    return true;
  }

  // ─── GÉNÉRATION DU RAPPORT ─────────────────────────────────
  genererRapport(): void {
    this.currentPage = 1;
    if (this.typeRapport === 'DEMANDES') {
      this.genererRapportDemandes();
    } else if (this.typeRapport === 'REVENUS') {
      this.genererRapportRevenus();
    } else {
      this.genererRapportComptes();
    }
  }

  private demandesFiltrees(): SoumissionFormulaire[] {
    const term = this.recherche.toLowerCase().trim();
    return this.demandes.filter(d => {
      const matchDate = this.dansPeriode(d.dateSoumission);
      const matchService = !this.serviceId || d.serviceId === Number(this.serviceId);
      const matchStatut = !this.statut || d.statut === this.statut;
      const matchTerm = !term ||
        d.numeroReference.toLowerCase().includes(term) ||
        d.utilisateurNom.toLowerCase().includes(term) ||
        d.serviceNom.toLowerCase().includes(term);
      return matchDate && matchService && matchStatut && matchTerm;
    });
  }

  private genererRapportDemandes(): void {
    this.colonnes = [
      { cle: 'reference', label: 'Référence' },
      { cle: 'demandeur', label: 'Demandeur' },
      { cle: 'telephone', label: 'Téléphone' },
      { cle: 'service', label: 'Service' },
      { cle: 'etapeActuelle', label: 'Où en est le dossier' },
      { cle: 'responsable', label: 'Responsable actuel' },
      { cle: 'dateSoumission', label: 'Soumis le' },
      { cle: 'derniereMaj', label: 'Dernière mise à jour' },
      { cle: 'joursEcoules', label: 'Jours écoulés' },
      { cle: 'statut', label: 'Statut' },
      { cle: 'montant', label: 'Montant (BIF)' },
      { cle: 'paiement', label: 'Paiement' }
    ];
    const maintenant = Date.now();
    this.lignes = this.demandesFiltrees()
      .sort((a, b) => b.dateSoumission.getTime() - a.dateSoumission.getTime())
      .map(d => {
        const workflow = this.workflows.find(w => w.serviceId === d.serviceId);
        const etapeWorkflow = workflow?.etapes.find(e => e.code === d.statut);
        const responsables = etapeWorkflow
          ? this.comptes.filter(c => c.etapeId === etapeWorkflow.id).map(c => `${c.prenom} ${c.nom}`).join(', ')
          : '';
        const joursEcoules = Math.floor((maintenant - new Date(d.dateSoumission).getTime()) / 86400000);

        return {
          reference: d.numeroReference,
          demandeur: d.utilisateurNom,
          telephone: d.utilisateurTelephone,
          service: d.serviceNom,
          etapeActuelle: etapeWorkflow?.nom || ETAPE_FALLBACK_LABELS[d.statut] || this.statutLabel(d.statut),
          responsable: responsables || (d.statut === 'TERMINE' || d.statut === 'REJETE' ? '—' : 'Non assigné'),
          dateSoumission: new Date(d.dateSoumission).toLocaleDateString('fr-FR'),
          derniereMaj: new Date(d.dateMaj).toLocaleDateString('fr-FR'),
          joursEcoules,
          statut: this.statutLabel(d.statut),
          montant: d.montant,
          paiement: d.montantPaye ? 'Payé' : 'Non payé'
        };
      });
  }

  private genererRapportRevenus(): void {
    this.colonnes = [
      { cle: 'service', label: 'Service' },
      { cle: 'nbDemandes', label: 'Nb demandes' },
      { cle: 'nbPayees', label: 'Payées' },
      { cle: 'tauxPaiement', label: 'Taux de paiement' },
      { cle: 'revenuEncaisse', label: 'Revenu encaissé (BIF)' },
      { cle: 'revenuAttente', label: 'Revenu en attente (BIF)' }
    ];
    const filtrees = this.demandesFiltrees();
    const parService = new Map<number, { service: string; nbDemandes: number; nbPayees: number; revenuEncaisse: number; revenuAttente: number }>();

    for (const d of filtrees) {
      if (!parService.has(d.serviceId)) {
        parService.set(d.serviceId, { service: d.serviceNom, nbDemandes: 0, nbPayees: 0, revenuEncaisse: 0, revenuAttente: 0 });
      }
      const s = parService.get(d.serviceId)!;
      s.nbDemandes++;
      if (d.montantPaye) {
        s.nbPayees++;
        s.revenuEncaisse += d.montant || 0;
      } else {
        s.revenuAttente += d.montant || 0;
      }
    }

    this.lignes = Array.from(parService.values())
      .sort((a, b) => b.revenuEncaisse - a.revenuEncaisse)
      .map(s => ({ ...s, tauxPaiement: s.nbDemandes ? Math.round((s.nbPayees / s.nbDemandes) * 100) + '%' : '0%' }));
  }

  private genererRapportComptes(): void {
    this.colonnes = [
      { cle: 'nom', label: 'Nom complet' },
      { cle: 'identifiant', label: 'Identifiant de connexion' },
      { cle: 'role', label: 'Rôle' },
      { cle: 'service', label: 'Service' },
      { cle: 'etape', label: 'Étape assignée' },
      { cle: 'droits', label: 'Droits accordés' },
      { cle: 'adresse', label: 'Adresse' },
      { cle: 'telephone', label: 'Téléphone' },
      { cle: 'statut', label: 'Statut du compte' }
    ];
    const term = this.recherche.toLowerCase().trim();
    this.lignes = this.comptes
      .filter(c => {
        const matchService = !this.serviceId || c.serviceId === Number(this.serviceId);
        const matchRole = !this.role || c.role === this.role;
        const matchTerm = !term ||
          `${c.prenom} ${c.nom}`.toLowerCase().includes(term) ||
          c.role.toLowerCase().includes(term);
        const matchDate = this.dansPeriode(c.dateCreation);
        return matchService && matchRole && matchTerm && matchDate;
      })
      .map(c => ({
        nom: `${c.prenom} ${c.nom}`,
        identifiant: c.identifiantConnexion,
        role: c.role,
        service: this.services.find(s => s.id === c.serviceId)?.nom || '-',
        etape: c.etapeNom || '-',
        droits: c.droits.map(d => this.workflowsService.labelDroit(d)).join(', '),
        adresse: c.adresse,
        telephone: c.telephone,
        statut: c.statut === 'ACTIF' ? 'Actif' : 'Inactif'
      }));
  }

  statutLabel(statut: string): string {
    return STATUTS_LABELS[statut] || statut;
  }

  // ─── PAGINATION ────────────────────────────────────────────
  get totalPages(): number {
    return Math.ceil(this.lignes.length / this.pageSize) || 1;
  }

  get lignesPaginees(): LigneRapport[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.lignes.slice(start, start + this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  // ─── RÉSUMÉ / KPI RAPIDES ──────────────────────────────────
  get totalLignes(): number {
    return this.lignes.length;
  }

  get montantTotal(): number {
    if (this.typeRapport === 'DEMANDES') {
      return this.demandesFiltrees().filter(d => d.montantPaye).reduce((sum, d) => sum + (d.montant || 0), 0);
    }
    if (this.typeRapport === 'REVENUS') {
      return this.lignes.reduce((sum, l) => sum + (Number(l['revenuEncaisse']) || 0), 0);
    }
    return 0;
  }

  // ─── EXPORT EXCEL ──────────────────────────────────────────
  exporterExcel(): void {
    if (this.lignes.length === 0) return;
    this.exportUtils.exporterExcel(this.colonnes, this.lignes, `rapport_${this.typeRapport.toLowerCase()}`, this.typeRapport);
  }

  // ─── IMPRESSION ────────────────────────────────────────────
  imprimer(): void {
    const titreType: Record<TypeRapport, string> = {
      DEMANDES: 'Rapport des demandes',
      REVENUS: 'Rapport des revenus par service',
      COMPTES: 'Rapport des comptes & workflows'
    };

    const filtresTexte: string[] = [];
    if (this.dateDebut) filtresTexte.push(`Du ${new Date(this.dateDebut).toLocaleDateString('fr-FR')}`);
    if (this.dateFin) filtresTexte.push(`au ${new Date(this.dateFin).toLocaleDateString('fr-FR')}`);
    if (this.serviceId) filtresTexte.push(`Service : ${this.services.find(s => s.id === Number(this.serviceId))?.nom || ''}`);
    if (this.statut) filtresTexte.push(`Statut : ${this.statutLabel(this.statut)}`);
    if (this.role) filtresTexte.push(`Rôle : ${this.role}`);
    if (this.recherche) filtresTexte.push(`Recherche : "${this.recherche}"`);

    this.exportUtils.imprimer(titreType[this.typeRapport], 'IBLOPAY — Espace prestataire', filtresTexte, this.colonnes, this.lignes);
  }
}
