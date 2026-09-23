import { OnInit } from '@angular/core';
import { TransportService } from '../../services/transport.service';
import { CoursesService } from '../../services/courses.service';
import { LigneBus, ZoneTaxi, TarificationTaxi, Vehicule, Chauffeur, TrajetHistorique, Course } from '../../models/transport.model';
import { ToastService } from '../../core/toast.service';
interface LigneFormState {
    id?: number;
    nom: string;
    code: string;
    arrets: string[];
    tarif: number;
    distanceKm: number;
    dureeMinutesEstimee: number;
    frequenceMinutes: number;
    statut: 'ACTIVE' | 'INACTIVE';
}
interface ZoneFormState {
    id?: number;
    nom: string;
    tarification: TarificationTaxi;
    tarifBase: number;
    tarifParKm: number | null;
    forfaitMoyen: number | null;
    statut: 'ACTIVE' | 'INACTIVE';
}
export declare class LignesTarifsComponent implements OnInit {
    private transportService;
    private coursesService;
    private toastService;
    vueActive: 'LIGNES' | 'ZONES';
    lignes: LigneBus[];
    zones: ZoneTaxi[];
    vehicules: Vehicule[];
    chauffeurs: Chauffeur[];
    coursesActives: Course[];
    isLoading: boolean;
    showLigneModal: boolean;
    ligneForm: LigneFormState | null;
    nouvelArret: string;
    showZoneModal: boolean;
    zoneForm: ZoneFormState | null;
    ligneDetailAffichee: LigneBus | null;
    zoneDetailAffichee: ZoneTaxi | null;
    historiqueOuvert: boolean;
    historiqueTitre: string;
    historiqueLignes: TrajetHistorique[];
    historiquePage: number;
    historiquePageSize: number;
    constructor(transportService: TransportService, coursesService: CoursesService, toastService: ToastService);
    ngOnInit(): void;
    charger(): void;
    changerVue(vue: 'LIGNES' | 'ZONES'): void;
    /** Véhicules actuellement EN_COURS sur cette ligne (permet le badge de statut + affichage détail). */
    vehiculesEnCoursPourLigne(ligneId: number): Vehicule[];
    ligneEnCours(ligneId: number): boolean;
    vehiculesEnCoursPourZone(zoneId: number): Vehicule[];
    zoneEnCours(zoneId: number): boolean;
    vehiculesDeLaLigne(ligneId: number): Vehicule[];
    vehiculesDeLaZone(zoneId: number): Vehicule[];
    nomChauffeur(id?: number): string;
    voirDetailLigne(l: LigneBus): void;
    fermerDetailLigne(): void;
    voirDetailZone(z: ZoneTaxi): void;
    fermerDetailZone(): void;
    ouvrirHistoriqueLigne(l: LigneBus): void;
    ouvrirHistoriqueZone(z: ZoneTaxi): void;
    fermerHistorique(): void;
    get historiqueRevenuTotal(): number;
    get historiqueTrajetsTermines(): number;
    get historiqueTotalPages(): number;
    get historiquePagine(): TrajetHistorique[];
    changerPageHistorique(page: number): void;
    ouvrirNouvelleLigne(): void;
    modifierLigne(l: LigneBus): void;
    /** Le tarif est fixé par l'État (barème officiel) : recalculé automatiquement à chaque changement de distance, jamais saisi à la main. */
    recalculerTarifEtat(): void;
    get tarifParKmEtat(): number;
    fermerLigneModal(): void;
    ajouterArret(): void;
    supprimerArret(index: number): void;
    enregistrerLigne(): void;
    supprimerLigne(l: LigneBus): void;
    toggleStatutLigne(l: LigneBus): void;
    ouvrirNouvelleZone(): void;
    modifierZone(z: ZoneTaxi): void;
    fermerZoneModal(): void;
    enregistrerZone(): void;
    supprimerZone(z: ZoneTaxi): void;
    toggleStatutZone(z: ZoneTaxi): void;
}
export {};
//# sourceMappingURL=lignes-tarifs.component.d.ts.map