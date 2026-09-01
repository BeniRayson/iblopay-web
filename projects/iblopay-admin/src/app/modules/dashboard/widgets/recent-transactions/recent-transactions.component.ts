// src/app/modules/dashboard/widgets/recent-transactions/recent-transactions.component.ts
import { Component, Input } from '@angular/core';
import { Transaction } from '../../models/dashboard.model';

@Component({
    selector: 'app-recent-transactions',
    templateUrl: './recent-transactions.component.html',
    styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent {
    @Input() transactions: Transaction[] = [];

    getTransactionTypeLabel(type: string): string {
        const labels: { [key: string]: string } = {
            'paiement': 'Paiement',
            'recharge': 'Recharge',
            'retrait': 'Retrait',
            'transfert': 'Transfert'
        };
        return labels[type] || type;
    }

    getTransactionStatusLabel(status: string): string {
        const labels: { [key: string]: string } = {
            'success': 'Succès',
            'pending': 'En attente',
            'failed': 'Échoué'
        };
        return labels[status] || status;
    }

    getStatusClass(status: string): string {
        const classes: { [key: string]: string } = {
            'success': 'success',
            'pending': 'pending',
            'failed': 'failed'
        };
        return classes[status] || '';
    }

    formatCurrency(amount: number): string {
        return amount.toLocaleString('fr-FR') + ' FBU';
    }
}