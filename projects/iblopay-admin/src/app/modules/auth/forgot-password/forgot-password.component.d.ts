import { OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export declare class ForgotPasswordComponent implements OnDestroy {
    private fb;
    private authService;
    private router;
    forgotForm: FormGroup;
    isLoading: boolean;
    errorMessage: string;
    successMessage: string;
    otpSent: boolean;
    private destroy$;
    constructor(fb: FormBuilder, authService: AuthService, router: Router);
    ngOnDestroy(): void;
    onSubmit(): void;
    getFieldError(fieldName: string): string;
}
//# sourceMappingURL=forgot-password.component.d.ts.map