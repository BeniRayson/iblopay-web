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


@Injectable({ providedIn: 'root' })
export class SearchService {
    private providers = new Map<string, SearchProviderFn>();

    private queryInput$ = new Subject<{ moduleKey: string; query: string }>();
    private resultsSubject = new BehaviorSubject<SearchResult[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);


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


    registerProvider(moduleKey: string, provider: SearchProviderFn): void {
        this.providers.set(moduleKey, provider);
    }

    unregisterProvider(moduleKey: string): void {
        this.providers.delete(moduleKey);
    }

    hasProvider(moduleKey: string): boolean {
        return this.providers.has(moduleKey);
    }


    search(moduleKey: string, query: string): void {
        this.queryInput$.next({ moduleKey, query });
    }

    clear(): void {
        this.resultsSubject.next([]);
    }
}
