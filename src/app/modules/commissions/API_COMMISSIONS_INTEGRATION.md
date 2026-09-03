# Intégration API — Module Commissions

> **Objectif :** Remplacer les données mockées par des appels API réels fournis par le backend.
> **Statut actuel :** Le module utilise des mocks locaux via `CommissionMockService` (210 lignes) qui génère 200 commissions factices avec `of()` + `delay()`.
> **Données mock :** 12 agents, 5 super-agents, 200 transactions générées aléatoirement.
> **Action requise :** Implémenter les endpoints API décrits ci-dessous.

---

## Sommaire des Endpoints

| #  | Méthode | URL                                                  | Composant associé               |
|----|---------|------------------------------------------------------|---------------------------------|
| 1  | GET     | `/api/commissions`                                   | Commission List (paginated)     |
| 2  | GET     | `/api/commissions/{id}`                              | Commission Detail               |
| 3  | GET     | `/api/commissions/kpis?viewRole={role}`              | Commission Dashboard (KPI)      |
| 4  | GET     | `/api/commissions/trend?days={n}`                    | Commission Trend Chart          |
| 5  | GET     | `/api/commissions/breakdown/type`                    | Type Breakdown (donut)          |
| 6  | GET     | `/api/commissions/breakdown/status`                  | Status Breakdown (donut)        |
| 7  | GET     | `/api/commissions/leaderboard/agents`                | Agent Leaderboard               |
| 8  | GET     | `/api/commissions/leaderboard/super-agents`          | Super-Agent Leaderboard         |
| 9  | GET     | `/api/commissions/hierarchy`                         | Agent Hierarchy                 |
| 10 | GET     | `/api/commissions/agents`                            | Agent List (dropdown filter)    |
| 11 | GET     | `/api/commissions/super-agents`                      | Super-Agent List (dropdown)     |
| 12 | GET     | `/api/commissions/export?format=csv`                 | Commission Export (CSV/PDF)     |

---

## 1. Liste des commissions — `GET /api/commissions`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions` |
| **Description** | Récupère la liste paginée des commissions avec filtrage et tri. |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Paramètres (Query params)

| Nom              | Type   | Requis | Description                                      |
|------------------|--------|--------|--------------------------------------------------|
| page             | number | Non    | Pagination (défaut: 1)                           |
| pageSize         | number | Non    | Lignes par page (défaut: 15)                     |
| dateFrom         | string | Non    | Filtre date début (ISO 8601)                     |
| dateTo           | string | Non    | Filtre date fin (ISO 8601)                       |
| agentId          | string | Non    | Filtrer par agent                                |
| superAgentId     | string | Non    | Filtrer par super-agent                          |
| status           | string | Non    | `PENDING`, `CREDITED`, `FAILED`                  |
| commissionType   | string | Non    | `AGENT_COMMISSION`, `SUPER_AGENT_COMMISSION`     |
| search           | string | Non    | Recherche (nom agent, référence, ID)             |
| sortColumn       | string | Non    | Colonne de tri : `createdAt`, `amount`, `rate`, `agentName`, `status` |
| sortDirection    | string | Non    | `asc` ou `desc` (défaut: `desc`)                 |

### Retour — Succès

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "commissionId": "COM-0001",
        "transactionId": "TXN-ID-1000",
        "transactionReference": "TXN-20240001",
        "agentId": "AGT-001",
        "agentName": "Jean-Pierre Hakizimana",
        "superAgentId": "SA-001",
        "superAgentName": "Alphonse Niyonzima",
        "amount": 12500,
        "rate": 0.75,
        "commissionType": "AGENT_COMMISSION",
        "status": "CREDITED",
        "sourceType": "DEPOSIT",
        "paymentMode": "AGENT",
        "createdAt": "2026-07-15T14:30:00.000Z",
        "creditedAt": "2026-07-18T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 15,
      "total": 200,
      "totalPages": 14
    }
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getFilteredCommissions(filter, sort, page, pageSize)` |

---

## 2. Détail d'une commission — `GET /api/commissions/{id}`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/{commissionId}` |
| **Description** | Récupère les détails d'une commission spécifique. |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Paramètres (Path)

| Nom          | Type   | Requis | Description              |
|--------------|--------|--------|--------------------------|
| commissionId | string | Oui    | ID de la commission      |

### Retour — Succès

```json
{
  "success": true,
  "data": {
    "commission": {
      "commissionId": "COM-0001",
      "transactionId": "TXN-ID-1000",
      "transactionReference": "TXN-20240001",
      "agentId": "AGT-001",
      "agentName": "Jean-Pierre Hakizimana",
      "superAgentId": "SA-001",
      "superAgentName": "Alphonse Niyonzima",
      "amount": 12500,
      "rate": 0.75,
      "commissionType": "AGENT_COMMISSION",
      "status": "CREDITED",
      "sourceType": "DEPOSIT",
      "paymentMode": "AGENT",
      "createdAt": "2026-07-15T14:30:00.000Z",
      "creditedAt": "2026-07-18T10:00:00.000Z"
    }
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getCommissionById(id)` |

---

## 3. KPI du tableau de bord — `GET /api/commissions/kpis`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/kpis` |
| **Description** | Récupère les cartes KPI pour le tableau de bord des commissions. Le contenu varie selon le rôle (agent, super-agent, admin). |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Paramètres (Query)

| Nom      | Type   | Requis | Description                                  |
|----------|--------|--------|----------------------------------------------|
| viewRole | string | Oui    | `agent`, `super_agent`, ou `admin`           |
| agentId  | string | Non    | Si rôle=agent, filtre les KPIs pour cet agent|
| superAgentId | string | Non | Si rôle=super_agent, filtre pour l'équipe    |

### Retour — Succès (admin)

```json
{
  "success": true,
  "data": {
    "kpis": [
      {
        "label": "Commissions Totales",
        "value": "12 450 000 BIF",
        "delta": "+15.8%",
        "deltaType": "increase",
        "icon": "bi-cash-stack",
        "color": "#3b82f6"
      },
      {
        "label": "En Attente",
        "value": "3 200 000 BIF",
        "delta": "45 transactions",
        "deltaType": "neutral",
        "icon": "bi-hourglass-split",
        "color": "#f97316"
      },
      {
        "label": "Créditées",
        "value": "8 750 000 BIF",
        "delta": "140/200 transactions",
        "deltaType": "increase",
        "icon": "bi-check-circle",
        "color": "#22c55e"
      },
      {
        "label": "Taux Moyen",
        "value": "1.05%",
        "delta": "+0.18%",
        "deltaType": "increase",
        "icon": "bi-percent",
        "color": "#a855f7"
      },
      {
        "label": "Transactions",
        "value": "200",
        "delta": "+23 vs période préc.",
        "deltaType": "increase",
        "icon": "bi-arrow-left-right",
        "color": "#14b8a6"
      }
    ]
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getDashboardKpis(viewRole: ViewRole)` |

---

## 4. Tendance des commissions — `GET /api/commissions/trend`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/trend?days={n}` |
| **Description** | Récupère les données d'évolution des commissions sur une période (utilisé pour le graphique d'évolution). |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Paramètres (Query)

| Nom  | Type   | Requis | Description                         |
|------|--------|--------|-------------------------------------|
| days | number | Oui    | Période : 7, 30, 90 jours           |

### Retour — Succès

```json
{
  "success": true,
  "data": {
    "labels": ["2026-07-01", "2026-07-02", "2026-07-03"],
    "agentValues": [125000, 98000, 150000],
    "superAgentValues": [45000, 32000, 55000]
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getCommissionTrend(days: number)` |

---

## 5. Répartition par type — `GET /api/commissions/breakdown/type`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/breakdown/type` |
| **Description** | Récupère la répartition des commissions par type d'opération (DEPOSIT, WITHDRAWAL, PAYMENT_NFC, TRANSFER). Pour graphique donut. |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Retour — Succès

```json
{
  "success": true,
  "data": {
    "breakdown": [
      { "type": "DEPOSIT", "amount": 5200000, "count": 85 },
      { "type": "WITHDRAWAL", "amount": 3100000, "count": 52 },
      { "type": "PAYMENT_NFC", "amount": 2150000, "count": 38 },
      { "type": "TRANSFER", "amount": 2000000, "count": 25 }
    ]
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getTypeBreakdown()` |

---

## 6. Répartition par statut — `GET /api/commissions/breakdown/status`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/breakdown/status` |
| **Description** | Récupère la répartition des commissions par statut (PENDING, CREDITED, FAILED). Pour graphique donut. |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Retour — Succès

```json
{
  "success": true,
  "data": {
    "breakdown": [
      { "status": "CREDITED", "amount": 8750000, "count": 140 },
      { "status": "PENDING", "amount": 3200000, "count": 45 },
      { "status": "FAILED", "amount": 500000, "count": 15 }
    ]
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getStatusBreakdown()` |

---

## 7. Classement des agents — `GET /api/commissions/leaderboard/agents`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/leaderboard/agents` |
| **Description** | Récupère le classement des agents par montant de commissions générées. |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Paramètres (Query)

| Nom   | Type   | Requis | Description                    |
|-------|--------|--------|--------------------------------|
| limit | number | Non    | Nombre d'entrées (défaut: 10)  |
| period | string | Non   | `7d`, `30d`, `90d`             |

### Retour — Succès

```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "agentId": "AGT-001",
        "agentName": "Jean-Pierre Hakizimana",
        "totalCommissions": 450000,
        "transactionCount": 28,
        "averageRate": 1.25,
        "trend": "up",
        "previousPeriodTotal": 380000
      },
      {
        "rank": 2,
        "agentId": "AGT-005",
        "agentName": "David Mbonimpa",
        "totalCommissions": 420000,
        "transactionCount": 22,
        "averageRate": 1.10,
        "trend": "stable",
        "previousPeriodTotal": 410000
      }
    ]
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getAgentLeaderboard()` |

---

## 8. Classement des super-agents — `GET /api/commissions/leaderboard/super-agents`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/leaderboard/super-agents` |
| **Description** | Récupère le classement des super-agents par commissions générées par leur équipe. |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Retour — Succès

```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "agentId": "SA-001",
        "agentName": "Alphonse Niyonzima",
        "totalCommissions": 1250000,
        "transactionCount": 72,
        "averageRate": 1.05,
        "trend": "up",
        "previousPeriodTotal": 1100000
      }
    ]
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getSuperAgentLeaderboard()` |

---

## 9. Hiérarchie des commissions — `GET /api/commissions/hierarchy`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/hierarchy` |
| **Description** | Récupère la structure hiérarchique des commissions (super-agent → agents → transactions). |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Retour — Succès

```json
{
  "success": true,
  "data": {
    "hierarchy": [
      {
        "superAgentId": "SA-001",
        "superAgentName": "Alphonse Niyonzima",
        "totalCommissions": 1250000,
        "agents": [
          {
            "agentId": "AGT-001",
            "agentName": "Jean-Pierre Hakizimana",
            "totalCommissions": 450000,
            "transactionCount": 28,
            "commissions": [
              {
                "commissionId": "COM-0001",
                "amount": 12500,
                "status": "CREDITED",
                "createdAt": "2026-07-15T14:30:00.000Z"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getAgentHierarchy()` |

---

## 10. Liste des agents (dropdown) — `GET /api/commissions/agents`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/agents` |
| **Description** | Récupère la liste des agents pour les menus déroulants de filtre. |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Retour — Succès

```json
{
  "success": true,
  "data": {
    "agents": [
      { "agentId": "AGT-001", "agentName": "Jean-Pierre Hakizimana" },
      { "agentId": "AGT-002", "agentName": "Marie-Claire Ndayishimiye" }
    ]
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getAgents()` |

---

## 11. Liste des super-agents (dropdown) — `GET /api/commissions/super-agents`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/super-agents` |
| **Description** | Récupère la liste des super-agents pour les menus déroulants de filtre. |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Retour — Succès

```json
{
  "success": true,
  "data": {
    "superAgents": [
      { "superAgentId": "SA-001", "superAgentName": "Alphonse Niyonzima" },
      { "superAgentId": "SA-002", "superAgentName": "Emmanuel Rwasa" }
    ]
  }
}
```

### Fichier à modifier

| Fichier | Méthode à remplacer |
|---------|---------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | `getSuperAgents()` |

---

## 12. Export des commissions — `GET /api/commissions/export`

| Champ        | Détail |
|-------------|--------|
| **URL**      | `GET /api/commissions/export` |
| **Description** | Exporte la liste des commissions aux formats CSV ou PDF. |
| **Headers**  | `Authorization: Bearer {access_token}` |

### Paramètres (Query)

| Nom    | Type   | Requis | Description               |
|--------|--------|--------|---------------------------|
| format | string | Oui    | `csv` ou `pdf`            |
| filters identiques à la liste | | | Mêmes query params que GET /api/commissions |

### Retour — Succès

```
Content-Type: text/csv (ou application/pdf)
Content-Disposition: attachment; filename="commissions_2026-07-23.csv"

Fichier CSV ou PDF contenant les données filtrées.
```

### Fichier à modifier

| Fichier | Méthode à ajouter |
|---------|-------------------|
| `src/app/modules/commissions/services/commission-mock.service.ts` | Ajouter `exportCommissions(format: string, filter?: CommissionFilter): Observable<Blob>` |

---

## Structure des fichiers du module Commissions

```
src/app/modules/commissions/
├── API_COMMISSIONS_INTEGRATION.md       ← Ce fichier (documentation)
├── services/
│   └── commission-mock.service.ts       ← SERVICE PRINCIPAL à modifier (12 méthodes)
├── data/
│   └── commission-mock.data.ts          ← Données mockées à supprimer (291 lignes)
├── models/
│   └── commission.model.ts              ← OK — Interfaces déjà définies
├── pages/
│   ├── commission-dashboard/            ← CommissionDashboardComponent (standalone)
│   │   ├── Utilise : getDashboardKpis(), getCommissionTrend(),
│   │   │             getTypeBreakdown(), getStatusBreakdown(),
│   │   │             getAgentLeaderboard(), getSuperAgentLeaderboard(),
│   │   │             getAgentHierarchy(), getAgents(), getSuperAgents()
│   │   └── Génère ses propres données via generateAllPersons() dans le TS
│   ├── commission-list/                 ← CommissionListComponent (standalone)
│   │   ├── Utilise : getFilteredCommissions(), getCommissionById(),
│   │   │             getAgents(), getSuperAgents()
│   │   └── Composant standalone avec filtres et pagination
│   ├── leaderboard/                     ← Composant de classement
│   └── hierarchy/                       ← Composant de hiérarchie
├── commissions-routing.module.ts        ← OK
└── commissions.module.ts                ← OK
```

---

## Notes importantes

### CommissionDashboardComponent
Le composant `commission-dashboard` (dans la branche `Blaze-commission/feature`) est **standalone** et génère ses propres données mockées dans son TypeScript via `generateAllPersons()`. Il utilise :
- La méthode `formatBif()` pour le formatage des montants
- Ses propres interfaces `Transaction`, `Person`, `PersonRow`
- Des données générées aléatoirement dans le constructeur

Pour l'intégration API, ce composant devra être modifié pour consommer les endpoints au lieu des données auto-générées.

### CommissionListComponent
Le composant `commission-list` est également **standalone** et utilise `CommissionMockService` directement. Il est le plus simple à migrer.

---

## Checklist d'implémentation

- [ ] 1. Remplacer `getFilteredCommissions()` — Appel GET `/api/commissions` avec query params
- [ ] 2. Remplacer `getCommissionById()` — Appel GET `/api/commissions/{id}`
- [ ] 3. Remplacer `getDashboardKpis()` — Appel GET `/api/commissions/kpis?viewRole=`
- [ ] 4. Remplacer `getCommissionTrend()` — Appel GET `/api/commissions/trend?days=`
- [ ] 5. Remplacer `getTypeBreakdown()` — Appel GET `/api/commissions/breakdown/type`
- [ ] 6. Remplacer `getStatusBreakdown()` — Appel GET `/api/commissions/breakdown/status`
- [ ] 7. Remplacer `getAgentLeaderboard()` — Appel GET `/api/commissions/leaderboard/agents`
- [ ] 8. Remplacer `getSuperAgentLeaderboard()` — Appel GET `/api/commissions/leaderboard/super-agents`
- [ ] 9. Remplacer `getAgentHierarchy()` — Appel GET `/api/commissions/hierarchy`
- [ ] 10. Remplacer `getAgents()` — Appel GET `/api/commissions/agents`
- [ ] 11. Remplacer `getSuperAgents()` — Appel GET `/api/commissions/super-agents`
- [ ] 12. Ajouter `exportCommissions()` — Appel GET `/api/commissions/export`
- [ ] 13. Adapter `CommissionDashboardComponent` pour utiliser l'API au lieu des données auto-générées
- [ ] 14. Supprimer le fichier `commission-mock.data.ts` (291 lignes)
- [ ] 15. Supprimer les méthodes obsolètes et importations inutilisées
- [ ] 16. Tester le flux complet : KPIs → liste filtrée → détail → export