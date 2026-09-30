import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ServicesPublicsListComponent } from './services-publics-list.component';

describe('ServicesPublicsListComponent', () => {
  let component: ServicesPublicsListComponent;
  let fixture: ComponentFixture<ServicesPublicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesPublicsListComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesPublicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the four stat cards', () => {
    expect(component.statCards.length).toBe(4);
  });

  it('should never display more services than the page size', () => {
    expect(component.paginatedServices.length).toBeLessThanOrEqual(component.pageSize);
  });

  it('should filter services by status', () => {
    component.selectedStatus = 'INACTIF';
    component.onFilterChange();

    expect(component.filteredServices.every(service => !service.actif)).toBeTrue();
  });
});
