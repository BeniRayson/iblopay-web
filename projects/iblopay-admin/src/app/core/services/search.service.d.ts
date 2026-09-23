import { Observable } from 'rxjs';
export interface SearchResult {
    id: string;
    label: string;
    sublabel?: string;
    icon?: string;
    link: string | any[];
}
export type SearchProviderFn = (query: string) => Observable<SearchResult[]>;
/**
 * Registre central de recherche.
 *
 * Chaque module (Agents, Utilisateurs, Transactions, ...) enregistre
 * son propre "provider" au démarrage (dans le ngOnInit de son
 * composant racine, ou via un service dédié). Le header ne connaît
 * jamais le détail métier : il délègue simplement au provider du
 * module actuellement affiché.
 *
 * Exemple d'enregistrement, dans un composant du module Agents :
 *
 *   constructor(private searchService: SearchService, private agentService: AgentService) {}
 *
 *   ngOnInit() {
 *     this.searchService.registerProvider('agents', (query) =>
 *       this.agentService.searchAgents(query).pipe(
 *         map(agents => agents.map(a => ({
 *           id: a.id,
 *           label: `${a.firstName} ${a.lastName}`,
 *           sublabel: a.cardNumber,
 *           icon: 'fa-solid fa-user-tie',
 *           link: ['/agents/detail', a.id]
 *         })))
 *       )
 *     );
 *   }
 */
export declare class SearchService {
    private providers;
    private queryInput$;
    private resultsSubject;
    private loadingSubject;
    /** Résultats à afficher dans le dropdown du header. */
    results$: Observable<SearchResult[]>;
    loading$: Observable<boolean>;
    constructor();
    /** Un module s'enregistre une seule fois (idempotent : remplace si déjà présent). */
    registerProvider(moduleKey: string, provider: SearchProviderFn): void;
    unregisterProvider(moduleKey: string): void;
    hasProvider(moduleKey: string): boolean;
    /** Appelé par le header à chaque frappe dans le champ de recherche. */
    search(moduleKey: string, query: string): void;
    clear(): void;
}
//# sourceMappingURL=search.service.d.ts.map