import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

registerLocaleData(localeFr);

type BusStatus = 'En service' | 'Hors-ligne' | 'En maintenance';
interface BusRow {
  plate: string;
  status: BusStatus;
  driver: string;
  revenue: number;
  deposit: number;
  sync: string;
}
interface PaymentRow { time: string; bus: string; route: string; amount: number; card: string; }
interface AlertRow { title: string; subtitle: string; time: string; kind: 'danger' | 'warning'; }

@Component({
  selector: 'app-transport-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport-dashboard.component.html',
  styleUrls: ['./transport-dashboard.component.scss']
})
export class TransportDashboardComponent implements OnInit {
  readonly topBusImage = 'assets/images/bus1.jpg';
  period = 'today';
  vehicleType = 'all';
  selectedBus = 'all';
  lastRefresh = new Date();
  visibleBusCount = 10;
  visiblePaymentCount = 10;
  selectedAlert: AlertRow | null = null;
  selectedPayment: PaymentRow | null = null;


  readonly buses: BusRow[] = [
    { plate: 'BK 7320', status: 'En service', driver: 'Ndayishimiye J.', revenue: 620000, deposit: 580000, sync: '10:42' },
    { plate: 'TK 4587', status: 'En service', driver: 'Hakizimana P.', revenue: 540000, deposit: 500000, sync: '10:38' },
    { plate: 'BK 6412', status: 'En service', driver: 'Niyonsaba E.', revenue: 480000, deposit: 450000, sync: '10:31' },
    { plate: 'TK 6721', status: 'En service', driver: 'Nkurunziza F.', revenue: 420000, deposit: 380000, sync: '10:27' },
    { plate: 'BK 3842', status: 'Hors-ligne', driver: 'Nsabimana D.', revenue: 310000, deposit: 0, sync: '07:15' },
    { plate: 'TK 5298', status: 'En service', driver: 'Uwimana S.', revenue: 290000, deposit: 280000, sync: '10:18' },
    { plate: 'BK 9017', status: 'En service', driver: 'Manirakiza L.', revenue: 260000, deposit: 250000, sync: '10:12' },
    { plate: 'TK 3361', status: 'En maintenance', driver: 'Niyonkuru V.', revenue: 240000, deposit: 220000, sync: '10:05' },
    { plate: 'BK 7320', status: 'En service', driver: 'Biramahire J.', revenue: 220000, deposit: 210000, sync: '09:58' },
    { plate: 'TK 4587', status: 'En service', driver: 'Habimana C.', revenue: 200000, deposit: 190000, sync: '09:41' },
    { plate: 'BK 1103', status: 'En service', driver: 'Ndayizeye A.', revenue: 180000, deposit: 175000, sync: '09:35' },
    { plate: 'TK 2240', status: 'En service', driver: 'Nkurikiye B.', revenue: 170000, deposit: 165000, sync: '09:29' }
  ];

  readonly payments: PaymentRow[] = [
    { time: '10:42', bus: 'BK 7320', route: 'Gitega', amount: 120000, card: '4582' },
    { time: '10:38', bus: 'TK 4587', route: 'Rumonge', amount: 95000, card: '7812' },
    { time: '10:31', bus: 'BK 6412', route: 'Muyinga', amount: 110000, card: '6521' },
    { time: '10:27', bus: 'TK 6721', route: 'Ngozi', amount: 85000, card: '9933' },
    { time: '10:18', bus: 'BK 3842', route: 'Bujumbura', amount: 70000, card: '4471' },
    { time: '10:12', bus: 'TK 5298', route: 'Kayanza', amount: 60000, card: '2208' },
    { time: '10:05', bus: 'BK 9017', route: 'Gitega', amount: 100000, card: '7710' },
    { time: '09:58', bus: 'TK 3361', route: 'Rumonge', amount: 75000, card: '5583' },
    { time: '09:52', bus: 'BK 7320', route: 'Ngozi', amount: 90000, card: '1122' },
    { time: '09:47', bus: 'TK 4587', route: 'Bujumbura', amount: 60000, card: '3345' },
    { time: '09:32', bus: 'BK 6412', route: 'Gitega', amount: 80000, card: '6691' }
  ];

  readonly alerts: AlertRow[] = [
    { title: 'Bus BK 7320 hors-ligne', subtitle: 'Depuis 2h 15min', time: '08:12', kind: 'danger' },
    { title: 'Écart de versement important', subtitle: 'Bus TK 4587 - 245 000 BIF', time: '07:46', kind: 'warning' },
    { title: 'Échec de synchronisation', subtitle: 'Bus BK 3842 - 3h 40min', time: '06:32', kind: 'danger' },
    { title: 'Bus TK 6721 en retard', subtitle: 'Sur l’itinéraire Gitega - Bujumbura', time: '05:21', kind: 'danger' }
  ];

  readonly topBuses = [
    { plate: 'BK 7320', route: 'Bujumbura - Gitega', revenue: 6250000, share: 22 },
    { plate: 'TK 4587', route: 'Bujumbura - Rumonge', revenue: 5980000, share: 18 },
    { plate: 'BK 6412', route: 'Bujumbura - Muyinga', revenue: 4760000, share: 15 }
  ];
  readonly topRoutes = [
    { name: 'Bujumbura - Gitega', revenue: 8750000 },
    { name: 'Bujumbura - Rumonge', revenue: 6920000 },
    { name: 'Bujumbura - Muyinga', revenue: 5480000 },
    { name: 'Bujumbura - Ngozi', revenue: 4760000 },
    { name: 'Bujumbura - Kayanza', revenue: 3980000 }
  ];
  readonly revenueHistory = [670, 610, 760, 940, 660, 790, 930, 1110, 790, 810, 830, 920, 890, 1000, 1190, 950, 790, 860, 920, 790, 940, 1160, 1000, 1150, 940, 1250, 1130, 1330, 1300];
  readonly chartLabels = ['13 Mai', '16 Mai', '19 Mai', '22 Mai', '25 Mai', '28 Mai', '31 Mai', '03 Juin', '06 Juin', '09 Juin', '11 Juin'];
  chartPoints = '';
  chartArea = '';
  chartDots: { x: number; y: number }[] = [];

  ngOnInit(): void { this.buildChart(); }

  get filteredBuses(): BusRow[] {
    return this.buses.filter(bus => (this.vehicleType !== 'minibus') && (this.selectedBus === 'all' || bus.plate === this.selectedBus));
  }
  get filteredPayments(): PaymentRow[] {
    return this.payments.filter(payment => (this.vehicleType !== 'minibus') && (this.selectedBus === 'all' || payment.bus === this.selectedBus));
  }
  get activeBuses(): number { return this.filteredBuses.filter(bus => bus.status === 'En service').length; }
  get uniqueBusPlates(): string[] { return [...new Set(this.buses.map(bus => bus.plate))]; }
  get selectedPeriodLabel(): string { return this.period === 'today' ? 'du jour' : this.period === 'week' ? 'de la semaine' : 'du mois'; }

  formatBif(amount: number): string {
    return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(amount)} BIF`;
  }
  formatNumber(amount: number): string { return new Intl.NumberFormat('fr-FR').format(amount); }
  trackByIndex(index: number): number { return index; }
  refresh(): void { this.lastRefresh = new Date(); this.visibleBusCount = 10; this.visiblePaymentCount = 10; }
  showAllBuses(): void { this.visibleBusCount = this.filteredBuses.length; }
  showAllPayments(): void { this.visiblePaymentCount = this.filteredPayments.length; }
  viewAlert(alert: AlertRow): void { this.selectedAlert = alert; }
  viewPayment(payment: PaymentRow): void { this.selectedPayment = payment; }
  closeDialog(): void { this.selectedAlert = null; this.selectedPayment = null; }

  private buildChart(): void {
    const left = 36, top = 12, width = 646, height = 184, max = 2000;
    this.chartDots = this.revenueHistory.map((value, index) => ({
      x: left + index * width / (this.revenueHistory.length - 1),
      y: top + height - value / max * height
    }));
    this.chartPoints = this.chartDots.map(point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');
    this.chartArea = `${left},${top + height} ${this.chartPoints} ${left + width},${top + height}`;
  }
}
