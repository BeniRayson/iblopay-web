import { Observable } from 'rxjs';
import { Formulaire, FormulaireChamp, TypeChamp } from '../models/provider.model';
export interface ChampPaletteItem {
    type: TypeChamp;
    label: string;
    icon: string;
}
export declare const PALETTE_CHAMPS: ChampPaletteItem[];
export declare class FormulairesService {
    private formulaires;
    private nextId;
    getAll(): Observable<Formulaire[]>;
    getByServiceId(serviceId: number): Observable<Formulaire | undefined>;
    getById(id: number): Observable<Formulaire | undefined>;
    save(formulaire: Formulaire): Observable<Formulaire>;
    creerChampVide(type: TypeChamp, ordre: number): FormulaireChamp;
}
//# sourceMappingURL=formulaires.service.d.ts.map