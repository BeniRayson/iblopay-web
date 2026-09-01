// src/app/modules/auth/two-factor-auth/two-factor-auth.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, timer, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AUTH_CONSTANTS } from '../auth.constants';
import { otpValidator } from '../validators/email.validator';

@Component({
  selector: 'app-two-factor-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.scss']
})
export class TwoFactorAuthComponent implements OnInit, OnDestroy {
  otpForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  phoneNumber = '';
  maskedPhone = '';
  
  cooldown = AUTH_CONSTANTS.OTP_RESEND_COOLDOWN;
  canResend = false;
  timerSub?: Subscription;
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get phone number from query params
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.phoneNumber = params['phone'] || '';
      if (!this.phoneNumber) {
        // Fallback to login if no phone provided
        this.router.navigate([AUTH_CONSTANTS.LOGIN_ROUTE]);
        return;
      }
      this.maskPhoneNumber();
    });

    this.otpForm = this.fb.group({
      otp_code: ['', [Validators.required, otpValidator()]]
    });

    this.startResendTimer();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }

  maskPhoneNumber(): void {
    const len = this.phoneNumber.length;
    if (len > 7) {
      this.maskedPhone = this.phoneNumber.substring(0, len - 6) + '••••' + this.phoneNumber.substring(len - 2);
    } else {
      this.maskedPhone = this.phoneNumber;
    }
  }

  startResendTimer(): void {
    this.canResend = false;
    this.cooldown = AUTH_CONSTANTS.OTP_RESEND_COOLDOWN;
    
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

    this.timerSub = timer(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.cooldown > 0) {
          this.cooldown--;
        } else {
          this.canResend = true;
          if (this.timerSub) {
            this.timerSub.unsubscribe();
          }
        }
      });
  }

  resendOtp(): void {
    if (!this.canResend) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.forgotPassword({ phone_number: this.phoneNumber }).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = AUTH_CONSTANTS.MESSAGES.OTP_RESENT;
          this.startResendTimer();
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || AUTH_CONSTANTS.MESSAGES.NETWORK_ERROR;
      }
    });
  }

  onSubmit(): void {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request = {
      phone_number: this.phoneNumber,
      otp_code: this.otpForm.value.otp_code
    };

    this.authService.verifyTwoFactor(request).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = AUTH_CONSTANTS.MESSAGES.LOGIN_SUCCESS;
          setTimeout(() => {
            this.router.navigate([AUTH_CONSTANTS.DASHBOARD_ROUTE]);
          }, 1000);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || AUTH_CONSTANTS.MESSAGES.OTP_INVALID;
      }
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.otpForm.get(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return 'Le code de vérification est requis';
    if (control.errors['otpFormat']) return control.errors['otpFormat'];
    if (control.errors['otpLength']) return control.errors['otpLength'];

    return 'Code invalide';
  }
}
