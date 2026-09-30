import {
  Component,
  Input
} from '@angular/core';

import { Transaction } from '../../models/transaction.model';


@Component({
  selector: 'app-transaction-card',

  templateUrl: './transaction-card.component.html',

  styleUrls: [
    './transaction-card.component.scss'
  ]
})
export class TransactionCardComponent {


  @Input()
  transaction!: Transaction;


  /* =========================================================
     REFERENCE
  ========================================================= */

  getReference(
    transaction: Transaction
  ): string {

    const tx: any = transaction;

    return String(
      tx.reference ??
      tx.transactionReference ??
      tx.transactionNo ??
      tx.transactionNumber ??
      tx.transactionId ??
      tx.id ??
      'Transaction'
    );
  }


  /* =========================================================
     TYPE
  ========================================================= */

  getTypeLabel(
    transaction: Transaction
  ): string {

    const type = this.getRawType(transaction);


    const labels: Record<string, string> = {

      TRANSFER:
        'Transfert',

      SEND:
        'Transfert',

      DEPOSIT:
        'Dépôt',

      CASH_IN:
        'Dépôt',

      WITHDRAWAL:
        'Retrait',

      CASH_OUT:
        'Retrait',

      PAYMENT:
        'Paiement',

      MERCHANT_PAYMENT:
        'Paiement marchand',

      FUND:
        'Approvisionnement',

      COMMISSION:
        'Commission',

      REFUND:
        'Remboursement'

    };


    return labels[type] ??
      this.formatEnum(type);

  }


  getTypeIcon(
    transaction: Transaction
  ): string {

    const type = this.getRawType(transaction);


    if (
      type.includes('DEPOSIT') ||
      type.includes('CASH_IN')
    ) {

      return 'fas fa-arrow-down';

    }


    if (
      type.includes('WITHDRAW') ||
      type.includes('CASH_OUT')
    ) {

      return 'fas fa-arrow-up';

    }


    if (
      type.includes('PAYMENT') ||
      type.includes('MERCHANT')
    ) {

      return 'fas fa-cart-shopping';

    }


    if (
      type.includes('COMMISSION')
    ) {

      return 'fas fa-coins';

    }


    if (
      type.includes('FUND')
    ) {

      return 'fas fa-plus';

    }


    return 'fas fa-arrow-right-arrow-left';

  }


  getTypeClass(
    transaction: Transaction
  ): string {

    const type = this.getRawType(transaction);


    if (
      type.includes('DEPOSIT') ||
      type.includes('CASH_IN') ||
      type.includes('FUND')
    ) {

      return 'type-green';

    }


    if (
      type.includes('WITHDRAW') ||
      type.includes('CASH_OUT')
    ) {

      return 'type-orange';

    }


    if (
      type.includes('PAYMENT') ||
      type.includes('MERCHANT')
    ) {

      return 'type-purple';

    }


    if (
      type.includes('COMMISSION')
    ) {

      return 'type-violet';

    }


    return 'type-blue';

  }


  private getRawType(
    transaction: Transaction
  ): string {

    const tx: any = transaction;

    return String(
      tx.type ??
      tx.transactionType ??
      tx.operationType ??
      ''
    )
      .trim()
      .toUpperCase();

  }


  /* =========================================================
     STATUT
  ========================================================= */

  getStatusLabel(
    status: unknown
  ): string {

    const value =
      String(status ?? '')
        .trim()
        .toUpperCase();


    const labels: Record<string, string> = {

      SUCCESS:
        'Réussie',

      SUCCESSFUL:
        'Réussie',

      COMPLETED:
        'Réussie',

      PENDING:
        'En attente',

      PROCESSING:
        'En cours',

      FAILED:
        'Échouée',

      FAILURE:
        'Échouée',

      CANCELLED:
        'Annulée',

      CANCELED:
        'Annulée'

    };


    return labels[value] ??
      this.formatEnum(value);

  }


  getStatusClass(
    status: unknown
  ): string {

    const value =
      String(status ?? '')
        .trim()
        .toUpperCase();


    if (
      value === 'SUCCESS' ||
      value === 'SUCCESSFUL' ||
      value === 'COMPLETED'
    ) {

      return 'status-success';

    }


    if (
      value === 'FAILED' ||
      value === 'FAILURE'
    ) {

      return 'status-failed';

    }


    if (
      value === 'CANCELLED' ||
      value === 'CANCELED'
    ) {

      return 'status-cancelled';

    }


    if (
      value === 'PROCESSING'
    ) {

      return 'status-processing';

    }


    return 'status-pending';

  }


  /* =========================================================
     DATE
  ========================================================= */

  formatDate(
    value: unknown
  ): string {

    if (!value) {

      return '—';

    }


    const date =
      new Date(
        value as any
      );


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return '—';

    }


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
    ).format(date);

  }


  /* =========================================================
     MONTANT
  ========================================================= */

  formatAmount(
    amount: unknown
  ): string {

    const value =
      Number(
        amount ?? 0
      );


    const currencyCode = 'BIF';

    return (
      new Intl.NumberFormat(
        'fr-FR',
        {
          maximumFractionDigits: 0
        }
      ).format(value)
      +
      ' '
      +
      currencyCode
    );

  }


  /* =========================================================
     UTILITAIRE
  ========================================================= */

  private formatEnum(
    value: string
  ): string {

    if (!value) {

      return '—';

    }


    return value

      .toLowerCase()

      .replace(
        /_/g,
        ' '
      )

      .replace(
        /\b\w/g,
        letter =>
          letter.toUpperCase()
      );

  }

}