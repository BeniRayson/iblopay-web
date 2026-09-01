// src/app/modules/auth/reset-password/reset-password.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AUTH_CONSTANTS } from '../auth.constants';
import { otpValidator } from '../validators/email.validator';
import { pinValidator, pinMatchValidator } from '../validators/password.validator';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  phoneNumber = '';
  
  showNewPin = false;
  showConfirmPin = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get phone from query params
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.phoneNumber = params['phone'] || '';
      if (!this.phoneNumber) {
        // Redirect to forgot password if no phone is present
        this.router.navigate([AUTH_CONSTANTS.FORGOT_PASSWORD_ROUTE]);
      }
    });

    this.resetForm = this.fb.group({
      otp_code: ['', [Validators.required, otpValidator()]],
      new_pin: ['', [Validators.required, pinValidator()]],
      confirm_pin: ['', [Validators.required]]
    }, {
      validators: [pinMatchValidator('new_pin', 'confirm_pin')]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleNewPinVisibility(): void {
    this.showNewPin = !this.showNewPin;
  }

  toggleConfirmPinVisibility(): void {
    this.showConfirmPin = !this.showConfirmPin;
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request = {
      phone_number: this.phoneNumber,
      otp_code: this.resetForm.value.otp_code,
      new_pin: this.resetForm.value.new_pin,
      confirm_pin: this.resetForm.value.confirm_pin
    };

    this.authService.resetPassword(request).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = AUTH_CONSTANTS.MESSAGES.PASSWORD_RESET_SUCCESS;
          setTimeout(() => {
            this.router.navigate([AUTH_CONSTANTS.LOGIN_ROUTE]);
          }, 2000);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || AUTH_CONSTANTS.MESSAGES.OTP_INVALID;
      }
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.resetForm.get(fieldName);
    if (!control) return '';

    // Check cross-field mismatch first for confirm_pin
    if (fieldName === 'confirm_pin' && this.resetForm.errors?.['pinMismatch'] && control.touched) {
      return 'Les PINs ne correspondent pas';
    }

    if (!control.errors || !control.touched) return '';

    if (control.errors['required']) return 'Ce champ est requis';
    if (control.errors['otpFormat']) return control.errors['otpFormat'];
    if (control.errors['otpLength']) return control.errors['otpLength'];
    if (control.errors['pinFormat']) return control.errors['pinFormat'];
    if (control.errors['pinMinLength']) return control.errors['pinMinLength'];
    if (control.errors['pinMaxLength']) return control.errors['pinMaxLength'];

    return 'Valeur invalide';
  }
}
