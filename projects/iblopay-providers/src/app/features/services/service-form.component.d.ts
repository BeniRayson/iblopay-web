import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { ToastService } from '../../core/toast.service';
import { ActiviteService } from '../../services/activite.service';
export declare class ServiceFormComponent implements OnInit {
    private fb;
    private servicesService;
    private route;
    private router;
    private toastService;
    private activiteService;
    form: FormGroup;
    isEdit: boolean;
    serviceId?: number;
    isSaving: boolean;
    isConfirmOpen: boolean;
    /** Une fois le service enregistré, la carte récapitulative s'affiche avec le bouton « Étape suivante ». */
    serviceEnregistre: any;
    private dernierCodeAuto;
    constructor(fb: FormBuilder, servicesService: ServicesService, route: ActivatedRoute, router: Router, toastService: ToastService, activiteService: ActiviteService);
    ngOnInit(): void;
    get documents(): FormArray;
    ajouterDocument(): void;
    supprimerDocument(index: number): void;
    private autoGenererCode;
    private genererCode;
    demanderConfirmation(): void;
    annulerConfirmation(): void;
    /** Enregistre le service uniquement (pas de publication). La carte récapitulative s'affiche ensuite. */
    confirmerEtEnregistrer(): void;
    /** Depuis la carte récapitulative : direction la création du workflow de ce service. */
    allerVersWorkflow(): void;
    fermerRecapitulatif(): void;
    get documentsNonVides(): string[];
}
//# sourceMappingURL=service-form.component.d.ts.map