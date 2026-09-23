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
var CommissionsSettingsComponent = function () {
    var _classDecorators = [Component({
            selector: 'app-commissions-settings',
            standalone: true,
            imports: [CommonModule, FormsModule],
            templateUrl: './commissions-settings.component.html',
            styleUrls: ['./commissions-settings.component.scss']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CommissionsSettingsComponent = _classThis = /** @class */ (function () {
        function CommissionsSettingsComponent_1() {
            this.modeEdition = false;
            this.enregistrementEnCours = false;
            this.dernierePublication = null;
            this.ongletActif = 'commissions';
            // Barème 1 — Commission Agent/SA quand le marchand retire (FBU)
            this.baremeRetraitMarchand = {
                id: 'retrait-marchand',
                titre: "Agahembo k'umukozi (Agent) / uwukurira umukozi wa Lumiash (SA) — igihe umudandaza abikuye (FBU)",
                tranches: [
                    { min: 0, max: 50000, agent: 0, sa: null },
                    { min: 50001, max: 70000, agent: 100, sa: null },
                    { min: 70001, max: 100000, agent: 200, sa: null },
                    { min: 100001, max: 150000, agent: 300, sa: null },
                    { min: 150001, max: 200000, agent: 400, sa: null },
                    { min: 200001, max: 300000, agent: 500, sa: null },
                    { min: 300001, max: 400000, agent: 600, sa: null },
                    { min: 400001, max: 500000, agent: 700, sa: null },
                    { min: 500001, max: 600000, agent: 800, sa: null },
                    { min: 600001, max: 700000, agent: 900, sa: null },
                    { min: 700001, max: 999999999, agent: 1000, sa: null },
                ]
            };
            // Barème 2 — Commission Agent/SA quand le client recharge un compte Lumicash (FBU)
            this.baremeRechargeLumicash = {
                id: 'recharge-lumicash',
                titre: "Agahembo k'umukozi (Agent) / uwukurira umukozi wa Lumiash (SA) — igihe bugururirie umunywanyi ikonte ya Lumicash (FBU)",
                tranches: [
                    { min: 0, max: 0, agent: 200, sa: 0 } // "Bidahera" : forfait unique — 100% Agent / 0% SA
                ]
            };
            // Barème 3 — Commission quand le client retire (répartition 90% Agent / 10% SA) — version A
            this.baremeRetraitClientA = {
                id: 'retrait-client-a',
                titre: "Agahembo k'umukozi (Agent) / uwukurira umukozi wa Lumiash (SA) — igihe umunywanyi abikishije (FBU) — Bareme A",
                tranches: [
                    { min: 100, max: 999, total: 10, agent: 9, sa: 1 },
                    { min: 1000, max: 4999, total: 30, agent: 27, sa: 3 },
                    { min: 5000, max: 9999, total: 80, agent: 72, sa: 8 },
                    { min: 10000, max: 19999, total: 100, agent: 90, sa: 10 },
                    { min: 20000, max: 29999, total: 200, agent: 180, sa: 20 },
                    { min: 30000, max: 39999, total: 270, agent: 243, sa: 27 },
                    { min: 40000, max: 49999, total: 360, agent: 324, sa: 36 },
                    { min: 50000, max: 59999, total: 450, agent: 405, sa: 45 },
                    { min: 60000, max: 69999, total: 520, agent: 468, sa: 52 },
                    { min: 70000, max: 79999, total: 600, agent: 540, sa: 60 },
                    { min: 80000, max: 89999, total: 700, agent: 630, sa: 70 },
                    { min: 90000, max: 99999, total: 750, agent: 675, sa: 75 },
                    { min: 100000, max: 199999, total: 800, agent: 720, sa: 80 },
                    { min: 200000, max: 299999, total: 1100, agent: 990, sa: 110 },
                    { min: 300000, max: 399999, total: 1300, agent: 1170, sa: 130 },
                    { min: 400000, max: 499999, total: 1500, agent: 1350, sa: 150 },
                    { min: 500000, max: 1000000, total: 2400, agent: 2160, sa: 240 },
                ]
            };
            // Barème 4 — Commission quand le client retire (répartition 90% Agent / 10% SA) — version B
            this.baremeRetraitClientB = {
                id: 'retrait-client-b',
                titre: "Agahembo k'umukozi (Agent) / uwukurira umukozi wa Lumiash (SA) — igihe umunywanyi abikishije (FBU) — Bareme B",
                tranches: [
                    { min: 100, max: 999, total: null, agent: null, sa: null },
                    { min: 1000, max: 4999, total: 70, agent: 63, sa: 7 },
                    { min: 5000, max: 9999, total: 120, agent: 108, sa: 12 },
                    { min: 10000, max: 19999, total: 180, agent: 162, sa: 18 },
                    { min: 20000, max: 29999, total: 230, agent: 207, sa: 23 },
                    { min: 30000, max: 39999, total: 350, agent: 315, sa: 35 },
                    { min: 40000, max: 49999, total: 450, agent: 405, sa: 45 },
                    { min: 50000, max: 59999, total: 550, agent: 495, sa: 55 },
                    { min: 60000, max: 69999, total: 650, agent: 585, sa: 65 },
                    { min: 70000, max: 79999, total: 750, agent: 675, sa: 75 },
                    { min: 80000, max: 89999, total: 850, agent: 765, sa: 85 },
                    { min: 90000, max: 99999, total: 950, agent: 855, sa: 95 },
                    { min: 100000, max: 199999, total: 1100, agent: 990, sa: 110 },
                    { min: 200000, max: 299999, total: 1800, agent: 1620, sa: 180 },
                    { min: 300000, max: 399999, total: 2200, agent: 1980, sa: 220 },
                    { min: 400000, max: 499999, total: 2600, agent: 2340, sa: 260 },
                    { min: 500000, max: 1000000, total: 4000, agent: 3600, sa: 240 },
                ]
            };
            // Barème 5 — Ibiciro (dépôt / retrait) tel qu'affiché sur la carte agent
            this.baremeCarteAgent = {
                id: 'carte-agent',
                titre: 'Ibiciro — Frais de dépôt et de retrait (carte agent)',
                tranches: [
                    { min: 100, max: 999, depot: null, retrait: null },
                    { min: 1000, max: 4999, depot: 168, retrait: 720 },
                    { min: 5000, max: 9999, depot: 384, retrait: 1380 },
                    { min: 10000, max: 19999, depot: 540, retrait: 1740 },
                    { min: 20000, max: 29999, depot: 840, retrait: 2280 },
                    { min: 30000, max: 39999, depot: 1020, retrait: 2760 },
                    { min: 40000, max: 49999, depot: 1110, retrait: 3000 },
                    { min: 50000, max: 59999, depot: 1200, retrait: 3240 },
                    { min: 60000, max: 69999, depot: 1500, retrait: 3960 },
                    { min: 70000, max: 79999, depot: 1710, retrait: 4320 },
                    { min: 80000, max: 89999, depot: 1840, retrait: 4620 },
                    { min: 90000, max: 99999, depot: 1920, retrait: 4680 },
                    { min: 100000, max: 199999, depot: 2640, retrait: 5880 },
                    { min: 200000, max: 299999, depot: 3400, retrait: 6960 },
                    { min: 300000, max: 399999, depot: 4080, retrait: 9480 },
                    { min: 400000, max: 499999, depot: 4800, retrait: 11520 },
                    { min: 500000, max: 1000000, depot: 5760, retrait: 17040 },
                ]
            };
            // Onglet "Configuration" — un tableau distinct par photo transmise.
            // Pour ajouter un nouveau barème reçu en photo : dupliquer un bloc ci-dessous
            // avec son propre id/titre/tranches.
            this.baremesConfiguration = [
                {
                    id: 'config-carte-agent-1',
                    titre: "Ibiciro — Frais de dépôt et de retrait (carte agent)",
                    tranches: [
                        { min: 100, max: 999, depot: null, retrait: null },
                        { min: 1000, max: 4999, depot: 168, retrait: 720 },
                        { min: 5000, max: 9999, depot: 384, retrait: 1380 },
                        { min: 10000, max: 19999, depot: 540, retrait: 1740 },
                        { min: 20000, max: 29999, depot: 840, retrait: 2280 },
                        { min: 30000, max: 39999, depot: 1020, retrait: 2760 },
                        { min: 40000, max: 49999, depot: 1110, retrait: 3000 },
                        { min: 50000, max: 59999, depot: 1200, retrait: 3240 },
                        { min: 60000, max: 69999, depot: 1500, retrait: 3960 },
                        { min: 70000, max: 79999, depot: 1710, retrait: 4320 },
                        { min: 80000, max: 89999, depot: 1840, retrait: 4620 },
                        { min: 90000, max: 99999, depot: 1920, retrait: 4680 },
                        { min: 100000, max: 199999, depot: 2640, retrait: 5880 },
                        { min: 200000, max: 299999, depot: 3400, retrait: 6960 },
                        { min: 300000, max: 399999, depot: 4080, retrait: 9480 },
                        { min: 400000, max: 499999, depot: 4800, retrait: 11520 },
                        { min: 500000, max: 1000000, depot: 5760, retrait: 17040 },
                    ]
                }
            ];
            // Copies de sauvegarde pour permettre l'annulation d'une édition
            this.snapshot = null;
        }
        CommissionsSettingsComponent_1.prototype.definirOnglet = function (onglet) {
            if (this.modeEdition) {
                this.annulerEdition();
            }
            this.ongletActif = onglet;
        };
        CommissionsSettingsComponent_1.prototype.activerEdition = function () {
            this.snapshot = JSON.stringify({
                a: this.baremeRetraitMarchand,
                b: this.baremeRechargeLumicash,
                c: this.baremeRetraitClientA,
                d: this.baremeRetraitClientB,
                e: this.baremeCarteAgent,
                f: this.baremesConfiguration,
            });
            this.modeEdition = true;
        };
        CommissionsSettingsComponent_1.prototype.annulerEdition = function () {
            var _a;
            if (this.snapshot) {
                var data = JSON.parse(this.snapshot);
                this.baremeRetraitMarchand = data.a;
                this.baremeRechargeLumicash = data.b;
                this.baremeRetraitClientA = data.c;
                this.baremeRetraitClientB = data.d;
                this.baremeCarteAgent = data.e;
                this.baremesConfiguration = (_a = data.f) !== null && _a !== void 0 ? _a : this.baremesConfiguration;
            }
            this.modeEdition = false;
        };
        CommissionsSettingsComponent_1.prototype.enregistrerEtPublier = function () {
            var _this = this;
            this.enregistrementEnCours = true;
            // TODO: remplacer par l'appel réel au service/API de sauvegarde des barèmes
            var payload = {
                retraitMarchand: this.baremeRetraitMarchand,
                rechargeLumicash: this.baremeRechargeLumicash,
                retraitClientA: this.baremeRetraitClientA,
                retraitClientB: this.baremeRetraitClientB,
                carteAgent: this.baremeCarteAgent,
                configuration: this.baremesConfiguration,
            };
            setTimeout(function () {
                // Simulation d'un appel réseau — à remplacer par ex. par
                // this.commissionsService.publierBaremes(payload).subscribe(...)
                console.log('Barèmes à publier :', payload);
                _this.enregistrementEnCours = false;
                _this.modeEdition = false;
                _this.dernierePublication = new Date();
            }, 600);
        };
        CommissionsSettingsComponent_1.prototype.formatMontant = function (valeur) {
            if (valeur === null || valeur === undefined) {
                return 'N/A';
            }
            return valeur.toLocaleString('fr-FR');
        };
        return CommissionsSettingsComponent_1;
    }());
    __setFunctionName(_classThis, "CommissionsSettingsComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CommissionsSettingsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CommissionsSettingsComponent = _classThis;
}();
export { CommissionsSettingsComponent };
//# sourceMappingURL=commissions-settings.component.js.map