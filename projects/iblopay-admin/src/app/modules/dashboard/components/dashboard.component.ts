import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

interface StatCard {
  label: string;
  value: number;
  icon: string;
  color: 'blue' | 'green' | 'orange';
  type: 'number' | 'amount';
}

type TransactionChannel =
  | 'Wallet'
  | 'Carte';

type TransactionType =
  | 'Transfert'
  | 'Retrait'
  | 'Dépôt'
  | 'Paiement';

type TransactionStatus =
  | 'Réussi'
  | 'Échec';

interface LiveTransaction {
  id: string;
  reference: string;
  senderName: string;
  senderChannel: TransactionChannel;
  senderAccount: string;
  amount: number;
  receiverName: string;
  receiverChannel: TransactionChannel;
  receiverAccount: string;
  type: TransactionType;
  status: TransactionStatus;
}

interface CommissionTransaction {
  id: string;
  reference: string;
  agent: number;
  superAgent: number;
  shareholders: number;
  iblopay: number;
}

interface RecentAction {
  id: string;
  action: string;
  author: string;
  target: string;
  date: string;
  icon: string;
  color:
    | 'blue'
    | 'green'
    | 'orange';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent
  implements OnInit, OnDestroy {

  currentDay = '';
  currentTime = '';

  isRefreshing = false;

  private clockTimer?: number;
  private realtimeTimer?: number;
  private actionTimer?: number;

  private transactionSequence = 1245;

  statsData = {
    users: 28456,
    agents: 1248,
    superAgents: 86,
    merchants: 3275,
    shareholders: 54,
    instantTransactions: 152730,
    agentCommission: 24580300,
    shareholderCommission: 12420850,
    superAgentCommission: 8965400,
    circulatingAmount: 1842560000,
    trustAccount: 720350000
  };

  liveTransactions: LiveTransaction[] = [];

  commissions: CommissionTransaction[] = [];

  recentActions: RecentAction[] = [];

  private readonly firstNames = [
    'Jean Claude',
    'Emmanuel',
    'Aline',
    'Jean Pierre',
    'Clarisse',
    'Thierry',
    'Olivier',
    'Marie',
    'Samuel',
    'Patrick',
    'Sandrine',
    'Didier',
    'Claude',
    'Brigitte',
    'Eric'
  ];

  private readonly lastNames = [
    'Niyonkuru',
    'Hakizimana',
    'Nshimirimana',
    'Ndayishimiye',
    'Mukeshimana',
    'Nkurunziza',
    'Ndayizeye',
    'Iradukunda',
    'Manirakiza',
    'Nduwimana',
    'Niyonzima',
    'Irakoze',
    'Niyokwizera',
    'Nsabimana'
  ];

  private readonly businessNames = [
    'Société BELTRONIC',
    'Fournisseur Global SARL',
    'Marché Central',
    'Hôtel Source du Nil',
    'Boutique ISANGO',
    'Agence KAYO',
    'Smart Shop',
    'Royal Business',
    'City Market',
    'Bora Market'
  ];

  private readonly actionTargets = [
    'Agence KAYO',
    'Boutique ISANGO',
    'Jean Paul Ndayimana',
    'Emmanuel Hakizimana',
    'Société Horizon SA',
    'Aline Nshimirimana',
    'Réseau BLESSING',
    'Smart Shop',
    'Royal Business'
  ];

  ngOnInit(): void {
    this.updateClock();

    this.generateInitialTransactions();

    this.generateInitialActions();

    this.clockTimer =
      window.setInterval(
        () => {
          this.updateClock();
        },
        1000
      );

    this.realtimeTimer =
      window.setInterval(
        () => {
          this.addRealtimeTransaction();
        },
        3200
      );

    this.actionTimer =
      window.setInterval(
        () => {
          this.addRecentAction();
        },
        8500
      );
  }

  ngOnDestroy(): void {
    if (this.clockTimer) {
      window.clearInterval(
        this.clockTimer
      );
    }

    if (this.realtimeTimer) {
      window.clearInterval(
        this.realtimeTimer
      );
    }

    if (this.actionTimer) {
      window.clearInterval(
        this.actionTimer
      );
    }
  }

  get statCards(): StatCard[] {
    return [
      {
        label:
          'Utilisateurs',

        value:
          this.statsData.users,

        icon:
          'fa-solid fa-users',

        color:
          'blue',

        type:
          'number'
      },

      {
        label:
          'Agents',

        value:
          this.statsData.agents,

        icon:
          'fa-solid fa-user-tie',

        color:
          'green',

        type:
          'number'
      },

      {
        label:
          'Super Agents',

        value:
          this.statsData.superAgents,

        icon:
          'fa-solid fa-user',

        color:
          'blue',

        type:
          'number'
      },

      {
        label:
          'Marchands',

        value:
          this.statsData.merchants,

        icon:
          'fa-solid fa-store',

        color:
          'orange',

        type:
          'number'
      },

      {
        label:
          'Actionnaires',

        value:
          this.statsData.shareholders,

        icon:
          'fa-solid fa-users',

        color:
          'green',

        type:
          'number'
      },

      {
        label:
          'Transactions instantanées',

        value:
          this.statsData.instantTransactions,

        icon:
          'fa-solid fa-arrow-right-arrow-left',

        color:
          'blue',

        type:
          'number'
      },

      {
        label:
          'Commission des agents',

        value:
          this.statsData.agentCommission,

        icon:
          'fa-solid fa-coins',

        color:
          'blue',

        type:
          'amount'
      },

      {
        label:
          'Commission des actionnaires',

        value:
          this.statsData.shareholderCommission,

        icon:
          'fa-solid fa-chart-pie',

        color:
          'green',

        type:
          'amount'
      },

      {
        label:
          'Commission des super agents',

        value:
          this.statsData.superAgentCommission,

        icon:
          'fa-solid fa-money-bill-wave',

        color:
          'orange',

        type:
          'amount'
      },

      {
        label:
          'Montant en circulation',

        value:
          this.statsData.circulatingAmount,

        icon:
          'fa-solid fa-wallet',

        color:
          'blue',

        type:
          'amount'
      },

      {
        label:
          'Trust Account',

        value:
          this.statsData.trustAccount,

        icon:
          'fa-solid fa-building-columns',

        color:
          'orange',

        type:
          'amount'
      }
    ];
  }

  refreshData(): void {
    if (this.isRefreshing) {
      return;
    }

    this.isRefreshing = true;

    this.generateInitialTransactions();

    this.generateInitialActions();

    this.statsData.instantTransactions +=
      this.randomNumber(
        20,
        100
      );

    window.setTimeout(
      () => {
        this.isRefreshing = false;
      },
      700
    );
  }

  formatNumber(
    value: number
  ): string {
    return value.toLocaleString(
      'fr-FR'
    );
  }

  formatAmount(
    value: number
  ): string {
    return (
      value.toLocaleString(
        'fr-FR'
      ) +
      ' FBu'
    );
  }

  getTransactionTypeClass(
    type: TransactionType
  ): string {
    switch (type) {
      case 'Dépôt':
        return 'deposit';

      case 'Retrait':
        return 'withdrawal';

      case 'Paiement':
        return 'payment';

      default:
        return 'transfer';
    }
  }

  trackTransaction(
    index: number,
    transaction: LiveTransaction
  ): string {
    return transaction.id;
  }

  trackCommission(
    index: number,
    commission: CommissionTransaction
  ): string {
    return commission.id;
  }

  trackAction(
    index: number,
    action: RecentAction
  ): string {
    return action.id;
  }

  private updateClock(): void {
    const now =
      new Date();

    const formattedDay =
      now.toLocaleDateString(
        'fr-FR',
        {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      );

    this.currentDay =
      formattedDay
        .charAt(0)
        .toUpperCase() +
      formattedDay.slice(1);

    this.currentTime =
      now.toLocaleTimeString(
        'fr-FR',
        {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }
      );
  }

  private generateInitialTransactions(): void {
    const transactions:
      LiveTransaction[] = [];

    const commissions:
      CommissionTransaction[] = [];

    for (
      let index = 0;
      index < 8;
      index++
    ) {
      const transaction =
        this.createTransaction();

      transactions.push(
        transaction
      );

      commissions.push(
        this.createCommission(
          transaction
        )
      );
    }

    this.liveTransactions =
      transactions;

    this.commissions =
      commissions;
  }

  private addRealtimeTransaction(): void {
    const transaction =
      this.createTransaction();

    const commission =
      this.createCommission(
        transaction
      );

    this.liveTransactions.unshift(
      transaction
    );

    this.commissions.unshift(
      commission
    );

    this.liveTransactions =
      this.liveTransactions.slice(
        0,
        8
      );

    this.commissions =
      this.commissions.slice(
        0,
        8
      );

    this.statsData
      .instantTransactions += 1;

    if (
      transaction.status ===
      'Réussi'
    ) {
      this.statsData
        .circulatingAmount +=
        Math.round(
          transaction.amount *
          0.15
        );

      this.statsData
        .agentCommission +=
        commission.agent;

      this.statsData
        .superAgentCommission +=
        commission.superAgent;

      this.statsData
        .shareholderCommission +=
        commission.shareholders;

      this.statsData
        .trustAccount +=
        Math.round(
          transaction.amount *
          0.04
        );
    }
  }

  private createTransaction():
    LiveTransaction {

    this.transactionSequence += 1;

    const senderChannel:
      TransactionChannel =
      Math.random() > 0.45
        ? 'Wallet'
        : 'Carte';

    const receiverChannel:
      TransactionChannel =
      Math.random() > 0.45
        ? 'Wallet'
        : 'Carte';

    const types:
      TransactionType[] = [
        'Transfert',
        'Retrait',
        'Dépôt',
        'Paiement'
      ];

    const type =
      types[
        this.randomNumber(
          0,
          types.length - 1
        )
      ]!;

    const senderName =
      Math.random() > 0.18
        ? this.randomPerson()
        : this.randomBusiness();

    const receiverName =
      Math.random() > 0.40
        ? this.randomPerson()
        : this.randomBusiness();

    return {
      id:
        this.generateId(),

      reference:
        this.generateReference(),

      senderName,

      senderChannel,

      senderAccount:
        senderChannel === 'Wallet'
          ? this.generatePhoneNumber()
          : this.generateCardNumber(),

      amount:
        this.randomTransactionAmount(),

      receiverName,

      receiverChannel,

      receiverAccount:
        receiverChannel === 'Wallet'
          ? this.generatePhoneNumber()
          : this.generateCardNumber(),

      type,

      status:
        Math.random() > 0.13
          ? 'Réussi'
          : 'Échec'
    };
  }

  private createCommission(
    transaction: LiveTransaction
  ): CommissionTransaction {

    if (
      transaction.status ===
      'Échec'
    ) {
      return {
        id:
          transaction.id,

        reference:
          transaction.reference,

        agent: 0,

        superAgent: 0,

        shareholders: 0,

        iblopay: 0
      };
    }

    const totalCommission =
      Math.max(
        500,
        Math.round(
          transaction.amount *
          0.04
        )
      );

    const agent =
      Math.round(
        totalCommission *
        0.25
      );

    const superAgent =
      Math.round(
        totalCommission *
        0.125
      );

    const shareholders =
      Math.round(
        totalCommission *
        0.175
      );

    const iblopay =
      totalCommission -
      agent -
      superAgent -
      shareholders;

    return {
      id:
        transaction.id,

      reference:
        transaction.reference,

      agent,

      superAgent,

      shareholders,

      iblopay
    };
  }

  private generateInitialActions(): void {
    this.recentActions = [
      {
        id:
          this.generateId(),

        action:
          'Nouvel agent créé',

        author:
          'Admin IBLOPAY',

        target:
          'Agence KAYO',

        date:
          this.currentActionTime(),

        icon:
          'fa-solid fa-plus',

        color:
          'green'
      },

      {
        id:
          this.generateId(),

        action:
          'Marchand approuvé',

        author:
          'Admin IBLOPAY',

        target:
          'Boutique ISANGO',

        date:
          this.currentActionTime(),

        icon:
          'fa-solid fa-store',

        color:
          'blue'
      },

      {
        id:
          this.generateId(),

        action:
          'Retrait rejeté',

        author:
          'Système',

        target:
          'Jean Paul Ndayimana',

        date:
          this.currentActionTime(),

        icon:
          'fa-solid fa-xmark',

        color:
          'orange'
      },

      {
        id:
          this.generateId(),

        action:
          'Wallet crédité',

        author:
          'Admin IBLOPAY',

        target:
          'Emmanuel Hakizimana',

        date:
          this.currentActionTime(),

        icon:
          'fa-solid fa-wallet',

        color:
          'blue'
      },

      {
        id:
          this.generateId(),

        action:
          'Actionnaire ajouté',

        author:
          'Admin IBLOPAY',

        target:
          'Société Horizon SA',

        date:
          this.currentActionTime(),

        icon:
          'fa-solid fa-users',

        color:
          'orange'
      },

      {
        id:
          this.generateId(),

        action:
          'Utilisateur mis à jour',

        author:
          'Admin IBLOPAY',

        target:
          'Aline Nshimirimana',

        date:
          this.currentActionTime(),

        icon:
          'fa-solid fa-pen',

        color:
          'blue'
      },

      {
        id:
          this.generateId(),

        action:
          'Super agent validé',

        author:
          'Admin IBLOPAY',

        target:
          'Réseau BLESSING',

        date:
          this.currentActionTime(),

        icon:
          'fa-solid fa-user',

        color:
          'green'
      }
    ];
  }

  private addRecentAction(): void {
    const actions = [
      {
        action:
          'Nouvel agent créé',

        icon:
          'fa-solid fa-plus',

        color:
          'green' as const
      },

      {
        action:
          'Marchand approuvé',

        icon:
          'fa-solid fa-store',

        color:
          'blue' as const
      },

      {
        action:
          'Wallet crédité',

        icon:
          'fa-solid fa-wallet',

        color:
          'blue' as const
      },

      {
        action:
          'Actionnaire ajouté',

        icon:
          'fa-solid fa-users',

        color:
          'orange' as const
      },

      {
        action:
          'Utilisateur mis à jour',

        icon:
          'fa-solid fa-pen',

        color:
          'blue' as const
      },

      {
        action:
          'Super agent validé',

        icon:
          'fa-solid fa-user',

        color:
          'green' as const
      }
    ];

    const selected =
      actions[
        this.randomNumber(
          0,
          actions.length - 1
        )
      ]!;

    const newAction:
      RecentAction = {

      id:
        this.generateId(),

      action:
        selected.action,

      author:
        'Admin IBLOPAY',

      target:
        this.actionTargets[
          this.randomNumber(
            0,
            this.actionTargets.length - 1
          )
        ]!,

      date:
        this.currentActionTime(),

      icon:
        selected.icon,

      color:
        selected.color
    };

    this.recentActions.unshift(
      newAction
    );

    this.recentActions =
      this.recentActions.slice(
        0,
        7
      );
  }

  private randomPerson(): string {
    return (
      this.firstNames[
        this.randomNumber(
          0,
          this.firstNames.length - 1
        )
      ] +
      ' ' +
      this.lastNames[
        this.randomNumber(
          0,
          this.lastNames.length - 1
        )
      ]
    );
  }

  private randomBusiness(): string {
    return this.businessNames[
      this.randomNumber(
        0,
        this.businessNames.length - 1
      )
    ]!;
  }

  private generatePhoneNumber(): string {
    const prefixes = [
      '079',
      '076',
      '077',
      '078'
    ];

    const prefix =
      prefixes[
        this.randomNumber(
          0,
          prefixes.length - 1
        )
      ];

    return (
      prefix +
      this.randomNumber(
        100000,
        999999
      )
    );
  }

  private generateCardNumber(): string {
    const part1 =
      this.randomNumber(
        2500,
        2599
      );

    const part2 =
      this.randomNumber(
        1000,
        9999
      );

    const part3 =
      this.randomNumber(
        1000,
        9999
      );

    const part4 =
      this.randomNumber(
        1000,
        9999
      );

    return (
      `${part1} ` +
      `${part2} ` +
      `${part3} ` +
      `${part4}`
    );
  }

  private randomTransactionAmount(): number {
    const amount =
      this.randomNumber(
        5,
        150
      ) *
      5000;

    return amount;
  }

  private generateReference(): string {
    return (
      'TRX-' +
      new Date().getFullYear() +
      '-' +
      String(
        this.transactionSequence
      ).padStart(
        6,
        '0'
      )
    );
  }

  private currentActionTime(): string {
    const now =
      new Date();

    const date =
      now.toLocaleDateString(
        'fr-FR',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      );

    const time =
      now.toLocaleTimeString(
        'fr-FR',
        {
          hour: '2-digit',
          minute: '2-digit'
        }
      );

    return (
      `${date} ${time}`
    );
  }

  private randomNumber(
    min: number,
    max: number
  ): number {
    return Math.floor(
      Math.random() *
      (max - min + 1)
    ) + min;
  }

  private generateId(): string {
    return (
      Date.now()
        .toString(36) +
      Math.random()
        .toString(36)
        .substring(
          2,
          8
        )
    );
  }
}