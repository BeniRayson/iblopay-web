var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
var NotificationService = function () {
    var _classDecorators = [Injectable({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NotificationService = _classThis = /** @class */ (function () {
        function NotificationService_1() {
            this.notifications = new BehaviorSubject([]);
            this.notificationMap = new Map();
            this.maxNotifications = 15;
        }
        NotificationService_1.prototype.getForModule = function (moduleKey) {
            return this.notifications.asObservable().pipe(map(function (notifs) {
                if (!moduleKey)
                    return notifs;
                return notifs.filter(function (n) { return n.module === moduleKey || n.module === null; });
            }));
        };
        NotificationService_1.prototype.getUnreadForModule = function (moduleKey) {
            return this.getForModule(moduleKey).pipe(map(function (notifs) { return notifs.filter(function (n) { return !n.read; }); }));
        };
        NotificationService_1.prototype.unreadCountForModule = function (moduleKey) {
            return this.getUnreadForModule(moduleKey).pipe(map(function (notifs) { return notifs.length; }));
        };
        NotificationService_1.prototype.add = function (notification) {
            this.notificationMap.set(notification.id, notification);
            var current = this.notifications.getValue();
            current = __spreadArray([notification], current, true);
            if (current.length > this.maxNotifications) {
                current = current.slice(0, this.maxNotifications);
                var activeIds = new Set(current.map(function (n) { return n.id; }));
                for (var _i = 0, _a = this.notificationMap; _i < _a.length; _i++) {
                    var id = _a[_i][0];
                    if (!activeIds.has(id)) {
                        this.notificationMap.delete(id);
                    }
                }
            }
            this.notifications.next(current);
        };
        NotificationService_1.prototype.markAsRead = function (id) {
            var notif = this.notificationMap.get(id);
            if (notif) {
                notif.read = true;
                this.notificationMap.set(id, notif);
                var current = this.notifications.getValue();
                var updated = current.map(function (n) {
                    if (n.id === id) {
                        return notif;
                    }
                    return n;
                });
                this.notifications.next(updated);
            }
        };
        // ✅ Marquer toutes les notifications d'un module comme lues
        NotificationService_1.prototype.markAllAsReadForModule = function (moduleKey) {
            var _this = this;
            var current = this.notifications.getValue();
            var hasChanges = false;
            var updated = current.map(function (n) {
                var belongsToModule = !moduleKey || n.module === moduleKey || n.module === null;
                if (belongsToModule && !n.read) {
                    hasChanges = true;
                    var notif = _this.notificationMap.get(n.id);
                    if (notif) {
                        notif.read = true;
                        _this.notificationMap.set(n.id, notif);
                        return notif;
                    }
                    return __assign(__assign({}, n), { read: true });
                }
                return n;
            });
            if (hasChanges) {
                this.notifications.next(updated);
            }
        };
        // ✅ Marquer TOUTES les notifications comme lues
        NotificationService_1.prototype.markAllAsRead = function () {
            var _this = this;
            var current = this.notifications.getValue();
            var updated = current.map(function (n) {
                var notif = _this.notificationMap.get(n.id);
                if (notif && !notif.read) {
                    notif.read = true;
                    _this.notificationMap.set(n.id, notif);
                    return notif;
                }
                return __assign(__assign({}, n), { read: true });
            });
            this.notifications.next(updated);
        };
        // ✅ Supprimer toutes les notifications lues
        NotificationService_1.prototype.removeAllRead = function () {
            var current = this.notifications.getValue();
            var unreadOnly = current.filter(function (n) { return !n.read; });
            // Mettre à jour la map
            var activeIds = new Set(unreadOnly.map(function (n) { return n.id; }));
            for (var _i = 0, _a = this.notificationMap; _i < _a.length; _i++) {
                var id = _a[_i][0];
                if (!activeIds.has(id)) {
                    this.notificationMap.delete(id);
                }
            }
            this.notifications.next(unreadOnly);
        };
        // ✅ Supprimer toutes les notifications d'un module
        NotificationService_1.prototype.clearModule = function (moduleKey) {
            var current = this.notifications.getValue();
            var filtered = current.filter(function (n) {
                if (!moduleKey)
                    return true;
                return n.module !== moduleKey && n.module !== null;
            });
            var activeIds = new Set(filtered.map(function (n) { return n.id; }));
            for (var _i = 0, _a = this.notificationMap; _i < _a.length; _i++) {
                var id = _a[_i][0];
                if (!activeIds.has(id)) {
                    this.notificationMap.delete(id);
                }
            }
            this.notifications.next(filtered);
        };
        NotificationService_1.prototype.cleanup = function (beforeDate) {
            var current = this.notifications.getValue();
            var filtered = current.filter(function (n) { return n.date >= beforeDate; });
            if (filtered.length < current.length) {
                var activeIds = new Set(filtered.map(function (n) { return n.id; }));
                for (var _i = 0, _a = this.notificationMap; _i < _a.length; _i++) {
                    var id = _a[_i][0];
                    if (!activeIds.has(id)) {
                        this.notificationMap.delete(id);
                    }
                }
                this.notifications.next(filtered);
            }
        };
        NotificationService_1.prototype.getGlobalNotifications = function () {
            return this.notifications.asObservable();
        };
        NotificationService_1.prototype.clear = function () {
            this.notificationMap.clear();
            this.notifications.next([]);
        };
        return NotificationService_1;
    }());
    __setFunctionName(_classThis, "NotificationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationService = _classThis;
}();
export { NotificationService };
//# sourceMappingURL=notification.service.js.map