import { CanActivateFn } from '@angular/router';
import { DroitWorkflow } from '../models/provider.model';
/** Bloque l'accès à tout l'espace si l'utilisateur n'est pas connecté. */
export declare const authGuard: CanActivateFn;
/** Réservé à l'administrateur SERVICES (services, workflows, comptes, rapports...). */
export declare const adminGuard: CanActivateFn;
/** Réservé à l'administrateur TRANSPORT (flotte, chauffeurs, lignes, courses...). */
export declare const transportGuard: CanActivateFn;
/** Réservé à l'administrateur ÉVÉNEMENTS (matchs, concerts, conférences...). */
export declare const evenementsGuard: CanActivateFn;
/** Autorise l'admin services, ou tout compte disposant du droit demandé. Sinon, redirige vers son espace. */
export declare function droitGuard(droit: DroitWorkflow): CanActivateFn;
/** Empêche un utilisateur déjà connecté de revoir l'écran de connexion. */
export declare const invitesGuard: CanActivateFn;
//# sourceMappingURL=auth.guard.d.ts.map