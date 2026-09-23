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
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { NoAuthGuard } from './modules/auth/guards/no-auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
var routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        loadChildren: function () { return import('./modules/auth/auth.module').then(function (m) { return m.AuthModule; }); }
    },
    // Toutes les routes protégées sous le layout commun (header + sidebar)
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: function () { return import('./modules/dashboard/dashboard.module').then(function (m) { return m.DashboardModule; }); }
            },
            {
                path: 'users',
                loadChildren: function () { return import('./modules/users/users.module').then(function (m) { return m.UsersModule; }); }
            },
            {
                path: 'agents',
                loadChildren: function () { return import('./modules/agents/agents.module').then(function (m) { return m.AgentsModule; }); }
            },
            {
                path: 'super-agents',
                loadChildren: function () { return import('./modules/super-agents/super-agents.module').then(function (m) { return m.SuperAgentsModule; }); }
            },
            {
                path: 'merchants',
                loadChildren: function () { return import('./modules/merchants/merchants.module').then(function (m) { return m.MerchantsModule; }); }
            },
            {
                path: 'clients',
                loadChildren: function () { return import('./modules/clients/clients.module').then(function (m) { return m.ClientsModule; }); }
            },
            {
                path: 'commissions',
                loadChildren: function () { return import('./modules/commissions/commissions.module').then(function (m) { return m.CommissionsModule; }); }
            },
            {
                path: 'transactions',
                loadChildren: function () { return import('./modules/transactions/transactions.module').then(function (m) { return m.TransactionsModule; }); }
            },
            {
                path: 'services-publics',
                loadChildren: function () { return import('./modules/services-publics/services-publics.module').then(function (m) { return m.ServicesPublicsModule; }); }
            },
            {
                path: 'requests',
                loadChildren: function () { return import('./modules/requests/requests.module').then(function (m) { return m.RequestsModule; }); }
            },
            {
                path: 'workflows',
                loadChildren: function () { return import('./modules/workflows/workflows.module').then(function (m) { return m.WorkflowsModule; }); }
            },
            {
                path: 'intra-agricole',
                loadChildren: function () { return import('./modules/intra-agricole/intra-agricole.module').then(function (m) { return m.IntraAgricoleModule; }); }
            },
            {
                path: 'cards',
                loadChildren: function () { return import('./modules/cards/cards.module').then(function (m) { return m.CardsModule; }); }
            },
            {
                path: 'reports',
                loadChildren: function () { return import('./modules/reports/reports.module').then(function (m) { return m.ReportsModule; }); }
            },
            {
                path: 'notifications',
                loadChildren: function () { return import('./modules/notifications/notifications.module').then(function (m) { return m.NotificationsModule; }); }
            },
            {
                path: 'settings',
                loadChildren: function () { return import('./modules/settings/settings.module').then(function (m) { return m.SettingsModule; }); }
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/auth'
    }
];
var AppRoutingModule = function () {
    var _classDecorators = [NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppRoutingModule = _classThis = /** @class */ (function () {
        function AppRoutingModule_1() {
        }
        return AppRoutingModule_1;
    }());
    __setFunctionName(_classThis, "AppRoutingModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppRoutingModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppRoutingModule = _classThis;
}();
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map