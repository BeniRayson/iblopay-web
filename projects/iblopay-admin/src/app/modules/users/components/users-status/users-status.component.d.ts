import { EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
export interface UserStatusOption {
    value: string;
    label: string;
    color: string;
    icon: string;
}
export declare class UsersStatusComponent implements OnChanges, OnDestroy {
    user: any;
    currentStatus: string;
    selectedStatus: string;
    isLoading: boolean;
    error: string;
    success: string;
    isOpen: boolean;
    close: EventEmitter<void>;
    statusSelected: EventEmitter<string>;
    confirm: EventEmitter<void>;
    showOtpStep: boolean;
    otpCode: string;
    otpError: string;
    otpAttempts: number;
    maxOtpAttempts: number;
    isOtpLocked: boolean;
    otpLockTimer: number;
    otpTimer: number;
    private otpTimerInterval;
    private lockTimerInterval;
    otpVerified: boolean;
    showStatusStep: boolean;
    statusOptions: UserStatusOption[];
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    generateAndSendOtp(): void;
    private startOtpTimer;
    private startLockTimer;
    private clearOtpTimer;
    private clearLockTimer;
    private clearAllTimers;
    verifyOtp(): void;
    resendOtp(): void;
    goBackToOtp(): void;
    private resetForm;
    onClose(): void;
    onSelectStatus(value: string): void;
    onConfirm(): void;
    getStatusLabel(status: string): string;
    getStatusClass(status: string): string;
    getStatusOptionColor(status: string): string;
    getStatusOptionIcon(status: string): string;
    getInitials(firstName: string, lastName: string): string;
    getAvatarColor(id: string): string;
    getRoleLabel(role: string): string;
    getOtpRemainingTime(): string;
    getLockRemainingTime(): string;
}
//# sourceMappingURL=users-status.component.d.ts.map