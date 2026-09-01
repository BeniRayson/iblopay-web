/**
 * Modèles partagés pour le module Paramètres Administrateur IBLOPAY
 */

export interface SettingsAction {
  label: string;
  icon?: string;
  /** Identifiant utilisé pour router l'action vers le bon handler / endpoint */
  actionId: string;
  /** Action sensible => nécessite confirmation avant exécution */
  requiresConfirmation?: boolean;
  /** Action destructive (suspendre, supprimer, bloquer, etc.) => style d'alerte */
  danger?: boolean;
}

export interface SettingsSubGroup {
  title: string;
  actions: SettingsAction[];
}

export interface SettingsSection {
  key: string;
  title: string;
  icon: string;
  description?: string;
  /** Actions directes (sans sous-groupe) */
  actions?: SettingsAction[];
  /** Sous-groupes (ex: Clients / Agents / Super Agents dans "Utilisateurs") */
  groups?: SettingsSubGroup[];
}

export interface SettingsCategory {
  key: string;
  title: string;
  icon: string;
  description: string;
  route: string;
  sectionCount: number;
}
