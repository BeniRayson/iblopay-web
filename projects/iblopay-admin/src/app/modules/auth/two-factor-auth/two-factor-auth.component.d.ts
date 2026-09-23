import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
export declare class TwoFactorAuthComponent implements OnInit, OnDestroy {
    private fb;
    private route;
    private router;
    private authService;
    otpForm: FormGroup;
    isLoading: boolean;
    errorMessage: string;
    successMessage: string;
    phoneNumber: string;
    maskedPhone: string;
    cooldown: number;
    canResend: boolean;
    timerSub?: Subscription;
    private destroy$;
    constructor(fb: FormBuilder, route: ActivatedRoute, router: Router, authService: AuthService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    maskPhoneNumber(): void;
    startResendTimer(): void;
    resendOtp(): void;
    onSubmit(): void;
    getFieldError(fieldName: string): string;
}
//# sourceMappingURL=two-factor-auth.component.d.ts.map