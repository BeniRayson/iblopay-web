import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';


type OperationType =
  | 'TRANSFER'
  | 'DEPOSIT'
  | 'WITHDRAWAL'
  | 'PAYMENT'
  | 'MERCHANT_PAYMENT'
  | 'FUND';


type CommissionStatus =
  | 'SUCCESS'
  | 'PENDING'
  | 'FAILED';


type ActorRole =
  | 'AGENT'
  | 'SUPER_AGENT'
  | 'SHAREHOLDER'
  | 'COMPANY';


interface CommissionRecord {

  reference: string;

  date: Date;

  clientWallet: string;

  operationType: OperationType;

  transactionAmount: number;

  agentName: string;

  agentWallet: string;

  agentCommission: number;

  superAgentName: string;

  superAgentWallet: string;

  superAgentCommission: number;

  shareholderName: string;

  shareholderCode: string;

  shareholderCommission: number;

  companyName: string;

  companyCode: string;

  companyCommission: number;

  status: CommissionStatus;

}


interface CommissionFilters {

  dateFrom: string;

  dateTo: string;

  operationType: string;

  status: string;

  actorRole: string;

  actorSearch: string;

}


interface ActorSummary {

  role: ActorRole;

  roleLabel: string;

  identifier: string;

  name: string;

  initials: string;

  totalCommission: number;

  transactionCount: number;

}


@Component({

  selector:
    'app-commission-dashboard',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './commission-dashboard.component.html',

  styleUrls: [
    './commission-dashboard.component.scss'
  ]

})
export class CommissionDashboardComponent
  implements OnInit {


  /* =========================================================
     DONNEES
  ========================================================= */

  commissions:
    CommissionRecord[] = [];


  filteredCommissions:
    CommissionRecord[] = [];


  selectedCommission:
    CommissionRecord | null = null;


  actorHistory:
    ActorSummary | null = null;


  /* =========================================================
     FILTRES
  ========================================================= */

  filters:
    CommissionFilters = {

    dateFrom:
      '',

    dateTo:
      '',

    operationType:
      '',

    status:
      '',

    actorRole:
      '',

    actorSearch:
      ''

  };


  /* =========================================================
     PAGINATION
  ========================================================= */

  currentPage =
    1;


  pageSize =
    10;


  /* =========================================================
     INIT
  ========================================================= */

  ngOnInit(): void {

    this.commissions =
      this.createCommissionData();

    this.filteredCommissions = [
      ...this.commissions
    ];

  }


  /* =========================================================
     TOTALS
  ========================================================= */

  get totalAgentCommission():
    number {

    return this.filteredCommissions
      .reduce(
        (
          total,
          commission
        ) =>
          total +
          commission.agentCommission,
        0
      );

  }


  get totalSuperAgentCommission():
    number {

    return this.filteredCommissions
      .reduce(
        (
          total,
          commission
        ) =>
          total +
          commission.superAgentCommission,
        0
      );

  }


  get totalShareholderCommission():
    number {

    return this.filteredCommissions
      .reduce(
        (
          total,
          commission
        ) =>
          total +
          commission.shareholderCommission,
        0
      );

  }


  get totalCompanyCommission():
    number {

    return this.filteredCommissions
      .reduce(
        (
          total,
          commission
        ) =>
          total +
          commission.companyCommission,
        0
      );

  }


  get totalDistributedCommission():
    number {

    return (
      this.totalAgentCommission +
      this.totalSuperAgentCommission +
      this.totalShareholderCommission +
      this.totalCompanyCommission
    );

  }


  get totalFilteredTransactionsAmount():
    number {

    return this.filteredCommissions
      .reduce(
        (
          total,
          commission
        ) =>
          total +
          commission.transactionAmount,
        0
      );

  }


  /* =========================================================
     FILTRAGE
  ========================================================= */

  onActorRoleChange(): void {

    this.filters.actorSearch =
      '';

    this.applyFilters();

  }


  applyFilters(): void {

    const from =
      this.filters.dateFrom

        ? new Date(
            `${this.filters.dateFrom}T00:00:00`
          )

        : null;


    const to =
      this.filters.dateTo

        ? new Date(
            `${this.filters.dateTo}T23:59:59`
          )

        : null;


    const actorSearch =
      this.filters.actorSearch
        .trim()
        .toLowerCase();


    this.filteredCommissions =
      this.commissions.filter(
        commission => {


          if (
            from &&
            commission.date < from
          ) {

            return false;

          }


          if (
            to &&
            commission.date > to
          ) {

            return false;

          }


          if (
            this.filters.operationType &&
            commission.operationType !==
              this.filters.operationType
          ) {

            return false;

          }


          if (
            this.filters.status &&
            commission.status !==
              this.filters.status
          ) {

            return false;

          }


          if (
            this.filters.actorRole &&
            !this.matchesActorRole(
              commission,
              (this.filters.actorRole as ActorRole)
            )
          ) {

            return false;

          }


          if (
            actorSearch &&
            !this.matchesActorSearch(
              commission,
              actorSearch
            )
          ) {

            return false;

          }


          return true;

        }
      );


    this.currentPage =
      1;

  }


  resetFilters(): void {

    this.filters = {

      dateFrom:
        '',

      dateTo:
        '',

      operationType:
        '',

      status:
        '',

      actorRole:
        '',

      actorSearch:
        ''

    };


    this.filteredCommissions = [
      ...this.commissions
    ];


    this.currentPage =
      1;

  }


  private matchesActorRole(

    commission:
      CommissionRecord,

    role:
      ActorRole

  ): boolean {

    switch (role) {

      case 'AGENT':

        return !!commission.agentWallet;


      case 'SUPER_AGENT':

        return !!commission.superAgentWallet;


      case 'SHAREHOLDER':

        return !!commission.shareholderCode;


      case 'COMPANY':

        return !!commission.companyCode;


      default:

        return true;

    }

  }


  private matchesActorSearch(

    commission:
      CommissionRecord,

    search:
      string

  ): boolean {

    const role =
      (this.filters.actorRole as ActorRole | '');


    /*
     * Important :
     * le wallet client n'est volontairement
     * jamais utilisé pour ce filtre.
     */

    if (
      role === 'AGENT'
    ) {

      return this.containsAny(
        search,
        [
          commission.agentWallet,
          commission.agentName
        ]
      );

    }


    if (
      role === 'SUPER_AGENT'
    ) {

      return this.containsAny(
        search,
        [
          commission.superAgentWallet,
          commission.superAgentName
        ]
      );

    }


    if (
      role === 'SHAREHOLDER'
    ) {

      return this.containsAny(
        search,
        [
          commission.shareholderCode,
          commission.shareholderName
        ]
      );

    }


    if (
      role === 'COMPANY'
    ) {

      return this.containsAny(
        search,
        [
          commission.companyCode,
          commission.companyName
        ]
      );

    }


    /*
     * Si aucun rôle n'est sélectionné,
     * on cherche dans tous les acteurs
     * bénéficiaires sauf le client.
     */
    return this.containsAny(
      search,
      [
        commission.agentWallet,
        commission.agentName,
        commission.superAgentWallet,
        commission.superAgentName,
        commission.shareholderCode,
        commission.shareholderName,
        commission.companyCode,
        commission.companyName
      ]
    );

  }


  private containsAny(

    search:
      string,

    values:
      string[]

  ): boolean {

    return values.some(
      value =>
        String(value)
          .toLowerCase()
          .includes(search)
    );

  }


  /* =========================================================
     PAGINATION
  ========================================================= */

  get totalPages():
    number {

    return Math.max(
      1,
      Math.ceil(
        this.filteredCommissions.length /
        this.pageSize
      )
    );

  }


  get paginatedCommissions():
    CommissionRecord[] {

    const start =
      (
        this.currentPage - 1
      ) *
      this.pageSize;


    return this.filteredCommissions.slice(
      start,
      start + this.pageSize
    );

  }


  get startItem():
    number {

    if (
      this.filteredCommissions.length === 0
    ) {

      return 0;

    }


    return (
      (
        this.currentPage - 1
      ) *
      this.pageSize
    ) + 1;

  }


  get endItem():
    number {

    return Math.min(
      this.currentPage *
      this.pageSize,
      this.filteredCommissions.length
    );

  }


  get visiblePages():
    number[] {

    const max =
      5;


    let start =
      Math.max(
        1,
        this.currentPage - 2
      );


    let end =
      Math.min(
        this.totalPages,
        start + max - 1
      );


    if (
      end - start + 1 <
      max
    ) {

      start =
        Math.max(
          1,
          end - max + 1
        );

    }


    return Array.from(
      {
        length:
          end - start + 1
      },
      (
        _,
        index
      ) =>
        start + index
    );

  }


  goToPage(
    page:
      number
  ): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {

      return;

    }


    this.currentPage =
      page;

  }


  /* =========================================================
     DETAIL COMMISSION
  ========================================================= */

  openCommissionDetail(
    commission:
      CommissionRecord
  ): void {

    this.selectedCommission =
      commission;

  }


  closeCommissionDetail(): void {

    this.selectedCommission =
      null;

  }


  getCommissionTotal(
    commission:
      CommissionRecord
  ): number {

    return (
      commission.agentCommission +
      commission.superAgentCommission +
      commission.shareholderCommission +
      commission.companyCommission
    );

  }


  printCommission(
    commission:
      CommissionRecord
  ): void {

    const rows =
      [

        [
          'Référence transaction',
          commission.reference
        ],

        [
          'Date',
          this.formatDateTime(
            commission.date
          )
        ],

        [
          'Wallet client',
          commission.clientWallet
        ],

        [
          'Type opération',
          this.getOperationLabel(
            commission.operationType
          )
        ],

        [
          'Montant transaction',
          this.formatBif(
            commission.transactionAmount
          )
        ],

        [
          'Agent',
          `${commission.agentName} (${commission.agentWallet})`
        ],

        [
          'Commission Agent',
          this.formatBif(
            commission.agentCommission
          )
        ],

        [
          'Super-Agent',
          `${commission.superAgentName} (${commission.superAgentWallet})`
        ],

        [
          'Part Super-Agent',
          this.formatBif(
            commission.superAgentCommission
          )
        ],

        [
          'Actionnaire / Pool',
          `${commission.shareholderName} (${commission.shareholderCode})`
        ],

        [
          'Part Actionnaires',
          this.formatBif(
            commission.shareholderCommission
          )
        ],

        [
          'Société',
          `${commission.companyName} (${commission.companyCode})`
        ],

        [
          'Part Société',
          this.formatBif(
            commission.companyCommission
          )
        ],

        [
          'Total commissions',
          this.formatBif(
            this.getCommissionTotal(
              commission
            )
          )
        ],

        [
          'Statut',
          this.getStatusLabel(
            commission.status
          )
        ]

      ];


    this.openPrintWindow(
      `Commission ${commission.reference}`,
      'Détail de la commission',
      rows
    );

  }


  /* =========================================================
     HISTORIQUE ACTEUR
  ========================================================= */

  get actorSummaries():
    ActorSummary[] {

    const map =
      new Map<
        string,
        ActorSummary
      >();


    for (
      const commission
      of this.filteredCommissions
    ) {

      this.accumulateActor(
        map,
        'AGENT',
        commission.agentWallet,
        commission.agentName,
        commission.agentCommission
      );


      this.accumulateActor(
        map,
        'SUPER_AGENT',
        commission.superAgentWallet,
        commission.superAgentName,
        commission.superAgentCommission
      );


      this.accumulateActor(
        map,
        'SHAREHOLDER',
        commission.shareholderCode,
        commission.shareholderName,
        commission.shareholderCommission
      );


      this.accumulateActor(
        map,
        'COMPANY',
        commission.companyCode,
        commission.companyName,
        commission.companyCommission
      );

    }


    return Array.from(
      map.values()
    )
      .sort(
        (
          a,
          b
        ) =>
          b.totalCommission -
          a.totalCommission
      );

  }


  get topActors():
    ActorSummary[] {

    return this.actorSummaries.slice(
      0,
      6
    );

  }


  get selectedActorSummary():
    ActorSummary | null {

    const search =
      this.filters.actorSearch
        .trim()
        .toLowerCase();


    if (!search) {

      return null;

    }


    return (
      this.actorSummaries.find(
        actor =>
          actor.identifier
            .toLowerCase()
            .includes(search) ||
          actor.name
            .toLowerCase()
            .includes(search)
      ) ??
      null
    );

  }


  private accumulateActor(

    map:
      Map<
        string,
        ActorSummary
      >,

    role:
      ActorRole,

    identifier:
      string,

    name:
      string,

    amount:
      number

  ): void {

    const key =
      `${role}-${identifier}`;


    const existing =
      map.get(key);


    if (existing) {

      existing.totalCommission +=
        amount;

      existing.transactionCount +=
        1;

      return;

    }


    map.set(
      key,
      {

        role,

        roleLabel:
          this.getActorRoleLabel(
            role
          ),

        identifier,

        name,

        initials:
          this.getInitials(
            name
          ),

        totalCommission:
          amount,

        transactionCount:
          1

      }
    );

  }


  selectActor(
    actor:
      ActorSummary
  ): void {

    this.filters.actorRole =
      actor.role;

    this.filters.actorSearch =
      actor.identifier;

    this.applyFilters();

    this.openActorHistory(
      actor
    );

  }


  openActorHistory(
    actor:
      ActorSummary
  ): void {

    this.actorHistory =
      actor;

  }


  closeActorHistory(): void {

    this.actorHistory =
      null;

  }


  get actorHistoryCommissions():
    CommissionRecord[] {

    if (
      !this.actorHistory
    ) {

      return [];

    }


    return this.commissions.filter(
      commission =>
        this.commissionBelongsToActor(
          commission,
          this.actorHistory!
        )
    );

  }


  get actorHistoryTotal():
    number {

    if (
      !this.actorHistory
    ) {

      return 0;

    }


    return this.actorHistoryCommissions
      .reduce(
        (
          total,
          commission
        ) =>
          total +
          this.getActorCommission(
            commission,
            this.actorHistory!.role
          ),
        0
      );

  }


  private commissionBelongsToActor(

    commission:
      CommissionRecord,

    actor:
      ActorSummary

  ): boolean {

    switch (
      actor.role
    ) {

      case 'AGENT':

        return (
          commission.agentWallet ===
          actor.identifier
        );


      case 'SUPER_AGENT':

        return (
          commission.superAgentWallet ===
          actor.identifier
        );


      case 'SHAREHOLDER':

        return (
          commission.shareholderCode ===
          actor.identifier
        );


      case 'COMPANY':

        return (
          commission.companyCode ===
          actor.identifier
        );

    }

  }


  getActorCommission(

    commission:
      CommissionRecord,

    role:
      ActorRole

  ): number {

    switch (
      role
    ) {

      case 'AGENT':

        return commission.agentCommission;


      case 'SUPER_AGENT':

        return commission.superAgentCommission;


      case 'SHAREHOLDER':

        return commission.shareholderCommission;


      case 'COMPANY':

        return commission.companyCommission;

    }

  }


  exportActorHistoryCsv(): void {

    if (
      !this.actorHistory
    ) {

      return;

    }


    const actor =
      this.actorHistory;


    const rows =
      this.actorHistoryCommissions.map(
        commission => [

          commission.reference,

          this.formatDateTime(
            commission.date
          ),

          commission.clientWallet,

          this.getOperationLabel(
            commission.operationType
          ),

          commission.transactionAmount,

          this.getActorCommission(
            commission,
            actor.role
          )

        ]
      );


    this.downloadCsv(
      `historique-${actor.role}-${actor.identifier}.csv`,
      [
        'Reference',
        'Date',
        'Wallet client',
        'Operation',
        'Montant transaction',
        'Commission acteur'
      ],
      rows
    );

  }


  printActorHistory(): void {

    if (
      !this.actorHistory
    ) {

      return;

    }


    const actor =
      this.actorHistory;


    const rows =
      this.actorHistoryCommissions
        .map(
          commission => [

            commission.reference,

            this.formatDateTime(
              commission.date
            ),

            commission.clientWallet,

            this.getOperationLabel(
              commission.operationType
            ),

            this.formatBif(
              commission.transactionAmount
            ),

            this.formatBif(
              this.getActorCommission(
                commission,
                actor.role
              )
            )

          ]
        );


    this.openPrintTable(
      `Historique ${actor.name}`,
      `${actor.roleLabel} · ${actor.identifier}`,
      [
        'Référence',
        'Date',
        'Wallet client',
        'Opération',
        'Montant transaction',
        'Commission acteur'
      ],
      rows
    );

  }


  /* =========================================================
     EXPORT GLOBAL
  ========================================================= */

  exportFilteredCsv(): void {

    const rows =
      this.filteredCommissions.map(
        commission => [

          commission.reference,

          this.formatDateTime(
            commission.date
          ),

          commission.clientWallet,

          this.getOperationLabel(
            commission.operationType
          ),

          commission.transactionAmount,

          commission.agentWallet,

          commission.agentCommission,

          commission.superAgentWallet,

          commission.superAgentCommission,

          commission.shareholderCode,

          commission.shareholderCommission,

          commission.companyCode,

          commission.companyCommission,

          this.getStatusLabel(
            commission.status
          )

        ]
      );


    this.downloadCsv(
      'commissions-iblopay.csv',
      [
        'Reference transaction',
        'Date',
        'Wallet client',
        'Operation',
        'Montant transaction',
        'Wallet agent',
        'Commission agent',
        'Wallet super-agent',
        'Part super-agent',
        'Code actionnaire',
        'Part actionnaires',
        'Code societe',
        'Part societe',
        'Statut'
      ],
      rows
    );

  }


  printFilteredHistory(): void {

    const rows =
      this.filteredCommissions
        .map(
          commission => [

            commission.reference,

            commission.clientWallet,

            this.getOperationLabel(
              commission.operationType
            ),

            this.formatBif(
              commission.transactionAmount
            ),

            this.formatBif(
              commission.agentCommission
            ),

            this.formatBif(
              commission.superAgentCommission
            ),

            this.formatBif(
              commission.shareholderCommission
            ),

            this.formatBif(
              commission.companyCommission
            ),

            this.getStatusLabel(
              commission.status
            )

          ]
        );


    this.openPrintTable(
      'Traçabilité des commissions',
      `${this.filteredCommissions.length} transaction(s)`,
      [
        'Référence',
        'Wallet client',
        'Opération',
        'Montant',
        'Agent',
        'Super-Agent',
        'Actionnaires',
        'Société',
        'Statut'
      ],
      rows
    );

  }


  /* =========================================================
     HELPERS UI
  ========================================================= */

  getDistributionPercent(
    value:
      number
  ): string {

    if (
      this.totalDistributedCommission <=
      0
    ) {

      return '0.0';

    }


    return (
      (
        value /
        this.totalDistributedCommission
      ) *
      100
    ).toFixed(
      1
    );

  }


  getOperationLabel(
    operation:
      OperationType
  ): string {

    const labels:
      Record<
        OperationType,
        string
      > = {

      TRANSFER:
        'Transfert',

      DEPOSIT:
        'Dépôt',

      WITHDRAWAL:
        'Retrait',

      PAYMENT:
        'Paiement',

      MERCHANT_PAYMENT:
        'Paiement marchand',

      FUND:
        'Approvisionnement'

    };


    return labels[operation];

  }


  getOperationIcon(
    operation:
      OperationType
  ): string {

    const icons:
      Record<
        OperationType,
        string
      > = {

      TRANSFER:
        'fas fa-arrow-right-arrow-left',

      DEPOSIT:
        'fas fa-arrow-down',

      WITHDRAWAL:
        'fas fa-arrow-up',

      PAYMENT:
        'fas fa-wallet',

      MERCHANT_PAYMENT:
        'fas fa-store',

      FUND:
        'fas fa-plus'

    };


    return icons[operation];

  }


  getOperationClass(
    operation:
      OperationType
  ): string {

    return (
      `operation--${operation
        .toLowerCase()
        .replace(
          '_',
          '-'
        )}`
    );

  }


  getStatusLabel(
    status:
      CommissionStatus
  ): string {

    const labels:
      Record<
        CommissionStatus,
        string
      > = {

      SUCCESS:
        'Succès',

      PENDING:
        'En cours',

      FAILED:
        'Échec'

    };


    return labels[status];

  }


  getStatusClass(
    status:
      CommissionStatus
  ): string {

    const classes:
      Record<
        CommissionStatus,
        string
      > = {

      SUCCESS:
        'status-pill--success',

      PENDING:
        'status-pill--pending',

      FAILED:
        'status-pill--failed'

    };


    return classes[status];

  }


  getActorRoleLabel(
    role:
      ActorRole
  ): string {

    const labels:
      Record<
        ActorRole,
        string
      > = {

      AGENT:
        'Agent',

      SUPER_AGENT:
        'Super-Agent',

      SHAREHOLDER:
        'Actionnaire',

      COMPANY:
        'Société'

    };


    return labels[role];

  }


  getActorClass(
    role:
      ActorRole
  ): string {

    return (
      `actor-avatar--${role
        .toLowerCase()
        .replace(
          '_',
          '-'
        )}`
    );

  }


  getInitials(
    name:
      string
  ): string {

    return name
      .split(
        /\s+/
      )
      .filter(
        Boolean
      )
      .slice(
        0,
        2
      )
      .map(
        part =>
          part
            .charAt(0)
            .toUpperCase()
      )
      .join('');

  }


  formatBif(
    amount:
      number
  ): string {

    return (
      new Intl.NumberFormat(
        'fr-FR',
        {
          maximumFractionDigits:
            0
        }
      ).format(
        amount
      ) +
      ' BIF'
    );

  }


  formatDateTime(
    date:
      Date
  ): string {

    return new Intl.DateTimeFormat(
      'fr-FR',
      {

        day:
          '2-digit',

        month:
          '2-digit',

        year:
          'numeric',

        hour:
          '2-digit',

        minute:
          '2-digit'

      }
    ).format(
      date
    );

  }


  trackByCommission(

    _:
      number,

    commission:
      CommissionRecord

  ): string {

    return commission.reference;

  }


  /* =========================================================
     PRINT / CSV
  ========================================================= */

  private downloadCsv(

    filename:
      string,

    headers:
      string[],

    rows:
      Array<
        Array<
          string | number
        >
      >

  ): void {

    const csv =
      [

        headers.join(
          ';'
        ),

        ...rows.map(
          row =>
            row.map(
              value =>
                `"${String(value)
                  .replace(
                    /"/g,
                    '""'
                  )}"`
            )
            .join(
              ';'
            )
        )

      ].join(
        '\n'
      );


    const blob =
      new Blob(
        [
          '\uFEFF',
          csv
        ],
        {
          type:
            'text/csv;charset=utf-8;'
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        'a'
      );


    link.href =
      url;

    link.download =
      filename;

    link.click();


    URL.revokeObjectURL(
      url
    );

  }


  private openPrintWindow(

    title:
      string,

    heading:
      string,

    rows:
      string[][]

  ): void {

    const popup =
      window.open(
        '',
        '_blank',
        'width=900,height=700'
      );


    if (!popup) {

      return;

    }


    const bodyRows =
      rows.map(
        row =>
          `
            <tr>
              <td>${this.escapeHtml(row[0] ?? '')}</td>
              <td>${this.escapeHtml(row[1] ?? '')}</td>
            </tr>
          `
      ).join('');


    popup.document.write(
      `
        <!doctype html>
        <html lang="fr">
          <head>
            <meta charset="utf-8">
            <title>${this.escapeHtml(title)}</title>

            <style>
              body{
                font-family:Arial,sans-serif;
                color:#172554;
                padding:30px
              }

              h1{
                font-size:21px;
                margin:0 0 20px
              }

              table{
                width:100%;
                border-collapse:collapse
              }

              td{
                padding:10px;
                border-bottom:1px solid #e2e8f0
              }

              td:first-child{
                width:36%;
                color:#64748b
              }

              td:last-child{
                font-weight:700
              }
            </style>
          </head>

          <body>
            <h1>${this.escapeHtml(heading)}</h1>
            <table>${bodyRows}</table>

            <script>
              window.onload=function(){
                window.print();
              };
            <\/script>
          </body>
        </html>
      `
    );


    popup.document.close();

  }


  private openPrintTable(

    title:
      string,

    subtitle:
      string,

    headers:
      string[],

    rows:
      string[][]

  ): void {

    const popup =
      window.open(
        '',
        '_blank',
        'width=1200,height=800'
      );


    if (!popup) {

      return;

    }


    const headerHtml =
      headers.map(
        header =>
          `<th>${this.escapeHtml(header)}</th>`
      ).join('');


    const rowsHtml =
      rows.map(
        row =>
          `
            <tr>
              ${row.map(
                value =>
                  `<td>${this.escapeHtml(value)}</td>`
              ).join('')}
            </tr>
          `
      ).join('');


    popup.document.write(
      `
        <!doctype html>
        <html lang="fr">
          <head>
            <meta charset="utf-8">
            <title>${this.escapeHtml(title)}</title>

            <style>
              body{
                font-family:Arial,sans-serif;
                color:#172554;
                padding:24px
              }

              h1{
                margin:0;
                font-size:20px
              }

              p{
                color:#64748b;
                margin:5px 0 18px
              }

              table{
                width:100%;
                border-collapse:collapse;
                font-size:10px
              }

              th,
              td{
                padding:7px;
                border:1px solid #e2e8f0;
                text-align:left
              }

              th{
                background:#f8fafc
              }
            </style>
          </head>

          <body>
            <h1>${this.escapeHtml(title)}</h1>
            <p>${this.escapeHtml(subtitle)}</p>

            <table>
              <thead>
                <tr>${headerHtml}</tr>
              </thead>
              <tbody>${rowsHtml}</tbody>
            </table>

            <script>
              window.onload=function(){
                window.print();
              };
            <\/script>
          </body>
        </html>
      `
    );


    popup.document.close();

  }


  private escapeHtml(
    value:
      string
  ): string {

    return String(value)
      .replace(
        /&/g,
        '&amp;'
      )
      .replace(
        /</g,
        '&lt;'
      )
      .replace(
        />/g,
        '&gt;'
      )
      .replace(
        /"/g,
        '&quot;'
      )
      .replace(
        /'/g,
        '&#039;'
      );

  }


  /* =========================================================
     DONNEES DEMO
  ========================================================= */

  private createCommissionData():
    CommissionRecord[] {

    const agents =
      [

        {
          name:
            'Jean HAKIZIMANA',
          wallet:
            'AGT-79001122'
        },

        {
          name:
            'Marie NDAYISHIMIYE',
          wallet:
            'AGT-79003344'
        },

        {
          name:
            'Pierre CIZA',
          wallet:
            'AGT-79005566'
        },

        {
          name:
            'Anastasie HABIMANA',
          wallet:
            'AGT-79007788'
        }

      ];


    const superAgents =
      [

        {
          name:
            'Alphonse NIYONZIMA',
          wallet:
            'SA-78001111'
        },

        {
          name:
            'Emmanuel RWASA',
          wallet:
            'SA-78002222'
        }

      ];


    const shareholders =
      [

        {
          name:
            'Pool Actionnaires A',
          code:
            'ACT-001'
        },

        {
          name:
            'Pool Actionnaires B',
          code:
            'ACT-002'
        }

      ];


    const company =
      {

        name:
          'IBLOPay S.A.',

        code:
          'IBLOPAY-SA'

      };


    const operations:
      OperationType[] =
      [

        'TRANSFER',

        'DEPOSIT',

        'WITHDRAWAL',

        'PAYMENT',

        'MERCHANT_PAYMENT',

        'FUND'

      ];


    const amounts =
      [

        50000,

        75000,

        100000,

        125000,

        150000,

        200000,

        250000,

        300000,

        500000

      ];


    const records:
      CommissionRecord[] =
      [];


    for (
      let index = 1;
      index <= 68;
      index++
    ) {

      const agent =
        agents[
          index %
          agents.length
        ];


      const superAgent =
        superAgents[
          index %
          superAgents.length
        ];


      const shareholder =
        shareholders[
          index %
          shareholders.length
        ];


      const transactionAmount =
        amounts[
          index %
          amounts.length
        ];


      /*
       * Exemple de commission globale :
       * 5 % de la transaction.
       *
       * Répartition :
       * Agent        25 %
       * Super-Agent  12,5 %
       * Actionnaires 7,5 %
       * Société      55 %
       *
       * Ces taux sont des données de démonstration
       * et peuvent être remplacés par les vrais taux.
       */
      const totalCommission =
        Math.round(
          transactionAmount *
          0.05
        );


      const agentCommission =
        Math.round(
          totalCommission *
          0.25
        );


      const superAgentCommission =
        Math.round(
          totalCommission *
          0.125
        );


      const shareholderCommission =
        Math.round(
          totalCommission *
          0.075
        );


      const companyCommission =
        (
          totalCommission -
          agentCommission -
          superAgentCommission -
          shareholderCommission
        );


      const status:
        CommissionStatus =
        index % 13 === 0

          ? 'FAILED'

          : index % 9 === 0

            ? 'PENDING'

            : 'SUCCESS';


      const date =
        new Date(
          2026,
          8,
          29 -
          Math.floor(
            index / 7
          ),
          6 +
          (
            index %
            12
          ),
          (
            index *
            7
          ) %
          60
        );


      records.push(
        {

          reference:
            `TXN-202609-${String(index).padStart(5, '0')}`,

          date,

          clientWallet:
            `2577${String(
              1000000 +
              index *
              7919
            ).slice(-7)}`,

          operationType:
            operations[
              index %
              operations.length
            ],

          transactionAmount,

          agentName:
            agent.name,

          agentWallet:
            agent.wallet,

          agentCommission,

          superAgentName:
            superAgent.name,

          superAgentWallet:
            superAgent.wallet,

          superAgentCommission,

          shareholderName:
            shareholder.name,

          shareholderCode:
            shareholder.code,

          shareholderCommission,

          companyName:
            company.name,

          companyCode:
            company.code,

          companyCommission,

          status

        }
      );

    }


    return records.sort(
      (
        a,
        b
      ) =>
        b.date.getTime() -
        a.date.getTime()
    );

  }

}
