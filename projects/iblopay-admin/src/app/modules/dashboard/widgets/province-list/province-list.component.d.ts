import { OnInit } from '@angular/core';
export declare class ProvinceListComponent implements OnInit {
    data: any[];
    total: number;
    totalLabel: string;
    colorClass: string;
    showTotal: boolean;
    change: number;
    constructor();
    ngOnInit(): void;
    getColorClass(amount: number): string;
    formatAmount(amount: number): string;
}
//# sourceMappingURL=province-list.component.d.ts.map