import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-volume-chart',
  templateUrl: './volume-chart.component.html',
  styleUrls: ['./volume-chart.component.scss']
})
export class VolumeChartComponent {
  @Input() labels: string[] = [];
  @Input() values: number[] = [];
  selectedPeriod: 'today' | '7d' | '30d' | 'custom' = 'today';

  get maxValue(): number {
    return Math.max(...this.values, 1);
  }

  setPeriod(p: 'today' | '7d' | '30d' | 'custom'): void {
    this.selectedPeriod = p;
  }
}