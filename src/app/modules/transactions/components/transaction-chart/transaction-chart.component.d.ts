import { TransactionSummary } from '../../models/transaction-summary.model';
interface ChartBar {
    label: string;
    icon: string;
    count: number;
    widthPercent: number;
}
export declare class TransactionChartComponent {
    summary: TransactionSummary | null;
    get bars(): ChartBar[];
}
export {};
//# sourceMappingURL=transaction-chart.component.d.ts.map