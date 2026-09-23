export interface ExportColumn {
    title: string;
    dataKey: string;
}
export declare class ExportService {
    constructor();
    /**
     * Exporte les données en CSV et télécharge le fichier
     */
    exportToCsv(data: any[], columns: ExportColumn[], filename?: string): void;
    /**
     * Exporte les données en PDF en utilisant l'impression navigateur
     * avec un formatage tableau
     */
    exportToPdf(data: any[], columns: ExportColumn[], title?: string, filename?: string): void;
    /**
     * Récupère une valeur imbriquée par une clé (ex: "adresse.rue")
     */
    private getNestedValue;
    /**
     * Échappe une valeur pour le CSV
     */
    private escapeCsvValue;
    /**
     * Formate une valeur pour l'affichage
     */
    private formatValue;
    /**
     * Génère les colonnes à partir d'un mapping
     */
    static createColumns(mapping: {
        title: string;
        key: string;
    }[]): ExportColumn[];
}
//# sourceMappingURL=export.service.d.ts.map