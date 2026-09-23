import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
export declare class LoginComponent implements OnInit, OnDestroy {
    private fb;
    private authService;
    private router;
    private route;
    loginForm: FormGroup;
    isLoading: boolean;
    errorMessage: string;
    sessionExpired: boolean;
    showPin: boolean;
    currentYear: number;
    private destroy$;
    constructor(fb: FormBuilder, authService: AuthService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onSubmit(): void;
    togglePinVisibility(): void;
    getFieldError(fieldName: string): string;
}
//# sourceMappingURL=login.component.d.ts.map