import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
export declare class LoginComponent {
    private authService;
    private router;
    identifiant: string;
    motDePasse: string;
    showMotDePasse: boolean;
    isLoading: boolean;
    erreur: string;
    showAide: boolean;
    readonly adminServicesIdentifiant = "72483021";
    readonly adminServicesPin = "1234";
    readonly adminTransportIdentifiant = "67391031";
    readonly adminTransportPin = "1234";
    readonly adminEvenementsIdentifiant = "64001001";
    readonly adminEvenementsPin = "1234";
    constructor(authService: AuthService, router: Router);
    toggleAide(): void;
    remplir(identifiant: string, pin: string): void;
    connexion(): void;
}
//# sourceMappingURL=login.component.d.ts.map