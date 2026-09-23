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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
var LeaderboardComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-leaderboard',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './leaderboard.component.html',
            styleUrls: ['./leaderboard.component.scss'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LeaderboardComponent = _classThis = /** @class */ (function () {
        function LeaderboardComponent_1(commissionService) {
            this.commissionService = commissionService;
            this.activeTab = 'agents';
            this.entries = [];
            this.isLoading = true;
            this.activeView = 'admin';
            this.Math = Math;
            this.destroy$ = new Subject();
        }
        LeaderboardComponent_1.prototype.ngOnInit = function () {
            this.loadData();
        };
        LeaderboardComponent_1.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        LeaderboardComponent_1.prototype.onViewChange = function (view) {
            this.activeView = view;
        };
        LeaderboardComponent_1.prototype.onTabChange = function (tab) {
            this.activeTab = tab;
            this.loadData();
        };
        LeaderboardComponent_1.prototype.loadData = function () {
            var _this = this;
            this.isLoading = true;
            var obs = this.activeTab === 'agents'
                ? this.commissionService.getAgentLeaderboard()
                : this.commissionService.getSuperAgentLeaderboard();
            obs.pipe(takeUntil(this.destroy$)).subscribe(function (data) {
                _this.entries = data;
                _this.isLoading = false;
            });
        };
        LeaderboardComponent_1.prototype.formatBif = function (amount) {
            return "".concat(amount.toLocaleString('fr-FR'), " BIF");
        };
        LeaderboardComponent_1.prototype.getTrendIcon = function (trend) {
            if (trend === 'up')
                return 'bi-arrow-up-circle-fill';
            if (trend === 'down')
                return 'bi-arrow-down-circle-fill';
            return 'bi-dash-circle-fill';
        };
        LeaderboardComponent_1.prototype.getTrendColor = function (trend) {
            if (trend === 'up')
                return '#22c55e';
            if (trend === 'down')
                return '#ef4444';
            return '#8896b3';
        };
        LeaderboardComponent_1.prototype.getRankClass = function (rank) {
            if (rank === 1)
                return 'rank-gold';
            if (rank === 2)
                return 'rank-silver';
            if (rank === 3)
                return 'rank-bronze';
            return '';
        };
        return LeaderboardComponent_1;
    }());
    __setFunctionName(_classThis, "LeaderboardComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LeaderboardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LeaderboardComponent = _classThis;
}();
export { LeaderboardComponent };
//# sourceMappingURL=leaderboard.component.js.map