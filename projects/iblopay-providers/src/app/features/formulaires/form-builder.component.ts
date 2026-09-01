import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormulairesService, PALETTE_CHAMPS, ChampPaletteItem } from '../../services/formulaires.service';
import { ServicesService } from '../../services/services.service';
import { ActiviteService } from '../../services/activite.service';
import { Formulaire, FormulaireChamp, TypeChamp, ServiceInstitution } from '../../models/provider.model';

type EtapeType = 'infos' | 'champs' | 'finalisation';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent implements OnInit {
  palette: ChampPaletteItem[] = PALETTE_CHAMPS;
  services: ServiceInstitution[] = [];

  etape: EtapeType = 'infos';
  nbColonnes = 1;
  showApercu = false;

  formulaire: Formulaire = {
    id: 0,
    institutionId: 1,
    serviceId: 0,
    nom: '',
    code: '',
    version: 1,
    statut: 'BROUILLON',
    champs: [],
    createdAt: new Date()
  };

  description: string = '';

  champSelectionne: FormulaireChamp | null = null;
  draggedType: TypeChamp | null = null;
  draggedExistingIndex: number | null = null;
  dragOverIndex: number | null = null;
  isSaving = false;
  notification: { message: string; type: 'success' | 'error' } | null = null;

  showQuickAdd = false;
  nouveauChampNom = '';

  constructor(
    private formulairesService: FormulairesService,
    private servicesService: ServicesService,
    private activiteService: ActiviteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.servicesService.getAll().subscribe(s => this.services = s);

    const formId = this.route.snapshot.paramMap.get('id');
    const serviceIdQuery = this.route.snapshot.queryParamMap.get('serviceId');

    if (formId) {
      this.formulairesService.getById(Number(formId)).subscribe(f => {
        if (f) {
          this.formulaire = JSON.parse(JSON.stringify(f));
          this.formulaire.champs.sort((a, b) => a.ordre - b.ordre);
          this.formulaire.champs.forEach(c => {
            if (!c.configuration) c.configuration = {};
          });
          // 🔥 Récupère la disposition
          this.nbColonnes = this.formulaire.configuration?.nbColonnes || 
                            (this.formulaire as any).nbColonnes || 1;
          this.description = this.formulaire.description || '';
          this.etape = 'finalisation';
        }
      });
    } else if (serviceIdQuery) {
      this.formulaire.serviceId = Number(serviceIdQuery);
      this.servicesService.getById(Number(serviceIdQuery)).subscribe(s => {
        if (s) {
          if (!this.formulaire.nom) {
            this.formulaire.nom = `Formulaire — ${s.nom}`;
          }
          if (!this.formulaire.code) {
            this.formulaire.code = `FORM-${s.code}`;
          }
        }
      });
    }
  }

  getServiceNom(serviceId: number): string {
    const service = this.services.find(s => s.id === serviceId);
    return service ? service.nom : 'Non défini';
  }

  // ================= NAVIGATION =================

  allerAuxChamps(): void {
    if (!this.formulaire.nom || !this.formulaire.code || !this.formulaire.serviceId) {
      this.afficherNotification('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }
    this.etape = 'champs';
  }

  retournerInfos(): void {
    this.etape = 'infos';
  }

  allerVersFinalisation(): void {
    if (this.formulaire.champs.length === 0) {
      this.afficherNotification('Ajoutez au moins un champ.', 'error');
      return;
    }
    this.etape = 'finalisation';
  }

  retournerAuxChamps(): void {
    this.etape = 'champs';
  }

  // ================= AJOUT RAPIDE =================

  ouvrirAjoutRapide(): void {
    this.showQuickAdd = !this.showQuickAdd;
    if (this.showQuickAdd) {
      this.nouveauChampNom = '';
      setTimeout(() => {
        const input = document.querySelector('.quick-add input') as HTMLInputElement;
        if (input) input.focus();
      }, 100);
    }
  }

  fermerAjoutRapide(): void {
    this.showQuickAdd = false;
    this.nouveauChampNom = '';
  }

  ajouterChampRapide(): void {
    if (!this.nouveauChampNom.trim()) return;

    const type: TypeChamp = 'TEXTE';
    const nouveauChamp = this.formulairesService.creerChampVide(type, this.formulaire.champs.length + 1);
    nouveauChamp.label = this.nouveauChampNom.trim();
    nouveauChamp.code = this.genererCodeChamp(this.nouveauChampNom.trim());

    this.formulaire.champs.push(nouveauChamp);
    this.reordonnerChamps();
    this.champSelectionne = nouveauChamp;

    this.afficherNotification(`Champ "${nouveauChamp.label}" ajouté`, 'success');
    this.fermerAjoutRapide();
  }

  private genererCodeChamp(nom: string): string {
    const base = nom
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .substring(0, 8);
    return `CHAMP_${base}_${Date.now().toString().slice(-4)}`;
  }

  // ================= DRAG & DROP =================

  onPaletteDragStart(type: TypeChamp): void {
    this.draggedType = type;
    this.draggedExistingIndex = null;
  }

  onChampDragStart(index: number, event: DragEvent): void {
    this.draggedExistingIndex = index;
    this.draggedType = null;
    event.stopPropagation();
  }

  onChampDragEnd(): void {
    this.dragOverIndex = null;
  }

  onDragOver(index: number, event: DragEvent): void {
    event.preventDefault();
    this.dragOverIndex = index;
  }

  onDrop(index: number, event: DragEvent): void {
    event.preventDefault();
    this.dragOverIndex = null;

    if (this.draggedType) {
      const nouveauChamp = this.formulairesService.creerChampVide(this.draggedType, index + 1);
      this.formulaire.champs.splice(index, 0, nouveauChamp);
      this.reordonnerChamps();
      this.champSelectionne = nouveauChamp;
      this.draggedType = null;
      return;
    }

    if (this.draggedExistingIndex !== null && this.draggedExistingIndex !== index) {
      const champ = this.formulaire.champs.splice(this.draggedExistingIndex, 1)[0];
      if (champ) {
        const cibleIndex = this.draggedExistingIndex < index ? index - 1 : index;
        this.formulaire.champs.splice(cibleIndex, 0, champ);
        this.reordonnerChamps();
      }
      this.draggedExistingIndex = null;
    }
  }

  onCanvasDropZone(event: DragEvent): void {
    event.preventDefault();
    if (this.draggedType) {
      const nouveauChamp = this.formulairesService.creerChampVide(this.draggedType, this.formulaire.champs.length + 1);
      this.formulaire.champs.push(nouveauChamp);
      this.reordonnerChamps();
      this.champSelectionne = nouveauChamp;
      this.draggedType = null;
    } else if (this.draggedExistingIndex !== null) {
      const champ = this.formulaire.champs.splice(this.draggedExistingIndex, 1)[0];
      if (champ) {
        this.formulaire.champs.push(champ);
        this.reordonnerChamps();
      }
      this.draggedExistingIndex = null;
    }
  }

  reordonnerChamps(): void {
    this.formulaire.champs.forEach((c, i) => c.ordre = i + 1);
  }

  // ================= DÉPLACEMENT =================

  deplacerChamp(index: number, direction: number): void {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.formulaire.champs.length) return;
    
    const champ = this.formulaire.champs.splice(index, 1)[0];
    if (champ) {
      this.formulaire.champs.splice(newIndex, 0, champ);
      this.reordonnerChamps();
    }
  }

  // ================= COLONNES =================

  changerNbColonnes(nb: number): void {
    this.nbColonnes = nb;
    // 🔥 Met à jour la configuration immédiatement
    if (!this.formulaire.configuration) {
      this.formulaire.configuration = {};
    }
    this.formulaire.configuration.nbColonnes = nb;
  }

  // ================= APERÇU =================

  ouvrirApercu(): void {
    if (this.formulaire.champs.length === 0) {
      this.afficherNotification('Ajoutez au moins un champ.', 'error');
      return;
    }
    this.showApercu = true;
  }

  fermerApercu(): void {
    this.showApercu = false;
  }

  // ================= ACTIONS CHAMPS =================

  selectionnerChamp(champ: FormulaireChamp): void {
    if (!champ.configuration) champ.configuration = {};
    if (this.champSelectionne?.id === champ.id) return;
    this.champSelectionne = champ;
  }

  supprimerChamp(champ: FormulaireChamp, event: Event): void {
    event.stopPropagation();
    this.formulaire.champs = this.formulaire.champs.filter(c => c.id !== champ.id);
    this.reordonnerChamps();
    if (this.champSelectionne?.id === champ.id) {
      this.champSelectionne = null;
    }
  }

  dupliquerChamp(champ: FormulaireChamp, event: Event): void {
    event.stopPropagation();
    const index = this.formulaire.champs.findIndex(c => c.id === champ.id);
    const copie: FormulaireChamp = {
      ...JSON.parse(JSON.stringify(champ)),
      id: 'champ_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      label: champ.label + ' (copie)'
    };
    if (!copie.configuration) copie.configuration = {};
    this.formulaire.champs.splice(index + 1, 0, copie);
    this.reordonnerChamps();
  }

  // ================= OPTIONS =================

  ajouterOption(): void {
    if (!this.champSelectionne) return;
    if (!this.champSelectionne.configuration) this.champSelectionne.configuration = {};
    if (!this.champSelectionne.configuration.options) this.champSelectionne.configuration.options = [];
    this.champSelectionne.configuration.options.push(`Option ${this.champSelectionne.configuration.options.length + 1}`);
  }

  supprimerOption(index: number): void {
    if (!this.champSelectionne?.configuration?.options) return;
    this.champSelectionne.configuration.options.splice(index, 1);
  }

  // ================= UTILITAIRES =================

  iconePourType(type: TypeChamp): string {
    return this.palette.find(p => p.type === type)?.icon || 'fa-solid fa-square';
  }

  labelPourType(type: TypeChamp): string {
    return this.palette.find(p => p.type === type)?.label || type;
  }

  // ================= SAUVEGARDE =================

  enregistrer(publier = false): void {
    if (!this.formulaire.nom || !this.formulaire.serviceId) {
      this.afficherNotification('Veuillez renseigner le nom et le service.', 'error');
      return;
    }
    if (this.formulaire.champs.length === 0) {
      this.afficherNotification('Ajoutez au moins un champ.', 'error');
      return;
    }

    this.isSaving = true;
    this.formulaire.statut = publier ? 'PUBLIE' : 'BROUILLON';
    this.formulaire.description = this.description;
    
    // 🔥 Sauvegarde complète de la configuration
    this.formulaire.configuration = {
      ...this.formulaire.configuration,
      nbColonnes: this.nbColonnes
    };

    this.formulairesService.save(this.formulaire).subscribe({
      next: (f) => {
        this.isSaving = false;
        this.formulaire = f;
        // 🔥 Restaure la configuration après sauvegarde
        if (f.configuration?.nbColonnes) {
          this.nbColonnes = f.configuration.nbColonnes;
        }

        this.activiteService.consigner(
          publier ? `Formulaire « ${f.nom} » publié` : `Formulaire « ${f.nom} » enregistré en brouillon`,
          'fa-solid fa-file-lines',
          '/formulaires'
        );

        if (!publier) {
          this.afficherNotification('✅ Formulaire enregistré en brouillon.', 'success', 1500);
          setTimeout(() => this.router.navigate(['/formulaires']), 1500);
          return;
        }

        // ─── PUBLICATION FINALE DU SERVICE ────────────────────────
        // Le formulaire est la dernière brique de la création d'un service :
        // une fois publié, on active/publie le service dans son ensemble.
        if (f.serviceId) {
          this.servicesService.getById(f.serviceId).subscribe(service => {
            if (service && service.statut !== 'ACTIF') {
              this.servicesService.update({ ...service, statut: 'ACTIF' }).subscribe(serviceMisAJour => {
                this.activiteService.consigner(
                  `Service « ${serviceMisAJour.nom} » publié — accessible aux demandeurs`,
                  'fa-solid fa-circle-check',
                  '/services'
                );
                this.afficherNotification(
                  `✅ Formulaire publié et service « ${serviceMisAJour.nom} » entièrement publié ! Il est désormais actif.`,
                  'success',
                  2600
                );
                setTimeout(() => this.router.navigate(['/services']), 2600);
              });
            } else {
              this.afficherNotification('✅ Formulaire publié avec succès !', 'success', 2200);
              setTimeout(() => this.router.navigate(['/formulaires']), 2200);
            }
          });
        } else {
          this.afficherNotification('✅ Formulaire publié avec succès !', 'success', 2200);
          setTimeout(() => this.router.navigate(['/formulaires']), 2200);
        }
      },
      error: (err) => {
        this.isSaving = false;
        this.afficherNotification('❌ Erreur lors de l\'enregistrement.', 'error');
        console.error(err);
      }
    });
  }

  afficherNotification(message: string, type: 'success' | 'error', dureeMs = 3000): void {
    this.notification = { message, type };
    setTimeout(() => this.notification = null, dureeMs);
  }
}