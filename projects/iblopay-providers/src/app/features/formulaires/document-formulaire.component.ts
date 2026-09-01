import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormulairesService } from '../../services/formulaires.service';
import { ServicesService } from '../../services/services.service';
import { ToastService } from '../../core/toast.service';
import { Formulaire, ServiceInstitution } from '../../models/provider.model';

@Component({
  selector: 'app-document-formulaire',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './document-formulaire.component.html',
  styleUrl: './document-formulaire.component.scss'
})
export class DocumentFormulaireComponent implements OnInit, AfterViewInit {
  @ViewChild('zoneEdition') zoneEdition?: ElementRef<HTMLDivElement>;

  services: ServiceInstitution[] = [];
  isEdit = false;
  isSaving = false;
  showApercu = false;
  contenuApercu: SafeHtml = '';

  formulaire: Formulaire = {
    id: 0,
    institutionId: 1,
    serviceId: 0,
    nom: '',
    code: '',
    version: 1,
    statut: 'BROUILLON',
    champs: [],
    createdAt: new Date(),
    typeFormulaire: 'DOCUMENT',
    contenuDocument: ''
  };

  private contenuInitial = '';

  constructor(
    private formulairesService: FormulairesService,
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.servicesService.getAll().subscribe(s => this.services = s);

    const id = this.route.snapshot.paramMap.get('id');
    const serviceIdQuery = this.route.snapshot.queryParamMap.get('serviceId');

    if (id) {
      this.isEdit = true;
      this.formulairesService.getById(Number(id)).subscribe(f => {
        if (!f) return;
        this.formulaire = JSON.parse(JSON.stringify(f));
        this.contenuInitial = this.formulaire.contenuDocument || '';
        if (this.zoneEdition) this.zoneEdition.nativeElement.innerHTML = this.contenuInitial;
      });
    } else if (serviceIdQuery) {
      this.formulaire.serviceId = Number(serviceIdQuery);
    }
  }

  ngAfterViewInit(): void {
    if (this.contenuInitial && this.zoneEdition) {
      this.zoneEdition.nativeElement.innerHTML = this.contenuInitial;
    }
  }

  // ─── BARRE D'OUTILS DE MISE EN FORME (façon Word) ─────────
  appliquerCommande(commande: string, valeur?: string): void {
    this.zoneEdition?.nativeElement.focus();
    document.execCommand(commande, false, valeur);
  }

  onContenuModifie(): void {
    if (this.zoneEdition) {
      this.formulaire.contenuDocument = this.zoneEdition.nativeElement.innerHTML;
    }
  }

  get contenuEstVide(): boolean {
    const texte = this.formulaire.contenuDocument?.replace(/<[^>]*>/g, '').trim();
    return !texte;
  }

  // ─── APERÇU ────────────────────────────────────────────────
  ouvrirApercu(): void {
    this.onContenuModifie();
    if (!this.formulaire.nom.trim() || this.contenuEstVide) {
      this.toastService.error('Ajoutez un titre et du contenu avant de visualiser.');
      return;
    }
    this.contenuApercu = this.sanitizer.bypassSecurityTrustHtml(this.formulaire.contenuDocument || '');
    this.showApercu = true;
  }

  fermerApercu(): void {
    this.showApercu = false;
  }

  get nomService(): string {
    return this.services.find(s => s.id === this.formulaire.serviceId)?.nom || 'Service non sélectionné';
  }

  // ─── ENREGISTREMENT ────────────────────────────────────────
  private validerAvantEnregistrement(): boolean {
    this.onContenuModifie();
    if (!this.formulaire.nom.trim()) {
      this.toastService.error('Veuillez donner un nom à ce formulaire.');
      return false;
    }
    if (!this.formulaire.serviceId) {
      this.toastService.error('Veuillez sélectionner le service concerné.');
      return false;
    }
    if (this.contenuEstVide) {
      this.toastService.error('Le contenu du document est vide. Écrivez ou collez le texte de la lettre/du formulaire.');
      return false;
    }
    return true;
  }

  enregistrerBrouillon(): void {
    if (!this.validerAvantEnregistrement()) return;
    this.sauvegarder('BROUILLON', 'Brouillon enregistré.');
  }

  publier(): void {
    if (!this.validerAvantEnregistrement()) return;
    if (!confirm('Publier ce formulaire ? Il sera visible et utilisable par les demandeurs du service concerné.')) return;
    this.sauvegarder('PUBLIE', '✅ Formulaire publié avec succès.');
  }

  private sauvegarder(statut: 'BROUILLON' | 'PUBLIE', message: string): void {
    this.isSaving = true;
    if (!this.formulaire.code) {
      this.formulaire.code = 'DOC_' + this.formulaire.nom.trim().toUpperCase().replace(/[^A-Z0-9]+/g, '_').slice(0, 30);
    }
    this.formulaire.statut = statut;
    this.formulaire.typeFormulaire = 'DOCUMENT';

    this.formulairesService.save(this.formulaire).subscribe(saved => {
      this.formulaire = saved;
      this.isSaving = false;
      this.toastService.success(message);
      this.router.navigate(['/formulaires']);
    });
  }
}
