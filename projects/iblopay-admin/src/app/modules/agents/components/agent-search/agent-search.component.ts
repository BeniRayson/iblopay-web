// src/app/modules/agents/components/agent-search/agent-search.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-agent-search',
  template: `
    <div class="search-container">
      <input 
        type="text" 
        placeholder="🔍 Rechercher un agent..." 
        (input)="onSearch($event)"
        class="search-input"
      />
    </div>
  `,
  styles: [`
    .search-container {
      width: 100%;
    }
    .search-input {
      width: 100%;
      padding: 10px 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s;
      
      &:focus {
        outline: none;
        border-color: #1a237e;
      }
      
      &::placeholder {
        color: #999;
      }
    }
  `]
})
export class AgentSearchComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }
}