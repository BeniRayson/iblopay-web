import { Component, Input } from '@angular/core';
import { TransactionSummary } from '../../models/transaction-summary.model';
import { TransactionType } from '../../enums/transaction-type.enum';
import { TRANSACTION_TYPE_META } from '../../transactions.constants';

interface ChartBar {
  label: string;
  icon: string;
  count: number;
  widthPercent: number;
}

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss']
})
export class TransactionChartComponent {
  @Input() summary: TransactionSummary | null = null;

  get bars(): ChartBar[] {
    if (!this.summary) return [];
    const entries = Object.entries(this.summary.countByType) as [TransactionType, number][];
    const max = Math.max(1, ...entries.map(([, count]) => count));

    return entries
      .filter(([, count]) => count > 0)
      .sort(([, a], [, b]) => b - a)
      .map(([type, count]) => ({
        label: TRANSACTION_TYPE_META[type].label,
        icon: TRANSACTION_TYPE_META[type].icon,
        count,
        widthPercent: (count / max) * 100
      }));
  }
}
