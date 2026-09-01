import { Component, Input } from '@angular/core';
import { TopActor } from '../../models/transaction-hub.model';

@Component({
  selector: 'app-top-actors',
  templateUrl: './top-actors.component.html',
  styleUrls: ['./top-actors.component.scss']
})
export class TopActorsComponent {
  @Input() actors: TopActor[] = [];
  @Input() title = 'Top acteurs par volume';
  selectedTab: 'super-agents' | 'agents' | 'clients' | 'merchants' = 'super-agents';

  readonly tabs = [
    { key: 'super-agents' as const, label: 'Super Agents' },
    { key: 'agents' as const, label: 'Agents' },
    { key: 'clients' as const, label: 'Clients' },
    { key: 'merchants' as const, label: 'Marchands' }
  ];

  setTab(key: 'super-agents' | 'agents' | 'clients' | 'merchants'): void {
    this.selectedTab = key;
  }
}