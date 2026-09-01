import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ServicesPublicsDetailComponent } from './services-publics-detail.component';
import { ServicesPublicsService } from '../../services/services-publics.service';
import { ServicePublic } from '../../models/service-public.model';

describe('ServicesPublicsDetailComponent', () => {
    let component: ServicesPublicsDetailComponent;
    let fixture: ComponentFixture<ServicesPublicsDetailComponent>;
    let serviceSpy: jasmine.SpyObj<ServicesPublicsService>;
    let routerSpy: jasmine.SpyObj<Router>;

    const mockService: ServicePublic = {
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

    function configureTestBed(paramId: string): void {
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

    describe('when the service exists', () => {
        beforeEach(() => {
            configureTestBed('1');
            serviceSpy.getById.and.returnValue(of(mockService));

            fixture = TestBed.createComponent(ServicesPublicsDetailComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should call getById with the id from the route', () => {
            expect(serviceSpy.getById).toHaveBeenCalledWith(1);
        });

        it('should load the service and stop loading', () => {
            expect(component.service).toEqual(mockService);
            expect(component.loading).toBeFalse();
            expect(component.notFound).toBeFalse();
        });

        it('should navigate back on goBack()', () => {
            component.goBack();
            expect(routerSpy.navigate).toHaveBeenCalledWith(['../'], { relativeTo: jasmine.any(Object) });
        });

        it('should get service color', () => {
            const color = component.getServiceColor('GPR-RNF');
            expect(color).toBeTruthy();
            expect(typeof color).toBe('string');
            expect(color).toMatch(/^#[0-9a-f]{6}$/i);
        });

        it('should deactivate service from true to false', () => {
            const updatedService = { ...mockService, actif: false };
            serviceSpy.update.and.returnValue(of(updatedService));

            component.onDeactivate();

            expect(serviceSpy.update).toHaveBeenCalledWith(updatedService);
            expect(component.service?.actif).toBeFalse();
        });

        it('should activate service from false to true', () => {
            const inactiveService = { ...mockService, actif: false };
            const updatedService = { ...inactiveService, actif: true };
            component.service = inactiveService;
            serviceSpy.update.and.returnValue(of(updatedService));

            component.onActivate();

            expect(serviceSpy.update).toHaveBeenCalledWith(updatedService);
            expect(component.service?.actif).toBeTrue();
        });

        it('should handle error when deactivating service', () => {
            serviceSpy.update.and.returnValue(throwError(() => new Error('Erreur')));
            expect(() => component.onDeactivate()).not.toThrow();
        });

        it('should navigate to edit', () => {
            component.onEdit();
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/services-publics/edit', mockService.id]);
        });

        it('should not navigate to edit if no service', () => {
            component.service = undefined;
            component.onEdit();
            expect(routerSpy.navigate).not.toHaveBeenCalled();
        });
    });

    describe('when the service does not exist', () => {
        beforeEach(() => {
            configureTestBed('999');
            serviceSpy.getById.and.returnValue(of(undefined));

            fixture = TestBed.createComponent(ServicesPublicsDetailComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should set notFound to true and service to undefined', () => {
            expect(component.service).toBeUndefined();
            expect(component.notFound).toBeTrue();
            expect(component.loading).toBeFalse();
        });
    });

    describe('when the request fails', () => {
        beforeEach(() => {
            configureTestBed('1');
            serviceSpy.getById.and.returnValue(throwError(() => new Error('Erreur réseau')));

            fixture = TestBed.createComponent(ServicesPublicsDetailComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should set notFound to true and stop loading on error', () => {
            expect(component.notFound).toBeTrue();
            expect(component.loading).toBeFalse();
            expect(component.service).toBeUndefined();
        });
    });

    describe('avatar color generation', () => {
        it('should return a color for any abbreviation', () => {
            const abbreviations = ['GPR-RNF', 'OTRACO', 'PSR', 'e-CMR', 'SIGFIP'];
            abbreviations.forEach(abbr => {
                const color = component.getServiceColor(abbr);
                expect(color).toBeTruthy();
                expect(typeof color).toBe('string');
                expect(color).toMatch(/^#[0-9a-f]{6}$/i);
            });
        });

        it('should return consistent color for same abbreviation', () => {
            const abbr = 'GPR-RNF';
            const color1 = component.getServiceColor(abbr);
            const color2 = component.getServiceColor(abbr);
            expect(color1).toBe(color2);
        });
    });
});