import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AUTH_CONSTANTS } from '../auth.constants';
import { phoneValidator } from '../validators/email.validator';
import { pinValidator } from '../validators/password.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;

  isLoading = false;
  errorMessage = '';
  sessionExpired = false;
  showPin = false;

  currentYear = new Date().getFullYear();

  readonly testIdentifier = '+25779551080';
  readonly testPin = '5816';

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      phone_number: [
        '',
        [
          Validators.required,
          phoneValidator()
        ]
      ],
      pin: [
        '',
        [
          Validators.required,
          pinValidator()
        ]
      ]
    });

    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(params => {

        if (params['expired'] === 'true') {

          this.sessionExpired = true;

          this.errorMessage =
            AUTH_CONSTANTS.MESSAGES.SESSION_EXPIRED;

        }

      });

  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();

  }

  onSubmit(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.isLoading = true;
    this.errorMessage = '';
    this.sessionExpired = false;

    const credentials = {
      phone_number:
        this.loginForm.value.phone_number?.trim(),

      pin:
        this.loginForm.value.pin
    };

    this.authService
      .login(credentials)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: response => {

          this.isLoading = false;

          if (
            response.success &&
            response.data?.user
          ) {

            this.router.navigate([
              AUTH_CONSTANTS.DASHBOARD_ROUTE
            ]);

          }

        },

        error: error => {

          this.isLoading = false;

          if (error.status === 401) {

            this.errorMessage =
              AUTH_CONSTANTS.MESSAGES.LOGIN_FAILED;

          } else if (error.status === 0) {

            this.errorMessage =
              AUTH_CONSTANTS.MESSAGES.NETWORK_ERROR;

          } else if (
            error.status === 403 &&
            error.error?.requires_2fa
          ) {

            this.router.navigate(
              [
                AUTH_CONSTANTS.TWO_FACTOR_ROUTE
              ],
              {
                queryParams: {
                  phone:
                    credentials.phone_number
                }
              }
            );

          } else {

            this.errorMessage =
              error.userMessage ||
              error.error?.message ||
              AUTH_CONSTANTS.MESSAGES.LOGIN_FAILED;

          }

        }

      });

  }

  utiliserCompteTest(): void {

    this.loginForm.patchValue({
      phone_number: this.testIdentifier,
      pin: this.testPin
    });

    this.errorMessage = '';
    this.sessionExpired = false;

  }

  togglePinVisibility(): void {

    this.showPin =
      !this.showPin;

  }

  getFieldError(
    fieldName: string
  ): string {

    const control =
      this.loginForm.get(fieldName);

    if (
      !control ||
      !control.errors ||
      !control.touched
    ) {

      return '';

    }

    if (
      control.errors['required']
    ) {

      return 'Ce champ est requis';

    }

    if (
      control.errors['phoneFormat']
    ) {

      return control.errors['phoneFormat'];

    }

    if (
      control.errors['pinFormat']
    ) {

      return control.errors['pinFormat'];

    }

    if (
      control.errors['pinMinLength']
    ) {

      return control.errors['pinMinLength'];

    }

    if (
      control.errors['pinMaxLength']
    ) {

      return control.errors['pinMaxLength'];

    }

    return 'Valeur invalide';

  }

}