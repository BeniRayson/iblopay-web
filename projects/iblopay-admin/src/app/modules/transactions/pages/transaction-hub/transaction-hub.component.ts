import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  interval,
  Subscription
} from 'rxjs';


type TransactionType =
  | 'TRANSFER'
  | 'DEPOSIT'
  | 'WITHDRAWAL'
  | 'PAYMENT'
  | 'COMMISSION'
  | 'REFUND'
  | 'FUND'
  | 'MERCHANT_PAYMENT';


type TransactionStatus =
  | 'SUCCESS'
  | 'PENDING'
  | 'PROCESSING'
  | 'FAILED';


type PaymentMode =
  | 'WALLET'
  | 'CARD'
  | 'MOBILE_MONEY'
  | 'BANK';


interface TransactionRow {

  reference: string;

  transactionId: string;

  type: TransactionType;

  senderName: string;

  senderPhone: string;

  receiverName: string;

  receiverPhone: string;

  amount: number;

  currency: string;

  date: Date;

  status: TransactionStatus;

  paymentMode: PaymentMode;

  fee: number;

  description: string;

  externalReference?: string;

}


interface TransactionFilters {

  dateFrom: string;

  dateTo: string;

  type: string;

  status: string;

  paymentMode: string;

}


@Component({

  selector: 'app-transaction-hub',

  templateUrl: './transaction-hub.component.html',

  styleUrls: [
    './transaction-hub.component.scss'
  ]

})
export class TransactionHubComponent
  implements OnInit, OnDestroy {


  /* =========================================================
     DONNEES PRINCIPALES
  ========================================================= */

  transactions: TransactionRow[] = [];

  filteredTransactions: TransactionRow[] = [];

  selectedTransaction: TransactionRow | null = null;


  /* =========================================================
     PAGINATION
  ========================================================= */

  currentPage = 1;

  pageSize = 10;


  /* =========================================================
     FILTRES

     Les dates sont volontairement vides au démarrage.
     Ainsi les nouvelles transactions générées en temps réel
     restent immédiatement visibles.
  ========================================================= */

  filters: TransactionFilters = {

    dateFrom: '',

    dateTo: '',

    type: '',

    status: '',

    paymentMode: ''

  };


  /* =========================================================
     KPI
  ========================================================= */

  totalTransactions = 1482;

  successfulTransactions = 1230;

  pendingTransactions = 158;

  failedTransactions = 94;


  /* =========================================================
     TEMPS REEL
  ========================================================= */

  private liveSubscription?: Subscription;

  private readonly LIVE_REFRESH_MS = 7000;


  /* =========================================================
     INITIALISATION
  ========================================================= */

  ngOnInit(): void {

    this.transactions =
      this.createDemoTransactions();

    this.filteredTransactions = [
      ...this.transactions
    ];

    this.selectedTransaction =
      this.transactions[0] ?? null;


    /*
     * Toutes les 7 secondes, une nouvelle transaction
     * est créée et ajoutée en première ligne du tableau.
     */
    this.liveSubscription =
      interval(
        this.LIVE_REFRESH_MS
      ).subscribe(() => {

        this.simulateRealtimeUpdate();

      });

  }


  ngOnDestroy(): void {

    this.liveSubscription?.unsubscribe();

  }


  /* =========================================================
     FILTRES
  ========================================================= */

  updateFilter(

    key: keyof TransactionFilters,

    value: string

  ): void {

    this.filters = {

      ...this.filters,

      [key]: value

    };

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


    this.filteredTransactions =
      this.transactions.filter(
        transaction => {


          if (
            from &&
            transaction.date < from
          ) {

            return false;

          }


          if (
            to &&
            transaction.date > to
          ) {

            return false;

          }


          if (
            this.filters.type &&
            transaction.type !==
              this.filters.type
          ) {

            return false;

          }


          if (
            this.filters.status &&
            transaction.status !==
              this.filters.status
          ) {

            return false;

          }


          if (
            this.filters.paymentMode &&
            transaction.paymentMode !==
              this.filters.paymentMode
          ) {

            return false;

          }


          return true;

        }
      );


    /*
     * Lorsqu'un filtre est appliqué,
     * on revient à la première page.
     */
    this.currentPage = 1;


    /*
     * Si la transaction actuellement ouverte
     * n'existe plus dans la liste filtrée,
     * on sélectionne la première transaction visible.
     */
    if (
      this.selectedTransaction &&
      !this.filteredTransactions.includes(
        this.selectedTransaction
      )
    ) {

      this.selectedTransaction =
        this.filteredTransactions[0] ??
        null;

    }

  }


  resetFilters(): void {

    this.filters = {

      dateFrom: '',

      dateTo: '',

      type: '',

      status: '',

      paymentMode: ''

    };


    this.filteredTransactions = [
      ...this.transactions
    ];


    this.currentPage = 1;

  }


  getInputValue(
    event: Event
  ): string {

    const target =
      event.target as
        | HTMLInputElement
        | HTMLSelectElement;


    return target?.value ?? '';

  }


  /* =========================================================
     PAGINATION
  ========================================================= */

  get totalPages(): number {

    return Math.max(

      1,

      Math.ceil(

        this.filteredTransactions.length /

        this.pageSize

      )

    );

  }


  get paginatedTransactions():
    TransactionRow[] {

    const start =

      (this.currentPage - 1) *

      this.pageSize;


    return this.filteredTransactions.slice(

      start,

      start + this.pageSize

    );

  }


  get startItem(): number {

    if (
      this.filteredTransactions.length === 0
    ) {

      return 0;

    }


    return (

      (this.currentPage - 1) *

      this.pageSize

    ) + 1;

  }


  get endItem(): number {

    return Math.min(

      this.currentPage *
      this.pageSize,

      this.filteredTransactions.length

    );

  }


  get visiblePages(): number[] {

    const pages: number[] = [];

    const maxVisible = 5;


    let start = Math.max(

      1,

      this.currentPage - 2

    );


    let end = Math.min(

      this.totalPages,

      start + maxVisible - 1

    );


    if (
      end - start + 1 <
      maxVisible
    ) {

      start = Math.max(

        1,

        end - maxVisible + 1

      );

    }


    for (
      let page = start;
      page <= end;
      page++
    ) {

      pages.push(page);

    }


    return pages;

  }


  goToPage(
    page: number
  ): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {

      return;

    }


    this.currentPage = page;

  }


  changePageSize(
    value: string
  ): void {

    const size =
      Number(value);


    this.pageSize =

      Number.isFinite(size) &&
      size > 0

        ? size

        : 10;


    this.currentPage = 1;

  }


  /* =========================================================
     DETAILS
  ========================================================= */

  openDetails(
    transaction: TransactionRow
  ): void {

    this.selectedTransaction =
      transaction;

  }


  closeDetails(): void {

    this.selectedTransaction =
      null;

  }


  /* =========================================================
     TEMPS REEL
  ========================================================= */

  refreshNow(): void {

    /*
     * Le bouton Actualiser crée également
     * une transaction immédiatement.
     */
    this.simulateRealtimeUpdate();

  }


  private simulateRealtimeUpdate(): void {

    const now =
      new Date();


    const nextNumber =
      this.totalTransactions + 1;


    const types: TransactionType[] = [

      'TRANSFER',

      'DEPOSIT',

      'WITHDRAWAL',

      'PAYMENT',

      'COMMISSION',

      'REFUND',

      'FUND',

      'MERCHANT_PAYMENT'

    ];


    const statuses: TransactionStatus[] = [

      'SUCCESS',

      'SUCCESS',

      'SUCCESS',

      'SUCCESS',

      'PENDING',

      'PROCESSING',

      'FAILED'

    ];


    const paymentModes: PaymentMode[] = [

      'WALLET',

      'WALLET',

      'WALLET',

      'MOBILE_MONEY',

      'CARD',

      'BANK'

    ];


    const type =
      this.randomItem(types);


    const status =
      this.randomItem(statuses);


    const paymentMode =
      this.randomItem(paymentModes);


    const newTransaction:
      TransactionRow = {

      reference:
        this.buildReference(
          now,
          nextNumber
        ),

      transactionId:
        `TRX${Date.now()}`,

      type,

      senderName:
        this.randomSender(),

      senderPhone:
        this.randomPhone(),

      receiverName:
        this.randomReceiver(),

      receiverPhone:
        this.randomPhone(),

      amount:
        this.randomAmount(),

      currency:
        'BIF',

      date:
        now,

      status,

      paymentMode,

      fee:
        this.calculateFee(type),

      description:
        this.getTransactionDescription(
          type
        ),

      externalReference:
        this.randomExternalReference()

    };


    /*
     * Nouvelle transaction en première position.
     * La liste change donc visuellement.
     */
    this.transactions = [

      newTransaction,

      ...this.transactions

    ];


    /*
     * On réapplique les filtres actuels.
     * Si aucun filtre n'est actif,
     * la nouvelle ligne est visible directement.
     */
    this.refreshFilteredTransactions();


    /*
     * Si l'utilisateur est sur une autre page,
     * on ne le force pas à revenir à la page 1.
     *
     * Mais s'il est déjà à la première page,
     * la nouvelle transaction apparaît en haut.
     */


    /*
     * Mise à jour des KPI.
     */
    this.totalTransactions += 1;


    if (
      status === 'SUCCESS'
    ) {

      this.successfulTransactions += 1;

    }


    if (
      status === 'PENDING'
    ) {

      this.pendingTransactions += 1;

    }


    if (
      status === 'FAILED'
    ) {

      this.failedTransactions += 1;

    }

  }


  /*
   * Variante de applyFilters qui ne remet PAS
   * la pagination à la page 1.
   *
   * Cette méthode est utilisée pendant les mises
   * à jour en temps réel.
   */
  private refreshFilteredTransactions(): void {

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


    this.filteredTransactions =
      this.transactions.filter(
        transaction => {


          if (
            from &&
            transaction.date < from
          ) {

            return false;

          }


          if (
            to &&
            transaction.date > to
          ) {

            return false;

          }


          if (
            this.filters.type &&
            transaction.type !==
              this.filters.type
          ) {

            return false;

          }


          if (
            this.filters.status &&
            transaction.status !==
              this.filters.status
          ) {

            return false;

          }


          if (
            this.filters.paymentMode &&
            transaction.paymentMode !==
              this.filters.paymentMode
          ) {

            return false;

          }


          return true;

        }
      );


    /*
     * Evite d'être positionné sur une page
     * qui n'existe plus après filtrage.
     */
    if (
      this.currentPage >
      this.totalPages
    ) {

      this.currentPage =
        this.totalPages;

    }

  }


  /* =========================================================
     GENERATEURS TEMPS REEL
  ========================================================= */

  private randomSender(): string {

    const senders = [

      'Jean NDAYISHIMIYE',

      'Marie UWIMANA',

      'Pierre HABIMANA',

      'Alice MUYANGO',

      'Paul NTAKARUTIMANA',

      'Agent KAMENGE',

      'Agent GITEGA',

      'Agent NGOZI',

      'Agent KAYANZA',

      'Client IBLOPay'

    ];


    return this.randomItem(
      senders
    );

  }


  private randomReceiver(): string {

    const receivers = [

      'Marie UWIMANA',

      'Paul NTAKARUTIMANA',

      'Alice MUYANGO',

      'Jean NDAYISHIMIYE',

      'Shop Express',

      'Super Market',

      'Agent KAMENGE',

      'Agent GITEGA',

      'IBLOPay',

      'Marchand Bujumbura'

    ];


    return this.randomItem(
      receivers
    );

  }


  private randomPhone(): string {

    const prefixes = [

      '61',

      '62',

      '68',

      '69',

      '71',

      '72',

      '75',

      '76',

      '79'

    ];


    const prefix =
      this.randomItem(
        prefixes
      );


    const digits =
      String(
        Math.floor(
          100000 +
          Math.random() *
          900000
        )
      ).padStart(
        6,
        '0'
      );


    return (

      `+257 ${prefix} ` +

      `${digits.substring(0, 2)} ` +

      `${digits.substring(2, 4)} ` +

      `${digits.substring(4, 6)}`

    );

  }


  private randomAmount(): number {

    const amounts = [

      5000,

      10000,

      12000,

      15000,

      20000,

      25000,

      30000,

      40000,

      50000,

      75000,

      100000,

      150000,

      250000,

      300000,

      500000

    ];


    return this.randomItem(
      amounts
    );

  }


  private randomExternalReference():
    string {

    /*
     * Certaines transactions n'ont pas
     * de référence externe.
     */
    if (
      Math.random() < 0.45
    ) {

      return '';

    }


    return (
      'EXT-' +
      Math.floor(
        10000000 +
        Math.random() *
        90000000
      )
    );

  }


  private calculateFee(
    type: TransactionType
  ): number {

    if (
      type === 'WITHDRAWAL'
    ) {

      return 1500;

    }


    if (
      type === 'TRANSFER'
    ) {

      return 500;

    }


    return 0;

  }


  private getTransactionDescription(
    type: TransactionType
  ): string {

    const descriptions:
      Record<
        TransactionType,
        string
      > = {

      TRANSFER:
        'Transfert vers un autre utilisateur',

      DEPOSIT:
        'Dépôt sur wallet client',

      WITHDRAWAL:
        'Retrait depuis le wallet',

      PAYMENT:
        'Paiement de service',

      COMMISSION:
        'Commission de transaction',

      REFUND:
        'Remboursement client',

      FUND:
        'Approvisionnement de compte',

      MERCHANT_PAYMENT:
        'Paiement chez un marchand'

    };


    return descriptions[type];

  }


  private buildReference(

    date: Date,

    sequence: number

  ): string {

    const year =
      date.getFullYear();


    const month =
      String(
        date.getMonth() + 1
      ).padStart(
        2,
        '0'
      );


    const day =
      String(
        date.getDate()
      ).padStart(
        2,
        '0'
      );


    const suffix =
      String(sequence)
        .padStart(
          6,
          '0'
        )
        .slice(-6);


    return (
      `TXN-${year}${month}${day}-${suffix}`
    );

  }


  private randomItem<T>(
    items: T[]
  ): T {

    return items[
      Math.floor(
        Math.random() *
        items.length
      )
    ];

  }


  /* =========================================================
     ACTIONS
  ========================================================= */

  exportTransactions(): void {

    const headers = [

      'Reference',

      'ID',

      'Type',

      'Expediteur',

      'Beneficiaire',

      'Montant',

      'Devise',

      'Date',

      'Statut'

    ];


    const rows =
      this.filteredTransactions.map(
        transaction => [

          transaction.reference,

          transaction.transactionId,

          this.getTypeLabel(
            transaction.type
          ),

          transaction.senderName,

          transaction.receiverName,

          transaction.amount,

          transaction.currency,

          transaction.date.toISOString(),

          this.getStatusLabel(
            transaction.status
          )

        ]
      );


    const csv = [

      headers.join(';'),

      ...rows.map(
        row =>

          row
            .map(
              value =>
                `"${String(value)
                  .replace(
                    /"/g,
                    '""'
                  )}"`
            )
            .join(';')
      )

    ].join('\n');


    const blob =
      new Blob(

        [csv],

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


    link.href = url;

    link.download =
      'transactions-iblopay.csv';


    link.click();


    URL.revokeObjectURL(
      url
    );

  }


  printReport(): void {

    window.print();

  }


  printSelectedTransaction(): void {

    if (
      !this.selectedTransaction
    ) {

      return;

    }


    const transaction =
      this.selectedTransaction;


    const popup =
      window.open(

        '',

        '_blank',

        'width=850,height=700'

      );


    if (!popup) {

      return;

    }


    popup.document.write(`

      <!doctype html>

      <html lang="fr">

        <head>

          <meta charset="utf-8">

          <title>
            ${transaction.reference}
          </title>

          <style>

            body {

              font-family:
                Arial,
                sans-serif;

              padding:
                30px;

              color:
                #172554;

            }


            h1 {

              margin-bottom:
                8px;

            }


            table {

              width:
                100%;

              border-collapse:
                collapse;

              margin-top:
                20px;

            }


            td {

              padding:
                10px;

              border-bottom:
                1px solid #e2e8f0;

            }


            td:first-child {

              color:
                #64748b;

              width:
                35%;

            }


            td:last-child {

              font-weight:
                700;

            }

          </style>

        </head>


        <body>

          <h1>
            Détails de la transaction
          </h1>


          <table>

            <tr>

              <td>Référence</td>

              <td>
                ${transaction.reference}
              </td>

            </tr>


            <tr>

              <td>ID</td>

              <td>
                ${transaction.transactionId}
              </td>

            </tr>


            <tr>

              <td>Type</td>

              <td>
                ${this.getTypeLabel(
                  transaction.type
                )}
              </td>

            </tr>


            <tr>

              <td>Montant</td>

              <td>

                ${transaction.amount
                  .toLocaleString(
                    'fr-FR'
                  )}

                ${transaction.currency}

              </td>

            </tr>


            <tr>

              <td>Statut</td>

              <td>
                ${this.getStatusLabel(
                  transaction.status
                )}
              </td>

            </tr>


            <tr>

              <td>Expéditeur</td>

              <td>

                ${transaction.senderName}

                -

                ${transaction.senderPhone}

              </td>

            </tr>


            <tr>

              <td>Bénéficiaire</td>

              <td>

                ${transaction.receiverName}

                -

                ${transaction.receiverPhone}

              </td>

            </tr>


            <tr>

              <td>Description</td>

              <td>
                ${transaction.description}
              </td>

            </tr>

          </table>


          <script>

            window.onload = function() {

              window.print();

            };

          <\/script>

        </body>

      </html>

    `);


    popup.document.close();

  }


  /* =========================================================
     LABELS / STYLES
  ========================================================= */

  getTypeLabel(
    type: TransactionType
  ): string {

    const labels:
      Record<
        TransactionType,
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

      COMMISSION:
        'Commission',

      REFUND:
        'Remboursement',

      FUND:
        'Approvisionnement',

      MERCHANT_PAYMENT:
        'Paiement marchand'

    };


    return labels[type];

  }


  getStatusLabel(
    status: TransactionStatus
  ): string {

    const labels:
      Record<
        TransactionStatus,
        string
      > = {

      SUCCESS:
        'Réussie',

      PENDING:
        'En attente',

      PROCESSING:
        'En cours',

      FAILED:
        'Échouée'

    };


    return labels[status];

  }


  getPaymentModeLabel(
    mode: PaymentMode
  ): string {

    const labels:
      Record<
        PaymentMode,
        string
      > = {

      WALLET:
        'Solde wallet',

      CARD:
        'Carte',

      MOBILE_MONEY:
        'Mobile Money',

      BANK:
        'Banque'

    };


    return labels[mode];

  }


  getTypeIcon(
    type: TransactionType
  ): string {

    const icons:
      Record<
        TransactionType,
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

      COMMISSION:
        'fas fa-coins',

      REFUND:
        'fas fa-rotate-left',

      FUND:
        'fas fa-plus',

      MERCHANT_PAYMENT:
        'fas fa-store'

    };


    return icons[type];

  }


  getTypeClass(
    type: TransactionType
  ): string {

    if (
      type === 'DEPOSIT' ||
      type === 'FUND'
    ) {

      return 'tx-icon--green';

    }


    if (
      type === 'WITHDRAWAL'
    ) {

      return 'tx-icon--orange';

    }


    if (
      type === 'PAYMENT' ||
      type === 'MERCHANT_PAYMENT'
    ) {

      return 'tx-icon--red';

    }


    if (
      type === 'COMMISSION'
    ) {

      return 'tx-icon--purple';

    }


    if (
      type === 'REFUND'
    ) {

      return 'tx-icon--cyan';

    }


    return 'tx-icon--blue';

  }


  getTypePillClass(
    type: TransactionType
  ): string {

    return (
      `type-pill--${type
        .toLowerCase()
        .replace(
          '_',
          '-'
        )}`
    );

  }


  getStatusClass(
    status: TransactionStatus
  ): string {

    const classes:
      Record<
        TransactionStatus,
        string
      > = {

      SUCCESS:
        'status-pill--success',

      PENDING:
        'status-pill--pending',

      PROCESSING:
        'status-pill--processing',

      FAILED:
        'status-pill--failed'

    };


    return classes[status];

  }


  trackByTransaction(

    _:
      number,

    transaction:
      TransactionRow

  ): string {

    return transaction.transactionId;

  }


  /* =========================================================
     DONNEES DEMO
  ========================================================= */

  private createDemoTransactions():
    TransactionRow[] {

    const baseTransactions:
      TransactionRow[] = [

      {

        reference:
          'TXN-20250624-001',

        transactionId:
          'TRX1234567890',

        type:
          'TRANSFER',

        senderName:
          'Jean NDAYISHIMIYE',

        senderPhone:
          '+257 61 23 45 67',

        receiverName:
          'Marie UWIMANA',

        receiverPhone:
          '+257 68 76 54 32',

        amount:
          50000,

        currency:
          'BIF',

        date:
          new Date(
            '2025-06-24T14:32:15'
          ),

        status:
          'SUCCESS',

        paymentMode:
          'WALLET',

        fee:
          0,

        description:
          'Transfert vers un autre utilisateur',

        externalReference:
          ''

      },


      {

        reference:
          'TXN-20250624-002',

        transactionId:
          'TRX1234567891',

        type:
          'DEPOSIT',

        senderName:
          'Agent KAMENGE',

        senderPhone:
          '+257 62 34 56 78',

        receiverName:
          'Paul NTAKARUTIMANA',

        receiverPhone:
          '+257 69 87 65 43',

        amount:
          100000,

        currency:
          'BIF',

        date:
          new Date(
            '2025-06-24T13:15:00'
          ),

        status:
          'PENDING',

        paymentMode:
          'WALLET',

        fee:
          0,

        description:
          'Dépôt sur wallet client'

      },


      {

        reference:
          'TXN-20250624-003',

        transactionId:
          'TRX1234567892',

        type:
          'WITHDRAWAL',

        senderName:
          'Marie UWIMANA',

        senderPhone:
          '+257 68 76 54 32',

        receiverName:
          'Agent GITEGA',

        receiverPhone:
          '+257 61 11 22 33',

        amount:
          75000,

        currency:
          'BIF',

        date:
          new Date(
            '2025-06-24T11:20:00'
          ),

        status:
          'SUCCESS',

        paymentMode:
          'WALLET',

        fee:
          1500,

        description:
          'Retrait wallet'

      },


      {

        reference:
          'TXN-20250624-004',

        transactionId:
          'TRX1234567893',

        type:
          'PAYMENT',

        senderName:
          'Client Marchand',

        senderPhone:
          '+257 75 44 33 22',

        receiverName:
          'Shop Express',

        receiverPhone:
          '+257 77 88 99 00',

        amount:
          25000,

        currency:
          'BIF',

        date:
          new Date(
            '2025-06-24T10:45:00'
          ),

        status:
          'FAILED',

        paymentMode:
          'WALLET',

        fee:
          0,

        description:
          'Paiement marchand'

      },


      {

        reference:
          'TXN-20250624-005',

        transactionId:
          'TRX1234567894',

        type:
          'TRANSFER',

        senderName:
          'Pierre HABIMANA',

        senderPhone:
          '+257 71 22 33 44',

        receiverName:
          'Alice MUYANGO',

        receiverPhone:
          '+257 79 55 66 77',

        amount:
          30000,

        currency:
          'BIF',

        date:
          new Date(
            '2025-06-24T09:30:00'
          ),

        status:
          'SUCCESS',

        paymentMode:
          'WALLET',

        fee:
          0,

        description:
          'Transfert wallet'

      },


      {

        reference:
          'TXN-20250624-006',

        transactionId:
          'TRX1234567895',

        type:
          'COMMISSION',

        senderName:
          'IBLOPay',

        senderPhone:
          'Système',

        receiverName:
          'Agent KAMENGE',

        receiverPhone:
          '+257 62 34 56 78',

        amount:
          1500,

        currency:
          'BIF',

        date:
          new Date(
            '2025-06-24T08:15:00'
          ),

        status:
          'SUCCESS',

        paymentMode:
          'WALLET',

        fee:
          0,

        description:
          'Commission agent'

      },


      {

        reference:
          'TXN-20250624-007',

        transactionId:
          'TRX1234567896',

        type:
          'REFUND',

        senderName:
          'Support IBLOPay',

        senderPhone:
          'Système',

        receiverName:
          'Jean NDAYISHIMIYE',

        receiverPhone:
          '+257 61 23 45 67',

        amount:
          20000,

        currency:
          'BIF',

        date:
          new Date(
            '2025-06-24T07:50:00'
          ),

        status:
          'PROCESSING',

        paymentMode:
          'WALLET',

        fee:
          0,

        description:
          'Remboursement client'

      },


      {

        reference:
          'TXN-20250624-008',

        transactionId:
          'TRX1234567897',

        type:
          'FUND',

        senderName:
          'Agent GITEGA',

        senderPhone:
          '+257 61 11 22 33',

        receiverName:
          'IBLOPay',

        receiverPhone:
          'Système',

        amount:
          500000,

        currency:
          'BIF',

        date:
          new Date(
            '2025-06-24T07:10:00'
          ),

        status:
          'SUCCESS',

        paymentMode:
          'BANK',

        fee:
          0,

        description:
          'Approvisionnement compte'

      },


      {

        reference:
          'TXN-20250624-009',

        transactionId:
          'TRX1234567898',

        type:
          'MERCHANT_PAYMENT',

        senderName:
          'Client',

        senderPhone:
          '+257 72 33 44 55',

        receiverName:
          'Super Market',

        receiverPhone:
          '+257 76 88 99 11',

        amount:
          12000,

        currency:
          'BIF',

        date:
          new Date(
            '2025-06-24T06:45:00'
          ),

        status:
          'FAILED',

        paymentMode:
          'WALLET',

        fee:
          0,

        description:
          'Paiement marchand'

      },


      {

        reference:
          'TXN-20250624-010',

        transactionId:
          'TRX1234567899',

        type:
          'TRANSFER',

        senderName:
          'Alice MUYANGO',

        senderPhone:
          '+257 79 55 66 77',

        receiverName:
          'Paul NTAKARUTIMANA',

        receiverPhone:
          '+257 69 87 65 43',

        amount:
          40000,

        currency:
          'BIF',

        date:
          new Date(
            '2025-06-24T06:20:00'
          ),

        status:
          'SUCCESS',

        paymentMode:
          'WALLET',

        fee:
          0,

        description:
          'Transfert wallet'

      }

    ];


    /*
     * Lignes supplémentaires pour rendre
     * la pagination visible immédiatement.
     */
    const generated:
      TransactionRow[] = [];


    for (
      let index = 11;
      index <= 58;
      index++
    ) {

      const template =

        baseTransactions[

          (index - 1) %

          baseTransactions.length

        ];


      generated.push({

        ...template,


        reference:

          `TXN-202506${String(index)
            .padStart(
              2,
              '0'
            )}-${String(index)
            .padStart(
              3,
              '0'
            )}`,


        transactionId:

          `TRX${1234567890 + index}`,


        amount:

          template.amount +

          (
            index * 500
          ),


        date:

          new Date(

            2025,

            5,

            Math.max(

              1,

              24 -
              Math.floor(
                index / 3
              )

            ),

            14 -
            (index % 8),

            (index * 7) %
            60

          )

      });

    }


    return [

      ...baseTransactions,

      ...generated

    ];

  }

}
