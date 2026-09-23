import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export declare class ResetPasswordComponent implements OnInit, OnDestroy {
    private fb;
    private route;
    private router;
    private authService;
    resetForm: FormGroup;
    isLoading: boolean;
    errorMessage: string;
    successMessage: string;
    phoneNumber: string;
    showNewPin: boolean;
    showConfirmPin: boolean;
    private destroy$;
    constructor(fb: FormBuilder, route: ActivatedRoute, router: Router, authService: AuthService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggleNewPinVisibility(): void;
    toggleConfirmPinVisibility(): void;
    onSubmit(): void;
    getFieldError(fieldName: string): string;
}
//# sourceMappingURL=reset-password.component.d.ts.map