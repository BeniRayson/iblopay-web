import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

interface TabItem {
  key: string;
  label: string;
  icon: string;
  count?: number;
}

interface Fee {
  id: string;
  name: string;
  icon: string;
  type: 'fixe' | 'pourcentage' | 'mixte';
  rate: string;
  minAmount?: number;
  maxAmount?: number;
  appliesTo?: string;
  active: boolean;
}

interface Limit {
  id: string;
  name: string;
  icon: string;
  value: number;
  period: 'jour' | 'semaine' | 'mois' | 'an' | 'illimite';
  currentUsage?: number;
  description?: string;
  active: boolean;
}

interface Notification {
  id: string;
  name: string;
  icon: string;
  channel: 'sms' | 'email' | 'push' | 'webhook';
  config?: string;
  events: string[];
  active: boolean;
}

interface SystemParam {
  id: string;
  name: string;
  icon: string;
  value: string;
  description?: string;
  options?: string[];
  danger?: boolean;
  active: boolean;
}

@Component({
  selector: 'app-system-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent implements OnInit {
  readonly Math = Math;

  activeTab: string = 'frais';
  showModal: boolean = false;
  modalTitle: string = '';
  modalType: string = '';
  selectedItem: any = null;
  formData: any = {};
  toasts: Toast[] = [];
  private toastSeq = 0;

  availableEvents: string[] = [
    'Transaction',
    'Dépôt',
    'Retrait',
    'Transfert',
    'Commission',
    'Taxe',
    'Connexion',
    'Sécurité',
    'Maintenance'
  ];

  tabs: TabItem[] = [
    { key: 'frais', label: 'Frais', icon: '💲' },
    { key: 'limites', label: 'Limites', icon: '📏' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'parametres', label: 'Paramètres', icon: '🧩' }
  ];

  fees: Fee[] = [
    {
      id: '1',
      name: 'Frais de Dépôt',
      icon: '💰',
      type: 'pourcentage',
      rate: '1.5%',
      minAmount: 1000,
      maxAmount: 500000,
      appliesTo: 'Tous les utilisateurs',
      active: true
    },
    {
      id: '2',
      name: 'Frais de Retrait',
      icon: '🏦',
      type: 'mixte',
      rate: '1% + 500 BIF',
      minAmount: 500,
      maxAmount: 1000000,
      appliesTo: 'Agents et clients',
      active: true
    },
    {
      id: '3',
      name: 'Frais de Transfert',
      icon: '🔄',
      type: 'pourcentage',
      rate: '0.8%',
      minAmount: 100,
      maxAmount: 200000,
      appliesTo: 'Entre agents',
      active: true
    },
    {
      id: '4',
      name: 'Frais de Paiement',
      icon: '💳',
      type: 'fixe',
      rate: '250 BIF',
      minAmount: 0,
      maxAmount: 0,
      appliesTo: 'Paiements marchands',
      active: false
    }
  ];

  limits: Limit[] = [
    {
      id: '1',
      name: 'Dépôt max par transaction',
      icon: '💰',
      value: 5000000,
      period: 'illimite',
      currentUsage: 2500000,
      description: 'Montant maximum par dépôt',
      active: true
    },
    {
      id: '2',
      name: 'Retrait max par transaction',
      icon: '🏦',
      value: 3000000,
      period: 'illimite',
      currentUsage: 1200000,
      description: 'Montant maximum par retrait',
      active: true
    },
    {
      id: '3',
      name: 'Plafond journalier',
      icon: '📅',
      value: 10000000,
      period: 'jour',
      currentUsage: 4500000,
      description: 'Montant total des transactions par jour',
      active: true
    },
    {
      id: '4',
      name: 'Plafond mensuel',
      icon: '📆',
      value: 50000000,
      period: 'mois',
      currentUsage: 25000000,
      description: 'Montant total des transactions par mois',
      active: true
    }
  ];

  notifications: Notification[] = [
    {
      id: '1',
      name: 'Notification SMS',
      icon: '📱',
      channel: 'sms',
      config: '+257 79 123 456',
      events: ['Transaction', 'Dépôt', 'Retrait'],
      active: true
    },
    {
      id: '2',
      name: 'Notification Email',
      icon: '📧',
      channel: 'email',
      config: 'notifications@iblopay.bi',
      events: ['Transaction', 'Sécurité', 'Commission', 'Taxe'],
      active: true
    },
    {
      id: '3',
      name: 'Notification Push',
      icon: '🔔',
      channel: 'push',
      config: 'Mobile App',
      events: ['Transaction', 'Dépôt', 'Retrait', 'Transfert'],
      active: true
    },
    {
      id: '4',
      name: 'Webhook',
      icon: '🔌',
      channel: 'webhook',
      config: 'https://api.iblopay.bi/webhook',
      events: ['Transaction', 'Maintenance', 'Sécurité'],
      active: false
    }
  ];

  systemParams: SystemParam[] = [
    {
      id: '1',
      name: 'Devise principale',
      icon: '💵',
      value: 'BIF',
      description: 'Devise utilisée pour toutes les transactions',
      options: ['BIF', 'USD', 'EUR', 'GBP'],
      active: true
    },
    {
      id: '2',
      name: 'Fuseau horaire',
      icon: '🕐',
      value: 'Africa/Bujumbura',
      description: 'Fuseau horaire du système',
      options: ['Africa/Bujumbura', 'Africa/Kigali', 'Africa/Nairobi', 'UTC'],
      active: true
    },
    {
      id: '3',
      name: 'Langue',
      icon: '🌍',
      value: 'Français',
      description: 'Langue par défaut de l\'interface',
      options: ['Français', 'English', 'Kirundi', 'Kiswahili'],
      active: true
    },
    {
      id: '4',
      name: 'Mode Maintenance',
      icon: '🛠️',
      value: 'Désactivé',
      description: 'Mode maintenance du système',
      options: ['Activé', 'Désactivé'],
      danger: true,
      active: true
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  // ========== NAVIGATION ==========

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // ========== COMPTES ==========

  getActiveFeesCount(): number {
    return this.fees.filter(f => f.active).length;
  }

  getActiveLimitsCount(): number {
    return this.limits.filter(l => l.active).length;
  }

  getActiveNotificationsCount(): number {
    return this.notifications.filter(n => n.active).length;
  }

  getActiveParamsCount(): number {
    return this.systemParams.filter(p => p.active).length;
  }

  // ========== LIMITS SUMMARY ==========

  getLimitsSummary(): any[] {
    return this.limits.filter(l => l.active && l.currentUsage !== undefined).map(l => {
      const percentage = Math.min((l.currentUsage || 0) / l.value * 100, 100);
      let color = '#0F6E5B';
      if (percentage > 80) color = '#D64545';
      else if (percentage > 60) color = '#F2A93B';
      return {
        label: l.name,
        current: l.currentUsage || 0,
        max: l.value,
        percentage: Math.round(percentage),
        color: color
      };
    });
  }

  // ========== FEE ACTIONS ==========

  configureFee(fee: Fee): void {
    this.selectedItem = fee;
    this.modalType = 'fee_config';
    this.modalTitle = `💲 Configuration - ${fee.name}`;
    this.formData = { ...fee };
    this.showModal = true;
  }

  toggleFee(fee: Fee): void {
    fee.active = !fee.active;
    this.toast(`Frais "${fee.name}" ${fee.active ? 'activé' : 'désactivé'}`, fee.active ? 'success' : 'danger');
  }

  saveFee(): void {
    if (this.selectedItem) {
      Object.assign(this.selectedItem, this.formData);
      this.toast(`Frais "${this.selectedItem.name}" sauvegardé avec succès`, 'success');
      this.closeModal();
    }
  }

  // ========== LIMIT ACTIONS ==========

  configureLimit(limit: Limit): void {
    this.selectedItem = limit;
    this.modalType = 'limit_config';
    this.modalTitle = `📏 Configuration - ${limit.name}`;
    this.formData = { ...limit };
    this.showModal = true;
  }

  toggleLimit(limit: Limit): void {
    limit.active = !limit.active;
    this.toast(`Limite "${limit.name}" ${limit.active ? 'activée' : 'désactivée'}`, limit.active ? 'success' : 'danger');
  }

  saveLimit(): void {
    if (this.selectedItem) {
      Object.assign(this.selectedItem, this.formData);
      this.toast(`Limite "${this.selectedItem.name}" sauvegardée avec succès`, 'success');
      this.closeModal();
    }
  }

  // ========== NOTIFICATION ACTIONS ==========

  configureNotification(notification: Notification): void {
    this.selectedItem = notification;
    this.modalType = 'notification_config';
    this.modalTitle = `🔔 Configuration - ${notification.name}`;
    this.formData = { 
      ...notification,
      selectedEvents: [...notification.events]
    };
    this.showModal = true;
  }

  toggleNotification(notification: Notification): void {
    notification.active = !notification.active;
    this.toast(`Notification "${notification.name}" ${notification.active ? 'activée' : 'désactivée'}`, notification.active ? 'success' : 'danger');
  }

  testNotification(notification: Notification): void {
    this.toast(`Test de notification "${notification.name}" envoyé`, 'info');
  }

  isEventSelected(event: string): boolean {
    return this.formData.selectedEvents?.includes(event) || false;
  }

  toggleEventSelection(event: string): void {
    if (!this.formData.selectedEvents) {
      this.formData.selectedEvents = [];
    }
    const index = this.formData.selectedEvents.indexOf(event);
    if (index > -1) {
      this.formData.selectedEvents.splice(index, 1);
    } else {
      this.formData.selectedEvents.push(event);
    }
  }

  saveNotification(): void {
    if (this.selectedItem) {
      this.selectedItem.events = [...this.formData.selectedEvents];
      this.selectedItem.channel = this.formData.channel;
      this.selectedItem.config = this.formData.config;
      this.toast(`Notification "${this.selectedItem.name}" sauvegardée avec succès`, 'success');
      this.closeModal();
    }
  }

  // ========== PARAM ACTIONS ==========

  configureParam(param: SystemParam): void {
    this.selectedItem = param;
    this.modalType = 'param_config';
    this.modalTitle = `🧩 Configuration - ${param.name}`;
    this.formData = { ...param };
    this.showModal = true;
  }

  toggleParam(param: SystemParam): void {
    param.active = !param.active;
    this.toast(`Paramètre "${param.name}" ${param.active ? 'activé' : 'désactivé'}`, param.active ? 'success' : 'danger');
  }

  resetParam(param: SystemParam): void {
    if (confirm(`Voulez-vous vraiment réinitialiser "${param.name}" à sa valeur par défaut ?`)) {
      // Simuler une réinitialisation
      this.toast(`Paramètre "${param.name}" réinitialisé avec succès`, 'success');
    }
  }

  saveParam(): void {
    if (this.selectedItem) {
      Object.assign(this.selectedItem, this.formData);
      this.toast(`Paramètre "${this.selectedItem.name}" sauvegardé avec succès`, 'success');
      this.closeModal();
    }
  }

  // ========== SYSTEM ACTIONS ==========

  clearCache(): void {
    if (confirm('Voulez-vous vraiment vider le cache système ?')) {
      this.toast('Cache système vidé avec succès', 'success');
    }
  }

  rebuildIndex(): void {
    if (confirm('Voulez-vous vraiment reconstruire les index ?')) {
      this.toast('Reconstruction des index lancée', 'info');
    }
  }

  resetAll(): void {
    if (confirm('⚠️ Voulez-vous vraiment réinitialiser tous les paramètres ? Cette action est irréversible !')) {
      if (confirm('⚠️⚠️ Confirmation finale : réinitialiser tous les paramètres ?')) {
        this.toast('Tous les paramètres ont été réinitialisés', 'danger');
      }
    }
  }

  exportData(): void {
    this.toast('Export des données démarré', 'info');
  }

  // ========== MODAL ==========

  closeModal(): void {
    this.showModal = false;
    this.selectedItem = null;
    this.formData = {};
  }

  // ========== TOASTS ==========

  toast(message: string, type: Toast['type'] = 'info'): void {
    const id = ++this.toastSeq;
    this.toasts.push({ id, message, type });
    setTimeout(() => this.dismissToast(id), 5000);
  }

  dismissToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}