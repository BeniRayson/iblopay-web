// src/app/modules/auth/login/login.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should require phone_number', () => {
    const control = component.loginForm.get('phone_number');
    expect(control?.errors?.['required']).toBeTruthy();
  });

  it('should require pin', () => {
    const control = component.loginForm.get('pin');
    expect(control?.errors?.['required']).toBeTruthy();
  });

  it('should validate phone format', () => {
    const control = component.loginForm.get('phone_number');
    control?.setValue('abc');
    expect(control?.errors?.['phoneFormat']).toBeTruthy();

    control?.setValue('+237699999999');
    expect(control?.errors).toBeNull();
  });

  it('should validate pin format', () => {
    const control = component.loginForm.get('pin');
    control?.setValue('ab');
    expect(control?.errors?.['pinFormat']).toBeTruthy();

    control?.setValue('1234');
    expect(control?.errors).toBeNull();
  });

  it('should toggle pin visibility', () => {
    expect(component.showPin).toBeFalse();
    component.togglePinVisibility();
    expect(component.showPin).toBeTrue();
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit();
    expect(component.loginForm.touched).toBeFalse(); // markAllAsTouched is called
  });
});
