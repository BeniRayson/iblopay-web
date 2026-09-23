import { TopActor } from '../../models/transaction-hub.model';
export declare class TopActorsComponent {
    actors: TopActor[];
    title: string;
    selectedTab: 'super-agents' | 'agents' | 'clients' | 'merchants';
    readonly tabs: ({
        key: "super-agents";
        label: string;
    } | {
        key: "agents";
        label: string;
    } | {
        key: "clients";
        label: string;
    } | {
        key: "merchants";
        label: string;
    })[];
    setTab(key: 'super-agents' | 'agents' | 'clients' | 'merchants'): void;
}
//# sourceMappingURL=top-actors.component.d.ts.map