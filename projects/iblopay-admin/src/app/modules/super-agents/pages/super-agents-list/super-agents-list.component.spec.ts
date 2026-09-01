import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAgentsListComponent } from './super-agents-list.component';

describe('SuperAgentsListComponent', () => {
  let component: SuperAgentsListComponent;
  let fixture: ComponentFixture<SuperAgentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAgentsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperAgentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
