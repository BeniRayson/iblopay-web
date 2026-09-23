export interface ActiviteJournal {
    id: number;
    icone: string;
    message: string;
    lien?: string | undefined;
    date: Date;
}
export declare class ActiviteService {
    private activitesSubject;
    activites$: import("rxjs").Observable<ActiviteJournal[]>;
    private prochainId;
    get activites(): ActiviteJournal[];
    consigner(message: string, icone?: string, lien?: string): void;
    marquerToutesVues(): void;
    private sauvegarder;
    private restaurer;
}
//# sourceMappingURL=activite.service.d.ts.map