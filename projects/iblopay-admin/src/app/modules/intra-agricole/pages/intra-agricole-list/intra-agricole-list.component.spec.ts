import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraAgricoleListComponent } from './intra-agricole-list.component';

describe('IntraAgricoleListComponent', () => {
  let component: IntraAgricoleListComponent;
  let fixture: ComponentFixture<IntraAgricoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntraAgricoleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntraAgricoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
