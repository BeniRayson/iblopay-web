import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
@Injectable({ providedIn: 'root' })
export class SearchService {
    private providers = new Map<string, SearchProviderFn>();

    private queryInput$ = new Subject<{ moduleKey: string; query: string }>();
    private resultsSubject = new BehaviorSubject<SearchResult[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    /** Résultats à afficher dans le dropdown du header. */
    results$: Observable<SearchResult[]> = this.resultsSubject.asObservable();
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor() {
        this.queryInput$
            .pipe(
                debounceTime(250),
                distinctUntilChanged((a, b) => a.moduleKey === b.moduleKey && a.query === b.query),
                switchMap(({ moduleKey, query }) => {
                    if (!query || !query.trim()) {
                        return of<SearchResult[]>([]);
                    }
                    const provider = this.providers.get(moduleKey);
                    this.loadingSubject.next(true);
                    if (!provider) {
                        this.loadingSubject.next(false);
                        return of<SearchResult[]>([]);
                    }
                    return provider(query.trim()).pipe(
                        catchError(() => of<SearchResult[]>([]))
                    );
                })
            )
            .subscribe((results) => {
                this.loadingSubject.next(false);
                this.resultsSubject.next(results);
            });
    }

    /** Un module s'enregistre une seule fois (idempotent : remplace si déjà présent). */
    registerProvider(moduleKey: string, provider: SearchProviderFn): void {
        this.providers.set(moduleKey, provider);
    }

    unregisterProvider(moduleKey: string): void {
        this.providers.delete(moduleKey);
    }

    hasProvider(moduleKey: string): boolean {
        return this.providers.has(moduleKey);
    }

    /** Appelé par le header à chaque frappe dans le champ de recherche. */
    search(moduleKey: string, query: string): void {
        this.queryInput$.next({ moduleKey, query });
    }

    clear(): void {
        this.resultsSubject.next([]);
    }
}