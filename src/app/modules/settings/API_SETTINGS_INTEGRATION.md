# Integration API - Module Settings

> **Objectif :** documenter les contracts API a brancher sur le module settings.
> **Etat actuel :** les ecrans utilisent encore des donnees mockees, du state local et, pour certains modules, `localStorage`.
> **Principe :** le tableau ci-dessous reprend le format de la documentation commissions pour servir de base au backend.

---

## Resume des endpoints

> Convention backend IBLOPAY validee (source PDF):
> `/api/users`, `/api/agents`, `/api/cards`, `/api/transactions`, `/api/commissions`, `/api/dashboard`, `/api/roles`, `/api/permissions`.

| # | Module / ecran | URL cible | Methode | Donnees principales | Actions couvertes | Fichier source |
|---|---|---|---|---|---|---|
| 1 | Settings hub | `/api/roles`, `/api/permissions` | GET | categories, droits, visibilite | construire le hub selon RBAC | `src/app/modules/settings/pages/settings-list/settings-list.component.ts` |
| 2 | Users | `/api/users` | GET/POST/PUT/PATCH/DELETE | utilisateurs et statuts | CRUD + changement statut | `src/app/modules/settings/pages/users-settings/users-settings.component.ts` + `users-mock-data.ts` |
| 3 | Wallets | `/api/transactions/wallet/{walletId}`, `/api/agents/{id}/fund` | GET/POST | historique wallet, approvisionnement | lecture historique + funding agent | `src/app/modules/settings/pages/wallet-settings/wallet-settings.component.ts` |
| 4 | Cards | `/api/cards` | GET/POST | cartes, stock, distributions, stats | cycle de vie des cartes | `src/app/modules/settings/pages/cards-settings/cards-settings.component.ts` |
| 5 | Transactions | `/api/transactions`, `/api/dashboard/*` | GET | listing, detail, resumes, KPI | consultation + filtres hub | `src/app/modules/settings/pages/transactions-settings/transactions-settings.component.ts` |
| 6 | Financial | `/api/transactions/summary`, `/api/dashboard/kpis` | GET | agregats et indicateurs | vue financiere consolidee | `src/app/modules/settings/pages/financial-settings/financial-settings.component.ts` |
| 7 | Commissions | `/api/commissions` | GET | listing, detail, KPI, trend, breakdown | consultation et export | `src/app/modules/settings/pages/commissions-settings/commissions-settings.component.ts` |
| 8 | Services | `/api/services` (a confirmer backend) | GET/POST/PATCH | catalogue et demandes | gestion des services | `src/app/modules/settings/pages/services-settings/services-settings.component.ts` |
| 9 | Reports | `/api/dashboard/kpis`, `/api/dashboard/quick-actions`, `/api/dashboard/alerts`, `/api/dashboard/system-activities`, `/api/dashboard/volume-chart` | GET | KPI, alertes, activites, volume | reporting operationnel | `src/app/modules/settings/pages/reports-settings/reports-settings.component.ts` |
| 10 | Security | `/api/users/{id}/status`, `/api/agents/{id}/block`, `/api/agents/verify-otp` | PATCH/POST | blocage et verification | controles de securite | `src/app/modules/settings/pages/security-settings/security-settings.component.ts` |
| 11 | System | `/api/roles`, `/api/permissions` | GET | roles et permissions | parametrage d'acces | `src/app/modules/settings/pages/system-settings/system-settings.component.ts` |
| 12 | Partners | `/api/agents`, `/api/agents/search`, `/api/agents/stats` | GET | partenaires reseau et stats | recherche et suivi | `src/app/modules/settings/pages/partners-settings/partners-settings.component.ts` |

---

## Catalogue detaille des endpoints a ajouter

> Cette section liste les routes harmonisees avec le backend IBLOPAY.
> Quand une route n'existe pas dans le PDF, elle est marquee `a confirmer backend`.

### 1) Settings hub

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/roles` | Charger les roles pour piloter l'affichage des categories |
| 2 | GET | `/api/permissions` | Charger les permissions associees au role |

### 2) Users

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/users` | Liste paginee des utilisateurs |
| 2 | GET | `/api/users/{id}` | Detail d'un utilisateur |
| 3 | POST | `/api/users` | Creation d'un utilisateur |
| 4 | PUT | `/api/users/{id}` | Mise a jour du profil utilisateur |
| 5 | PATCH | `/api/users/{id}/status` | Modifier le statut (`ACTIVE`, `SUSPENDED`, `FROZEN`, `CLOSED`) |
| 6 | DELETE | `/api/users/{id}` | Supprimer un utilisateur |
| 7 | PATCH | `/api/users/{id}/assign-super-agent` | Assigner ou changer un super-agent (`a confirmer backend`) |
| 8 | POST | `/api/users/{id}/reset-pin` | Reinitialiser le PIN (`a confirmer backend`) |
| 9 | POST | `/api/users/{id}/reset-password` | Reinitialiser le mot de passe (`a confirmer backend`) |
| 10 | GET | `/api/users/export?format=csv` | Export de la liste utilisateurs |

### 3) Wallets

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/transactions/wallet/{walletId}` | Historique des transactions d'un wallet |
| 2 | GET | `/api/transactions/summary` | Resume consolide des montants/frais/statuts |
| 3 | POST | `/api/agents/{id}/fund` | Demande d'approvisionnement agent |
| 4 | POST | `/api/agents/{id}/block` | Blocage operationnel (`a confirmer pour wallet direct`) |

### 4) Cards

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/cards` | Liste paginee des cartes |
| 2 | GET | `/api/cards/{id}` | Detail carte |
| 3 | GET | `/api/cards/{id}/transactions` | Historique d'une carte |
| 4 | POST | `/api/cards` | Emission d'une nouvelle carte |
| 5 | POST | `/api/cards/{id}/activate` | Activer une carte |
| 6 | POST | `/api/cards/{id}/block` | Bloquer une carte |
| 7 | POST | `/api/cards/{id}/close` | Fermer une carte |
| 8 | POST | `/api/cards/{id}/replace` | Remplacer une carte |
| 9 | GET | `/api/cards/distributions` | Suivi des distributions |
| 10 | POST | `/api/cards/activatescanner` | Activation via scan QR |
| 11 | GET | `/api/cards/stock` | Etat du stock cartes |
| 12 | GET | `/api/cards/stats` | Statistiques globales cartes |

### 5) Transactions

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/transactions` | Liste paginee des transactions |
| 2 | GET | `/api/transactions/{id}` | Detail transaction |
| 3 | GET | `/api/transactions/wallet/{walletId}` | Transactions liees a un wallet |
| 4 | GET | `/api/transactions/summary` | Resume global transactions |
| 5 | GET | `/api/transactions/{id}/sweep` | Detail d'une operation sweep |
| 6 | GET | `/api/transactions/{id}/commission` | Commission liee a la transaction |
| 7 | GET | `/api/transactions/table` | Donnees tableau hub transactions |
| 8 | GET | `/api/transactions/role/{role}` | Filtre transactions par role |
| 9 | GET | `/api/transactions/category/{category}` | Filtre transactions par categorie |
| 10 | GET | `/api/transactions/export?format=csv` | Export transactions |
| 11 | GET | `/api/transactions/{transactionId}/detail` | Detail enrichi pour panneau de droite |
| 12 | GET | `/api/transactions/{transactionId}/traceability` | Timeline de tracabilite |

### 6) Financial

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/transactions/summary` | Source principale des agregats financiers |
| 2 | GET | `/api/dashboard/kpis` | Cartes KPI financieres |
| 3 | POST | `/api/financial/*` | Operations bordereaux/comptabilite (`a confirmer backend`) |

### 7) Commissions (settings)

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/commissions` | Liste des commissions |
| 2 | GET | `/api/commissions/{id}` | Detail d'une commission |
| 3 | GET | `/api/commissions/kpis` | KPI commissions |
| 4 | GET | `/api/commissions/trend` | Tendance commissions |
| 5 | GET | `/api/commissions/breakdown/type` | Repartition par type |
| 6 | GET | `/api/commissions/breakdown/status` | Repartition par statut |
| 7 | GET | `/api/commissions/leaderboard/agents` | Classement agents |
| 8 | GET | `/api/commissions/leaderboard/super-agents` | Classement super-agents |
| 9 | GET | `/api/commissions/hierarchy` | Hierarchie commissions |
| 10 | GET | `/api/commissions/export?format=csv` | Export commissions |

#### Endpoints barème tarifaire transactions inter-acteurs

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/commissions/tariffs` | Liste des baremes tarifaires actifs/inactifs (`a confirmer backend`) |
| 2 | GET | `/api/commissions/tariffs/{baremeId}` | Detail d'un bareme avec toutes les tranches |
| 3 | GET | `/api/commissions/tariffs/matrix` | Matrice des tarifs par couple d'acteurs et type de transaction |
| 4 | GET | `/api/commissions/tariffs/matrix?fromActor={from}&toActor={to}&transactionType={type}` | Filtre matrice (ex: client -> agent, retrait) |
| 5 | PUT | `/api/commissions/tariffs/{baremeId}/tranches` | Mise a jour complete des tranches d'un bareme |
| 6 | PATCH | `/api/commissions/tariffs/{baremeId}/tranches/{trancheId}` | Mise a jour partielle d'une tranche |
| 7 | POST | `/api/commissions/tariffs/simulate` | Simuler un calcul de frais/commission selon acteur et montant |
| 8 | POST | `/api/commissions/tariffs/publish` | Publier les baremes en production |
| 9 | GET | `/api/commissions/tariffs/history` | Historique des publications et modifications |
| 10 | GET | `/api/commissions/tariffs/actors` | Referentiel des acteurs (`CLIENT`, `MARCHAND`, `AGENT`, `SUPER_AGENT`, `INSTITUTION`) |
| 11 | GET | `/api/commissions/tariffs/versions` | Lister les versions de baremes (A, B, brouillon, publiee) |
| 12 | GET | `/api/commissions/tariffs/versions/{versionId}` | Detail d'une version de bareme |
| 13 | POST | `/api/commissions/tariffs/versions` | Creer une nouvelle version de bareme |
| 14 | POST | `/api/commissions/tariffs/versions/{versionId}/clone` | Dupliquer une version existante |
| 15 | PATCH | `/api/commissions/tariffs/versions/{versionId}/activate` | Activer une version (ex: retrait-client-a ou retrait-client-b) |
| 16 | POST | `/api/commissions/tariffs/versions/{versionId}/rollback` | Revenir a une version precedente |
| 17 | GET | `/api/commissions/tariffs/transaction-types` | Referentiel des types de transaction tarifables |
| 18 | GET | `/api/commissions/tariffs/audit-logs` | Journal des modifications de barèmes |

### 8) Services

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/services` | Catalogue services (`a confirmer backend`) |
| 2 | PATCH | `/api/services/{id}` | Edition service (`a confirmer backend`) |

### 9) Reports

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/dashboard/kpis` | KPI principaux |
| 2 | GET | `/api/dashboard/quick-actions` | Actions rapides |
| 3 | GET | `/api/dashboard/alerts` | Alertes dashboard |
| 4 | GET | `/api/dashboard/system-activities` | Activites recentes |
| 5 | GET | `/api/dashboard/volume-chart` | Courbe de volume |

### 10) Security

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | PATCH | `/api/users/{id}/status` | Suspension/gel utilisateur |
| 2 | POST | `/api/agents/{id}/block` | Blocage agent |
| 3 | POST | `/api/agents/verify-otp` | Verification OTP operation sensible |
| 4 | GET | `/api/security/*` | KYC/AML/audit detaille (`a confirmer backend`) |

### 11) System

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/roles` | Gestion des roles |
| 2 | GET | `/api/permissions` | Gestion des permissions |
| 3 | PATCH | `/api/system/*` | Parametres techniques (`a confirmer backend`) |

### 12) Partners

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/agents` | Liste partenaires reseau (agents/super-agents) |
| 2 | GET | `/api/agents/search` | Recherche partenaires |
| 3 | GET | `/api/agents/stats` | Statistiques partenaires |
| 4 | GET | `/api/agents/{id}/sub-agents` | Arborescence partenaire |
| 5 | GET | `/api/agents/{id}/electronics` | Equipements par partenaire |
| 6 | GET | `/api/agents/{id}/deposits` | Depots lies au partenaire |
| 7 | GET | `/api/agents/{id}/documents` | Documents partenaire |
| 8 | POST | `/api/agents/{id}/documents` | Upload document partenaire |

---

## 1. Settings hub - `GET /api/roles` + `GET /api/permissions`

| Champ | Detail |
|---|---|
| URL | `GET /api/roles` et `GET /api/permissions` |
| Description | Retourne les tuiles de navigation du module settings avec recherche et compte des sections. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "key": "users",
        "title": "Gestion des utilisateurs",
        "icon": "users",
        "description": "Clients, Agents, Super Agents et Administrateurs",
        "route": "/settings/users",
        "sectionCount": 4
      }
    ]
  }
}
```

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/settings-list/settings-list.component.ts` | source de la liste des categories |
| `src/app/modules/settings/models/settings.model.ts` | forme partagee `SettingsCategory` |

---

## 2. Users - `GET /api/users`

| Champ | Detail |
|---|---|
| URL | `GET /api/users` |
| Description | Retourne les utilisateurs administrables: clients, agents, super agents et administrateurs. |
| Headers | `Authorization: Bearer {access_token}` |

### Parametres (query)

| Nom | Type | Requis | Description |
|---|---|---|---|
| page | number | Non | page courante |
| pageSize | number | Non | nombre de lignes |
| search | string | Non | recherche texte |
| role | string | Non | `CLIENT`, `AGENT`, `SUPER_AGENT`, `ADMIN` |
| status | string | Non | `ACTIVE`, `SUSPENDED`, `PENDING`, `ARCHIVED` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "userId": "usr-001",
        "firstName": "Jean",
        "lastName": "Ndayishimiye",
        "phoneNumber": "+257XXXXXXXX",
        "email": "jean@example.com",
        "role": "AGENT",
        "status": "ACTIVE",
        "kycStatus": "VERIFIED",
        "agentCode": "AGT-001",
        "walletCount": 2,
        "cardCount": 1,
        "createdAt": "2026-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 15,
      "total": 120,
      "totalPages": 8
    }
  }
}
```

### Operations couvertes

- creation et edition d'utilisateur
- suspension, reactivation, archivage
- attribution de super-agent
- reset PIN et reset mot de passe
- verification KYC
- export CSV et impression

### Fichiers source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/users-settings/users-settings.component.ts` | logique principale |
| `src/app/modules/settings/pages/users-settings/users-mock-data.ts` | donnees mockees |

---

## 3. Wallets - `GET /api/transactions/wallet/{walletId}`

| Champ | Detail |
|---|---|
| URL | `GET /api/transactions/wallet/{walletId}` |
| Description | Retourne les wallets par type avec le solde et l'historique. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "walletId": "wal-001",
        "ownerId": "usr-001",
        "ownerType": "AGENT",
        "balance": 125000,
        "currency": "BIF",
        "status": "ACTIVE",
        "lastTransactionAt": "2026-08-20T10:45:00Z"
      }
    ]
  }
}
```

### Operations couvertes

- crediter et debiter un wallet
- bloquer et debloquer
- distribution et reception
- reattribution de portefeuille

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/wallet-settings/wallet-settings.component.ts` | wallet management |

---

## 4. Cards - `GET /api/cards`

| Champ | Detail |
|---|---|
| URL | `GET /api/cards` |
| Description | Retourne les cartes emises, le stock et l'historique. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "cardId": "card-001",
        "cardNumber": "CARTE-IBP-2024-0001",
        "cardType": "AGENT",
        "status": "ACTIVE",
        "ownerId": "usr-001",
        "issuedAt": "2026-07-20T12:00:00Z"
      }
    ]
  }
}
```

### Operations couvertes

- emission et association de carte
- activation, blocage, renouvellement
- reset PIN
- destruction et consultation du stock
- export Excel et impression

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/cards-settings/cards-settings.component.ts` | cartes et stock |

---

## 5. Transactions - `GET /api/transactions`

| Champ | Detail |
|---|---|
| URL | `GET /api/transactions` |
| Description | Retourne les transactions avec filtres, selection et analytics. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "transactionId": "txn-001",
        "transactionNo": "TXN-2026-0001",
        "walletId": "wal-001",
        "amount": 2500,
        "transactionType": "TRANSFER",
        "status": "SUCCESS",
        "createdAt": "2026-08-21T09:30:00Z"
      }
    ]
  }
}
```

### Operations couvertes

- annulation et correction
- reaffectation utilisateur ou agent
- marquage fraude
- partage, telechargement du recu, impression
- export des donnees

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/transactions-settings/transactions-settings.component.ts` | liste et analytics |

---

## 6. Financial - `GET /api/transactions/summary`

| Champ | Detail |
|---|---|
| URL | `GET /api/transactions/summary` |
| Description | Retourne les bordereaux, ecritures et rapports financiers. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "recordId": "fin-001",
        "type": "BORDEREAU",
        "period": "2026-08",
        "amount": 12500000,
        "status": "VALIDATED",
        "createdAt": "2026-08-31T18:00:00Z"
      }
    ]
  }
}
```

### Operations couvertes

- creation et correction de bordereaux
- creation d'ecritures comptables
- generation de rapports
- export comptable et impression

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/financial-settings/financial-settings.component.ts` | bordereaux, rapports, config |

---

## 7. Commissions - `GET /api/commissions`

| Champ | Detail |
|---|---|
| URL | `GET /api/commissions` |
| Description | Retourne les baremes et l'historique de publication des commissions. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "baremes": [
      {
        "id": "retrait-marchand",
        "title": "Agahembo k'umukozi / SA",
        "publishedAt": "2026-09-01T10:00:00Z",
        "status": "PUBLISHED",
        "tranches": 11
      }
    ]
  }
}
```

### Operations couvertes

- bascule entre onglets commissions, configuration et historique
- edition des baremes
- sauvegarde et publication
- annulation des changements

### Endpoints barème des tarifs sur transactions entre acteurs

| # | Methode | URL | Description |
|---|---|---|---|
| 1 | GET | `/api/commissions/tariffs` | Recuperer tous les baremes de tarification |
| 2 | GET | `/api/commissions/tariffs/{baremeId}` | Recuperer un bareme (ex: `retrait-marchand`, `recharge-lumicash`, `retrait-client-a`, `retrait-client-b`, `carte-agent`) |
| 3 | GET | `/api/commissions/tariffs/matrix` | Recuperer la matrice des tarifs inter-acteurs |
| 4 | PUT | `/api/commissions/tariffs/{baremeId}/tranches` | Enregistrer toutes les tranches d'un bareme |
| 5 | PATCH | `/api/commissions/tariffs/{baremeId}/tranches/{trancheId}` | Mettre a jour une tranche unique |
| 6 | POST | `/api/commissions/tariffs/simulate` | Simuler le calcul de frais et repartition agent/super-agent |
| 7 | POST | `/api/commissions/tariffs/publish` | Publier une nouvelle version de baremes |
| 8 | GET | `/api/commissions/tariffs/history` | Consulter l'historique de versions/publish |
| 9 | GET | `/api/commissions/tariffs/versions` | Lister les versions de baremes disponibles |
| 10 | POST | `/api/commissions/tariffs/versions` | Creer une version de bareme (draft) |
| 11 | PATCH | `/api/commissions/tariffs/versions/{versionId}/activate` | Activer une version (A ou B) |
| 12 | POST | `/api/commissions/tariffs/versions/{versionId}/clone` | Dupliquer une version pour edition |
| 13 | POST | `/api/commissions/tariffs/versions/{versionId}/rollback` | Restaurer une version precedente |
| 14 | GET | `/api/commissions/tariffs/transaction-types` | Liste des types de transactions couverts |
| 15 | GET | `/api/commissions/tariffs/audit-logs` | Historique complet des changements de tarifs |

### Exemple de body - activation d'une version A/B

```json
{
  "versionId": "tariff-v2026-09-03-b",
  "reason": "Activation du bareme B pour retraits clients",
  "effectiveAt": "2026-09-03T18:00:00Z"
}
```

### Exemple de body - simulation d'un tarif

```json
{
  "fromActor": "CLIENT",
  "toActor": "AGENT",
  "transactionType": "RETRAIT",
  "amount": 250000,
  "currency": "BIF",
  "baremeId": "retrait-client-a"
}
```

### Exemple de reponse - simulation

```json
{
  "success": true,
  "data": {
    "baremeId": "retrait-client-a",
    "tranche": {
      "min": 200000,
      "max": 299999
    },
    "totalFee": 1100,
    "distribution": {
      "agent": 990,
      "superAgent": 110
    }
  }
}
```

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/commissions-settings/commissions-settings.component.ts` | source des baremes |

---

## 8. Services - `GET /api/services`

| Champ | Detail |
|---|---|
| URL | `GET /api/services` |
| Description | Retourne le catalogue des services et les demandes associees. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "serviceId": "srv-001",
        "name": "Eau",
        "category": "Utility",
        "status": "ACTIVE",
        "fee": 500,
        "commission": "1.5%",
        "lastUpdate": "2026-08-15T08:00:00Z"
      }
    ]
  }
}
```

### Operations couvertes

- approbation et rejet de demandes clients
- activation et desactivation de service
- modification des frais, plafonds, commissions
- mise a jour des documents et procedures
- export et impression

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/services-settings/services-settings.component.ts` | services et demandes |

---

## 9. Reports - `GET /api/dashboard/kpis`

| Champ | Detail |
|---|---|
| URL | `GET /api/dashboard/kpis` |
| Description | Retourne les indicateurs, rapports, graphiques et alertes. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "reportId": "rpt-001",
        "name": "Rapport journalier",
        "period": "daily",
        "format": "PDF",
        "status": "READY",
        "generatedAt": "2026-09-02T07:00:00Z"
      }
    ]
  }
}
```

### Operations couvertes

- generation journaliere, hebdomadaire, mensuelle, annuelle
- export PDF, Excel, CSV
- envoi par email
- configuration et activation des alertes

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/reports-settings/reports-settings.component.ts` | rapports et alertes |

---

## 10. Security - `PATCH /api/users/{id}/status`

| Champ | Detail |
|---|---|
| URL | `PATCH /api/users/{id}/status` |
| Description | Retourne les logs d'audit, regles de fraude, KYC et AML. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "auditLogs": [
      {
        "auditId": "aud-001",
        "actor": "admin@iblopay.com",
        "action": "Mise a jour des parametres",
        "target": "system",
        "level": "INFO",
        "createdAt": "2026-09-01T11:00:00Z"
      }
    ]
  }
}
```

### Operations couvertes

- filtrage et remise a zero des logs
- configuration des regles fraude
- approbation et rejet KYC
- mise a jour du statut AML

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/security-settings/security-settings.component.ts` | audit, fraude, KYC, AML |

---

## 11. System - `GET /api/roles`

| Champ | Detail |
|---|---|
| URL | `GET /api/roles` |
| Description | Retourne les frais, limites, notifications et parametres globaux. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "fees": [
      {
        "feeId": "fee-001",
        "type": "TRANSFER",
        "rate": "1.05%",
        "minAmount": 1000,
        "maxAmount": 1000000,
        "status": "ACTIVE"
      }
    ],
    "limits": [
      {
        "limitId": "lim-001",
        "name": "Journalier",
        "value": 5000000,
        "status": "ACTIVE"
      }
    ]
  }
}
```

### Operations couvertes

- sauvegarde des frais
- activation et desactivation des limites
- configuration des canaux de notification
- reset des parametres, vidage du cache, rebuild index

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/system-settings/system-settings.component.ts` | parametres systeme |

---

## 12. Partners - `GET /api/agents`

| Champ | Detail |
|---|---|
| URL | `GET /api/agents` |
| Description | Retourne les partenaires, integrations et regles de commission. |
| Headers | `Authorization: Bearer {access_token}` |

### Reponse - succes

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "partnerId": "par-001",
        "name": "Banque de la Republique",
        "category": "Banque",
        "code": "BRB-001",
        "status": "ACTIVE",
        "transactions": 15420,
        "commission": "0.5%"
      }
    ],
    "integrations": [
      {
        "integrationId": "int-001",
        "name": "API Banque",
        "type": "REST API",
        "endpoint": "https://api.brb.bi/v2",
        "active": true
      }
    ]
  }
}
```

### Operations couvertes

- creation, edition et suppression de partenaire
- activation et suspension
- configuration, test et synchronisation d'integration
- edition des regles de commission

### Fichier source

| Fichier | Role |
|---|---|
| `src/app/modules/settings/pages/partners-settings/partners-settings.component.ts` | partenaires, integrations, commissions |

---

## Notes d'implementation

- Les ecrans settings n'ont pas encore de service HTTP dedie.
- La prochaine etape naturelle est de creer un `SettingsApiService` par domaine ou un service partage par sous-module.
- Les pages qui utilisent `localStorage` devront basculer vers des endpoints persistants avant mise en production.
