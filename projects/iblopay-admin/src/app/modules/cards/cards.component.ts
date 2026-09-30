import {
  Component,
  OnInit
} from '@angular/core';


type CardStatus =
  | 'ACTIVE'
  | 'BLOCKED';


type HistoryStatus =
  | 'Complété'
  | 'En cours'
  | 'Échec';


type HistoryType =
  | 'CREDIT'
  | 'DEBIT';


interface CardHistoryItem {

  reference:
    string;

  description:
    string;

  amount:
    number;

  date:
    Date;

  status:
    HistoryStatus;

  type:
    HistoryType;

}


interface CardRow {

  cardId:
    string;

  cardNumber:
    string;

  holderName:
    string;

  userId:
    string;

  phone:
    string;

  email:
    string;

  walletId:
    string;

  identityNumber:
    string;

  address:
    string;

  balance:
    number;

  status:
    CardStatus;

  history:
    CardHistoryItem[];

}


@Component({
  selector:
    'app-cards',

  templateUrl:
    './cards.component.html',

  styleUrls: [
    './cards.component.scss'
  ]
})
export class CardsComponent
  implements OnInit {


  cards:
    CardRow[] = [];


  filteredCards:
    CardRow[] = [];


  selectedCard:
    CardRow | null = null;


  searchTerm =
    '';


  selectedStatus =
    '';


  currentPage =
    1;


  pageSize =
    8;


  ngOnInit(): void {

    this.cards =
      this.createCards();

    this.filteredCards = [
      ...this.cards
    ];

  }


  /* =========================================================
     STATS
  ========================================================= */

  get totalCards():
    number {

    return this.cards.length;

  }


  get activeCards():
    number {

    return this.cards
      .filter(
        card =>
          card.status ===
          'ACTIVE'
      )
      .length;

  }


  get blockedCards():
    number {

    return this.cards
      .filter(
        card =>
          card.status ===
          'BLOCKED'
      )
      .length;

  }


  get totalBalance():
    number {

    return this.cards
      .reduce(
        (
          total,
          card
        ) =>
          total +
          card.balance,
        0
      );

  }


  /* =========================================================
     FILTERS
  ========================================================= */

  applyFilters(): void {

    const term =
      this.searchTerm
        .trim()
        .toLowerCase();


    this.filteredCards =
      this.cards
        .filter(
          card => {

            const matchesSearch =
              !term ||
              card.cardNumber
                .toLowerCase()
                .includes(term) ||
              card.holderName
                .toLowerCase()
                .includes(term);


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


    this.currentPage =
      1;

  }


  resetFilters(): void {

    this.searchTerm =
      '';

    this.selectedStatus =
      '';

    this.currentPage =
      1;

    this.filteredCards = [
      ...this.cards
    ];

  }


  /* =========================================================
     PAGINATION
  ========================================================= */

  get totalPages():
    number {

    return Math.max(
      1,
      Math.ceil(
        this.filteredCards.length /
        this.pageSize
      )
    );

  }


  get paginatedCards():
    CardRow[] {

    const start =
      (
        this.currentPage -
        1
      ) *
      this.pageSize;


    return this.filteredCards.slice(
      start,
      start +
      this.pageSize
    );

  }


  get startItem():
    number {

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


  get endItem():
    number {

    return Math.min(
      this.currentPage *
      this.pageSize,
      this.filteredCards.length
    );

  }


  get visiblePages():
    number[] {

    const maxVisible =
      5;


    let start =
      Math.max(
        1,
        this.currentPage -
        2
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
     DETAIL
  ========================================================= */

  openDetail(
    card:
      CardRow
  ): void {

    this.selectedCard =
      card;

  }


  closeDetail(): void {

    this.selectedCard =
      null;

  }


  blockSelectedCard(): void {

    if (
      !this.selectedCard
    ) {

      return;

    }


    const cardId =
      this.selectedCard.cardId;


    this.cards =
      this.cards
        .map(
          card =>
            card.cardId ===
            cardId
              ? {
                  ...card,
                  status:
                    'BLOCKED'
                }
              : card
        );


    this.selectedCard = {
      ...this.selectedCard,
      status:
        'BLOCKED'
    };


    this.applyFilters();

  }


  activateSelectedCard(): void {

    if (
      !this.selectedCard
    ) {

      return;

    }


    const cardId =
      this.selectedCard.cardId;


    this.cards =
      this.cards
        .map(
          card =>
            card.cardId ===
            cardId
              ? {
                  ...card,
                  status:
                    'ACTIVE'
                }
              : card
        );


    this.selectedCard = {
      ...this.selectedCard,
      status:
        'ACTIVE'
    };


    this.applyFilters();

  }


  /* =========================================================
     FORMATTERS
  ========================================================= */

  getStatusLabel(
    status:
      CardStatus
  ): string {

    return status ===
      'ACTIVE'
        ? 'Active'
        : 'Bloquée';

  }


  getStatusClass(
    status:
      CardStatus
  ): string {

    return status ===
      'ACTIVE'
        ? 'status-active'
        : 'status-blocked';

  }


  getHistoryStatusClass(
    status:
      HistoryStatus
  ): string {

    if (
      status ===
      'Complété'
    ) {

      return 'history-success';

    }


    if (
      status ===
      'En cours'
    ) {

      return 'history-pending';

    }


    return 'history-failed';

  }


  getAmountClass(
    type:
      HistoryType
  ): string {

    return type ===
      'CREDIT'
        ? 'amount-credit'
        : 'amount-debit';

  }


  getSignedAmount(
    item:
      CardHistoryItem
  ): string {

    const sign =
      item.type ===
      'CREDIT'
        ? '+ '
        : '- ';


    return (
      sign +
      this.formatBif(
        item.amount
      )
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


  getAvatarColor(
    name:
      string
  ): string {

    const palette = [
      '#7a8da7',
      '#799487',
      '#8c819d',
      '#9b897d',
      '#708f9a',
      '#879079'
    ];


    let hash =
      0;


    for (
      let index = 0;
      index <
      name.length;
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
      Math.abs(
        hash
      ) %
      palette.length
    ];

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


  trackByCard(
    _:
      number,

    card:
      CardRow
  ): string {

    return card.cardId;

  }


  /* =========================================================
     PRINT
  ========================================================= */

  printDetail(): void {

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


    if (
      !popup
    ) {

      return;

    }


    popup.document.write(
      `
        <!doctype html>

        <html lang="fr">

          <head>

            <meta charset="utf-8">

            <title>
              Détail carte ${this.escapeHtml(card.cardNumber)}
            </title>

            <style>

              body{
                font-family:Arial,sans-serif;
                color:#23324b;
                padding:30px
              }

              h1{
                margin:0 0 20px;
                font-size:22px
              }

              table{
                width:100%;
                border-collapse:collapse
              }

              td{
                padding:10px;
                border-bottom:1px solid #e6ebf1
              }

              td:first-child{
                width:34%;
                color:#77849a
              }

              td:last-child{
                font-weight:700
              }

            </style>

          </head>


          <body>

            <h1>
              Détail de la carte
            </h1>


            <table>

              <tr>
                <td>Numéro de carte</td>
                <td>${this.escapeHtml(card.cardNumber)}</td>
              </tr>

              <tr>
                <td>Nom complet</td>
                <td>${this.escapeHtml(card.holderName)}</td>
              </tr>

              <tr>
                <td>Téléphone</td>
                <td>${this.escapeHtml(card.phone)}</td>
              </tr>

              <tr>
                <td>Email</td>
                <td>${this.escapeHtml(card.email)}</td>
              </tr>

              <tr>
                <td>Wallet</td>
                <td>${this.escapeHtml(card.walletId)}</td>
              </tr>

              <tr>
                <td>ID client</td>
                <td>${this.escapeHtml(card.userId)}</td>
              </tr>

              <tr>
                <td>Pièce d'identité</td>
                <td>${this.escapeHtml(card.identityNumber)}</td>
              </tr>

              <tr>
                <td>Adresse</td>
                <td>${this.escapeHtml(card.address)}</td>
              </tr>

              <tr>
                <td>Statut</td>
                <td>${this.escapeHtml(this.getStatusLabel(card.status))}</td>
              </tr>

              <tr>
                <td>Montant disponible</td>
                <td>${this.escapeHtml(this.formatBif(card.balance))}</td>
              </tr>

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


  printHistory(): void {

    if (
      !this.selectedCard
    ) {

      return;

    }


    const card =
      this.selectedCard;


    const rows =
      card.history
        .map(
          item =>
            `
              <tr>
                <td>${this.escapeHtml(item.reference)}</td>
                <td>${this.escapeHtml(item.description)}</td>
                <td>${this.escapeHtml(this.getSignedAmount(item))}</td>
                <td>${this.escapeHtml(this.formatDateTime(item.date))}</td>
                <td>${this.escapeHtml(item.status)}</td>
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


    if (
      !popup
    ) {

      return;

    }


    popup.document.write(
      `
        <!doctype html>

        <html lang="fr">

          <head>

            <meta charset="utf-8">

            <title>
              Historique carte ${this.escapeHtml(card.cardNumber)}
            </title>

            <style>

              body{
                font-family:Arial,sans-serif;
                color:#23324b;
                padding:28px
              }

              h1{
                margin:0;
                font-size:21px
              }

              p{
                color:#7a8799;
                margin:5px 0 18px
              }

              table{
                width:100%;
                border-collapse:collapse;
                font-size:11px
              }

              th,
              td{
                padding:8px;
                border:1px solid #e3e8ef;
                text-align:left
              }

              th{
                background:#f7f9fb
              }

            </style>

          </head>


          <body>

            <h1>
              Historique de la carte
            </h1>

            <p>
              ${this.escapeHtml(card.cardNumber)}
              ·
              ${this.escapeHtml(card.holderName)}
            </p>


            <table>

              <thead>

                <tr>
                  <th>Référence</th>
                  <th>Description</th>
                  <th>Montant</th>
                  <th>Date & Heure</th>
                  <th>Statut</th>
                </tr>

              </thead>


              <tbody>

                ${rows || '<tr><td colspan="5">Aucun mouvement disponible.</td></tr>'}

              </tbody>

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

    return String(
      value
    )
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
     DEMO DATA
  ========================================================= */

  private createCards(): CardRow[] {

    const owners: Array<[string, string, string, string]> = [
      ['Jean Claude NDAYISHIMIYE', '+257 69 12 34 56', 'jeanclaude@gmail.com', 'Nyakabiga, Mukaza, Bujumbura Mairie'],
      ['Aline NIBIGIRA', '+257 68 42 15 90', 'aline.nibigira@gmail.com', 'Rohero, Mukaza, Bujumbura Mairie'],
      ['David MUTONI', '+257 71 30 44 21', 'david.mutoni@gmail.com', 'Gitega Centre, Gitega'],
      ['Chantal NTAHOMVUKIYE', '+257 79 04 32 18', 'chantal.ntahomvukiye@gmail.com', 'Kamenge, Ntahangwa, Bujumbura'],
      ['Emmanuel BIZIMANA', '+257 72 55 61 04', 'emmanuel.bizimana@gmail.com', 'Ngozi Centre, Ngozi'],
      ['Patricia NIYONZIMA', '+257 76 31 10 28', 'patricia.niyonzima@gmail.com', 'Kayanza Centre, Kayanza'],
      ['Albert NDAYIZEYE', '+257 61 44 27 90', 'albert.ndayizeye@gmail.com', 'Muyinga Centre, Muyinga'],
      ['Claudine UWIMANA', '+257 68 19 54 70', 'claudine.uwimana@gmail.com', 'Musaga, Muha, Bujumbura']
    ];

    const firstPageNumbers = [
      '1234 5678 9012 3456', '9876 5432 1098 7654', '4567 8901 2345 6789', '2345 6789 0123 4567',
      '8765 4321 0987 6543', '3456 7890 1234 5678', '9012 3456 7890 1234', '6789 0123 4567 8901'
    ];

    const firstPageBalances = [125000, 87500, 32000, 210000, 310000, 45000, 98000, 164500];
    const cards: CardRow[] = [];

    // The first 8 records intentionally reproduce the cards visible in the reference design.
    for (let index = 0; index < 8; index++) {
      cards.push(this.buildCard(index, owners[index], firstPageNumbers[index], firstPageBalances[index], index === 2 || index === 6 ? 'BLOCKED' : 'ACTIVE'));
    }

    // Keep pagination realistic: 1,284 cards in total.
    const remaining = 1284 - cards.length;
    for (let offset = 0; offset < remaining; offset++) {
      const index = offset + 8;
      const owner = owners[index % owners.length];
      const status: CardStatus = offset < 162 ? 'BLOCKED' : 'ACTIVE';
      const balance = offset === remaining - 1 ? 96175 : 97123;
      const number = `${String((index * 1379) % 10000).padStart(4, '0')} ${String((index * 2173) % 10000).padStart(4, '0')} ${String((index * 3181) % 10000).padStart(4, '0')} ${String((index * 4513) % 10000).padStart(4, '0')}`;
      cards.push(this.buildCard(index, owner, number, balance, status));
    }

    return cards;
  }

  private buildCard(
    index: number,
    owner: [string, string, string, string],
    cardNumber: string,
    balance: number,
    status: CardStatus
  ): CardRow {
    const sequence = index + 1;
    const cardId = `CARD-${String(sequence).padStart(4, '0')}`;
    const userId = `USR-2026-${String(index + 125).padStart(5, '0')}`;
    const walletId = `IBLO-${String(index + 125).padStart(5, '0')}`;

    return {
      cardId,
      cardNumber,
      holderName: owner[0],
      userId,
      phone: owner[1],
      email: owner[2],
      walletId,
      identityNumber: `CNI-${String(12345678901234 + index)}`,
      address: owner[3],
      balance,
      status,
      history: this.createHistory(index)
    };
  }

  private createHistory(
    index:
      number
  ): CardHistoryItem[] {

    const baseAmount =
      10000 +
      (
        index *
        2500
      );


    return [

      {

        reference:
          `TXN-${String(
            1258 +
            index *
            5
          ).padStart(
            7,
            '0'
          )}`,

        description:
          'Réception d’argent',

        amount:
          50000 +
          index *
          5000,

        date:
          new Date(
            2026,
            8,
            29,
            14,
            30
          ),

        status:
          'Complété',

        type:
          'CREDIT'

      },


      {

        reference:
          `TXN-${String(
            1257 +
            index *
            5
          ).padStart(
            7,
            '0'
          )}`,

        description:
          'Achat marchand',

        amount:
          baseAmount,

        date:
          new Date(
            2026,
            8,
            28,
            9,
            15
          ),

        status:
          'Complété',

        type:
          'DEBIT'

      },


      {

        reference:
          `TXN-${String(
            1256 +
            index *
            5
          ).padStart(
            7,
            '0'
          )}`,

        description:
          'Transfert envoyé',

        amount:
          25000,

        date:
          new Date(
            2026,
            8,
            27,
            16,
            22
          ),

        status:
          'Complété',

        type:
          'DEBIT'

      },


      {

        reference:
          `TXN-${String(
            1255 +
            index *
            5
          ).padStart(
            7,
            '0'
          )}`,

        description:
          'Approvisionnement',

        amount:
          100000,

        date:
          new Date(
            2026,
            8,
            26,
            11,
            10
          ),

        status:
          'Complété',

        type:
          'CREDIT'

      },


      {

        reference:
          `TXN-${String(
            1254 +
            index *
            5
          ).padStart(
            7,
            '0'
          )}`,

        description:
          'Frais de service',

        amount:
          1250,

        date:
          new Date(
            2026,
            8,
            25,
            8,
            45
          ),

        status:
          'Complété',

        type:
          'DEBIT'

      }

    ];

  }

}
