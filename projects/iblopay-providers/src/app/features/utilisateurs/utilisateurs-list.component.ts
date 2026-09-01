import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemandesService } from '../../services/demandes.service';
import { WorkflowsService } from '../../services/workflows.service';
import { SoumissionFormulaire, CompteUtilisateur } from '../../models/provider.model';
import { IblopayWatermarkComponent } from '../../core/iblopay-watermark.component';
import { ToastService } from '../../core/toast.service';

export interface UtilisateurCitoyen {
  nom: string;
  telephone: string;
  nombreDemandes: number;
  montantTotalPaye: number;
  montantEnAttente: number;
  derniereDemande: Date;
  demandes: SoumissionFormulaire[];
}

@Component({
  selector: 'app-utilisateurs-list',
  standalone: true,
  imports: [CommonModule, FormsModule, IblopayWatermarkComponent],
  templateUrl: './utilisateurs-list.component.html',
  styleUrl: './utilisateurs-list.component.scss'
})
export class UtilisateursListComponent implements OnInit {
  vueActive: 'CITOYENS' | 'COMPTES' = 'CITOYENS';

  utilisateurs: UtilisateurCitoyen[] = [];
  filtered: UtilisateurCitoyen[] = [];
  searchTerm = '';
  isLoading = true;

  // Comptes internes (staff rattachés aux workflows)
  comptes: CompteUtilisateur[] = [];
  comptesFiltres: CompteUtilisateur[] = [];
  searchTermComptes = '';
  isLoadingComptes = true;
  compteSelectionne: CompteUtilisateur | null = null;

  // Pagination (50 éléments par page)
  currentPage = 1;
  pageSize = 50;

  utilisateurSelectionne: UtilisateurCitoyen | null = null;
  
  // Propriété pour la visionneuse de document administratif
  documentActif: {
    reponse: any;
    demande: SoumissionFormulaire;
    utilisateur: UtilisateurCitoyen;
  } | null = null;

  constructor(
    private demandesService: DemandesService,
    private workflowsService: WorkflowsService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.demandesService.getAll().subscribe(demandes => {
      let toutesDemandes = demandes || [];
      
      // Simulation pour atteindre / dépasser 50 utilisateurs si nécessaire
      if (toutesDemandes.length < 55) {
        toutesDemandes = this.genererDemandesSimulation(toutesDemandes);
      }

      this.utilisateurs = this.regrouperParUtilisateur(toutesDemandes);
      this.applyFilters();
      this.isLoading = false;
    });

    this.chargerComptes();
  }

  chargerComptes(): void {
    this.isLoadingComptes = true;
    this.workflowsService.getAllComptes().subscribe(comptes => {
      this.comptes = comptes;
      this.applyFiltersComptes();
      this.isLoadingComptes = false;
    });
  }

  changerVue(vue: 'CITOYENS' | 'COMPTES'): void {
    this.vueActive = vue;
  }

  applyFiltersComptes(): void {
    const term = this.searchTermComptes.toLowerCase().trim();
    this.comptesFiltres = this.comptes.filter(c =>
      !term ||
      `${c.prenom} ${c.nom}`.toLowerCase().includes(term) ||
      c.role.toLowerCase().includes(term) ||
      (c.etapeNom || '').toLowerCase().includes(term)
    );
  }

  ouvrirDetailCompte(c: CompteUtilisateur): void {
    this.compteSelectionne = c;
  }

  fermerDetailCompte(): void {
    this.compteSelectionne = null;
  }

  toggleStatutCompte(c: CompteUtilisateur, event?: Event): void {
    event?.stopPropagation();
    this.workflowsService.toggleStatutCompte(c.id).subscribe(() => {
      this.toastService.success(`Le compte de ${c.prenom} ${c.nom} a été ${c.statut === 'ACTIF' ? 'désactivé' : 'activé'}.`);
      this.chargerComptes();
    });
  }

  reinitialiserMotDePasse(c: CompteUtilisateur): void {
    const nouveau = prompt(`Nouveau mot de passe pour ${c.prenom} ${c.nom} (identifiant : ${c.identifiantConnexion}) :`, '');
    if (!nouveau) return;
    if (nouveau.length < 4) {
      this.toastService.error('Le mot de passe doit contenir au moins 4 caractères.');
      return;
    }
    this.workflowsService.reinitialiserMotDePasse(c.id, nouveau).subscribe(updated => {
      this.toastService.success(`Mot de passe de ${c.prenom} ${c.nom} réinitialisé. Communiquez-le-lui en toute sécurité.`);
      this.compteSelectionne = updated;
      this.chargerComptes();
    });
  }

  labelDroit(code: string): string {
    return this.workflowsService.labelDroit(code as any);
  }

  private genererDemandesSimulation(demandesExistantes: SoumissionFormulaire[]): SoumissionFormulaire[] {
    const prenoms = ['Jean', 'Marie', 'Patrick', 'Diane', 'Eric', 'Claudine', 'Olivier', 'Aline', 'Gérard', 'Chantal', 'Thierry', 'Sandrine', 'Michel', 'Beatrice', 'Alain'];
    const noms = ['Nkurunziza', 'Habimana', 'Ndayishimiye', 'Mugisha', 'Bucumi', 'Ntahimpera', 'Bizimana', 'Niyonkuru', 'Minani', 'Kamanzi'];
    const services = ['Acte de Naissance', 'Casier Judiciaire', 'Certificat de Résidence', 'Légalisation de Document', 'Permis de Conduire'];
    const statuts = ['SOUMIS', 'EN_VERIFICATION', 'APPROUVE', 'TERMINE', 'EN_TRAITEMENT'];

    const simulation: SoumissionFormulaire[] = [...demandesExistantes];

    for (let i = 1; i <= 65; i++) {
      const prenom = prenoms[i % prenoms.length];
      const nom = noms[i % noms.length];
      const tel = `+257 79 ${(10 + (i % 89)) * 10000 + i}`;
      const service = services[i % services.length];
      const montantPayeFlag = i % 3 !== 0;
      const montantVal = 5000 + (i * 1200) % 25000;

      // Utilisation de "as any" pour contourner strictement les contraintes du modèle provider.model.ts sur les données simulées
      simulation.push({
        id: i + 1000,
        numeroReference: `REF-2026-${1000 + i}`,
        utilisateurNom: `${prenom} ${nom}`,
        utilisateurTelephone: tel,
        serviceNom: service,
        dateSoumission: new Date(2026, 6, (i % 28) + 1),
        montant: montantVal,
        montantPaye: montantPayeFlag,
        statut: statuts[i % statuts.length],
        reponses: [
          { label: 'Nom complet du déclarant', valeur: `${prenom} ${nom}`, type: 'TEXTE' },
          { label: 'Motif de la demande', valeur: `Renouvellement et vérification administrative`, type: 'TEXTE' },
          { label: 'Pièce justificative officielle', valeur: 'justificatif.pdf', type: 'FICHIER', apercuUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600' }
        ]
      } as any);
    }
    return simulation;
  }

  private regrouperParUtilisateur(demandes: SoumissionFormulaire[]): UtilisateurCitoyen[] {
    const map = new Map<string, UtilisateurCitoyen>();

    for (const d of demandes) {
      const cle = d.utilisateurTelephone || d.utilisateurNom;
      if (!map.has(cle)) {
        map.set(cle, {
          nom: d.utilisateurNom,
          telephone: d.utilisateurTelephone,
          nombreDemandes: 0,
          montantTotalPaye: 0,
          montantEnAttente: 0,
          derniereDemande: d.dateSoumission ? new Date(d.dateSoumission) : new Date(),
          demandes: []
        });
      }
      const u = map.get(cle)!;
      u.nombreDemandes += 1;
      const montant = d.montant || 0;
      if (d.montantPaye) {
        u.montantTotalPaye += montant;
      } else {
        u.montantEnAttente += montant;
      }
      const dateDemande = d.dateSoumission ? new Date(d.dateSoumission) : new Date();
      if (dateDemande > u.derniereDemande) {
        u.derniereDemande = dateDemande;
      }
      u.demandes.push(d);
    }

    return Array.from(map.values()).sort((a, b) => b.derniereDemande.getTime() - a.derniereDemande.getTime());
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = this.utilisateurs.filter(u =>
      !term || u.nom.toLowerCase().includes(term) || u.telephone.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  get totalPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize) || 1;
  }

  get paginatedUtilisateurs(): UtilisateurCitoyen[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filtered.length);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  ouvrirDetail(u: UtilisateurCitoyen): void {
    this.utilisateurSelectionne = u;
  }

  fermerDetail(): void {
    this.utilisateurSelectionne = null;
    this.documentActif = null;
  }

  voirDocument(reponse: any, demande: SoumissionFormulaire, utilisateur: UtilisateurCitoyen, event: Event): void {
    event.stopPropagation();
    this.documentActif = { reponse, demande, utilisateur };
  }

  fermerDocument(): void {
    this.documentActif = null;
  }

  statutClass(statut: string): string {
    const map: Record<string, string> = {
      SOUMIS: 'badge-blue', EN_VERIFICATION: 'badge-orange', EN_VALIDATION: 'badge-orange',
      EN_TRAITEMENT: 'badge-purple', APPROUVE: 'badge-green', REJETE: 'badge-red', TERMINE: 'badge-green'
    };
    return map[statut] || 'badge-blue';
  }

    statutLabel(statut: string): string {
    const map: Record<string, string> = {
      SOUMIS: 'Soumis', EN_VERIFICATION: 'En vérification', EN_VALIDATION: 'En validation',
      EN_TRAITEMENT: 'En traitement', APPROUVE: 'Approuvé', REJETE: 'Rejeté', TERMINE: 'Terminé'
    };
    return map[statut] || statut;
  }
}