interface TrancheSimple {
    min: number;
    max: number;
    agent: number | null;
    sa: number | null;
}
interface TrancheRepartie {
    min: number;
    max: number;
    total: number | null;
    agent: number | null;
    sa: number | null;
}
interface TrancheCarte {
    min: number;
    max: number;
    depot: number | null;
    retrait: number | null;
}
interface Bareme<T> {
    id: string;
    titre: string;
    tranches: T[];
}
export declare class CommissionsSettingsComponent {
    modeEdition: boolean;
    enregistrementEnCours: boolean;
    dernierePublication: Date | null;
    ongletActif: 'commissions' | 'configuration' | 'historique';
    definirOnglet(onglet: 'commissions' | 'configuration' | 'historique'): void;
    baremeRetraitMarchand: Bareme<TrancheSimple>;
    baremeRechargeLumicash: Bareme<TrancheSimple>;
    baremeRetraitClientA: Bareme<TrancheRepartie>;
    baremeRetraitClientB: Bareme<TrancheRepartie>;
    baremeCarteAgent: Bareme<TrancheCarte>;
    baremesConfiguration: Bareme<TrancheCarte>[];
    private snapshot;
    activerEdition(): void;
    annulerEdition(): void;
    enregistrerEtPublier(): void;
    formatMontant(valeur: number | null): string;
}
export {};
//# sourceMappingURL=commissions-settings.component.d.ts.map