import { OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormulairesService } from '../../services/formulaires.service';
import { ServicesService } from '../../services/services.service';
import { ToastService } from '../../core/toast.service';
import { Formulaire, ServiceInstitution } from '../../models/provider.model';
export declare class DocumentFormulaireComponent implements OnInit, AfterViewInit {
    private formulairesService;
    private servicesService;
    private route;
    private router;
    private toastService;
    private sanitizer;
    zoneEdition?: ElementRef<HTMLDivElement>;
    services: ServiceInstitution[];
    isEdit: boolean;
    isSaving: boolean;
    showApercu: boolean;
    contenuApercu: SafeHtml;
    formulaire: Formulaire;
    private contenuInitial;
    constructor(formulairesService: FormulairesService, servicesService: ServicesService, route: ActivatedRoute, router: Router, toastService: ToastService, sanitizer: DomSanitizer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    appliquerCommande(commande: string, valeur?: string): void;
    onContenuModifie(): void;
    get contenuEstVide(): boolean;
    ouvrirApercu(): void;
    fermerApercu(): void;
    get nomService(): string;
    private validerAvantEnregistrement;
    enregistrerBrouillon(): void;
    publier(): void;
    private sauvegarder;
}
//# sourceMappingURL=document-formulaire.component.d.ts.map