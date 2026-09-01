import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WorkflowsService, DROITS_CATALOGUE, DroitCatalogueItem, ROLES_SUGGERES } from '../../services/workflows.service';
import { ServicesService } from '../../services/services.service';
import { ToastService } from '../../core/toast.service';
import { ActiviteService } from '../../services/activite.service';
import { Workflow, WorkflowEtape, CompteUtilisateur, ServiceInstitution, DroitWorkflow } from '../../models/provider.model';

type EtapeBuilder = 'infos' | 'etapes' | 'comptes' | 'finalisation';

/** Formulaire d'ajout d'un compte pour une étape donnée (état volatile du modal). */
interface CompteFormState {
  etapeId: string;
  id?: number;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  email: string;
  role: string;
  motDePasse: string;
  confirmationMotDePasse: string;
  droits: DroitWorkflow[];
}

@Component({
  selector: 'app-workflow-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './workflow-builder.component.html',
  styleUrl: './workflow-builder.component.scss'
})
export class WorkflowBuilderComponent implements OnInit, OnDestroy {
  etapeBuilder: EtapeBuilder = 'infos';
  services: ServiceInstitution[] = [];
  rolesSuggeres = ROLES_SUGGERES;
  droitsCatalogue: DroitCatalogueItem[] = DROITS_CATALOGUE;

  isEdit = false;
  isSaving = false;

  workflow: Workflow = {
    id: 0,
    serviceId: 0,
    nom: '',
    description: '',
    statut: 'ACTIF',
    etapes: []
  };

  /** Comptes du workflow, groupés en mémoire pendant l'édition (persistés à l'enregistrement). */
  comptes: CompteUtilisateur[] = [];

  etapeActiveId: string | null = null;

  showCompteModal = false;
  compteEnEdition: CompteFormState | null = null;
  showMotDePasse = false;

  // ─── SAUVEGARDE EN TEMPS RÉEL (BROUILLON) ────────────────
  /** Horodatage de la dernière sauvegarde automatique du brouillon, affiché à l'utilisateur. */
  derniereSauvegardeBrouillon: Date | null = null;
  private autosaveTimer: any = null;
  /** Affichage du champ d'ajout d'un droit personnalisé (bouton « + »). */
  showAjoutDroitPersonnalise = false;
  nouveauDroitLibelle = '';

  constructor(
    private workflowsService: WorkflowsService,
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private activiteService: ActiviteService
  ) {}

  ngOnInit(): void {
    this.servicesService.getAll().subscribe(s => this.services = s);

    const workflowId = this.route.snapshot.paramMap.get('id');
    const serviceIdQuery = this.route.snapshot.queryParamMap.get('serviceId');

    if (workflowId) {
      this.isEdit = true;
      this.workflowsService.getById(Number(workflowId)).subscribe(w => {
        if (!w) return;
        this.workflow = JSON.parse(JSON.stringify(w));
        this.workflowsService.getComptesByWorkflow(this.workflow.id).subscribe(c => {
          this.comptes = JSON.parse(JSON.stringify(c));
        });
        if (this.workflow.etapes.length) {
          this.etapeActiveId = this.workflow.etapes[0]?.id ?? null;
        }
        this.restaurerBrouillonSiPresent();
        this.demarrerAutosave();
      });
    } else {
      if (serviceIdQuery) {
        this.workflow.serviceId = Number(serviceIdQuery);
      }
      const restaure = this.restaurerBrouillonSiPresent();
      if (!restaure) this.ajouterEtape();
      this.demarrerAutosave();
    }
  }

  ngOnDestroy(): void {
    if (this.autosaveTimer) clearInterval(this.autosaveTimer);
  }

  /** Sauvegarde automatiquement le brouillon en cours toutes les quelques secondes. */
  private demarrerAutosave(): void {
    this.autosaveTimer = setInterval(() => this.sauvegarderBrouillon(), 4000);
  }

  /** Sauvegarde immédiate du brouillon (aussi déclenchée manuellement par l'utilisateur). */
  sauvegarderBrouillon(): void {
    if (!this.workflow.serviceId) return;
    this.workflowsService.sauvegarderBrouillonWorkflow(this.workflow.serviceId, this.workflow.id, {
      workflow: this.workflow,
      comptes: this.comptes
    });
    this.derniereSauvegardeBrouillon = new Date();
  }

  /** Restaure un brouillon existant pour ce service/workflow, s'il y en a un. Renvoie true si restauré. */
  private restaurerBrouillonSiPresent(): boolean {
    if (!this.workflow.serviceId) return false;
    const brouillon = this.workflowsService.chargerBrouillonWorkflow(this.workflow.serviceId, this.workflow.id);
    if (!brouillon) return false;
    this.workflow = brouillon.workflow;
    this.comptes = brouillon.comptes;
    this.derniereSauvegardeBrouillon = brouillon.dateSauvegarde;
    if (this.workflow.etapes.length) {
      this.etapeActiveId = this.workflow.etapes[0]?.id ?? null;
    }
    this.toastService.success('Reprise de votre brouillon précédent — tout ce que vous aviez commencé a été restauré.');
    return true;
  }

  // ─── NAVIGATION DU WIZARD ────────────────────────────────
  get serviceSelectionne(): ServiceInstitution | undefined {
    return this.services.find(s => s.id === this.workflow.serviceId);
  }

  allerA(etape: EtapeBuilder): void {
    if (etape === 'etapes' && !this.workflow.serviceId) {
      this.toastService.error('Veuillez sélectionner un service avant de continuer.');
      return;
    }
    if (etape === 'comptes' && (!this.workflow.nom || this.workflow.etapes.length === 0)) {
      this.toastService.error('Veuillez définir au moins une étape avant de configurer les comptes.');
      return;
    }
    this.etapeBuilder = etape;
    if (etape === 'comptes' && !this.etapeActiveId && this.workflow.etapes.length) {
      this.etapeActiveId = this.workflow.etapes[0]?.id ?? null;
    }
  }

  // ─── GESTION DES ÉTAPES ──────────────────────────────────
  ajouterEtape(): void {
    const nouvelle = this.workflowsService.creerEtapeVide(this.workflow.etapes.length + 1);
    this.workflow.etapes.push(nouvelle);
    this.etapeActiveId = nouvelle.id;
    this.sauvegarderBrouillon();
  }

  supprimerEtape(index: number): void {
    const etape = this.workflow.etapes[index];
    if (!etape) return;
    if (!confirm(`Supprimer l'étape « ${etape.nom || 'sans nom'} » et les comptes qui y sont rattachés ?`)) return;
    this.comptes = this.comptes.filter(c => c.etapeId !== etape.id);
    this.workflow.etapes.splice(index, 1);
    this.workflow.etapes.forEach((e, i) => e.ordre = i + 1);
    if (this.etapeActiveId === etape.id) {
      this.etapeActiveId = this.workflow.etapes[0]?.id || null;
    }
    this.sauvegarderBrouillon();
  }

  deplacerEtape(index: number, direction: -1 | 1): void {
    const cible = index + direction;
    if (cible < 0 || cible >= this.workflow.etapes.length) return;
    const [e] = this.workflow.etapes.splice(index, 1);
    if (e) this.workflow.etapes.splice(cible, 0, e);
    this.workflow.etapes.forEach((etp, i) => etp.ordre = i + 1);
  }

  // ─── GESTION DES COMPTES PAR ÉTAPE ───────────────────────
  comptesPourEtape(etapeId: string): CompteUtilisateur[] {
    return this.comptes.filter(c => c.etapeId === etapeId);
  }

  get etapeActive(): WorkflowEtape | undefined {
    return this.workflow.etapes.find(e => e.id === this.etapeActiveId);
  }

  ouvrirNouveauCompte(): void {
    if (!this.etapeActiveId) return;
    this.compteEnEdition = {
      etapeId: this.etapeActiveId,
      nom: '', prenom: '', adresse: '', telephone: '', email: '',
      role: this.rolesSuggeres[0] || 'Autre',
      motDePasse: '',
      confirmationMotDePasse: '',
      droits: ['VOIR_DEMANDE']
    };
    this.showMotDePasse = false;
    this.showCompteModal = true;
  }

  modifierCompte(c: CompteUtilisateur): void {
    this.compteEnEdition = {
      etapeId: c.etapeId, id: c.id, nom: c.nom, prenom: c.prenom, adresse: c.adresse,
      telephone: c.telephone, email: c.email || '', role: c.role,
      motDePasse: c.motDePasse, confirmationMotDePasse: c.motDePasse,
      droits: [...c.droits]
    };
    this.showMotDePasse = false;
    this.showCompteModal = true;
  }

  fermerCompteModal(): void {
    this.showCompteModal = false;
    this.compteEnEdition = null;
  }

  toggleDroit(droit: DroitWorkflow): void {
    if (!this.compteEnEdition) return;
    const idx = this.compteEnEdition.droits.indexOf(droit);
    if (idx >= 0) {
      this.compteEnEdition.droits.splice(idx, 1);
    } else {
      this.compteEnEdition.droits.push(droit);
    }
  }

  compteADroit(droit: DroitWorkflow): boolean {
    return !!this.compteEnEdition?.droits.includes(droit);
  }

  // ─── DROIT PERSONNALISÉ (bouton « + ») ───────────────────
  ouvrirAjoutDroitPersonnalise(): void {
    this.nouveauDroitLibelle = '';
    this.showAjoutDroitPersonnalise = true;
  }

  annulerAjoutDroitPersonnalise(): void {
    this.showAjoutDroitPersonnalise = false;
    this.nouveauDroitLibelle = '';
  }

  confirmerAjoutDroitPersonnalise(): void {
    const libelle = this.nouveauDroitLibelle.trim();
    if (!libelle) {
      this.toastService.error('Veuillez saisir un intitulé pour ce droit.');
      return;
    }
    const droit = this.workflowsService.ajouterDroitPersonnalise(libelle);
    this.droitsCatalogue = [...DROITS_CATALOGUE];
    if (this.compteEnEdition && !this.compteEnEdition.droits.includes(droit.code)) {
      this.compteEnEdition.droits.push(droit.code);
    }
    this.showAjoutDroitPersonnalise = false;
    this.nouveauDroitLibelle = '';
    this.toastService.success(`Droit « ${droit.label} » ajouté à la liste.`);
  }

  enregistrerCompte(): void {
    const f = this.compteEnEdition;
    if (!f) return;
    if (!f.nom.trim() || !f.prenom.trim() || !f.adresse.trim() || !f.telephone.trim()) {
      this.toastService.error('Veuillez remplir le nom, le prénom, l\'adresse et le téléphone.');
      return;
    }
    if (!f.motDePasse || f.motDePasse.length < 4) {
      this.toastService.error('Le mot de passe doit contenir au moins 4 caractères.');
      return;
    }
    if (f.motDePasse !== f.confirmationMotDePasse) {
      this.toastService.error('Les deux mots de passe ne correspondent pas.');
      return;
    }
    if (f.droits.length === 0) {
      this.toastService.error('Veuillez cocher au moins un droit pour ce compte.');
      return;
    }

    const etape = this.workflow.etapes.find(e => e.id === f.etapeId);

    if (f.id) {
      // Modification d'un compte existant
      this.comptes = this.comptes.map(c => c.id === f.id ? {
        ...c, nom: f.nom, prenom: f.prenom, adresse: f.adresse, telephone: f.telephone,
        email: f.email, role: f.role, motDePasse: f.motDePasse, droits: f.droits
      } : c);
      this.toastService.success('Compte mis à jour.');
    } else {
      // Nouveau compte (identifiant provisoire négatif, remplacé à l'enregistrement final)
      const identifiant = this.workflowsService.genererIdentifiant(f.prenom, f.nom);
      const nouveau: CompteUtilisateur = {
        id: -(Date.now()),
        nom: f.nom, prenom: f.prenom, adresse: f.adresse, telephone: f.telephone, email: f.email,
        role: f.role,
        identifiantConnexion: identifiant,
        motDePasse: f.motDePasse,
        statut: 'ACTIF',
        workflowId: this.workflow.id,
        serviceId: this.workflow.serviceId,
        etapeId: f.etapeId,
        etapeNom: etape?.nom || '',
        droits: f.droits,
        dateCreation: new Date()
      };
      this.comptes.push(nouveau);
      this.toastService.success(`Compte de ${f.prenom} ${f.nom} créé — identifiant : ${identifiant}.`);
    }
    this.fermerCompteModal();
    this.sauvegarderBrouillon();
  }

  supprimerCompte(c: CompteUtilisateur): void {
    if (!confirm(`Retirer le compte de ${c.prenom} ${c.nom} de cette étape ?`)) return;
    this.comptes = this.comptes.filter(x => x !== c);
    this.sauvegarderBrouillon();
  }

  labelDroit(code: DroitWorkflow): string {
    return this.workflowsService.labelDroit(code);
  }

  // ─── ENREGISTREMENT FINAL ─────────────────────────────────
  get peutEnregistrer(): boolean {
    return !!this.workflow.serviceId && !!this.workflow.nom.trim() && this.workflow.etapes.length > 0
      && this.workflow.etapes.every(e => !!e.nom.trim());
  }

  enregistrer(): void {
    if (!this.peutEnregistrer) {
      this.toastService.error('Veuillez compléter le nom du workflow et le nom de chaque étape.');
      return;
    }
    this.isSaving = true;

    // Met à jour les identifiants d'étape pour chaque compte + la référence croisée étape→comptes
    this.workflow.etapes.forEach(e => {
      e.comptesAssignesIds = this.comptes.filter(c => c.etapeId === e.id).map(c => c.id);
    });

    this.workflowsService.save(this.workflow).subscribe(saved => {
      this.workflow = saved;

      const operations = this.comptes.map(c => {
        const payload: Partial<CompteUtilisateur> = { ...c, workflowId: saved.id, serviceId: saved.serviceId };
        if (c.id < 0) {
          delete (payload as any).id;
          return this.workflowsService.creerCompte(payload);
        } else {
          return this.workflowsService.modifierCompte({ ...c, workflowId: saved.id, serviceId: saved.serviceId });
        }
      });

      if (operations.length === 0) {
        this.finaliserEnregistrement();
        return;
      }

      let restants = operations.length;
      operations.forEach(obs => obs.subscribe(() => {
        restants--;
        if (restants === 0) this.finaliserEnregistrement();
      }));
    });
  }

  private finaliserEnregistrement(): void {
    this.isSaving = false;
    if (this.autosaveTimer) clearInterval(this.autosaveTimer);
    this.workflowsService.effacerBrouillonWorkflow(this.workflow.serviceId, this.workflow.id);

    this.activiteService.consigner(
      this.isEdit
        ? `Workflow « ${this.workflow.nom} » mis à jour`
        : `Workflow « ${this.workflow.nom} » créé avec ${this.comptes.length} compte(s)`,
      'fa-solid fa-sitemap',
      '/workflows'
    );

    this.toastService.success(
      this.isEdit
        ? `✅ Le workflow « ${this.workflow.nom} » a été mis à jour avec succès.`
        : `✅ Le workflow « ${this.workflow.nom} » a été créé avec ${this.comptes.length} compte(s).`
    );

    // Étape suivante de la création du service : le formulaire de demande.
    this.router.navigate(['/formulaires/builder'], { queryParams: { serviceId: this.workflow.serviceId } });
  }
}
