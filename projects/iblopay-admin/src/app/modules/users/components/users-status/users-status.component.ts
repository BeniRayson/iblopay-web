// src/app/modules/users/components/users-status/users-status.component.ts
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

export interface UserStatusOption {
  value: string;
  label: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-users-status',
  templateUrl: './users-status.component.html',
  styleUrls: ['./users-status.component.scss']
})
export class UsersStatusComponent implements OnChanges, OnDestroy {
  @Input() user: any = null;
  @Input() currentStatus: string = '';
  @Input() selectedStatus: string = '';
  @Input() isLoading: boolean = false;
  @Input() error: string = '';
  @Input() success: string = '';
  @Input() isOpen: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() statusSelected = new EventEmitter<string>();
  @Output() confirm = new EventEmitter<void>();

  // ─── OTP ──────────────────────────────────────────────────
  showOtpStep: boolean = true;
  otpCode: string = '';
  otpError: string = '';
  otpAttempts: number = 0;
  maxOtpAttempts: number = 3;
  isOtpLocked: boolean = false;
  otpLockTimer: number = 0;
  otpTimer: number = 60;
  private otpTimerInterval: any;
  private lockTimerInterval: any;
  otpVerified: boolean = false;

  // Étape 2: Changement de statut
  showStatusStep: boolean = false;

  statusOptions: UserStatusOption[] = [
    { value: 'ACTIVE', label: 'Actif', color: '#10b981', icon: 'fa-check-circle' },
    { value: 'SUSPENDED', label: 'Suspendu', color: '#f59e0b', icon: 'fa-pause-circle' },
    { value: 'FROZEN', label: 'Gelé', color: '#3b82f6', icon: 'fa-snowflake' },
    { value: 'CLOSED', label: 'Fermé', color: '#ef4444', icon: 'fa-times-circle' }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && changes['isOpen'].currentValue === true) {
      this.resetForm();
      setTimeout(() => {
        this.generateAndSendOtp();
      }, 300);
    }
  }

  ngOnDestroy(): void {
    this.clearAllTimers();
  }

  // ─── OTP ──────────────────────────────────────────────────

  generateAndSendOtp(): void {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('[SIMULATION] Code OTP envoyé:', otp);
    this.otpCode = '';
    this.otpError = '';
    this.otpAttempts = 0;
    this.isOtpLocked = false;
    this.otpTimer = 60;
    this.clearAllTimers();
    this.startOtpTimer();
  }

  private startOtpTimer(): void {
    this.clearAllTimers();
    this.otpTimerInterval = setInterval(() => {
      if (this.otpTimer > 0) {
        this.otpTimer--;
      } else {
        this.clearOtpTimer();
        this.otpError = '⏳ Le code OTP a expiré. Veuillez renvoyer un nouveau code.';
      }
    }, 1000);
  }

  private startLockTimer(seconds: number): void {
    this.otpLockTimer = seconds;
    this.clearLockTimer();
    this.lockTimerInterval = setInterval(() => {
      if (this.otpLockTimer > 0) {
        this.otpLockTimer--;
      } else {
        this.clearLockTimer();
        this.isOtpLocked = false;
        this.otpError = '✅ Le verrouillage a expiré. Vous pouvez réessayer.';
        setTimeout(() => {
          if (this.otpError === '✅ Le verrouillage a expiré. Vous pouvez réessayer.') {
            this.otpError = '';
          }
        }, 3000);
      }
    }, 1000);
  }

  private clearOtpTimer(): void {
    if (this.otpTimerInterval) {
      clearInterval(this.otpTimerInterval);
      this.otpTimerInterval = null;
    }
  }

  private clearLockTimer(): void {
    if (this.lockTimerInterval) {
      clearInterval(this.lockTimerInterval);
      this.lockTimerInterval = null;
    }
  }

  private clearAllTimers(): void {
    this.clearOtpTimer();
    this.clearLockTimer();
  }

  verifyOtp(): void {
    if (!this.otpCode || this.otpCode.length < 4) {
      this.otpError = 'Veuillez entrer le code OTP reçu';
      return;
    }

    if (this.otpTimer <= 0) {
      this.otpError = '⏳ Le code OTP a expiré. Veuillez renvoyer un nouveau code.';
      return;
    }

    const validOtp = '123456';
    
    if (this.otpCode === validOtp) {
      this.otpError = '';
      this.otpVerified = true;
      this.showOtpStep = false;
      this.showStatusStep = true;
      this.clearAllTimers();
    } else {
      this.otpAttempts++;
      const remainingAttempts = this.maxOtpAttempts - this.otpAttempts;
      
      if (this.otpAttempts >= this.maxOtpAttempts) {
        this.isOtpLocked = true;
        this.otpError = `❌ Code OTP incorrect. Compte verrouillé pour 3 minutes après ${this.maxOtpAttempts} tentatives.`;
        this.startLockTimer(180);
        this.clearOtpTimer();
        this.otpCode = '';
      } else {
        this.otpError = `❌ Code OTP incorrect (tentative ${this.otpAttempts}/${this.maxOtpAttempts}). Il vous reste ${remainingAttempts} tentative${remainingAttempts > 1 ? 's' : ''}.`;
        this.otpCode = '';
      }
    }
  }

  resendOtp(): void {
    if (this.isOtpLocked) {
      this.otpError = `⏳ Compte verrouillé. Réessayez dans ${this.getLockRemainingTime()}`;
      return;
    }
    if (this.otpTimer > 0 && this.otpAttempts > 0) {
      this.otpError = '⏳ Veuillez utiliser le code actuel avant de demander un nouveau code.';
      return;
    }
    this.generateAndSendOtp();
    this.otpError = '✅ Nouveau code OTP envoyé';
    setTimeout(() => {
      if (this.otpError === '✅ Nouveau code OTP envoyé') {
        this.otpError = '';
      }
    }, 3000);
  }

  // ─── NAVIGATION ───────────────────────────────────────────

  goBackToOtp(): void {
    this.showStatusStep = false;
    this.showOtpStep = true;
    this.error = '';
  }

  private resetForm(): void {
    this.showOtpStep = true;
    this.showStatusStep = false;
    this.otpCode = '';
    this.otpError = '';
    this.otpAttempts = 0;
    this.isOtpLocked = false;
    this.otpLockTimer = 0;
    this.otpTimer = 60;
    this.otpVerified = false;
    this.error = '';
    this.success = '';
    this.clearAllTimers();
  }

  // ─── ACTIONS ──────────────────────────────────────────────

  onClose(): void {
    this.resetForm();
    this.close.emit();
  }

  onSelectStatus(value: string): void {
    this.statusSelected.emit(value);
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  // ─── UTILITAIRES ──────────────────────────────────────────

  getStatusLabel(status: string): string {
    const option = this.statusOptions.find(s => s.value === status);
    return option?.label || status;
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  getStatusOptionColor(status: string): string {
    const option = this.statusOptions.find(s => s.value === status);
    return option?.color || '#6b7280';
  }

  getStatusOptionIcon(status: string): string {
    const option = this.statusOptions.find(s => s.value === status);
    return option?.icon || 'fa-circle';
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  }

  getAvatarColor(id: string): string {
    const colors = ['#4f46e5', '#7c3aed', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length] || '#4f46e5';
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      'CLIENT': 'Client',
      'AGENT': 'Agent',
      'SUPER_AGENT': 'Super Agent'
    };
    return labels[role] || role;
  }

  getOtpRemainingTime(): string {
    if (this.otpTimer <= 0) return 'Expiré';
    const minutes = Math.floor(this.otpTimer / 60);
    const seconds = this.otpTimer % 60;
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  getLockRemainingTime(): string {
    if (this.otpLockTimer <= 0) return '';
    const minutes = Math.floor(this.otpLockTimer / 60);
    const seconds = this.otpLockTimer % 60;
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }
}