import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesPublicsListComponent } from './services-publics-list.component';

describe('ServicesPublicsListComponent', () => {
  let component: ServicesPublicsListComponent;
  let fixture: ComponentFixture<ServicesPublicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesPublicsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesPublicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
