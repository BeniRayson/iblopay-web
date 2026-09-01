// src/app/modules/agents/components/agent-filter/agent-filter.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-agent-filter',
  template: `
    <div class="filter-container">
      <input 
        type="text" 
        placeholder="Rechercher..." 
        (input)="onSearch($event)"
        class="search-input"
      />
      <select (change)="onStatusChange($event)" class="filter-select">
        <option value="">Tous les statuts</option>
        <option value="ACTIVE">Actif</option>
        <option value="PENDING">En attente</option>
        <option value="SUSPENDED">Suspendu</option>
        <option value="BLOCKED">Bloqué</option>
      </select>
    </div>
  `,
  styles: [`
    .filter-container {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: white;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .search-input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: #1a237e;
      }
    }
    .filter-select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      background: white;
      
      &:focus {
        outline: none;
        border-color: #1a237e;
      }
    }
  `]
})
export class AgentFilterComponent {
  @Output() search = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.statusChange.emit(select.value);
  }
}