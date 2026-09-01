import { Component, EventEmitter, Output } from '@angular/core';

export interface HubFilter {
  search: string;
  type: string;
  actor: string;
  role: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  @Output() filterChange = new EventEmitter<HubFilter>();
  @Output() advancedFilters = new EventEmitter<void>();

  filter: HubFilter = {
    search: '',
    type: 'Tous',
    actor: 'Tous',
    role: 'Tous',
    status: 'Tous',
    dateFrom: '01/06/2024',
    dateTo: '18/06/2024'
  };

  readonly types = ['Tous', 'Transfert', 'Cash In', 'Cash Out', 'Paiement', 'Appro. SA', 'Paiement facture'];
  readonly actors = ['Tous', 'Clients', 'Agents', 'Super Agents', 'Marchands', 'Admin'];
  readonly roles = ['Tous', 'Expéditeur', 'Destinataire'];
  readonly statuses = ['Tous', 'Réussie', 'En attente', 'Échouée'];

  emitChange(): void {
    this.filterChange.emit({ ...this.filter });
  }

  reset(): void {
    this.filter = { search: '', type: 'Tous', actor: 'Tous', role: 'Tous', status: 'Tous', dateFrom: '', dateTo: '' };
    this.emitChange();
  }

  onAdvancedFilters(): void {
    this.advancedFilters.emit();
  }
}