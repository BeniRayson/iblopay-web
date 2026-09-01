import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { ToastService } from '../../core/toast.service';
import { ActiviteService } from '../../services/activite.service';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.scss'
})
export class ServiceFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  serviceId?: number;
  isSaving = false;
  isConfirmOpen = false;
  /** Une fois le service enregistré, la carte récapitulative s'affiche avec le bouton « Étape suivante ». */
  serviceEnregistre: any = null;
  private dernierCodeAuto = '';

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private activiteService: ActiviteService
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      code: [''],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      sousCategorie: [''],
      prix: [null],
      devise: ['BIF', Validators.required],
      statut: ['BROUILLON', Validators.required],
      documentsRequis: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.serviceId = Number(idParam);
      this.servicesService.getById(this.serviceId).subscribe(s => {
        if (!s) return;
        this.form.patchValue(s);
        s.documentsRequis.forEach(doc => this.documents.push(this.fb.control(doc)));
        this.form.get('nom')!.valueChanges.subscribe(nom => this.autoGenererCode(nom));
      });
    } else {
      this.ajouterDocument();
      this.form.get('nom')!.valueChanges.subscribe(nom => {
        const codeControl = this.form.get('code')!;
        const valeurActuelle = (codeControl.value || '').trim();
        if (!valeurActuelle || valeurActuelle === this.dernierCodeAuto) {
          const nouveauCode = this.genererCode(nom || '');
          this.dernierCodeAuto = nouveauCode;
          codeControl.setValue(nouveauCode, { emitEvent: false });
        }
      });
      const nomInitial = this.form.get('nom')!.value;
      if (nomInitial) {
        const code = this.genererCode(nomInitial);
        this.dernierCodeAuto = code;
        this.form.get('code')!.setValue(code, { emitEvent: false });
      }
    }
  }

  get documents(): FormArray {
    return this.form.get('documentsRequis') as FormArray;
  }

  ajouterDocument(): void {
    this.documents.push(this.fb.control(''));
  }

  supprimerDocument(index: number): void {
    this.documents.removeAt(index);
  }

  private autoGenererCode(nom: string): void {
    const codeControl = this.form.get('code')!;
    const valeurActuelle = (codeControl.value || '').trim();

    if (!valeurActuelle || valeurActuelle === this.dernierCodeAuto) {
      const nouveauCode = this.genererCode(nom || '');
      this.dernierCodeAuto = nouveauCode;
      codeControl.setValue(nouveauCode, { emitEvent: false });
    }
  }

  private genererCode(nom: string): string {
    const motsVides = ['de', 'du', 'des', 'le', 'la', 'les', 'un', 'une', "d'", "l'", 'et', 'pour'];
    const mots = nom
      .trim()
      .split(/\s+/)
      .filter(w => w && !motsVides.includes(w.toLowerCase()));

    const base = (mots[0] || 'SRV')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z]/g, '')
      .toUpperCase()
      .substring(0, 4) || 'SRV';

    const suffixe = String(Math.floor(100 + Math.random() * 900));
    return `${base}-${suffixe}`;
  }

  demanderConfirmation(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    this.isConfirmOpen = true;
  }

  annulerConfirmation(): void {
    this.isConfirmOpen = false;
  }

  /** Enregistre le service uniquement (pas de publication). La carte récapitulative s'affiche ensuite. */
  confirmerEtEnregistrer(): void {
    this.isSaving = true;
    const payload = {
      ...this.form.value,
      // Un service nouvellement créé (ou en cours de complétion) reste en brouillon
      // tant que le workflow et le formulaire n'ont pas été finalisés et publiés.
      statut: this.isEdit ? this.form.value.statut : 'BROUILLON',
      prix: this.form.value.prix ?? undefined,
      documentsRequis: (this.form.value.documentsRequis as string[]).filter(d => !!d?.trim())
    };

    const obs = this.isEdit && this.serviceId
      ? this.servicesService.update({ id: this.serviceId, ...payload })
      : this.servicesService.create(payload);

    obs.subscribe({
      next: (service) => {
        this.isSaving = false;
        this.isConfirmOpen = false;
        this.serviceId = service.id;
        this.isEdit = true;
        this.serviceEnregistre = service;

        this.activiteService.consigner(
          `Service « ${service.nom} » enregistré`,
          'fa-solid fa-layer-group',
          '/services'
        );

        this.toastService.success(`✅ Le service « ${service.nom} » a été enregistré.`);
      },
      error: (error) => {
        this.isSaving = false;
        this.toastService.error('❌ Une erreur est survenue lors de l\'enregistrement.');
        console.error(error);
      }
    });
  }

  /** Depuis la carte récapitulative : direction la création du workflow de ce service. */
  allerVersWorkflow(): void {
    if (!this.serviceEnregistre) return;
    this.router.navigate(['/workflows/nouveau'], { queryParams: { serviceId: this.serviceEnregistre.id } });
  }

  fermerRecapitulatif(): void {
    this.serviceEnregistre = null;
    this.router.navigate(['/services']);
  }

  get documentsNonVides(): string[] {
    return (this.form.value.documentsRequis as string[] || []).filter(d => !!d?.trim());
  }
}