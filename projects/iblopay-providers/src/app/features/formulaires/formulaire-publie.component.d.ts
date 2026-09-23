import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormulairesService } from '../../services/formulaires.service';
import { Formulaire } from '../../models/provider.model';
export declare class FormulairePublieComponent implements OnInit {
    private route;
    private formulairesService;
    formulaireId?: number;
    formulaire: Formulaire;
    nbColonnes: number;
    constructor(route: ActivatedRoute, formulairesService: FormulairesService);
    ngOnInit(): void;
    private getNbColonnes;
}
//# sourceMappingURL=formulaire-publie.component.d.ts.map