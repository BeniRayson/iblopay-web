export interface ColonneExport {
    cle: string;
    label: string;
}
export interface LigneExport {
    [cle: string]: string | number;
}
export declare class ExportUtilsService {
    /** Génère un vrai fichier Excel (.xlsx) téléchargeable à partir de colonnes/lignes. */
    exporterExcel(colonnes: ColonneExport[], lignes: LigneExport[], nomFichier: string, nomFeuille?: string): void;
    /** Ouvre une fenêtre d'impression avec un tableau HTML propre (titre, filtres, colonnes/lignes). */
    imprimer(titre: string, sousTitre: string, filtresTexte: string[], colonnes: ColonneExport[], lignes: LigneExport[]): void;
}
//# sourceMappingURL=export-utils.service.d.ts.map