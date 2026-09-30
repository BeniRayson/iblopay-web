import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  Card
} from '../../models/card.model';

import {
  CardTransaction
} from '../../models/card-transaction.model';

import {
  CardService
} from '../../services/card.service';

import {
  CardStatus
} from '../../enums/card-status.enum';


@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnChanges {

  @Input()
  cards: Card[] = [];

  @Output()
  actionCompleted = new EventEmitter<void>();

  searchTerm = '';

  selectedStatus = '';

  currentPage = 1;

  pageSize = 15;

  filteredCards: Card[] = [];

  selectedCard: Card | null = null;

  selectedTransactions: CardTransaction[] = [];

  isHistoryLoading = false;

  historyPage = 1;

  historyPageSize = 6;


  constructor(
    private cardService: CardService
  ) {}


  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['cards']
    ) {

      this.applyFilters();

      if (
        this.selectedCard
      ) {

        const refreshed =
          this.cards.find(
            card =>
              card.cardId ===
              this.selectedCard?.cardId
          );

        if (refreshed) {
          this.selectedCard = refreshed;
        }

      }

      // Comme dans la maquette : la première carte est sélectionnée
      // par défaut pour afficher le panneau de détail.
      if (
        !this.selectedCard &&
        this.filteredCards.length > 0
      ) {
        this.openDetail(
          this.filteredCards[0]
        );
      }

    }

  }


  get totalCards(): number {
    return this.cards.length;
  }


  get activeCards(): number {

    return this.cards.filter(
      card =>
        card.status ===
        CardStatus.ACTIVE
    ).length;

  }


  get blockedCards(): number {

    return this.cards.filter(
      card =>
        card.status ===
        CardStatus.BLOCKED
    ).length;

  }


  get totalBalance(): number {

    return this.cards.reduce(
      (
        total,
        card
      ) =>
        total +
        (
          Number(
            card.balance
          ) ||
          0
        ),
      0
    );

  }


  applyFilters(): void {

    const term =
      this.searchTerm
        .trim()
        .toLowerCase();


    this.filteredCards =
      this.cards.filter(
        card => {

          const matchesSearch =
            !term ||
            [
              card.maskedPan,
              card.cardUid,
              card.holderName,
              card.userId,
              card.walletId
            ]
              .filter(
                value =>
                  value !== null &&
                  value !== undefined
              )
              .some(
                value =>
                  String(value)
                    .toLowerCase()
                    .includes(term)
              );


          const matchesStatus =
            !this.selectedStatus ||
            card.status ===
              this.selectedStatus;


          return (
            matchesSearch &&
            matchesStatus
          );

        }
      );


    this.currentPage = 1;

  }


  resetFilters(): void {

    this.searchTerm = '';
    this.selectedStatus = '';
    this.currentPage = 1;

    this.applyFilters();

  }


  get totalPages(): number {

    return Math.max(
      1,
      Math.ceil(
        this.filteredCards.length /
        this.pageSize
      )
    );

  }


  get paginatedCards(): Card[] {

    const start =
      (
        this.currentPage -
        1
      ) *
      this.pageSize;


    return this.filteredCards.slice(
      start,
      start + this.pageSize
    );

  }


  get startItem(): number {

    if (
      this.filteredCards.length ===
      0
    ) {
      return 0;
    }

    return (
      (
        this.currentPage -
        1
      ) *
      this.pageSize
    ) + 1;

  }


  get endItem(): number {

    return Math.min(
      this.currentPage *
      this.pageSize,
      this.filteredCards.length
    );

  }


  get visiblePages(): number[] {

    const maxVisible = 5;

    let start =
      Math.max(
        1,
        this.currentPage - 2
      );


    let end =
      Math.min(
        this.totalPages,
        start +
        maxVisible -
        1
      );


    if (
      end -
      start +
      1 <
      maxVisible
    ) {

      start =
        Math.max(
          1,
          end -
          maxVisible +
          1
        );

    }


    return Array.from(
      {
        length:
          end -
          start +
          1
      },
      (
        _,
        index
      ) =>
        start +
        index
    );

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


  openDetail(
    card: Card
  ): void {

    this.selectedCard = card;
    this.isHistoryLoading = true;
    this.selectedTransactions = [];
    this.historyPage = 1;


    this.cardService
      .getCardTransactions(
        card.cardId
      )
      .subscribe({

        next: transactions => {

          this.selectedTransactions =
            transactions.sort(
              (
                a,
                b
              ) =>
                new Date(
                  b.createdAt
                ).getTime() -
                new Date(
                  a.createdAt
                ).getTime()
            );

          this.isHistoryLoading = false;

        },

        error: () => {
          this.selectedTransactions = [];
          this.isHistoryLoading = false;
        }

      });

  }


  /* ===== Pagination de l'historique ===== */

  get historyTotalPages(): number {

    return Math.max(
      1,
      Math.ceil(
        this.selectedTransactions.length /
        this.historyPageSize
      )
    );

  }


  get paginatedTransactions(): CardTransaction[] {

    const start =
      (this.historyPage - 1) *
      this.historyPageSize;

    return this.selectedTransactions.slice(
      start,
      start + this.historyPageSize
    );

  }


  get historyStartItem(): number {

    return this.selectedTransactions.length === 0
      ? 0
      : (this.historyPage - 1) *
        this.historyPageSize + 1;

  }


  get historyEndItem(): number {

    return Math.min(
      this.historyPage * this.historyPageSize,
      this.selectedTransactions.length
    );

  }


  get historyVisiblePages(): number[] {

    const maxVisible = 5;

    let start = Math.max(
      1,
      this.historyPage - 2
    );

    const end = Math.min(
      this.historyTotalPages,
      start + maxVisible - 1
    );

    start = Math.max(
      1,
      end - maxVisible + 1
    );

    return Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );

  }


  goToHistoryPage(page: number): void {

    if (
      page < 1 ||
      page > this.historyTotalPages
    ) {
      return;
    }

    this.historyPage = page;

  }


  closeDetail(): void {
    this.selectedCard = null;
    this.selectedTransactions = [];
  }


  blockSelectedCard(): void {

    if (
      !this.selectedCard
    ) {
      return;
    }


    this.cardService
      .blockCard(
        this.selectedCard.cardId,
        'Blocage administrateur'
      )
      .subscribe({

        next: card => {
          this.selectedCard = card;
          this.actionCompleted.emit();
        }

      });

  }


  activateSelectedCard(): void {

    if (
      !this.selectedCard
    ) {
      return;
    }


    this.cardService
      .activateCard(
        this.selectedCard.cardId
      )
      .subscribe({

        next: card => {
          this.selectedCard = card;
          this.actionCompleted.emit();
        }

      });

  }


  getStatusLabel(
    status: string
  ): string {

    const labels:
      Record<
        string,
        string
      > = {

      ACTIVE:
        'Active',

      BLOCKED:
        'Bloquée',

      SUSPENDED:
        'Suspendue',

      CLOSED:
        'Clôturée',

      REPLACED:
        'Remplacée',

      NEUTRAL:
        'Neutre'

    };


    return labels[status] || status;

  }


  getStatusClass(
    status: string
  ): string {

    return (
      `status-${String(status)
        .toLowerCase()}`
    );

  }


  getInitials(
    name:
      string | undefined
  ): string {

    if (!name) {
      return '—';
    }


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


  getAvatarColor(
    name:
      string | undefined
  ): string {

    if (!name) {
      return '#8292a7';
    }


    const palette = [
      '#7a8da7',
      '#799487',
      '#8c819d',
      '#9b897d',
      '#708f9a',
      '#879079'
    ];


    let hash = 0;


    for (
      let index = 0;
      index < name.length;
      index++
    ) {

      hash =
        name.charCodeAt(
          index
        ) +
        (
          (
            hash <<
            5
          ) -
          hash
        );

    }


    return palette[
      Math.abs(hash) %
      palette.length
    ] || '#7a8da7';

  }


  formatBif(
    amount: number
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


  formatDate(
    value: string
  ): string {

    const date =
      new Date(
        value
      );


    return new Intl.DateTimeFormat(
      'fr-FR',
      {
        day:
          '2-digit',

        month:
          'short',

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


  getDirectionClass(
    transaction:
      CardTransaction
  ): string {

    return transaction.direction ===
      'CREDIT'
        ? 'direction-credit'
        : 'direction-debit';

  }


  getDirectionSymbol(
    transaction:
      CardTransaction
  ): string {

    return transaction.direction ===
      'CREDIT'
        ? '↑'
        : '↓';

  }


  getSignedAmount(
    transaction:
      CardTransaction
  ): string {

    const sign =
      transaction.direction ===
      'CREDIT'
        ? '+ '
        : '- ';


    return (
      sign +
      this.formatBif(
        transaction.amount
      )
    );

  }


  getOperationLabel(
    operation:
      string | undefined
  ): string {

    const labels:
      Record<
        string,
        string
      > = {

      RECHARGE:
        'Recharge de la carte',

      MERCHANT_PAYMENT:
        'Paiement marchand',

      TRANSFER:
        'Transfert',

      WITHDRAWAL:
        'Retrait'

    };


    return operation
      ? (
          labels[operation] ||
          operation
        )
      : 'Opération';

  }


  getTransactionStatusLabel(
    status: string
  ): string {

    const labels:
      Record<
        string,
        string
      > = {

      COMPLETED:
        'Réussi',

      PENDING:
        'En cours',

      FAILED:
        'Échec'

    };


    return labels[status] || status;

  }


  getTransactionStatusClass(
    status: string
  ): string {

    return (
      `transaction-${String(status)
        .toLowerCase()}`
    );

  }


  printSelectedCard(): void {

    if (
      !this.selectedCard
    ) {
      return;
    }


    const card =
      this.selectedCard;


    const popup =
      window.open(
        '',
        '_blank',
        'width=900,height=720'
      );


    if (!popup) {
      return;
    }


    popup.document.write(`
      <!doctype html>
      <html lang="fr">
        <head>
          <meta charset="utf-8">
          <title>Détail carte ${this.escapeHtml(card.cardId)}</title>

          <style>
            body{font-family:Arial,sans-serif;color:#23324b;padding:30px}
            h1{margin:0 0 20px;font-size:22px}
            table{width:100%;border-collapse:collapse}
            td{padding:10px;border-bottom:1px solid #e6ebf1}
            td:first-child{width:34%;color:#77849a}
            td:last-child{font-weight:700}
          </style>
        </head>

        <body>
          <h1>Détail de la carte</h1>

          <table>
            <tr><td>Numéro de carte</td><td>${this.escapeHtml(card.maskedPan || card.cardUid)}</td></tr>
            <tr><td>Nom complet</td><td>${this.escapeHtml(card.holderName || '—')}</td></tr>
            <tr><td>Téléphone</td><td>${this.escapeHtml(card.holderPhone || '—')}</td></tr>
            <tr><td>Email</td><td>${this.escapeHtml(card.holderEmail || '—')}</td></tr>
            <tr><td>Wallet</td><td>${this.escapeHtml(card.walletId || '—')}</td></tr>
            <tr><td>ID client</td><td>${this.escapeHtml(card.userId || '—')}</td></tr>
            <tr><td>Pièce d'identité</td><td>${this.escapeHtml(card.holderIdentityNumber || '—')}</td></tr>
            <tr><td>Adresse</td><td>${this.escapeHtml(card.holderAddress || '—')}</td></tr>
            <tr><td>Statut</td><td>${this.escapeHtml(this.getStatusLabel(card.status))}</td></tr>
            <tr><td>Montant disponible</td><td>${this.escapeHtml(this.formatBif(card.balance || 0))}</td></tr>
          </table>

          <script>
            window.onload=function(){window.print();};
          <\/script>
        </body>
      </html>
    `);


    popup.document.close();

  }


  printCardHistory(): void {

    if (
      !this.selectedCard
    ) {
      return;
    }


    const card =
      this.selectedCard;


    const rows =
      this.selectedTransactions
        .map(
          transaction =>
            `
              <tr>
                <td>${this.escapeHtml(transaction.transactionId)}</td>
                <td>${this.escapeHtml(transaction.description || this.getOperationLabel(transaction.operationType))}</td>
                <td>${this.escapeHtml(this.formatDate(transaction.createdAt))}</td>
                <td>${this.escapeHtml(this.getSignedAmount(transaction))}</td>
                <td>${this.escapeHtml(this.getTransactionStatusLabel(transaction.status))}</td>
              </tr>
            `
        )
        .join('');


    const popup =
      window.open(
        '',
        '_blank',
        'width=1000,height=720'
      );


    if (!popup) {
      return;
    }


    popup.document.write(`
      <!doctype html>
      <html lang="fr">
        <head>
          <meta charset="utf-8">
          <title>Historique carte ${this.escapeHtml(card.cardId)}</title>

          <style>
            body{font-family:Arial,sans-serif;color:#23324b;padding:28px}
            h1{margin:0;font-size:21px}
            p{color:#7a8799;margin:5px 0 18px}
            table{width:100%;border-collapse:collapse;font-size:11px}
            th,td{padding:8px;border:1px solid #e3e8ef;text-align:left}
            th{background:#f7f9fb}
          </style>
        </head>

        <body>
          <h1>Historique de la carte</h1>
          <p>${this.escapeHtml(card.maskedPan || card.cardUid)} · ${this.escapeHtml(card.holderName || '—')}</p>

          <table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Opération</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              ${rows || '<tr><td colspan="5">Aucun mouvement.</td></tr>'}
            </tbody>
          </table>

          <script>
            window.onload=function(){window.print();};
          <\/script>
        </body>
      </html>
    `);


    popup.document.close();

  }


  trackByCard(
    _:
      number,

    card:
      Card
  ): string {

    return card.cardId;

  }


  private escapeHtml(
    value: string
  ): string {

    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  }

}
