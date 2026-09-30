import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-agent-filter',
  templateUrl: './agent-filter.component.html',
  styleUrls: ['./agent-filter.component.scss']})
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
