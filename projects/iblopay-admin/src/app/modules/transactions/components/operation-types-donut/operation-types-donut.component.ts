import { Component, Input } from '@angular/core';
import { OperationTypeStats } from '../../models/transaction-hub.model';

@Component({
  selector: 'app-operation-types-donut',
  templateUrl: './operation-types-donut.component.html',
  styleUrls: ['./operation-types-donut.component.scss']
})
export class OperationTypesDonutComponent {
  @Input() types: OperationTypeStats[] = [];

  get totalCount(): number {
    return this.types.reduce((sum, t) => sum + t.count, 0);
  }

  getConicGradient(): string {
    let currentDeg = 0;
    const parts = this.types.map(t => {
      const deg = (t.percentage / 100) * 360;
      const start = currentDeg;
      const end = currentDeg + deg;
      currentDeg = end;
      return `${t.color} ${start}deg ${end}deg`;
    });
    return `conic-gradient(${parts.join(', ')})`;
  }
}