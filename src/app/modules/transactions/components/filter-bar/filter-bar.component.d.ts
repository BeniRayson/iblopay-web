import { EventEmitter } from '@angular/core';
export interface HubFilter {
    search: string;
    type: string;
    actor: string;
    role: string;
    status: string;
    dateFrom: string;
    dateTo: string;
}
export declare class FilterBarComponent {
    filterChange: EventEmitter<HubFilter>;
    advancedFilters: EventEmitter<void>;
    filter: HubFilter;
    readonly types: string[];
    readonly actors: string[];
    readonly roles: string[];
    readonly statuses: string[];
    emitChange(): void;
    reset(): void;
    onAdvancedFilters(): void;
}
//# sourceMappingURL=filter-bar.component.d.ts.map