var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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
var SearchService = function () {
    var _classDecorators = [Injectable({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SearchService = _classThis = /** @class */ (function () {
        function SearchService_1() {
            var _this = this;
            this.providers = new Map();
            this.queryInput$ = new Subject();
            this.resultsSubject = new BehaviorSubject([]);
            this.loadingSubject = new BehaviorSubject(false);
            /** Résultats à afficher dans le dropdown du header. */
            this.results$ = this.resultsSubject.asObservable();
            this.loading$ = this.loadingSubject.asObservable();
            this.queryInput$
                .pipe(debounceTime(250), distinctUntilChanged(function (a, b) { return a.moduleKey === b.moduleKey && a.query === b.query; }), switchMap(function (_a) {
                var moduleKey = _a.moduleKey, query = _a.query;
                if (!query || !query.trim()) {
                    return of([]);
                }
                var provider = _this.providers.get(moduleKey);
                _this.loadingSubject.next(true);
                if (!provider) {
                    _this.loadingSubject.next(false);
                    return of([]);
                }
                return provider(query.trim()).pipe(catchError(function () { return of([]); }));
            }))
                .subscribe(function (results) {
                _this.loadingSubject.next(false);
                _this.resultsSubject.next(results);
            });
        }
        /** Un module s'enregistre une seule fois (idempotent : remplace si déjà présent). */
        SearchService_1.prototype.registerProvider = function (moduleKey, provider) {
            this.providers.set(moduleKey, provider);
        };
        SearchService_1.prototype.unregisterProvider = function (moduleKey) {
            this.providers.delete(moduleKey);
        };
        SearchService_1.prototype.hasProvider = function (moduleKey) {
            return this.providers.has(moduleKey);
        };
        /** Appelé par le header à chaque frappe dans le champ de recherche. */
        SearchService_1.prototype.search = function (moduleKey, query) {
            this.queryInput$.next({ moduleKey: moduleKey, query: query });
        };
        SearchService_1.prototype.clear = function () {
            this.resultsSubject.next([]);
        };
        return SearchService_1;
    }());
    __setFunctionName(_classThis, "SearchService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SearchService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SearchService = _classThis;
}();
export { SearchService };
//# sourceMappingURL=search.service.js.map