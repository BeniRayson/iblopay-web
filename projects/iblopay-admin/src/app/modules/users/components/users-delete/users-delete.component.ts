// src/app/modules/users/components/users-delete/users-delete.component.ts
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.scss']
})
export class UsersDeleteComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() user: any = null;
  @Input() isLoading: boolean = false;
  @Input() error: string = '';
  @Input() success: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  // Étape 1: OTP
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

  // Étape 2: Formulaire de suppression
  showDeleteStep: boolean = false;
  deleteReason: string = '';
  confirmText: string = '';

  reasonOptions: string[] = [
    'Compte inactif',
    'Demande de l\'utilisateur',
    'Violation des conditions',
    'Activité frauduleuse',
    'Doublon',
    'Autre'
  ];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Détecter l'ouverture du modal
    if (changes['isOpen'] && changes['isOpen'].currentValue === true) {
      this.resetForm();
      // Démarrer l'OTP automatiquement
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
    
    // Timer pour l'OTP (60 secondes)
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
      this.showDeleteStep = true;
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

  // ─── SUPPRESSION ──────────────────────────────────────────

  onConfirmDelete(): void {
    if (!this.deleteReason) {
      this.error = 'Veuillez sélectionner un motif de suppression';
      return;
    }
    if (this.confirmText !== 'supprimer') {
      this.error = 'Veuillez taper "supprimer" pour confirmer';
      return;
    }
    this.confirm.emit();
  }

  // ─── NAVIGATION ───────────────────────────────────────────

  onClose(): void {
    this.resetForm();
    this.close.emit();
  }

  goBackToOtp(): void {
    this.showDeleteStep = false;
    this.showOtpStep = true;
    this.deleteReason = '';
    this.confirmText = '';
    this.error = '';
  }

  private resetForm(): void {
    this.showOtpStep = true;
    this.showDeleteStep = false;
    this.otpCode = '';
    this.otpError = '';
    this.otpAttempts = 0;
    this.isOtpLocked = false;
    this.otpLockTimer = 0;
    this.otpTimer = 60;
    this.otpVerified = false;
    this.deleteReason = '';
    this.confirmText = '';
    this.error = '';
    this.success = '';
    this.clearAllTimers();
  }

  // ─── UTILITAIRES ──────────────────────────────────────────

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

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'ACTIVE': 'Actif',
      'SUSPENDED': 'Suspendu',
      'FROZEN': 'Gelé',
      'CLOSED': 'Fermé'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
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