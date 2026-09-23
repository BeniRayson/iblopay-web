import { OnInit } from '@angular/core';
import { EvenementsService } from '../../services/evenements.service';
import { Lieu, TypeLieu, Evenement } from '../../models/evenements.model';
import { ToastService } from '../../core/toast.service';
interface LieuFormState {
    id?: number;
    nom: string;
    ville: string;
    adresse: string;
    type: TypeLieu;
    capaciteMax: number;
    statut: 'ACTIF' | 'INACTIF';
}
export declare class LieuxComponent implements OnInit {
    private evenementsService;
    private toastService;
    lieux: Lieu[];
    lieuxFiltres: Lieu[];
    evenements: Evenement[];
    recherche: string;
    filtreType: '' | TypeLieu;
    filtreStatut: string;
    typesDisponibles: string[];
    isLoading: boolean;
    showModal: boolean;
    form: LieuFormState | null;
    lieuDetailAffiche: Lieu | null;
    constructor(evenementsService: EvenementsService, toastService: ToastService);
    ngOnInit(): void;
    charger(): void;
    appliquerFiltres(): void;
    reinitialiserFiltres(): void;
    typeLabel(type: TypeLieu): string;
    evenementsDuLieu(lieuId: number): Evenement[];
    voirDetail(l: Lieu): void;
    fermerDetail(): void;
    ouvrirNouveau(): void;
    modifier(l: Lieu): void;
    fermerModal(): void;
    enregistrer(): void;
    supprimer(l: Lieu): void;
    toggleStatut(l: Lieu): void;
    ajouterType(): void;
}
export {};
//# sourceMappingURL=lieux.component.d.ts.map