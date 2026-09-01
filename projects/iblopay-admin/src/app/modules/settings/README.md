# Module Paramètres Administrateur — IBLOPAY

Interface d'administration complète, générée à partir de la structure des
Paramètres IBLOPAY (12 domaines, ~90 actions).

## Arborescence

```
src/app/modules/settings/
├── settings.routes.ts          ← routes standalone (lazy-loaded)
├── models/
│   └── settings.model.ts       ← interfaces SettingsSection / SettingsAction / SettingsCategory
└── pages/
    ├── settings-list/          ← hub : grille des 11 catégories + recherche
    ├── users-settings/         ← Clients, Agents, Super Agents, Administrateurs
    ├── wallet-settings/        ← Wallet Client / Agent / Super Agent / Institution
    ├── cards-settings/         ← Cartes + Stocks/Inventaire
    ├── transactions-settings/  ← Toutes transactions, Filtres, Types
    ├── financial-settings/     ← Trust Account, Liquidité, Comptabilité
    ├── commissions-settings/   ← Configuration, Paiement, Historique
    ├── services-settings/      ← Eau, Électricité, Internet, Taxes...
    ├── reports-settings/       ← Dashboard, Rapports, Exports, Graphiques
    ├── security-settings/      ← Authentification, Permissions, Audit, Fraude, KYC, AML
    ├── system-settings/        ← Frais, Limites, Notifications, Paramètres
    └── partners-settings/      ← Banques, Télécoms, Marchands, Institutions
```

> Remarque : la section « 11. Conformité (KYC / AML) » du document source n'avait
> pas de dossier dédié dans la structure demandée — elle a été intégrée comme
> deux sous-sections (KYC, AML) dans `security-settings`, ce qui reflète
> l'usage courant (conformité = volet sécurité). Dites-moi si vous préférez
> plutôt un `compliance-settings/` séparé, c'est un simple déplacement.

## Composants

Chaque page `*-settings` suit le même patron :
- **`.ts`** : liste typée `SettingsSection[]` avec les groupes/actions issus
  du document, + `onAction()` comme point d'entrée unique à brancher sur vos
  services/endpoints (chaque action a un `actionId` stable).
- **`.html`** : accordéon natif (`<details>/<summary>`), sans dépendance à
  Angular Material — section → sous-groupes → chips d'action cliquables.
- **`.scss`** : mêmes variables CSS (`--ib-primary`, `--ib-radius`, etc.)
  dupliquées dans chaque composant pour rester autonomes. Si votre pipeline
  SCSS le permet, extrayez-les dans un `_settings-theme.scss` partagé et
  remplacez les blocs `:host { --ib-* }` par un `@use`.

Les actions marquées `danger: true` (Suspendre, Supprimer, Bloquer,
Désactiver, Annuler, Marquer comme frauduleuse...) sont stylées en rouge —
pensez à leur ajouter une confirmation avant exécution côté `onAction()`.

## Intégration

1. Copier `settings/` dans `src/app/modules/`.
2. Dans `app.routes.ts` :
   ```ts
   {
     path: 'settings',
     loadChildren: () =>
       import('./modules/settings/settings.routes').then(m => m.SETTINGS_ROUTES)
   }
   ```
3. Depuis `settings-list`, chaque carte navigue vers `/settings/<clé>`
   (ex: `/settings/users`).

## Ce qui reste à faire côté métier

- Brancher `onAction()` de chaque page sur les services HTTP réels (un
  `SettingsApiService` par domaine est une bonne prochaine étape).
- Ajouter des gardes de rôle/permission (RBAC) sur les routes sensibles
  (Administrateurs, Trust Account, Fraude...).
- Remplacer les chips d'action par des formulaires/modales dédiés là où une
  saisie est nécessaire (ex: "Créditer" un wallet demande un montant).
