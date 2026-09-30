import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';

type UserRole =
  | 'CLIENT'
  | 'AGENT'
  | 'SUPER_AGENT'
  | 'SHAREHOLDER';

type UserStatus =
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'CLOSED';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl: string;
  role: UserRole;
  status: UserStatus;
  cardNumber: string;
  cniNumber: string;

  address: {
    zone: string;
    commune: string;
    province: string;
    fullAddress: string;
  };

  createdAt: Date;

  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };

  accountNumber: string;
  walletBalance: number;
}

const DEFAULT_CREATOR = {
  id: '',
  firstName: '',
  lastName: '',
  role: ''
};

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent
  implements OnInit, OnDestroy {

  users: User[] = [];

  filteredUsers: User[] = [];

  paginatedUsers: User[] = [];

  isLoading = false;

  searchTerm = '';

  selectedRole = '';

  selectedStatus = '';

  currentPage = 1;

  itemsPerPage = 50;

  totalPages = 0;

  stats = {
    total: 0,
    clients: 0,
    agents: 0,
    superAgents: 0,
    shareholders: 0,
    active: 0
  };

  showStatusModal = false;

  statusLoading = false;

  statusError = '';

  statusSuccess = '';

  selectedUser: User | null = null;

  selectedNewStatus = '';

  currentUserStatus = '';

  showDeleteModal = false;

  deleteLoading = false;

  deleteError = '';

  deleteSuccess = '';

  Math = Math;

  private activeUsersTimer?: number;

  statusOptions = [
    {
      value: 'ACTIVE',
      label: 'Actif',
      color: '#4caf50',
      icon: 'fa-check-circle'
    },
    {
      value: 'SUSPENDED',
      label: 'Suspendu',
      color: '#e6952b',
      icon: 'fa-pause-circle'
    },
    {
      value: 'CLOSED',
      label: 'Fermé',
      color: '#d9534f',
      icon: 'fa-times-circle'
    }
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMockUsers();

    this.activeUsersTimer =
      window.setInterval(
        () => {
          this.updateOnlineUsers();
        },
        4000
      );
  }

  ngOnDestroy(): void {
    if (
      this.activeUsersTimer
    ) {
      window.clearInterval(
        this.activeUsersTimer
      );
    }
  }

  loadMockUsers(): void {
    this.isLoading = true;

    window.setTimeout(
      () => {

        this.users =
          this.generateMockUsers();

        this.refreshAll();

        this.updateOnlineUsers();

        this.isLoading = false;

      },
      400
    );
  }

  private generateMockUsers():
    User[] {

    const firstNames = [
      'Jean',
      'Marie',
      'Pierre',
      'Claire',
      'Michel',
      'Anne',
      'Paul',
      'Jeanne',
      'Alain',
      'Rose',
      'David',
      'Martine',
      'Joseph',
      'Françoise',
      'Emmanuel',
      'Catherine',
      'Thomas',
      'Nathalie',
      'Philippe',
      'Isabelle',
      'Eric',
      'Valérie',
      'Nicolas',
      'Sandrine',
      'Christian',
      'Brigitte',
      'Patrick',
      'Céline',
      'Didier',
      'Sophie',
      'André',
      'Monique',
      'Laurent',
      'Chantal',
      'Pascal',
      'Fabrice',
      'Jacqueline',
      'Marcel',
      'Suzanne',
      'Henri',
      'Louise',
      'Georges',
      'Jeannine',
      'Maurice',
      'Simone',
      'René',
      'Odette',
      'Raymond',
      'Marcelle',
      'Lucien',
      'Sylvie',
      'Bertrand'
    ];

    const lastNames = [
      'Ndayishimiye',
      'Uwimana',
      'Niyonzima',
      'Mukiza',
      'Nishimwe',
      'Hakizimana',
      'Mbonimpa',
      'Nkurunziza',
      'Ntakarutimana',
      'Gahungu',
      'Bashirahishize',
      'Ndikumana',
      'Niyungeko',
      'Ndayisaba',
      'Habonimana',
      'Manirakiza',
      'Barakamfitiye',
      'Nimpagaritse',
      'Nirere',
      'Nyandwi',
      'Ndamukunda',
      'Hakizinka',
      'Gashirabake',
      'Rutayisire',
      'Nduwimana',
      'Niyongabo',
      'Ndayizeye',
      'Niyonshuti',
      'Uwizeyimana',
      'Ntibazobimana',
      'Baranyizigiye',
      'Niyikiza',
      'Niyomugabo',
      'Hakorimana',
      'Ndayisenga',
      'Ntamwenge',
      'Niyokwizera'
    ];

    const communes = [
      'Mukaza',
      'Ntahangwa',
      'Muha',
      'Isale',
      'Kabezi',
      'Mubimbi',
      'Mugongomanga',
      'Muhuta',
      'Mukike',
      'Mutambu',
      'Mutimbuzi',
      'Nyabiraba',
      'Buyenzi',
      'Kinindo'
    ];

    const zones = [
      'Nyakabiga',
      'Kigobe',
      'Rohero',
      'Kanyosha',
      'Ruziba',
      'Kinama',
      'Gihosha',
      'Kiriri',
      'Musaga',
      'Ntare',
      'Cibitoke',
      'Ngagara',
      'Gatoke',
      'Vugizo',
      'Kwijabe',
      'Gasenyi',
      'Kavumu',
      'Rukaramu',
      'Taba',
      'Bwiza',
      'Gatete'
    ];

    const provinces = [
      'Bujumbura',
      'Gitega',
      'Butanyerera',
      'Buhumuza',
      'Burunga'
    ];

    const roles:
      UserRole[] = [
        'CLIENT',
        'CLIENT',
        'CLIENT',
        'AGENT',
        'SUPER_AGENT',
        'SHAREHOLDER'
      ];

    const statuses:
      UserStatus[] = [
        'ACTIVE',
        'ACTIVE',
        'ACTIVE',
        'SUSPENDED',
        'CLOSED'
      ];

    const users: User[] = [];

    for (
      let i = 1;
      i <= 96;
      i++
    ) {

      const firstName =
        firstNames[
          i %
          firstNames.length
        ] || 'Jean';

      const lastName =
        lastNames[
          i %
          lastNames.length
        ] || 'Niyonzima';

      const role =
        roles[
          i %
          roles.length
        ] || 'CLIENT';

      const status =
        statuses[
          i %
          statuses.length
        ] || 'ACTIVE';

      const province =
        provinces[
          i %
          provinces.length
        ] || 'Bujumbura';

      const commune =
        communes[
          i %
          communes.length
        ] || 'Mukaza';

      const zone =
        zones[
          i %
          zones.length
        ] || 'Nyakabiga';

      let createdBy = {
        ...DEFAULT_CREATOR
      };

      if (
        role === 'CLIENT'
      ) {

        const creatorIndex =
          (i + 1) %
          firstNames.length;

        createdBy = {
          id:
            `agent-${creatorIndex + 1}`,

          firstName:
            firstNames[
              creatorIndex
            ] || 'Agent',

          lastName:
            lastNames[
              creatorIndex %
              lastNames.length
            ] || 'IBLOPAY',

          role:
            'AGENT'
        };

      } else if (
        role === 'AGENT'
      ) {

        const creatorIndex =
          (i + 4) %
          firstNames.length;

        createdBy = {
          id:
            `super-${creatorIndex + 1}`,

          firstName:
            firstNames[
              creatorIndex
            ] || 'Super',

          lastName:
            lastNames[
              creatorIndex %
              lastNames.length
            ] || 'Agent',

          role:
            'SUPER_AGENT'
        };

      } else if (
        role === 'SHAREHOLDER'
      ) {

        createdBy = {
          id: 'admin-001',
          firstName: 'Admin',
          lastName: 'IBLOPAY',
          role: 'ADMIN'
        };
      }

      users.push({
        id:
          `user-${String(i)
            .padStart(4, '0')}`,

        firstName,

        lastName,

        email:
          `${firstName
            .toLowerCase()}.` +
          `${lastName
            .toLowerCase()}` +
          `@iblopay.bi`,

        phone:
          `+257 79 ${String(
            100000 + i * 37
          ).padStart(6, '0')}`,

        photoUrl: '',

        role,

        status,

        cardNumber:
          `CARD-${String(
            20240000 +
            i * 123
          )}`,

        cniNumber:
          `CNI-${String(
            100000 +
            i * 7
          )}`,

        address: {
          zone,
          commune,
          province,

          fullAddress:
            `${zone}; ` +
            `${commune}; ` +
            `${province}`
        },

        createdAt:
          new Date(
            2026,
            i % 8,
            (i % 27) + 1
          ),

        createdBy,

        accountNumber:
          `IBL-${String(
            100000000 +
            i * 98765
          )}`,

        walletBalance:
          Math.round(
            (
              100000 +
              i * 15000
            ) /
            100
          ) *
          100
      });
    }

    return users;
  }

  refreshAll(): void {
    const term =
      this.searchTerm
        .toLowerCase()
        .trim();

    this.filteredUsers =
      this.users.filter(
        user => {

          const matchesSearch =
            !term ||
            user.firstName
              .toLowerCase()
              .includes(term) ||
            user.lastName
              .toLowerCase()
              .includes(term) ||
            user.email
              .toLowerCase()
              .includes(term) ||
            user.phone
              .toLowerCase()
              .includes(term) ||
            user.cardNumber
              .toLowerCase()
              .includes(term) ||
            user.cniNumber
              .toLowerCase()
              .includes(term) ||
            user.accountNumber
              .toLowerCase()
              .includes(term) ||
            user.address
              .fullAddress
              .toLowerCase()
              .includes(term);

          const matchesRole =
            !this.selectedRole ||
            user.role ===
            this.selectedRole;

          const matchesStatus =
            !this.selectedStatus ||
            user.status ===
            this.selectedStatus;

          return (
            matchesSearch &&
            matchesRole &&
            matchesStatus
          );
        }
      );

    this.totalPages =
      Math.max(
        1,
        Math.ceil(
          this.filteredUsers.length /
          this.itemsPerPage
        )
      );

    if (
      this.currentPage >
      this.totalPages
    ) {
      this.currentPage =
        this.totalPages;
    }

    const startIndex =
      (
        this.currentPage - 1
      ) *
      this.itemsPerPage;

    const endIndex =
      Math.min(
        startIndex +
        this.itemsPerPage,

        this.filteredUsers.length
      );

    this.paginatedUsers =
      this.filteredUsers.slice(
        startIndex,
        endIndex
      );

    this.updateStats();
  }

  updateStats(): void {
    this.stats.total =
      this.users.length;

    this.stats.clients =
      this.users.filter(
        user =>
          user.role ===
          'CLIENT'
      ).length;

    this.stats.agents =
      this.users.filter(
        user =>
          user.role ===
          'AGENT'
      ).length;

    this.stats.superAgents =
      this.users.filter(
        user =>
          user.role ===
          'SUPER_AGENT'
      ).length;

    this.stats.shareholders =
      this.users.filter(
        user =>
          user.role ===
          'SHAREHOLDER'
      ).length;
  }

  private updateOnlineUsers(): void {
    if (
      this.users.length === 0
    ) {
      this.stats.active = 0;

      return;
    }

    const eligibleUsers =
      this.users.filter(
        user =>
          user.status ===
          'ACTIVE'
      ).length;

    if (
      eligibleUsers === 0
    ) {
      this.stats.active = 0;

      return;
    }

    const minimum =
      Math.max(
        1,
        Math.floor(
          eligibleUsers *
          0.30
        )
      );

    const maximum =
      Math.max(
        minimum,
        Math.floor(
          eligibleUsers *
          0.85
        )
      );

    const current =
      this.stats.active;

    let nextValue =
      current +
      this.randomNumber(
        -4,
        5
      );

    if (
      nextValue < minimum ||
      current === 0
    ) {
      nextValue =
        this.randomNumber(
          minimum,
          maximum
        );
    }

    if (
      nextValue > maximum
    ) {
      nextValue = maximum;
    }

    this.stats.active =
      nextValue;
  }

  applyFilters(): void {
    this.currentPage = 1;

    this.refreshAll();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';

    this.selectedRole = '';

    this.selectedStatus = '';

    this.applyFilters();
  }

  changePage(
    page: number
  ): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;

    this.refreshAll();
  }

  getPaginationPages():
    number[] {

    const pages:
      number[] = [];

    const maxVisible = 5;

    let start =
      Math.max(
        1,
        this.currentPage -
        Math.floor(
          maxVisible / 2
        )
      );

    const end =
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

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  }

  getInitials(
    firstName: string,
    lastName: string
  ): string {

    return (
      firstName.charAt(0) +
      lastName.charAt(0)
    ).toUpperCase();
  }

  getAvatarColor(
    id: string
  ): string {

    const colors = [
      '#7da7cf',
      '#7eb49d',
      '#c0a175',
      '#839fc0',
      '#83ad9b',
      '#bf9f78'
    ];

    let hash = 0;

    for (
      let i = 0;
      i < id.length;
      i++
    ) {
      hash =
        id.charCodeAt(i) +
        (
          (hash << 5) -
          hash
        );
    }

    return colors[
      Math.abs(hash) %
      colors.length
    ] || '#7da7cf';
  }

  getStatusClass(
    status: string
  ): string {

    return (
      'status-' +
      status.toLowerCase()
    );
  }

  getStatusLabel(
    status: string
  ): string {

    const labels:
      Record<string, string> = {

      ACTIVE:
        'Actif',

      SUSPENDED:
        'Suspendu',

      CLOSED:
        'Fermé'
    };

    return (
      labels[status] ||
      status
    );
  }

  getToggleTitle(
    status: string
  ): string {

    if (status === 'ACTIVE') {
      return 'Désactiver le compte';
    }

    if (status === 'SUSPENDED') {
      return 'Compte suspendu - Activer';
    }

    return 'Compte fermé - Activer';
  }

  getRoleClass(
    role: string
  ): string {

    return (
      'role-' +
      role
        .toLowerCase()
        .replace(
          /_/g,
          '-'
        )
    );
  }

  getRoleLabel(
    role: string
  ): string {

    const labels:
      Record<string, string> = {

      CLIENT:
        'Client',

      AGENT:
        'Agent',

      SUPER_AGENT:
        'Super Agent',

      SHAREHOLDER:
        'Actionnaire'
    };

    return (
      labels[role] ||
      role
    );
  }

  getCreatorRoleLabel(
    role: string
  ): string {

    const labels:
      Record<string, string> = {

      AGENT:
        'Agent',

      SUPER_AGENT:
        'Super Agent',

      ADMIN:
        'Administrateur'
    };

    return (
      labels[role] ||
      ''
    );
  }

  printUsers(): void {
    this.openPrintableView(
      'Liste des utilisateurs IBLOPAY'
    );
  }

  exportPdf(): void {
    this.openPrintableView(
      'Liste des utilisateurs IBLOPAY - PDF'
    );
  }

  exportExcel(): void {
    const rows =
      this.filteredUsers
        .map(
          user => `
            <tr>
              <td>${this.escapeHtml(user.id)}</td>
              <td>${this.escapeHtml(
                user.firstName +
                ' ' +
                user.lastName
              )}</td>
              <td>${this.escapeHtml(
                this.getRoleLabel(
                  user.role
                )
              )}</td>
              <td>${this.escapeHtml(user.email)}</td>
              <td>${this.escapeHtml(user.phone)}</td>
              <td>${this.escapeHtml(
                user.address.fullAddress
              )}</td>
              <td>${this.escapeHtml(
                user.cardNumber
              )}</td>
              <td>${this.escapeHtml(
                user.cniNumber
              )}</td>
              <td>${this.escapeHtml(
                this.getStatusLabel(
                  user.status
                )
              )}</td>
            </tr>
          `
        )
        .join('');

    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
        </head>

        <body>

          <table border="1">

            <thead>

              <tr>
                <th>ID</th>
                <th>Utilisateur</th>
                <th>Rôle</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Adresse</th>
                <th>Carte</th>
                <th>CNI</th>
                <th>Statut</th>
              </tr>

            </thead>

            <tbody>
              ${rows}
            </tbody>

          </table>

        </body>
      </html>
    `;

    const blob =
      new Blob(
        [
          '\ufeff',
          html
        ],
        {
          type:
            'application/vnd.ms-excel;charset=utf-8'
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
      `utilisateurs-iblopay-${this.getFileDate()}.xls`;

    document.body
      .appendChild(link);

    link.click();

    document.body
      .removeChild(link);

    URL.revokeObjectURL(url);
  }

  private openPrintableView(
    title: string
  ): void {

    const printWindow =
      window.open(
        '',
        '_blank',
        'width=1400,height=900'
      );

    if (!printWindow) {
      return;
    }

    const rows =
      this.filteredUsers
        .map(
          user => `
            <tr>

              <td>

                <strong>
                  ${this.escapeHtml(
                    user.firstName +
                    ' ' +
                    user.lastName
                  )}
                </strong>

                <br>

                <small>
                  ${this.escapeHtml(
                    user.id
                  )}
                </small>

              </td>

              <td>
                ${this.escapeHtml(
                  this.getRoleLabel(
                    user.role
                  )
                )}
              </td>

              <td>
                ${this.escapeHtml(
                  user.email
                )}
                <br>
                ${this.escapeHtml(
                  user.phone
                )}
              </td>

              <td>
                ${this.escapeHtml(
                  user.address
                    .fullAddress
                )}
              </td>

              <td>
                ${this.escapeHtml(
                  user.cardNumber
                )}
                <br>
                ${this.escapeHtml(
                  user.cniNumber
                )}
              </td>

              <td>
                ${this.escapeHtml(
                  this.getStatusLabel(
                    user.status
                  )
                )}
              </td>

            </tr>
          `
        )
        .join('');

    printWindow.document.write(`
      <!DOCTYPE html>

      <html>

      <head>

        <meta charset="UTF-8">

        <title>
          ${this.escapeHtml(title)}
        </title>

        <style>

          @page {
            size: A4 landscape;
            margin: 8mm;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;

            font-family:
              Arial,
              sans-serif;

            color: #26394d;

            background: #ffffff;
          }

          .report {
            width: 100%;
          }

          .report-header {
            display: flex;

            align-items: flex-end;

            justify-content:
              space-between;

            margin-bottom: 8px;

            padding-bottom: 6px;

            border-bottom:
              1px solid #d8e1e9;
          }

          h1 {
            margin: 0;

            color: #203f60;

            font-size: 16px;
          }

          .subtitle {
            margin-top: 3px;

            color: #6c7e90;

            font-size: 8px;
          }

          .meta {
            color: #617487;

            font-size: 8px;

            text-align: right;
          }

          .summary {
            display: flex;

            gap: 11px;

            margin-bottom: 7px;

            color: #556a7f;

            font-size: 7.5px;
          }

          .summary strong {
            color: #29455f;
          }

          table {
            width: 100%;

            border-collapse:
              collapse;

            table-layout:
              fixed;

            font-size: 7.5px;
          }

          thead {
            display:
              table-header-group;
          }

          tr {
            page-break-inside:
              avoid;
          }

          th {
            padding: 5px 4px;

            border:
              1px solid #d6e0e9;

            background:
              #edf4f9;

            color: #334f6a;

            font-size: 7px;

            text-align: left;
          }

          td {
            padding: 4px;

            border:
              1px solid #e0e7ee;

            vertical-align: top;

            line-height: 1.25;

            overflow-wrap:
              anywhere;
          }

          tbody tr:nth-child(even) {
            background:
              #f8fafc;
          }

          th:nth-child(1),
          td:nth-child(1) {
            width: 18%;
          }

          th:nth-child(2),
          td:nth-child(2) {
            width: 11%;
          }

          th:nth-child(3),
          td:nth-child(3) {
            width: 20%;
          }

          th:nth-child(4),
          td:nth-child(4) {
            width: 20%;
          }

          th:nth-child(5),
          td:nth-child(5) {
            width: 19%;
          }

          th:nth-child(6),
          td:nth-child(6) {
            width: 12%;
          }

          small {
            color: #8090a0;

            font-size: 6.5px;
          }

        </style>

      </head>

      <body>

        <div class="report">

          <div class="report-header">

            <div>

              <h1>
                Liste des utilisateurs IBLOPAY
              </h1>

              <div class="subtitle">
                Clients, agents, super agents et actionnaires
              </div>

            </div>

            <div class="meta">
              Date :
              ${new Date()
                .toLocaleString(
                  'fr-FR'
                )}
            </div>

          </div>


          <div class="summary">

            <span>
              Total :
              <strong>
                ${this.filteredUsers.length}
              </strong>
            </span>

            <span>
              Clients :
              <strong>
                ${this.stats.clients}
              </strong>
            </span>

            <span>
              Agents :
              <strong>
                ${this.stats.agents}
              </strong>
            </span>

            <span>
              Super Agents :
              <strong>
                ${this.stats.superAgents}
              </strong>
            </span>

            <span>
              Actionnaires :
              <strong>
                ${this.stats.shareholders}
              </strong>
            </span>

            <span>
              En ligne :
              <strong>
                ${this.stats.active}
              </strong>
            </span>

          </div>


          <table>

            <thead>

              <tr>
                <th>Utilisateur</th>
                <th>Rôle</th>
                <th>Contact</th>
                <th>Adresse</th>
                <th>Documents</th>
                <th>Statut</th>
              </tr>

            </thead>

            <tbody>
              ${rows}
            </tbody>

          </table>

        </div>


        <script>

          window.onload =
            function() {

              setTimeout(
                function() {

                  window.print();

                },
                250
              );

            };

        </script>

      </body>

      </html>
    `);

    printWindow.document.close();
  }

  private escapeHtml(
    value: unknown
  ): string {

    const text =
      String(
        value ?? ''
      );

    return text
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

  private getFileDate():
    string {

    const now =
      new Date();

    const year =
      now.getFullYear();

    const month =
      String(
        now.getMonth() + 1
      ).padStart(
        2,
        '0'
      );

    const day =
      String(
        now.getDate()
      ).padStart(
        2,
        '0'
      );

    return (
      `${year}-${month}-${day}`
    );
  }

  private randomNumber(
    min: number,
    max: number
  ): number {

    return Math.floor(
      Math.random() *
      (
        max -
        min +
        1
      )
    ) + min;
  }

  onViewUser(
    user: User
  ): void {

    this.router.navigate([
      '/users',
      user.id
    ]);
  }

  onToggleUserStatus(
    user: User
  ): void {

    if (!user) {
      return;
    }

    const newStatus: UserStatus =
      user.status === 'ACTIVE'
        ? 'SUSPENDED'
        : 'ACTIVE';

    this.users = this.users.map(item => {

      if (item.id === user.id) {
        return {
          ...item,
          status: newStatus
        };
      }

      return item;
    });

    this.refreshAll();

    this.updateOnlineUsers();
  }

  onEditUser(
    user: User
  ): void {

    this.router.navigate([
      '/users',
      user.id,
      'edit'
    ]);
  }

  onFundUser(
    user: User
  ): void {

    this.router.navigate([
      '/users',
      user.id,
      'fund'
    ]);
  }

  onToggleStatus(
    user: User
  ): void {

    this.selectedUser = user;

    this.currentUserStatus =
      user.status;

    this.selectedNewStatus =
      user.status;

    this.statusError = '';

    this.statusSuccess = '';

    this.showStatusModal =
      true;
  }

  closeStatusModal(): void {
    this.showStatusModal =
      false;

    this.selectedUser =
      null;

    this.statusError = '';

    this.statusSuccess = '';

    this.statusLoading =
      false;
  }

  onStatusChange(): void {
    this.statusError = '';

    this.statusSuccess = '';
  }

  selectStatus(
    value: string
  ): void {

    this.selectedNewStatus =
      value;

    this.onStatusChange();
  }

  confirmStatusChange(): void {
    if (
      !this.selectedUser ||
      !this.selectedNewStatus
    ) {
      return;
    }

    if (
      this.selectedNewStatus ===
      this.currentUserStatus
    ) {

      this.statusError =
        'Veuillez sélectionner un statut différent';

      return;
    }

    this.statusLoading = true;

    this.statusError = '';

    this.statusSuccess = '';

    window.setTimeout(
      () => {

        const oldStatus =
          this.selectedUser!.status;

        const userId =
          this.selectedUser!.id;

        const newStatus =
          this.selectedNewStatus as
            UserStatus;

        this.users =
          this.users.map(
            user => {

              if (
                user.id ===
                userId
              ) {
                return {
                  ...user,
                  status:
                    newStatus
                };
              }

              return user;
            }
          );

        if (
          this.selectedUser
        ) {
          this.selectedUser.status =
            newStatus;
        }

        this.refreshAll();

        this.updateOnlineUsers();

        this.statusLoading =
          false;

        this.statusSuccess =
          `Statut changé de "${this.getStatusLabel(oldStatus)}" à "${this.getStatusLabel(newStatus)}" avec succès.`;

        window.setTimeout(
          () => {
            this.closeStatusModal();
          },
          1500
        );

      },
      800
    );
  }

  getStatusOptionLabel(
    status: string
  ): string {

    const option =
      this.statusOptions.find(
        item =>
          item.value === status
      );

    return (
      option?.label ||
      status
    );
  }

  getStatusOptionColor(
    status: string
  ): string {

    const option =
      this.statusOptions.find(
        item =>
          item.value === status
      );

    return (
      option?.color ||
      '#73808d'
    );
  }

  getStatusOptionIcon(
    status: string
  ): string {

    const option =
      this.statusOptions.find(
        item =>
          item.value === status
      );

    return (
      option?.icon ||
      'fa-circle'
    );
  }

  onDeleteUser(
    user: User
  ): void {

    this.selectedUser = user;

    this.deleteError = '';

    this.deleteSuccess = '';

    this.showDeleteModal =
      true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal =
      false;

    this.selectedUser =
      null;

    this.deleteError = '';

    this.deleteSuccess = '';

    this.deleteLoading =
      false;
  }

  confirmDelete(): void {
    if (
      !this.selectedUser
    ) {

      this.deleteError =
        'Aucun utilisateur sélectionné';

      return;
    }

    this.deleteLoading = true;

    this.deleteError = '';

    this.deleteSuccess = '';

    window.setTimeout(
      () => {

        const userId =
          this.selectedUser!.id;

        const userName =
          `${this.selectedUser!.firstName} ` +
          `${this.selectedUser!.lastName}`;

        this.users =
          this.users.filter(
            user =>
              user.id !==
              userId
          );

        this.refreshAll();

        this.updateOnlineUsers();

        this.deleteLoading =
          false;

        this.deleteSuccess =
          `Utilisateur "${userName}" supprimé avec succès.`;

        window.setTimeout(
          () => {
            this.closeDeleteModal();
          },
          1500
        );

      },
      800
    );
  }
}