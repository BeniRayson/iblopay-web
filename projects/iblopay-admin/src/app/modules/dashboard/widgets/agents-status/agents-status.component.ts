// src/app/modules/dashboard/widgets/agents-status/agents-status.component.ts
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-agents-status',
    templateUrl: './agents-status.component.html',
    styleUrls: ['./agents-status.component.scss']
})
export class AgentsStatusComponent {
    @Input() online: number = 0;
    @Input() offline: number = 0;
    @Input() busy: number = 0;

    get total(): number {
        return this.online + this.offline + this.busy;
    }

    get onlinePercentage(): number {
        return this.total > 0 ? (this.online / this.total) * 100 : 0;
    }

    get offlinePercentage(): number {
        return this.total > 0 ? (this.offline / this.total) * 100 : 0;
    }

    get busyPercentage(): number {
        return this.total > 0 ? (this.busy / this.total) * 100 : 0;
    }
}