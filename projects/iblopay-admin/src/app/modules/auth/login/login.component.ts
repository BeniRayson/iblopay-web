import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Subject,
  takeUntil
} from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AUTH_CONSTANTS } from '../auth.constants';

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

  currentYear =
    new Date().getFullYear();

  private destroy$ =
    new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.createForm();

    this.checkSessionExpired();

  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();

  }

  private createForm(): void {

    this.loginForm =
      this.fb.group({

        phone_number: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\d{8}$/)
          ]
        ],

        pin: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\d{5}$/)
          ]
        ]

      });

  }

  private checkSessionExpired(): void {

    this.route.queryParams
      .pipe(
        takeUntil(
          this.destroy$
        )
      )
      .subscribe(params => {

        if (
          params['expired'] === 'true'
        ) {

          this.sessionExpired = true;

          this.errorMessage =
            AUTH_CONSTANTS
              .MESSAGES
              .SESSION_EXPIRED;

        }

      });

  }

  onSubmit(): void {

    if (this.isLoading) {
      return;
    }

    if (this.loginForm.invalid) {

      this.loginForm
        .markAllAsTouched();

      return;

    }

    this.isLoading = true;
    this.errorMessage = '';
    this.sessionExpired = false;

    const phoneNumber =
      String(
        this.loginForm
          .get('phone_number')
          ?.value || ''
      ).trim();

    const pin =
      String(
        this.loginForm
          .get('pin')
          ?.value || ''
      ).trim();

    const credentials = {
      phone_number: phoneNumber,
      pin
    };

    this.authService
      .login(credentials)
      .pipe(
        takeUntil(
          this.destroy$
        )
      )
      .subscribe({

        next: response => {

          this.isLoading = false;

          if (
            response.success &&
            response.data?.user
          ) {

            this.router.navigateByUrl(
              AUTH_CONSTANTS
                .DASHBOARD_ROUTE
            );

            return;

          }

          this.errorMessage =
            AUTH_CONSTANTS
              .MESSAGES
              .LOGIN_FAILED;

        },

        error: error => {

          this.isLoading = false;

          if (
            error?.status === 401
          ) {

            this.errorMessage =
              'Identifiant ou PIN incorrect.';

            return;

          }

          if (
            error?.status === 403
          ) {

            this.errorMessage =
              error?.error?.message ||
              'Vous ne pouvez pas accéder à ce compte.';

            return;

          }

          if (
            error?.status === 0
          ) {

            this.errorMessage =
              AUTH_CONSTANTS
                .MESSAGES
                .NETWORK_ERROR;

            return;

          }

          this.errorMessage =
            error?.error?.message ||
            error?.userMessage ||
            AUTH_CONSTANTS
              .MESSAGES
              .LOGIN_FAILED;

        }

      });

  }

  togglePinVisibility(): void {

    this.showPin =
      !this.showPin;

  }

  getFieldError(
    fieldName: string
  ): string {

    const control =
      this.loginForm
        .get(fieldName);

    if (
      !control ||
      !control.touched ||
      !control.errors
    ) {

      return '';

    }

    if (
      control.errors['required']
    ) {

      if (
        fieldName === 'phone_number'
      ) {

        return 'L’identifiant est obligatoire';

      }

      if (
        fieldName === 'pin'
      ) {

        return 'Le PIN est obligatoire';

      }

      return 'Ce champ est obligatoire';

    }

    if (
      control.errors['pattern']
    ) {

      if (
        fieldName === 'phone_number'
      ) {

        return 'L’identifiant doit contenir exactement 8 chiffres';

      }

      if (
        fieldName === 'pin'
      ) {

        return 'Le PIN doit contenir exactement 5 chiffres';

      }

      return 'Format invalide';

    }

    return 'Valeur invalide';

  }

  clearError(): void {

    this.errorMessage = '';
    this.sessionExpired = false;

  }

}