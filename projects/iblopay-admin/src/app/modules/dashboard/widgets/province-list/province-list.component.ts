import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-province-list',
    template: `
    <div class="province-list">
      <div class="list-header" *ngIf="totalLabel">
        <span class="total-label">{{ totalLabel }}</span>
        <span class="total-value" [class]="colorClass">{{ total | number:'1.0-0':'fr' }} Fbu</span>
        <span class="change-badge" [class.positive]="change >= 0" [class.negative]="change < 0" *ngIf="change !== 0">
          {{ change > 0 ? '+' : '' }}{{ change }}%
        </span>
      </div>
      <div class="province-items">
        <div class="province-item" *ngFor="let item of data">
          <span class="province-name">
            <i class="fa-solid fa-location-dot"></i>
            {{ item.name }}
          </span>
          <span class="province-amount" [class]="item.color || getColorClass(item.amount)">
            {{ item.amount | number:'1.0-0':'fr' }} Fbu
          </span>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .province-list {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .province-list .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .province-list .list-header .total-label {
      font-size: 13px;
      color: #8896b3;
    }
    .province-list .list-header .total-value {
      font-size: 18px;
      font-weight: 800;
    }
    .province-list .list-header .total-value.green { color: #22c55e; }
    .province-list .list-header .total-value.blue { color: #60a5fa; }
    .province-list .list-header .total-value.purple { color: #a855f7; }
    .province-list .list-header .total-value.gold { color: #f5c842; }
    .province-list .list-header .total-value.orange { color: #f97316; }
    .province-list .list-header .total-value.cyan { color: #06b6d4; }
    .province-list .list-header .change-badge {
      font-size: 11px;
      font-weight: 600;
    }
    .province-list .list-header .change-badge.positive { color: #22c55e; }
    .province-list .list-header .change-badge.negative { color: #ef4444; }
    .province-list .province-items {
      flex: 1;
    }
    .province-list .province-items .province-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      font-size: 12px;
      transition: all 0.3s ease;
      border-radius: 4px;
    }
    .province-list .province-items .province-item:hover {
      background: rgba(255, 255, 255, 0.04);
      padding-left: 12px;
    }
    .province-list .province-items .province-item .province-name {
      color: #8896b3;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .province-list .province-items .province-item .province-name i {
      font-size: 14px;
      opacity: 0.7;
    }
    .province-list .province-items .province-item .province-amount {
      font-weight: 700;
      font-size: 12px;
      font-family: 'Inter', monospace;
    }
    .province-list .province-items .province-item .province-amount.green { color: #22c55e; }
    .province-list .province-items .province-item .province-amount.blue { color: #60a5fa; }
    .province-list .province-items .province-item .province-amount.orange { color: #f97316; }
    .province-list .province-items .province-item .province-amount.purple { color: #a855f7; }
    .province-list .province-items .province-item .province-amount.gold { color: #f5c842; }
    .province-list .province-items .province-item .province-amount.cyan { color: #06b6d4; }
    :host-context(body.light-mode) .province-item .province-name {
      color: #475569;
    }
    :host-context(body.light-mode) .province-item .province-amount {
      color: #0f172a;
    }
  `]
})
export class ProvinceListComponent implements OnInit {
    @Input() data: any[] = [];
    @Input() total: number = 0;
    @Input() totalLabel: string = 'Total';
    @Input() colorClass: string = 'green';
    @Input() showTotal: boolean = true;
    @Input() change: number = 0;

    constructor() { }

    ngOnInit(): void { }

    getColorClass(amount: number): string {
        if (amount > 50000000) return 'gold';
        if (amount > 25000000) return 'blue';
        if (amount > 10000000) return 'green';
        if (amount > 5000000) return 'orange';
        return 'purple';
    }

    formatAmount(amount: number): string {
        return amount.toLocaleString('fr-FR') + ' Fbu';
    }
}