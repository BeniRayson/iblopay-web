import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemandesService } from '../../services/demandes.service';
import { WorkflowsService } from '../../services/workflows.service';
import { SoumissionFormulaire, StatutSoumission, ReponseFormulaire, Workflow, CompteUtilisateur } from '../../models/provider.model';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';

const ETAPES_WORKFLOW: { code: StatutSoumission; label: string; icon: string }[] = [
  { code: 'SOUMIS', label: 'Soumission', icon: 'fa-solid fa-file-import' },
  { code: 'EN_VERIFICATION', label: 'Vérification', icon: 'fa-solid fa-magnifying-glass' },
  { code: 'EN_VALIDATION', label: 'Validation', icon: 'fa-solid fa-clipboard-check' },
  { code: 'EN_TRAITEMENT', label: 'Traitement', icon: 'fa-solid fa-gears' },
  { code: 'APPROUVE', label: 'Approbation', icon: 'fa-solid fa-stamp' },
  { code: 'TERMINE', label: 'Document délivré', icon: 'fa-solid fa-circle-check' }
];

@Component({
  selector: 'app-demandes-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demandes-list.component.html',
  styleUrl: './demandes-list.component.scss'
})
export class DemandesListComponent implements OnInit {
  demandes: SoumissionFormulaire[] = [];
  filtered: SoumissionFormulaire[] = [];
  searchTerm = '';
  selectedStatut = '';
  demandeSelectionnee: SoumissionFormulaire | null = null;
  documentAgrandi: ReponseFormulaire | null = null;
  bordereauAgrandi: SoumissionFormulaire | null = null;
  etapeSelectionnee: { code: StatutSoumission; label: string; icon: string } | null = null;
  isLoading = true;
  etapes = ETAPES_WORKFLOW;

  workflowActif: Workflow | null = null;
  comptesActifs: CompteUtilisateur[] = [];

  constructor(
    private demandesService: DemandesService,
    private workflowsService: WorkflowsService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  // ─── DROITS DE L'UTILISATEUR CONNECTÉ ───────────────────────
  get estAdmin(): boolean {
    return this.authService.estAdmin;
  }

  get utilisateur() {
    return this.authService.utilisateurActuel;
  }

  get peutVoirDocuments(): boolean {
    return this.authService.aLeDroit('VOIR_DOCUMENTS');
  }

  get peutEncaisser(): boolean {
    return this.authService.aLeDroit('ENCAISSER_PAIEMENT');
  }

  /** Vrai si l'utilisateur connecté est responsable de l'étape actuelle de la demande sélectionnée. */
  get estResponsableEtapeActuelle(): boolean {
    if (this.estAdmin) return true;
    const u = this.utilisateur;
    const d = this.demandeSelectionnee;
    if (!u || !d || u.type !== 'COMPTE') return false;
    return u.serviceId === d.serviceId && u.etapeId ===
      (this.workflowActif?.etapes.find(e => e.code === d.statut)?.id || '__aucune__');
  }

  get peutValider(): boolean {
    return this.estAdmin || (this.authService.aLeDroit('VALIDER') && this.estResponsableEtapeActuelle);
  }

  get peutRejeter(): boolean {
    return this.estAdmin || (this.authService.aLeDroit('REJETER') && this.estResponsableEtapeActuelle);
  }

  load(): void {
    this.isLoading = true;
    this.demandesService.getAll().subscribe(d => {
      let liste = [...d];
      const u = this.utilisateur;
      // Un compte non-admin ne voit que les dossiers de son propre service — son périmètre de travail.
      if (u && u.type === 'COMPTE' && u.serviceId) {
        liste = liste.filter(x => x.serviceId === u.serviceId);
      }
      this.demandes = liste.sort((a, b) => b.dateSoumission.getTime() - a.dateSoumission.getTime());
      this.applyFilters();
      this.isLoading = false;
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = this.demandes.filter(d => {
      const matchTerm = !term ||
        d.numeroReference.toLowerCase().includes(term) ||
        d.utilisateurNom.toLowerCase().includes(term);
      const matchStatut = !this.selectedStatut || d.statut === this.selectedStatut;
      return matchTerm && matchStatut;
    });
  }

  ouvrirDetail(d: SoumissionFormulaire): void {
    this.demandeSelectionnee = d;
    this.documentAgrandi = null;
    this.bordereauAgrandi = null;
    const idx = this.etapeIndex(d.statut);
    this.etapeSelectionnee = this.etapes[idx] ?? this.etapes[0] ?? null;

    this.workflowActif = null;
    this.comptesActifs = [];
    this.workflowsService.getByServiceId(d.serviceId).subscribe(w => {
      this.workflowActif = w || null;
      if (w) {
        this.workflowsService.getComptesByWorkflow(w.id).subscribe(comptes => this.comptesActifs = comptes);
      }
    });
  }

  fermerDetail(): void {
    this.demandeSelectionnee = null;
    this.documentAgrandi = null;
    this.bordereauAgrandi = null;
    this.etapeSelectionnee = null;
    this.workflowActif = null;
    this.comptesActifs = [];
  }

  selectionnerEtapeWorkflow(e: { code: StatutSoumission; label: string; icon: string }): void {
    this.etapeSelectionnee = e;
  }

  getAuditInfo(code: StatutSoumission): { statut: string; agent: string; date: string; commentaire: string } {
    const d = this.demandeSelectionnee;
    if (!d) return { statut: 'Non atteint', agent: '-', date: '-', commentaire: '-' };

    const currentIdx = this.etapeIndex(d.statut);
    const targetIdx = this.etapes.findIndex(e => e.code === code);
    const agentReel = this.agentAssigne(code);

    if (targetIdx < currentIdx || d.statut === 'TERMINE') {
      return {
        statut: 'Approuvé et validé',
        agent: agentReel || 'Agent IBLOPAY Certifié (#402)',
        date: new Date(d.dateSoumission.getTime() + targetIdx * 3600000).toLocaleString('fr-FR'),
        commentaire: 'Vérification conforme aux exigences réglementaires.'
      };
    } else if (targetIdx === currentIdx && d.statut !== 'REJETE') {
      return {
        statut: 'En cours de traitement',
        agent: agentReel || 'Service assigné en attente',
        date: new Date(d.dateMaj).toLocaleString('fr-FR'),
        commentaire: 'Dossier actuellement à cette étape.'
      };
    } else {
      return {
        statut: 'En attente des étapes précédentes',
        agent: agentReel ? `${agentReel} (à venir)` : '-',
        date: '-',
        commentaire: 'Étape non encore atteinte.'
      };
    }
  }

  /** Retourne "Prénom Nom — Rôle" du/des comptes rattachés à l'étape du workflow correspondant à ce code de statut. */
  agentAssigne(code: StatutSoumission): string {
    const etapeWorkflow = this.workflowActif?.etapes.find(e => e.code === code);
    if (!etapeWorkflow) return '';
    const comptes = this.comptesActifs.filter(c => c.etapeId === etapeWorkflow.id);
    if (comptes.length === 0) return '';
    return comptes.map(c => `${c.prenom} ${c.nom} (${c.role})`).join(', ');
  }

  voirDocument(r: ReponseFormulaire, event: Event): void {
    event.stopPropagation();
    if (!this.peutVoirDocuments) {
      this.toastService.error('Vous n\'avez pas le droit de consulter les documents.');
      return;
    }
    this.bordereauAgrandi = null;
    this.documentAgrandi = r;
  }

  fermerDocument(): void {
    this.documentAgrandi = null;
  }

  ouvrirBordereau(d: SoumissionFormulaire, event: Event): void {
    event.stopPropagation();
    this.documentAgrandi = null;
    this.bordereauAgrandi = d;
  }

  fermerBordereau(): void {
    this.bordereauAgrandi = null;
  }

  get copieOfficielle(): ReponseFormulaire | undefined {
    return this.demandeSelectionnee?.reponses.find(r => r.type === 'FICHIER');
  }

  get documentsJoints(): ReponseFormulaire[] {
    const fichiers = this.demandeSelectionnee?.reponses.filter(r => r.type === 'FICHIER') || [];
    return fichiers.length > 1 ? fichiers.slice(1) : [];
  }

  /** Numéro de bordereau généré à partir de la référence du dossier */
  get numeroBordereau(): string {
    const d = this.demandeSelectionnee;
    return d ? `BR-${d.numeroReference}` : '';
  }

  get numeroBordereauFull(): string {
    const d = this.bordereauAgrandi;
    return d ? `BR-${d.numeroReference}` : '';
  }

  etapeIndex(statut: StatutSoumission): number {
    const idx = this.etapes.findIndex(e => e.code === statut);
    return idx === -1 ? 0 : idx;
  }

  avancerEtape(): void {
    if (!this.demandeSelectionnee) return;
    if (!this.peutValider) {
      this.toastService.error('Vous n\'avez pas le droit de valider cette étape.');
      return;
    }
    const idx = this.etapeIndex(this.demandeSelectionnee.statut);
    if (idx >= this.etapes.length - 1) return;
    const suivante = this.etapes[idx + 1];
    if (!suivante) return;
    this.demandesService.updateStatut(this.demandeSelectionnee.id, suivante.code, suivante.label).subscribe(updated => {
      this.demandeSelectionnee = updated;
      this.etapeSelectionnee = suivante;
      this.toastService.success('Dossier validé et transmis à l\'étape suivante.');
      this.load();
    });
  }

  rejeter(): void {
    if (!this.demandeSelectionnee) return;
    if (!this.peutRejeter) {
      this.toastService.error('Vous n\'avez pas le droit de rejeter cette demande.');
      return;
    }
    if (!confirm('Rejeter cette demande ?')) return;
    this.demandesService.updateStatut(this.demandeSelectionnee.id, 'REJETE', 'Rejeté').subscribe(updated => {
      this.demandeSelectionnee = updated;
      this.toastService.success('Demande rejetée.');
      this.load();
    });
  }

  confirmerPaiement(): void {
    if (!this.demandeSelectionnee) return;
    if (!this.peutEncaisser) {
      this.toastService.error('Vous n\'avez pas le droit d\'encaisser un paiement.');
      return;
    }
    this.demandesService.confirmerPaiement(this.demandeSelectionnee.id).subscribe(updated => {
      this.demandeSelectionnee = updated;
      this.toastService.success('Paiement confirmé.');
      this.load();
    });
  }

  statutClass(statut: string): string {
    const map: Record<string, string> = {
      SOUMIS: 'badge-blue', PAIEMENT_EN_ATTENTE: 'badge-orange', RECU: 'badge-blue',
      EN_VERIFICATION: 'badge-orange', EN_VALIDATION: 'badge-orange', EN_TRAITEMENT: 'badge-purple',
      APPROUVE: 'badge-green', REJETE: 'badge-red', TERMINE: 'badge-green'
    };
    return map[statut] || 'badge-blue';
  }

  statutLabel(statut: string): string {
    const map: Record<string, string> = {
      SOUMIS: 'Soumis', PAIEMENT_EN_ATTENTE: 'Paiement en attente', RECU: 'Reçu',
      EN_VERIFICATION: 'En vérification', EN_VALIDATION: 'En validation', EN_TRAITEMENT: 'En traitement',
      APPROUVE: 'Approuvé', REJETE: 'Rejeté', TERMINE: 'Terminé'
    };
    return map[statut] || statut;
  }
}