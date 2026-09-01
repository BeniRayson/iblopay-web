// src/app/modules/auth/forgot-password/forgot-password.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AUTH_CONSTANTS } from '../auth.constants';
import { phoneValidator } from '../validators/email.validator';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnDestroy {
  forgotForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  otpSent = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      phone_number: ['', [Validators.required, phoneValidator()]]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const phoneNumber = this.forgotForm.value.phone_number;

    this.authService.forgotPassword({ phone_number: phoneNumber }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.otpSent = true;
          this.successMessage = AUTH_CONSTANTS.MESSAGES.OTP_SENT;
          // Navigate to reset password with phone
          setTimeout(() => {
            this.router.navigate([AUTH_CONSTANTS.RESET_PASSWORD_ROUTE], {
              queryParams: { phone: phoneNumber }
            });
          }, 2000);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.userMessage || 'Ce numéro de téléphone n\'est pas associé à un compte.';
      }
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.forgotForm.get(fieldName);
    if (!control || !control.errors || !control.touched) return '';
    if (control.errors['required']) return 'Ce champ est requis';
    if (control.errors['phoneFormat']) return control.errors['phoneFormat'];
    return 'Valeur invalide';
  }
}
