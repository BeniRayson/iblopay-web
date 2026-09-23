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
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ServicesPublicsDetailComponent } from './services-publics-detail.component';
import { ServicesPublicsService } from '../../services/services-publics.service';
describe('ServicesPublicsDetailComponent', function () {
    var component;
    var fixture;
    var serviceSpy;
    var routerSpy;
    var mockService = {
        id: 1,
        numero: 1,
        abreviation: 'GPR-RNF',
        description: 'Système de gestion des factures émises par ARCT',
        type: 'INTERNE',
        actif: true,
        dateCreation: new Date('2022-01-15'),
        version: '2.3.1',
        responsable: 'Jean Ndayishimiye',
        email: 'test@test.com',
        telephone: '+257 22 22 22 22',
        siteWeb: 'https://obr.bi'
    };
    function configureTestBed(paramId) {
        serviceSpy = jasmine.createSpyObj('ServicesPublicsService', ['getAll', 'getById', 'update']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            declarations: [ServicesPublicsDetailComponent],
            providers: [
                { provide: ServicesPublicsService, useValue: serviceSpy },
                { provide: Router, useValue: routerSpy },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({ id: paramId })
                        }
                    }
                }
            ]
        }).compileComponents();
    }
    describe('when the service exists', function () {
        beforeEach(function () {
            configureTestBed('1');
            serviceSpy.getById.and.returnValue(of(mockService));
            fixture = TestBed.createComponent(ServicesPublicsDetailComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        it('should create the component', function () {
            expect(component).toBeTruthy();
        });
        it('should call getById with the id from the route', function () {
            expect(serviceSpy.getById).toHaveBeenCalledWith(1);
        });
        it('should load the service and stop loading', function () {
            expect(component.service).toEqual(mockService);
            expect(component.loading).toBeFalse();
            expect(component.notFound).toBeFalse();
        });
        it('should navigate back on goBack()', function () {
            component.goBack();
            expect(routerSpy.navigate).toHaveBeenCalledWith(['../'], { relativeTo: jasmine.any(Object) });
        });
        it('should get service color', function () {
            var color = component.getServiceColor('GPR-RNF');
            expect(color).toBeTruthy();
            expect(typeof color).toBe('string');
            expect(color).toMatch(/^#[0-9a-f]{6}$/i);
        });
        it('should deactivate service from true to false', function () {
            var _a;
            var updatedService = __assign(__assign({}, mockService), { actif: false });
            serviceSpy.update.and.returnValue(of(updatedService));
            component.onDeactivate();
            expect(serviceSpy.update).toHaveBeenCalledWith(updatedService);
            expect((_a = component.service) === null || _a === void 0 ? void 0 : _a.actif).toBeFalse();
        });
        it('should activate service from false to true', function () {
            var _a;
            var inactiveService = __assign(__assign({}, mockService), { actif: false });
            var updatedService = __assign(__assign({}, inactiveService), { actif: true });
            component.service = inactiveService;
            serviceSpy.update.and.returnValue(of(updatedService));
            component.onActivate();
            expect(serviceSpy.update).toHaveBeenCalledWith(updatedService);
            expect((_a = component.service) === null || _a === void 0 ? void 0 : _a.actif).toBeTrue();
        });
        it('should handle error when deactivating service', function () {
            serviceSpy.update.and.returnValue(throwError(function () { return new Error('Erreur'); }));
            expect(function () { return component.onDeactivate(); }).not.toThrow();
        });
        it('should navigate to edit', function () {
            component.onEdit();
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/services-publics/edit', mockService.id]);
        });
        it('should not navigate to edit if no service', function () {
            component.service = undefined;
            component.onEdit();
            expect(routerSpy.navigate).not.toHaveBeenCalled();
        });
    });
    describe('when the service does not exist', function () {
        beforeEach(function () {
            configureTestBed('999');
            serviceSpy.getById.and.returnValue(of(undefined));
            fixture = TestBed.createComponent(ServicesPublicsDetailComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        it('should set notFound to true and service to undefined', function () {
            expect(component.service).toBeUndefined();
            expect(component.notFound).toBeTrue();
            expect(component.loading).toBeFalse();
        });
    });
    describe('when the request fails', function () {
        beforeEach(function () {
            configureTestBed('1');
            serviceSpy.getById.and.returnValue(throwError(function () { return new Error('Erreur réseau'); }));
            fixture = TestBed.createComponent(ServicesPublicsDetailComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        it('should set notFound to true and stop loading on error', function () {
            expect(component.notFound).toBeTrue();
            expect(component.loading).toBeFalse();
            expect(component.service).toBeUndefined();
        });
    });
    describe('avatar color generation', function () {
        it('should return a color for any abbreviation', function () {
            var abbreviations = ['GPR-RNF', 'OTRACO', 'PSR', 'e-CMR', 'SIGFIP'];
            abbreviations.forEach(function (abbr) {
                var color = component.getServiceColor(abbr);
                expect(color).toBeTruthy();
                expect(typeof color).toBe('string');
                expect(color).toMatch(/^#[0-9a-f]{6}$/i);
            });
        });
        it('should return consistent color for same abbreviation', function () {
            var abbr = 'GPR-RNF';
            var color1 = component.getServiceColor(abbr);
            var color2 = component.getServiceColor(abbr);
            expect(color1).toBe(color2);
        });
    });
});
//# sourceMappingURL=services-publics-detail.component.spec.js.map