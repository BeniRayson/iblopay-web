import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
/** Renvoie l'utilisateur connecté vers son espace de départ (Services, Transport ou Demandes). */
function rediriger(router, auth) {
    if (!auth.estConnecte) {
        router.navigate(['/login']);
        return;
    }
    if (auth.estAdminServices)
        router.navigate(['/dashboard']);
    else if (auth.estAdminTransport)
        router.navigate(['/transport']);
    else if (auth.estAdminEvenements)
        router.navigate(['/evenements']);
    else
        router.navigate(['/demandes']);
}
/** Bloque l'accès à tout l'espace si l'utilisateur n'est pas connecté. */
export var authGuard = function () {
    var auth = inject(AuthService);
    var router = inject(Router);
    if (auth.estConnecte)
        return true;
    router.navigate(['/login']);
    return false;
};
/** Réservé à l'administrateur SERVICES (services, workflows, comptes, rapports...). */
export var adminGuard = function () {
    var auth = inject(AuthService);
    var router = inject(Router);
    if (!auth.estConnecte) {
        router.navigate(['/login']);
        return false;
    }
    if (auth.estAdminServices)
        return true;
    rediriger(router, auth);
    return false;
};
/** Réservé à l'administrateur TRANSPORT (flotte, chauffeurs, lignes, courses...). */
export var transportGuard = function () {
    var auth = inject(AuthService);
    var router = inject(Router);
    if (!auth.estConnecte) {
        router.navigate(['/login']);
        return false;
    }
    if (auth.estAdminTransport)
        return true;
    rediriger(router, auth);
    return false;
};
/** Réservé à l'administrateur ÉVÉNEMENTS (matchs, concerts, conférences...). */
export var evenementsGuard = function () {
    var auth = inject(AuthService);
    var router = inject(Router);
    if (!auth.estConnecte) {
        router.navigate(['/login']);
        return false;
    }
    if (auth.estAdminEvenements)
        return true;
    rediriger(router, auth);
    return false;
};
/** Autorise l'admin services, ou tout compte disposant du droit demandé. Sinon, redirige vers son espace. */
export function droitGuard(droit) {
    return function () {
        var auth = inject(AuthService);
        var router = inject(Router);
        if (!auth.estConnecte) {
            router.navigate(['/login']);
            return false;
        }
        if (auth.estAdminServices || auth.aLeDroit(droit))
            return true;
        rediriger(router, auth);
        return false;
    };
}
/** Empêche un utilisateur déjà connecté de revoir l'écran de connexion. */
export var invitesGuard = function () {
    var auth = inject(AuthService);
    var router = inject(Router);
    if (!auth.estConnecte)
        return true;
    rediriger(router, auth);
    return false;
};
//# sourceMappingURL=auth.guard.js.map