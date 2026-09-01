import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CLIENTS, AGENTS, SUPER_AGENTS,
  ClientUser, AgentUser, SuperAgentUser, Statut,
  PROVINCE_NAMES, communesOf, zonesOf, collinesOf
} from './users-mock-data';

type ActorTab = 'clients' | 'agents' | 'super-agents';
type AnyUser = ClientUser | AgentUser | SuperAgentUser;
type WizardStepKey = 'carte' | 'identite' | 'adresse' | 'professionnel' | 'recap';

interface RowAction {
  label: string;
  actionId: string;
  icon: string;
  danger?: boolean;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info';
}

interface ConfirmState {
  title: string;
  message: string;
  danger: boolean;
  onConfirm: () => void;
}

interface HistoriqueDetail {
  date: string;
  type: 'depot' | 'retrait' | 'transfert' | 'paiement';
  typeLabel: string;
  montant: string;
  destinataire: string;
  statut: 'actif' | 'suspendu' | 'archive';
}

const QUICK_ACTION_IDS = new Set(['modifier', 'suspendre', 'reactiver', 'supprimer']);

@Component({
  selector: 'app-users-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './users-settings.component.html',
  styleUrls: ['./users-settings.component.scss']
})
export class UsersSettingsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  readonly title = 'Gestion des utilisateurs';
  readonly icon = '👥';
  readonly currentYear = new Date().getFullYear();
  readonly today = new Date();
  readonly Math = Math;

  tabs: { key: ActorTab; label: string; icon: string }[] = [
    { key: 'clients', label: 'Clients', icon: '🧑' },
    { key: 'agents', label: 'Agents', icon: '🧍' },
    { key: 'super-agents', label: 'Super Agents', icon: '🧑‍💼' }
  ];

  activeTab: ActorTab = 'clients';

  clients: ClientUser[] = [...CLIENTS];
  agents: AgentUser[] = [...AGENTS];
  superAgents: SuperAgentUser[] = [...SUPER_AGENTS];

  searchTerm = '';
  statutFilter = 'tous';
  kycFilter = 'tous';
  currentPage = 1;
  pageSize = 8;

  openMenuId: string | null = null;

  drawerOpen = false;
  drawerUser: AnyUser | null = null;
  drawerType: ActorTab | null = null;
  drawerTab = 'infos';

  folderOpen = false;

  wizardOpen = false;
  wizardMode: 'create' | 'edit' = 'create';
  wizardData: any = {};
  wizardStep = 0;
  otpSent = false;
  otpVerified = false;
  otpGenerated = '';
  otpInput = '';
  otpError = false;
  private editingUser: AnyUser | null = null;

  readonly provinces = PROVINCE_NAMES;

  confirm: ConfirmState | null = null;
  toasts: Toast[] = [];
  private toastSeq = 0;

  get rawList(): AnyUser[] {
    switch (this.activeTab) {
      case 'clients': return this.clients;
      case 'agents': return this.agents;
      case 'super-agents': return this.superAgents;
    }
  }

  get filteredList(): AnyUser[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.rawList.filter((u: any) => {
      const matchesTerm =
        !term ||
        u.nom?.toLowerCase().includes(term) ||
        u.id?.toLowerCase().includes(term) ||
        u.telephone?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term) ||
        u.cni?.toLowerCase().includes(term) ||
        u.numeroCarte?.toLowerCase().includes(term);
      const matchesStatut = this.statutFilter === 'tous' || u.statut === this.statutFilter;
      const matchesKyc = this.kycFilter === 'tous' || (u as ClientUser).kycLevel?.toString() === this.kycFilter;
      return matchesTerm && matchesStatut && matchesKyc;
    });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredList.length / this.pageSize));
  }

  get paginatedList(): AnyUser[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredList.slice(start, start + this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get activeTabLabel(): string {
    return this.tabs.find(t => t.key === this.activeTab)?.label ?? '';
  }

  setTab(tab: ActorTab): void {
    this.activeTab = tab;
    this.searchTerm = '';
    this.statutFilter = 'tous';
    this.kycFilter = 'tous';
    this.currentPage = 1;
    this.openMenuId = null;
  }

  goToPage(p: number): void {
    if (p >= 1 && p <= this.totalPages) this.currentPage = p;
  }

  onFilterChange(): void {
    this.currentPage = 1;
  }

  initials(nom: string): string {
    return (nom || '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase())
      .join('');
  }

  actionsFor(user: any): RowAction[] {
    switch (this.activeTab) {
      case 'clients':
        return [
          { label: 'Modifier', actionId: 'modifier', icon: '✏️' },
          user.statut === 'suspendu'
            ? { label: 'Réactiver', actionId: 'reactiver', icon: '✅' }
            : { label: 'Suspendre', actionId: 'suspendre', icon: '⏸️', danger: true },
          { label: 'Archiver le compte', actionId: 'supprimer', icon: '🗑️', danger: true },
          { label: 'Réinitialiser le PIN', actionId: 'reset_pin', icon: '🔢' },
          { label: "Vérifier l'identité (KYC)", actionId: 'verifier_kyc', icon: '🪪' },
          { label: 'Consulter le portefeuille', actionId: 'voir_wallet', icon: '👛' },
          { label: 'Consulter les cartes', actionId: 'voir_cartes', icon: '💳' },
          { label: 'Historique des transactions', actionId: 'voir_historique', icon: '📋' },
          { label: 'Journal des connexions', actionId: 'voir_connexions', icon: '📶' }
        ];
      case 'agents':
        return [
          { label: 'Modifier', actionId: 'modifier', icon: '✏️' },
          user.statut === 'suspendu'
            ? { label: 'Réactiver', actionId: 'reactiver', icon: '✅' }
            : { label: 'Suspendre', actionId: 'suspendre', icon: '⏸️', danger: true },
          { label: 'Archiver le compte', actionId: 'supprimer', icon: '🗑️', danger: true },
          { label: 'Dossier officiel', actionId: 'voir_documents', icon: '📁' },
          { label: 'Limites journalières', actionId: 'voir_limites', icon: '📏' },
          { label: 'Performance', actionId: 'voir_performance', icon: '📈' },
          { label: 'Historique des commissions', actionId: 'voir_commissions', icon: '💵' },
          { label: 'Changer de Super Agent', actionId: 'changer_super_agent', icon: '🔀' }
        ];
      case 'super-agents':
        return [
          { label: 'Modifier', actionId: 'modifier', icon: '✏️' },
          user.statut === 'suspendu'
            ? { label: 'Réactiver', actionId: 'reactiver', icon: '✅' }
            : { label: 'Suspendre', actionId: 'suspendre', icon: '⏸️', danger: true },
          { label: 'Archiver le compte', actionId: 'supprimer', icon: '🗑️', danger: true },
          { label: 'Dossier officiel', actionId: 'voir_documents', icon: '📁' },
          { label: 'Performance', actionId: 'voir_performance', icon: '📈' },
          { label: 'Historique des commissions', actionId: 'voir_commissions', icon: '💵' },
          { label: 'Voir tous les agents', actionId: 'voir_agents', icon: '🧍' },
          { label: 'Gestion des stocks', actionId: 'voir_stocks', icon: '📦' }
        ];
    }
  }

  moreActionsFor(user: any): RowAction[] {
    return this.actionsFor(user).filter(a => !QUICK_ACTION_IDS.has(a.actionId));
  }

  toggleMenu(id: string): void {
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  toggleFolder(): void {
    this.folderOpen = !this.folderOpen;
  }

  handleAction(user: any, actionId: string): void {
    this.openMenuId = null;
    switch (actionId) {
      case 'modifier':
        this.openEditFlow(user);
        break;
      case 'suspendre':
        this.confirmAction(
          'Suspendre ce compte',
          `Confirmer la suspension de « ${user.nom} » (${user.id}) ? Le compte perdra l'accès immédiatement.`,
          true,
          () => this.setStatut(user, 'suspendu')
        );
        break;
      case 'reactiver':
        this.setStatut(user, 'actif');
        this.toast(`« ${user.nom} » a été réactivé.`, 'success');
        break;
      case 'supprimer':
        this.confirmAction(
          'Archiver ce compte',
          `« ${user.nom} » (${user.id}) sera archivé et retiré des listes actives. Cette action est réversible depuis le filtre « Archivé ».`,
          true,
          () => this.setStatut(user, 'archive')
        );
        break;
      case 'reset_pin':
        this.toast(`PIN réinitialisé pour ${user.nom}. Un SMS a été envoyé au ${user.telephone}.`, 'info');
        break;
      case 'reset_password':
        this.toast(`Mot de passe réinitialisé pour ${user.nom}.`, 'info');
        break;
      case 'verifier_kyc': {
        const c = user as ClientUser;
        if (c.kycLevel < 3) {
          c.kycLevel = (Math.min(3, c.kycLevel + 1) as 1 | 2 | 3);
          this.toast(`KYC de ${user.nom} mis à jour : niveau ${c.kycLevel}.`, 'success');
        } else {
          this.toast(`KYC de ${user.nom} est déjà au niveau maximum (3).`, 'info');
        }
        break;
      }
      case 'voir_wallet':
      case 'voir_cartes':
      case 'voir_beneficiaires':
      case 'voir_historique':
      case 'voir_connexions':
      case 'voir_limites':
      case 'voir_soldes':
      case 'voir_performance':
      case 'voir_commissions':
      case 'voir_documents':
      case 'voir_agents':
      case 'voir_stocks':
        this.openDrawer(user, this.mapActionToDrawerTab(actionId));
        break;
      case 'changer_super_agent':
        this.openAssignModal(user);
        break;
      default:
        this.toast(`Action "${actionId}" déclenchée pour ${user.nom}`, 'info');
    }
  }

  private mapActionToDrawerTab(actionId: string): string {
    const map: Record<string, string> = {
      voir_wallet: 'wallet',
      voir_cartes: 'cartes',
      voir_beneficiaires: 'beneficiaires',
      voir_historique: 'historique',
      voir_connexions: 'connexions',
      voir_limites: 'limites',
      voir_soldes: 'infos',
      voir_performance: 'performance',
      voir_commissions: 'commissions',
      voir_documents: 'documents',
      voir_agents: 'reseau',
      voir_stocks: 'stocks'
    };
    return map[actionId] ?? 'infos';
  }

  private setStatut(user: any, statut: Statut): void {
    user.statut = statut;
    if (statut === 'suspendu') {
      this.toast(`« ${user.nom} » a été suspendu.`, 'danger');
    } else if (statut === 'archive') {
      this.toast(`« ${user.nom} » a été archivé.`, 'danger');
    }
  }

  drawerTabsFor(type: ActorTab): { key: string; label: string }[] {
    switch (type) {
      case 'clients':
        return [
          { key: 'infos', label: 'Infos' },
          { key: 'wallet', label: 'Wallet' },
          { key: 'cartes', label: 'Cartes' },
          { key: 'beneficiaires', label: 'Bénéficiaires' },
          { key: 'historique', label: 'Historique' },
          { key: 'connexions', label: 'Connexions' }
        ];
      case 'agents':
        return [
          { key: 'infos', label: 'Infos' },
          { key: 'limites', label: 'Limites' },
          { key: 'performance', label: 'Performance' },
          { key: 'commissions', label: 'Commissions' },
          { key: 'documents', label: 'Documents' }
        ];
      case 'super-agents':
        return [
          { key: 'infos', label: 'Infos' },
          { key: 'reseau', label: "Réseau" },
          { key: 'performance', label: 'Performance' },
          { key: 'commissions', label: 'Commissions' },
          { key: 'documents', label: 'Documents' },
          { key: 'stocks', label: 'Stocks' }
        ];
    }
  }

  openDrawer(user: any, tab = 'infos'): void {
    this.drawerUser = user;
    this.drawerType = this.activeTab;
    this.drawerTab = tab;
    this.drawerOpen = true;
    this.openMenuId = null;
    this.folderOpen = false;
  }

  closeDrawer(): void {
    this.drawerOpen = false;
    this.drawerUser = null;
    this.drawerType = null;
  }

  agentsOfSuperAgent(superAgentId: string): AgentUser[] {
    return this.agents.filter(a => a.superAgentId === superAgentId);
  }

  // MÉTHODE CORRIGÉE AVEC DES VALEURS PAR DÉFAUT
  getHistoriqueDetail(id: string): HistoriqueDetail[] {
    const types: Array<{type: HistoriqueDetail['type'], typeLabel: string, prefix: string}> = [
      { type: 'depot', typeLabel: 'Dépôt', prefix: '+' },
      { type: 'retrait', typeLabel: 'Retrait', prefix: '-' },
      { type: 'transfert', typeLabel: 'Transfert', prefix: '-' },
      { type: 'paiement', typeLabel: 'Paiement', prefix: '-' }
    ];
    
    const destinataires: string[] = [
      'Jean NDAYISHIMIYE', 'Marie NSABIMANA', 'Pierre NIZIGIYIMANA', 
      'Claire NDIKUMANA', 'IBLOPAY SA', 'Mobile Money', 'Banque de la République',
      'John DOE', 'Jane SMITH', 'IBLOPAY Agent 001'
    ];
    
    const montants: number[] = [15000, 25000, 50000, 75000, 100000, 200000, 35000, 45000, 120000, 80000];
    const statuts: ('actif' | 'suspendu' | 'archive')[] = ['actif', 'actif', 'actif', 'actif', 'actif'];
    
    const result: HistoriqueDetail[] = [];
    const count = 5 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < count; i++) {
      const typeIndex = i % types.length;
      // Utilisation de l'opérateur ! pour affirmer que la valeur n'est pas undefined
      const type = types[typeIndex]!;
      const montantIndex = i % montants.length;
      const montant = montants[montantIndex]! * (1 + Math.floor(Math.random() * 3));
      const destIndex = i % destinataires.length;
      const dest = destinataires[destIndex]!;
      const statutIndex = i % statuts.length;
      const statut = statuts[statutIndex]!;
      
      const date = new Date(Date.now() - i * 86400000 * (1 + Math.floor(Math.random() * 3)));
      
      result.push({
        date: date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: type.type,
        typeLabel: type.typeLabel,
        montant: (type.prefix === '+' ? '+' : '-') + ' ' + montant.toLocaleString('fr-FR') + ' BIF',
        destinataire: type.prefix === '+' ? 'IBLOPAY' : dest,
        statut: statut
      });
    }
    
    return result;
  }

  // MÉTHODE CORRIGÉE AVEC DES VALEURS PAR DÉFAUT
  getConnexions(id: string): { date: string; ip: string; appareil: string; localisation: string }[] {
    const localisations: string[] = ['Bujumbura', 'Gitega', 'Ngozi', 'Muyinga', 'Bururi', 'Rumonge', 'Kayanza', 'Cibitoke'];
    const appareils: string[] = ['Android - App IBLOPAY', 'iOS - App IBLOPAY', 'Web - Chrome', 'Web - Firefox', 'Android - Mobile Web'];
    
    const result: { date: string; ip: string; appareil: string; localisation: string }[] = [];
    const count = 3 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < count; i++) {
      const appareilIndex = i % appareils.length;
      const localisationIndex = i % localisations.length;
      
      result.push({
        date: new Date(Date.now() - i * 3600000 * (1 + Math.floor(Math.random() * 4))).toLocaleString('fr-FR'),
        ip: `41.207.${(id.length * (i + 3) + i * 7) % 255}.${(i * 17 + id.length * 3) % 255}`,
        appareil: appareils[appareilIndex]!,
        localisation: localisations[localisationIndex]! + ', Burundi'
      });
    }
    
    return result;
  }

  getLimitPercentage(agent: AgentUser): number {
    return Math.min(100, Math.round((agent.soldeEMoney / agent.limiteJournaliere) * 100));
  }

  exportCSV(): void {
    const headers = ['ID', 'Nom', 'Téléphone', 'CNI', 'Carte', 'Province', 'Commune', 'Statut'];
    const rows = this.filteredList.map((u: any) => [
      u.id, u.nom, u.telephone, u.cni, u.numeroCarte,
      u.province, u.commune, u.statut
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `utilisateurs_${this.activeTab}_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.toast('Export CSV effectué avec succès.', 'success');
  }

  printDocument(): void {
    this.toast('Impression du document en cours...', 'info');
    window.print();
  }

  // ---------- Wizard ----------
  get needsProfessionalStep(): boolean {
    return this.activeTab === 'agents' || this.activeTab === 'super-agents';
  }

  get wizardSteps(): { key: WizardStepKey; label: string }[] {
    const steps: { key: WizardStepKey; label: string }[] = [
      { key: 'carte', label: 'Carte' },
      { key: 'identite', label: 'Identité' },
      { key: 'adresse', label: 'Adresse' }
    ];
    if (this.needsProfessionalStep) steps.push({ key: 'professionnel', label: 'Infos pro' });
    steps.push({ key: 'recap', label: 'Récap' });
    return steps;
  }

  get currentStepKey(): WizardStepKey {
    return this.wizardSteps[this.wizardStep]?.key ?? 'carte';
  }

  openCreateModal(): void {
    this.editingUser = null;
    this.wizardMode = 'create';
    this.wizardStep = 0;
    this.otpSent = false;
    this.otpVerified = false;
    this.otpInput = '';
    this.otpError = false;
    this.otpGenerated = this.generateOtpCode();
    this.wizardData = {
      uid: 'NFC-' + this.generateNFC(),
      nom: '', telephone: '', cni: '',
      numeroCarte: this.generateCardNumber(),
      province: '', commune: '', zone: '', colline: '',
      superAgentId: this.superAgents[0]?.id ?? '',
      agentId: this.agents[0]?.id ?? '',
      region: 'Région Centre',
      nif: '', rccm: '', documentAcceptationNom: '',
      kycLevel: 1,
      tempPassword: this.generateTempPassword()
    };
    this.wizardOpen = true;
  }

  openEditFlow(user: any): void {
    this.openMenuId = null;
    this.editingUser = user;
    this.wizardMode = 'edit';
    this.wizardStep = 1;
    this.otpVerified = true;
    this.otpSent = true;
    this.wizardData = {
      ...user,
      uid: 'NFC-' + this.generateNFC(),
      documentAcceptationNom: user.documentAcceptation ?? ''
    };
    this.wizardOpen = true;
  }

  closeWizard(): void {
    this.wizardOpen = false;
    this.editingUser = null;
  }

  private generateOtpCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateNFC(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let out = '';
    for (let i = 0; i < 8; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
  }

  private generateCardNumber(): string {
    const prefix = this.activeTab === 'clients' ? '6521' : this.activeTab === 'agents' ? '6304' : '6390';
    const g = () => Math.floor(1000 + Math.random() * 9000);
    return `${prefix} ${g()} ${g()} ${g()}`;
  }

  private generateTempPassword(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
  }

  regenerateCard(): void {
    this.wizardData.numeroCarte = this.generateCardNumber();
    this.wizardData.uid = 'NFC-' + this.generateNFC();
    this.otpSent = false;
    this.otpVerified = false;
    this.otpInput = '';
    this.otpGenerated = this.generateOtpCode();
  }

  sendOtp(): void {
    this.otpGenerated = this.generateOtpCode();
    this.otpSent = true;
    this.otpError = false;
    this.otpInput = '';
    this.toast(`Code OTP envoyé au ${this.wizardData.telephone || 'numéro fourni'}.`, 'info');
  }

  verifyOtp(): void {
    if (this.otpInput.trim() === this.otpGenerated) {
      this.otpVerified = true;
      this.otpError = false;
      this.toast('Carte activée avec succès.', 'success');
    } else {
      this.otpError = true;
      this.otpVerified = false;
    }
  }

  get availableCommunes(): string[] {
    return this.wizardData.province ? communesOf(this.wizardData.province) : [];
  }
  get availableZones(): string[] {
    return this.wizardData.province && this.wizardData.commune
      ? zonesOf(this.wizardData.province, this.wizardData.commune) : [];
  }
  get availableCollines(): string[] {
    return this.wizardData.province && this.wizardData.commune && this.wizardData.zone
      ? collinesOf(this.wizardData.province, this.wizardData.commune, this.wizardData.zone) : [];
  }

  onProvinceChange(): void {
    this.wizardData.commune = '';
    this.wizardData.zone = '';
    this.wizardData.colline = '';
  }
  onCommuneChange(): void {
    this.wizardData.zone = '';
    this.wizardData.colline = '';
  }
  onZoneChange(): void {
    this.wizardData.colline = '';
  }

  onDocumentSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    this.wizardData.documentAcceptationNom = file ? file.name : '';
  }

  canGoNext(): boolean {
    switch (this.currentStepKey) {
      case 'carte':
        return !!(this.wizardData.telephone?.trim()) && this.otpVerified;
      case 'identite':
        return !!(this.wizardData.nom?.trim() && this.wizardData.cni?.trim());
      case 'adresse':
        return !!(this.wizardData.province && this.wizardData.commune && this.wizardData.zone && this.wizardData.colline);
      case 'professionnel':
        return !!(this.wizardData.nif?.trim() && this.wizardData.rccm?.trim() && this.wizardData.documentAcceptationNom);
      default:
        return true;
    }
  }

  wizardNext(): void {
    if (!this.canGoNext()) return;
    if (this.wizardStep < this.wizardSteps.length - 1) this.wizardStep++;
  }

  wizardPrev(): void {
    if (this.wizardStep > 0) this.wizardStep--;
  }

  goToStep(i: number): void {
    if (i <= this.wizardStep || this.wizardMode === 'edit') this.wizardStep = i;
  }

  submitWizard(): void {
    if (this.wizardMode === 'create') {
      this.createUserFromWizard();
    } else {
      this.applyEditFromWizard();
    }
    this.wizardOpen = false;
  }

  private createUserFromWizard(): void {
    const d = this.wizardData;
    const seq = this.rawList.length + 1;
    const base = { province: d.province, commune: d.commune, zone: d.zone, colline: d.colline };

    switch (this.activeTab) {
      case 'clients': {
        const agent = this.agents.find(a => a.id === d.agentId);
        this.clients.unshift({
          id: `CL-${pad3(seq)}-N`,
          nom: d.nom, telephone: d.telephone, email: d.email || `client${pad3(seq)}@iblopay.bi`,
          cni: d.cni, numeroCarte: d.numeroCarte,
          agentId: d.agentId, agentNom: agent?.nom ?? '—',
          ...base,
          statut: 'actif', kycLevel: d.kycLevel ?? 1, soldeWallet: 0,
          nbCartes: 1, nbBeneficiaires: 0,
          dateCreation: new Date().toLocaleDateString('fr-FR'), derniereConnexion: '—'
        });
        break;
      }
      case 'agents': {
        const sa = this.superAgents.find(s => s.id === d.superAgentId);
        this.agents.unshift({
          id: `AG-${pad3(seq)}-N`,
          nom: d.nom, telephone: d.telephone,
          cni: d.cni, numeroCarte: d.numeroCarte,
          nif: d.nif, rccm: d.rccm, documentAcceptation: d.documentAcceptationNom,
          superAgentId: d.superAgentId, superAgentNom: sa?.nom.split(' (')[0] ?? '—',
          ...base,
          statut: 'actif', soldeEMoney: 0, soldeCash: 0,
          limiteJournaliere: 500000,
          performance: 0, commissionsMois: 0, dateCreation: new Date().toLocaleDateString('fr-FR')
        });
        break;
      }
      case 'super-agents':
        this.superAgents.unshift({
          id: `SA-${pad3(seq)}-N`,
          nom: d.nom, telephone: d.telephone,
          cni: d.cni, numeroCarte: d.numeroCarte,
          nif: d.nif, rccm: d.rccm, documentAcceptation: d.documentAcceptationNom,
          region: d.region,
          ...base,
          statut: 'actif', nbAgents: 0, soldeDistribution: 0, performanceGlobale: 0,
          commissionsMois: 0, dateCreation: new Date().toLocaleDateString('fr-FR')
        });
        break;
    }
    this.toast(`« ${d.nom} » créé avec succès. Mot de passe initial : ${d.tempPassword}`, 'success');
  }

  private applyEditFromWizard(): void {
    if (!this.editingUser) return;
    Object.assign(this.editingUser, {
      nom: this.wizardData.nom,
      telephone: this.wizardData.telephone,
      cni: this.wizardData.cni,
      numeroCarte: this.wizardData.numeroCarte,
      province: this.wizardData.province,
      commune: this.wizardData.commune,
      zone: this.wizardData.zone,
      colline: this.wizardData.colline
    });
    if (this.activeTab === 'clients') {
      const agent = this.agents.find(a => a.id === this.wizardData.agentId);
      Object.assign(this.editingUser, { agentId: this.wizardData.agentId, agentNom: agent?.nom ?? '—' });
    }
    if (this.activeTab === 'agents' || this.activeTab === 'super-agents') {
      Object.assign(this.editingUser, {
        nif: this.wizardData.nif,
        rccm: this.wizardData.rccm,
        documentAcceptation: this.wizardData.documentAcceptationNom
      });
    }
    if (this.activeTab === 'agents') {
      const sa = this.superAgents.find(s => s.id === this.wizardData.superAgentId);
      Object.assign(this.editingUser, { superAgentId: this.wizardData.superAgentId, superAgentNom: sa?.nom.split(' (')[0] ?? '—' });
    }
    if (this.activeTab === 'super-agents') {
      Object.assign(this.editingUser, { region: this.wizardData.region });
    }
    this.toast(`« ${this.wizardData.nom} » mis à jour.`, 'success');
  }

  // ---------- Réaffectation ----------
  assignModalOpen = false;
  assignTargetUser: AgentUser | null = null;
  assignTargetSuperAgentId = '';

  openAssignModal(user: AgentUser): void {
    this.assignTargetUser = user;
    this.assignTargetSuperAgentId = user.superAgentId;
    this.assignModalOpen = true;
    this.openMenuId = null;
  }

  closeAssignModal(): void {
    this.assignModalOpen = false;
    this.assignTargetUser = null;
  }

  confirmAssign(): void {
    if (!this.assignTargetUser) return;
    const sa = this.superAgents.find(s => s.id === this.assignTargetSuperAgentId);
    this.assignTargetUser.superAgentId = this.assignTargetSuperAgentId;
    this.assignTargetUser.superAgentNom = sa?.nom.split(' (')[0] ?? '—';
    this.toast(`${this.assignTargetUser.nom} rattaché à ${this.assignTargetUser.superAgentNom}.`, 'success');
    this.closeAssignModal();
  }

  confirmAction(title: string, message: string, danger: boolean, onConfirm: () => void): void {
    this.confirm = { title, message, danger, onConfirm };
  }

  resolveConfirm(): void {
    this.confirm?.onConfirm();
    this.confirm = null;
  }

  cancelConfirm(): void {
    this.confirm = null;
  }

  toast(message: string, type: Toast['type'] = 'info'): void {
    const id = ++this.toastSeq;
    this.toasts.push({ id, message, type });
    setTimeout(() => this.dismissToast(id), 5000);
  }

  dismissToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  statutLabel(statut: string): string {
    const labels: Record<string, string> = {
      actif: 'Actif', suspendu: 'Suspendu', archive: 'Archivé'
    };
    return labels[statut] ?? statut;
  }

  formatBIF(n: number): string {
    return new Intl.NumberFormat('fr-FR').format(n) + ' BIF';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  }

  trackById(_i: number, item: any): string {
    return item.id;
  }

  asClient(u: AnyUser): ClientUser { return u as ClientUser; }
  asAgent(u: AnyUser): AgentUser { return u as AgentUser; }
  asSuperAgent(u: AnyUser): SuperAgentUser { return u as SuperAgentUser; }

  range(n: number): number[] {
    return Array.from({ length: Math.max(0, n) }, (_, i) => i);
  }
}

function pad3(n: number): string {
  return n.toString().padStart(3, '0');
}