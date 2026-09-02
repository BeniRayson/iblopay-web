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

// ============================================================
// INTERFACES POUR LES BARÈMES
// ============================================================
interface TrancheSimple {
  min: number;
  max: number;
  agent: number | null;
  sa: number | null;
}

interface TrancheRepartie {
  min: number;
  max: number;
  total: number | null;
  agent: number | null;
  sa: number | null;
}

interface TrancheCarte {
  min: number;
  max: number;
  depot: number | null;
  retrait: number | null;
}

interface Bareme<T> {
  id: string;
  titre: string;
  tranches: T[];
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

  // État pour les barèmes
  sectionBaremeOuverte: 'retrait-client' | 'retrait-marchand' | 'recharge-client' | 'carte-agent' | null = null;
  modeEditionBareme: boolean = false;
  enregistrementBaremeEnCours: boolean = false;

  availableEvents: string[] = [
    'Transaction',
    'Depot',
    'Retrait',
    'Transfert',
    'Commission',
    'Taxe',
    'Connexion',
    'Securite',
    'Maintenance'
  ];

  tabs: TabItem[] = [
    { key: 'frais', label: 'Frais', icon: '💲' },
    { key: 'limites', label: 'Limites', icon: '📏' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'parametres', label: 'Paramètres', icon: '🧩' },
    { key: 'baremes', label: 'Barèmes', icon: '📊' }
  ];

  fees: Fee[] = [
    {
      id: '1',
      name: 'Frais de Depot',
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
      name: 'Depot max par transaction',
      icon: '💰',
      value: 5000000,
      period: 'illimite',
      currentUsage: 2500000,
      description: 'Montant maximum par depot',
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
      events: ['Transaction', 'Depot', 'Retrait'],
      active: true
    },
    {
      id: '2',
      name: 'Notification Email',
      icon: '📧',
      channel: 'email',
      config: 'notifications@iblopay.bi',
      events: ['Transaction', 'Securite', 'Commission', 'Taxe'],
      active: true
    },
    {
      id: '3',
      name: 'Notification Push',
      icon: '🔔',
      channel: 'push',
      config: 'Mobile App',
      events: ['Transaction', 'Depot', 'Retrait', 'Transfert'],
      active: true
    },
    {
      id: '4',
      name: 'Webhook',
      icon: '🔌',
      channel: 'webhook',
      config: 'https://api.iblopay.bi/webhook',
      events: ['Transaction', 'Maintenance', 'Securite'],
      active: false
    }
  ];

  systemParams: SystemParam[] = [
    {
      id: '1',
      name: 'Devise principale',
      icon: '💵',
      value: 'BIF',
      description: 'Devise utilisee pour toutes les transactions',
      options: ['BIF', 'USD', 'EUR', 'GBP'],
      active: true
    },
    {
      id: '2',
      name: 'Fuseau horaire',
      icon: '🕐',
      value: 'Africa/Bujumbura',
      description: 'Fuseau horaire du systeme',
      options: ['Africa/Bujumbura', 'Africa/Kigali', 'Africa/Nairobi', 'UTC'],
      active: true
    },
    {
      id: '3',
      name: 'Langue',
      icon: '🌍',
      value: 'Francais',
      description: 'Langue par defaut de l\'interface',
      options: ['Francais', 'English', 'Kirundi', 'Kiswahili'],
      active: true
    },
    {
      id: '4',
      name: 'Mode Maintenance',
      icon: '🛠️',
      value: 'Desactive',
      description: 'Mode maintenance du systeme',
      options: ['Active', 'Desactive'],
      danger: true,
      active: true
    }
  ];

  // ============================================================
  // BARÈMES DE COMMISSION (D'APRÈS LES IMAGES)
  // ============================================================

  // Barème 1 : Retrait Client
  baremeRetraitClient: Bareme<TrancheRepartie> = {
    id: 'retrait-client',
    titre: "Agahembo k'umukozi (Agent) / uwukurira umukozi wa Lumiash (SA) — igihe umunywanyi abikishije (FBU)",
    tranches: [
      { min: 100, max: 999, total: 10, agent: 9, sa: 1 },
      { min: 1000, max: 4999, total: 30, agent: 27, sa: 3 },
      { min: 5000, max: 9999, total: 80, agent: 72, sa: 8 },
      { min: 10000, max: 19999, total: 100, agent: 90, sa: 10 },
      { min: 20000, max: 29999, total: 200, agent: 180, sa: 20 },
      { min: 30000, max: 39999, total: 270, agent: 243, sa: 27 },
      { min: 40000, max: 49999, total: 360, agent: 324, sa: 36 },
      { min: 50000, max: 59999, total: 450, agent: 405, sa: 45 },
      { min: 60000, max: 69999, total: 520, agent: 468, sa: 52 },
      { min: 70000, max: 79999, total: 600, agent: 540, sa: 60 },
      { min: 80000, max: 89999, total: 700, agent: 630, sa: 70 },
      { min: 90000, max: 99999, total: 750, agent: 675, sa: 75 },
      { min: 100000, max: 199999, total: 800, agent: 720, sa: 80 },
      { min: 200000, max: 299999, total: 1100, agent: 990, sa: 110 },
      { min: 300000, max: 399999, total: 1300, agent: 1170, sa: 130 },
      { min: 400000, max: 499999, total: 1500, agent: 1350, sa: 150 },
      { min: 500000, max: 1000000, total: 2400, agent: 2160, sa: 240 },
    ]
  };

  // Barème 2 : Retrait Marchand
  baremeRetraitMarchand: Bareme<TrancheSimple> = {
    id: 'retrait-marchand',
    titre: "Agahembo k'umukozi (Agent) / uwukurira umukozi wa Lumiash (SA) — igihe umudandaza abikuye (FBU)",
    tranches: [
      { min: 0, max: 50000, agent: 0, sa: null },
      { min: 50001, max: 70000, agent: 100, sa: null },
      { min: 70001, max: 100000, agent: 200, sa: null },
      { min: 100001, max: 150000, agent: 300, sa: null },
      { min: 150001, max: 200000, agent: 400, sa: null },
      { min: 200001, max: 300000, agent: 500, sa: null },
      { min: 300001, max: 400000, agent: 600, sa: null },
      { min: 400001, max: 500000, agent: 700, sa: null },
      { min: 500001, max: 600000, agent: 800, sa: null },
      { min: 600001, max: 700000, agent: 900, sa: null },
      { min: 700001, max: 999999999, agent: 1000, sa: null },
    ]
  };

  // Barème 3 : Recharge Client
  baremeRechargeClient: Bareme<TrancheRepartie> = {
    id: 'recharge-client',
    titre: "Agahembo k'umukozi (Agent) / uwukurira umukozi wa Lumiash (SA) — igihe umunywanyi abikuye (FBU)",
    tranches: [
      { min: 100, max: 999, total: null, agent: null, sa: null },
      { min: 1000, max: 4999, total: 70, agent: 63, sa: 7 },
      { min: 5000, max: 9999, total: 120, agent: 108, sa: 12 },
      { min: 10000, max: 19999, total: 180, agent: 162, sa: 18 },
      { min: 20000, max: 29999, total: 230, agent: 207, sa: 23 },
      { min: 30000, max: 39999, total: 350, agent: 315, sa: 35 },
      { min: 40000, max: 49999, total: 450, agent: 405, sa: 45 },
      { min: 50000, max: 59999, total: 550, agent: 495, sa: 55 },
      { min: 60000, max: 69999, total: 650, agent: 585, sa: 65 },
      { min: 70000, max: 79999, total: 750, agent: 675, sa: 75 },
      { min: 80000, max: 89999, total: 850, agent: 765, sa: 85 },
      { min: 90000, max: 99999, total: 950, agent: 855, sa: 95 },
      { min: 100000, max: 199999, total: 1100, agent: 990, sa: 110 },
      { min: 200000, max: 299999, total: 1800, agent: 1620, sa: 180 },
      { min: 300000, max: 399999, total: 2200, agent: 1980, sa: 220 },
      { min: 400000, max: 499999, total: 2600, agent: 2340, sa: 260 },
      { min: 500000, max: 1000000, total: 4000, agent: 3600, sa: 240 },
    ]
  };

  // Barème 4 : Carte Agent
  baremeCarteAgent: Bareme<TrancheCarte> = {
    id: 'carte-agent',
    titre: 'Ibiciro — Frais de depot et de retrait (carte agent)',
    tranches: [
      { min: 100, max: 999, depot: null, retrait: null },
      { min: 1000, max: 4999, depot: 168, retrait: 720 },
      { min: 5000, max: 9999, depot: 384, retrait: 1380 },
      { min: 10000, max: 19999, depot: 540, retrait: 1740 },
      { min: 20000, max: 29999, depot: 840, retrait: 2280 },
      { min: 30000, max: 39999, depot: 1020, retrait: 2760 },
      { min: 40000, max: 49999, depot: 1110, retrait: 3000 },
      { min: 50000, max: 59999, depot: 1200, retrait: 3240 },
      { min: 60000, max: 69999, depot: 1500, retrait: 3960 },
      { min: 70000, max: 79999, depot: 1710, retrait: 4320 },
      { min: 80000, max: 89999, depot: 1860, retrait: 4620 },
      { min: 90000, max: 99999, depot: 1920, retrait: 4680 },
      { min: 100000, max: 199999, depot: 2640, retrait: 5880 },
      { min: 200000, max: 299999, depot: 3600, retrait: 8160 },
      { min: 300000, max: 399999, depot: 4080, retrait: 9480 },
      { min: 400000, max: 499999, depot: 4800, retrait: 11520 },
      { min: 500000, max: 1000000, depot: 5760, retrait: 17040 },
    ]
  };

  // Sauvegarde pour annulation
  private snapshotBaremes: string | null = null;

  constructor() { }

  ngOnInit(): void { }

  // ========== NAVIGATION ==========

  setActiveTab(tab: string): void {
    if (this.modeEditionBareme && tab !== 'baremes') {
      if (!confirm('Vous avez des modifications non sauvegardees dans les baremes. Voulez-vous continuer ?')) {
        return;
      }
      this.annulerEditionBaremes();
    }
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
    this.toast(`Frais "${fee.name}" ${fee.active ? 'active' : 'desactive'}`, fee.active ? 'success' : 'danger');
  }

  saveFee(): void {
    if (this.selectedItem) {
      Object.assign(this.selectedItem, this.formData);
      this.toast(`Frais "${this.selectedItem.name}" sauvegarde avec succes`, 'success');
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
    this.toast(`Limite "${limit.name}" ${limit.active ? 'activee' : 'desactivee'}`, limit.active ? 'success' : 'danger');
  }

  saveLimit(): void {
    if (this.selectedItem) {
      Object.assign(this.selectedItem, this.formData);
      this.toast(`Limite "${this.selectedItem.name}" sauvegardee avec succes`, 'success');
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
    this.toast(`Notification "${notification.name}" ${notification.active ? 'activee' : 'desactivee'}`, notification.active ? 'success' : 'danger');
  }

  testNotification(notification: Notification): void {
    this.toast(`Test de notification "${notification.name}" envoye`, 'info');
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
      this.toast(`Notification "${this.selectedItem.name}" sauvegardee avec succes`, 'success');
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
    this.toast(`Parametre "${param.name}" ${param.active ? 'active' : 'desactive'}`, param.active ? 'success' : 'danger');
  }

  resetParam(param: SystemParam): void {
    if (confirm(`Voulez-vous vraiment reinitialiser "${param.name}" a sa valeur par defaut ?`)) {
      this.toast(`Parametre "${param.name}" reinitialise avec succes`, 'success');
    }
  }

  saveParam(): void {
    if (this.selectedItem) {
      Object.assign(this.selectedItem, this.formData);
      this.toast(`Parametre "${this.selectedItem.name}" sauvegarde avec succes`, 'success');
      this.closeModal();
    }
  }

  // ============================================================
  // ACTIONS BARÈMES
  // ============================================================

  basculerSectionBareme(section: 'retrait-client' | 'retrait-marchand' | 'recharge-client' | 'carte-agent'): void {
    if (this.sectionBaremeOuverte === section) {
      this.sectionBaremeOuverte = null;
    } else {
      this.sectionBaremeOuverte = section;
    }
  }

  activerEditionBaremes(): void {
    this.snapshotBaremes = JSON.stringify({
      retraitClient: this.baremeRetraitClient,
      retraitMarchand: this.baremeRetraitMarchand,
      rechargeClient: this.baremeRechargeClient,
      carteAgent: this.baremeCarteAgent,
    });
    this.modeEditionBareme = true;
  }

  annulerEditionBaremes(): void {
    if (this.snapshotBaremes) {
      const data = JSON.parse(this.snapshotBaremes);
      this.baremeRetraitClient = data.retraitClient;
      this.baremeRetraitMarchand = data.retraitMarchand;
      this.baremeRechargeClient = data.rechargeClient;
      this.baremeCarteAgent = data.carteAgent;
    }
    this.modeEditionBareme = false;
  }

  enregistrerBaremes(): void {
    this.enregistrementBaremeEnCours = true;

    const payload = {
      retraitClient: this.baremeRetraitClient,
      retraitMarchand: this.baremeRetraitMarchand,
      rechargeClient: this.baremeRechargeClient,
      carteAgent: this.baremeCarteAgent,
    };

    setTimeout(() => {
      console.log('Baremes a publier :', payload);
      this.enregistrementBaremeEnCours = false;
      this.modeEditionBareme = false;
      this.toast('Baremes sauvegardes avec succes', 'success');
    }, 600);
  }

  formatMontant(valeur: number | null): string {
    if (valeur === null || valeur === undefined) {
      return 'N/A';
    }
    return valeur.toLocaleString('fr-FR');
  }

  // ========== SYSTEM ACTIONS ==========

  clearCache(): void {
    if (confirm('Voulez-vous vraiment vider le cache systeme ?')) {
      this.toast('Cache systeme vide avec succes', 'success');
    }
  }

  rebuildIndex(): void {
    if (confirm('Voulez-vous vraiment reconstruire les index ?')) {
      this.toast('Reconstruction des index lancee', 'info');
    }
  }

  resetAll(): void {
    if (confirm('⚠️ Voulez-vous vraiment reinitialiser tous les parametres ? Cette action est irreversible !')) {
      if (confirm('⚠️⚠️ Confirmation finale : reinitialiser tous les parametres ?')) {
        this.toast('Tous les parametres ont ete reinitialises', 'danger');
      }
    }
  }

  exportData(): void {
    this.toast('Export des donnees demarre', 'info');
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