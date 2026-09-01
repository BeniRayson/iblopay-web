import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Bordereau {
  id: string;
  numero: string;
  nomVersant: string;
  montant: number;
  date: string;
  statut: 'valide' | 'en_attente' | 'rejete';
  description?: string;
}

interface ComptabiliteItem {
  id: string;
  date: string;
  compte: string;
  libelle: string;
  debit: number | null;
  credit: number | null;
  reference: string;
  typeEcriture?: string;
}

interface RapportItem {
  id: string;
  titre: string;
  description: string;
  icon: string;
  date: string;
  taille: string;
  type: string;
  contenu?: string;
}

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

@Component({
  selector: 'app-financial-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './financial-settings.component.html',
  styleUrls: ['./financial-settings.component.scss']
})
export class FinancialSettingsComponent {
  readonly title = 'Gestion Financière';
  readonly icon = '🏦';
  readonly pageSize = 10;
  private readonly STORAGE_KEY = 'financial_data';

  tabs: TabItem[] = [
    { key: 'bordereaux', label: 'Bordereaux', icon: '📋', count: 0 },
    { key: 'comptabilite', label: 'Comptabilité', icon: '🧾', count: 0 },
    { key: 'rapports', label: 'Rapports', icon: '📄', count: 0 },
    { key: 'configuration', label: 'Configuration', icon: '⚙️' }
  ];

  activeTab: string = 'bordereaux';
  private currentPages: { [key: string]: number } = {
    bordereaux: 1,
    comptabilite: 1
  };

  private bordereaux: Bordereau[] = [];
  private comptabiliteData: ComptabiliteItem[] = [];
  private rapportsData: RapportItem[] = [];
  private configData: any[] = [];

  private soldeDisponible: number = 500000000;
  private liquiditeUtilisee: number = 0;

  private toastSeq = 0;

  modalOpen = false;
  modalTitle = '';
  modalType = '';
  modalIcon = '';
  selectedItem: any = null;
  formData: any = {};
  rapportPreview: string = '';

  toasts: Toast[] = [];

  constructor() {
    this.loadData();
    this.initializeData();
    this.updateTabsCount();
  }

  private loadData(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.bordereaux) this.bordereaux = data.bordereaux;
        if (data.comptabiliteData) this.comptabiliteData = data.comptabiliteData;
        if (data.rapportsData) this.rapportsData = data.rapportsData;
        if (data.configData) this.configData = data.configData;
        if (data.soldeDisponible) this.soldeDisponible = data.soldeDisponible;
        if (data.liquiditeUtilisee) this.liquiditeUtilisee = data.liquiditeUtilisee;
        return;
      } catch (e) {
        console.error('Erreur de chargement des données', e);
      }
    }
  }

  private saveData(): void {
    const data = {
      bordereaux: this.bordereaux,
      comptabiliteData: this.comptabiliteData,
      rapportsData: this.rapportsData,
      configData: this.configData,
      soldeDisponible: this.soldeDisponible,
      liquiditeUtilisee: this.liquiditeUtilisee
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  private updateTabsCount(): void {
    const tabKeys = ['bordereaux', 'comptabilite', 'rapports'];
    const dataArrays = [
      this.bordereaux,
      this.comptabiliteData,
      this.rapportsData
    ];
    
    tabKeys.forEach((key, index) => {
      const tab = this.tabs.find(t => t.key === key);
      if (tab) {
        tab.count = dataArrays[index]?.length || 0;
      }
    });
  }

  private initializeData(): void {
    if (this.bordereaux.length > 0 || this.comptabiliteData.length > 0) {
      return;
    }

    // Bordereaux
    const noms: string[] = ['Jean NDAYISHIMIYE', 'Marie NSABIMANA', 'Pierre NIZIGIYIMANA', 'Claire NDIKUMANA', 'Emmanuel NTAKIRUTIMANA'];
    const statuts: Bordereau['statut'][] = ['valide', 'valide', 'valide', 'en_attente', 'rejete'];
    
    for (let i = 0; i < 25; i++) {
      const nomIndex = i % noms.length;
      const nom: string = noms[nomIndex]!;
      const statutIndex = i % statuts.length;
      const statut: Bordereau['statut'] = statuts[statutIndex]!;
      const montant = 50000 + Math.floor(Math.random() * 450000);
      
      this.bordereaux.push({
        id: `BR-${String(100000 + i).padStart(6, '0')}`,
        numero: `BOR-${String(100000 + i).padStart(6, '0')}`,
        nomVersant: nom,
        montant: montant,
        date: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString('fr-FR'),
        statut: statut,
        description: `Versement #${i + 1}`
      });
      this.liquiditeUtilisee += montant;
    }

    // Comptabilité
    const comptes: { code: string, label: string }[] = [
      { code: '411001', label: 'Clients' },
      { code: '512001', label: 'Banque' },
      { code: '531001', label: 'Caisse' },
      { code: '701001', label: 'Ventes' },
      { code: '411002', label: 'Agents' },
      { code: '411003', label: 'Super Agents' },
      { code: '512002', label: 'Trust Account' },
      { code: '706001', label: 'Commissions' }
    ];
    const libelles: string[] = ['Vente de carte', 'Commission agent', 'Dépôt client', 'Retrait agent', 'Transfert e-Money', 'Frais de transaction'];
    const typesEcriture: string[] = ['achat', 'vente', 'transfert', 'ajustement', 'commission'];
    
    for (let i = 0; i < 20; i++) {
      const compteIndex = i % comptes.length;
      const compte: { code: string, label: string } = comptes[compteIndex]!;
      const libelleIndex = i % libelles.length;
      const libelle: string = libelles[libelleIndex]!;
      const debit = i % 2 === 0 ? 10000 + Math.floor(Math.random() * 50000) : null;
      const credit = i % 2 !== 0 ? 10000 + Math.floor(Math.random() * 50000) : null;
      
      this.comptabiliteData.push({
        id: `EC-${String(100000 + i).padStart(6, '0')}`,
        date: new Date(Date.now() - i * 86400000 * 3).toLocaleDateString('fr-FR'),
        compte: `${compte.code} - ${compte.label}`,
        libelle: libelle,
        debit: debit,
        credit: credit,
        reference: `REF-${String(100000 + i).padStart(6, '0')}`,
        typeEcriture: typesEcriture[i % typesEcriture.length] || 'transfert'
      });
    }

    // Rapports avec contenu
    this.rapportsData = [
      { 
        id: 'RP-001', 
        titre: 'Rapport Journalier', 
        description: 'Résumé complet des transactions du jour', 
        icon: '📅', 
        date: new Date().toLocaleDateString('fr-FR'), 
        taille: '245 KB', 
        type: 'Journalier',
        contenu: this.generateRapportJournalier()
      },
      { 
        id: 'RP-002', 
        titre: 'Rapport Hebdomadaire', 
        description: 'Analyse détaillée des 7 derniers jours', 
        icon: '📊', 
        date: new Date(Date.now() - 2 * 86400000).toLocaleDateString('fr-FR'), 
        taille: '1.2 MB', 
        type: 'Hebdomadaire',
        contenu: this.generateRapportHebdomadaire()
      },
      { 
        id: 'RP-003', 
        titre: 'Rapport Mensuel', 
        description: 'Bilan financier complet du mois', 
        icon: '📈', 
        date: new Date(Date.now() - 5 * 86400000).toLocaleDateString('fr-FR'), 
        taille: '3.8 MB', 
        type: 'Mensuel',
        contenu: this.generateRapportMensuel()
      },
      { 
        id: 'RP-004', 
        titre: 'Rapport des Commissions', 
        description: 'Détail des commissions par agent', 
        icon: '💵', 
        date: new Date(Date.now() - 7 * 86400000).toLocaleDateString('fr-FR'), 
        taille: '890 KB', 
        type: 'Commissions',
        contenu: this.generateRapportCommissions()
      },
      { 
        id: 'RP-005', 
        titre: 'Rapport des Bordereaux', 
        description: 'Liste des bordereaux de versement', 
        icon: '📋', 
        date: new Date(Date.now() - 14 * 86400000).toLocaleDateString('fr-FR'), 
        taille: '567 KB', 
        type: 'Bordereaux',
        contenu: this.generateRapportBordereaux()
      }
    ];

    // Configuration
    this.configData = [
      {
        icon: '💰',
        nom: 'Limites et Plafonds',
        items: [
          { label: 'Plafond max transaction', value: '500,000 BIF' },
          { label: 'Plafond journalier client', value: '1,000,000 BIF' },
          { label: 'Plafond carte', value: '500,000 BIF' },
          { label: 'Limite min transaction', value: '100 BIF' }
        ]
      },
      {
        icon: '💳',
        nom: 'Frais et Commissions',
        items: [
          { label: "Frais d'émission carte", value: '5,000 BIF' },
          { label: 'Frais de renouvellement', value: '2,500 BIF' },
          { label: 'Frais de transaction', value: '1.5%' },
          { label: 'Frais de retrait', value: '2.0%' }
        ]
      },
      {
        icon: '🔒',
        nom: 'Sécurité Financière',
        items: [
          { label: "Seuil d'alerte solde", value: '10,000,000 BIF' },
          { label: 'Seuil transaction suspecte', value: '2,000,000 BIF' },
          { label: 'Double authentification', value: 'Activée' },
          { label: "Délai d'expiration", value: '30 minutes' }
        ]
      }
    ];

    this.saveData();
  }

  // ========== GÉNÉRATION DE RAPPORTS ==========

  private generateRapportJournalier(): string {
    return `📊 RAPPORT JOURNALIER - ${new Date().toLocaleDateString('fr-FR')}\n\n` +
           `📋 Total Bordereaux: ${this.bordereaux.length}\n` +
           `💰 Montant Total: ${this.getTotalMontantBordereaux().toLocaleString('fr-FR')} BIF\n` +
           `📊 Transactions: ${this.getNombreTransactions()}\n\n` +
           `✅ Validés: ${this.bordereaux.filter(b => b.statut === 'valide').length}\n` +
           `⏳ En attente: ${this.bordereaux.filter(b => b.statut === 'en_attente').length}\n` +
           `❌ Rejetés: ${this.bordereaux.filter(b => b.statut === 'rejete').length}`;
  }

  private generateRapportHebdomadaire(): string {
    return `📈 RAPPORT HEBDOMADAIRE\n\n` +
           `📊 Période du ${new Date(Date.now() - 7 * 86400000).toLocaleDateString('fr-FR')} au ${new Date().toLocaleDateString('fr-FR')}\n\n` +
           `📋 Bordereaux: ${this.bordereaux.length}\n` +
           `💰 Montant Total: ${this.getTotalMontantBordereaux().toLocaleString('fr-FR')} BIF\n` +
           `📈 Évolution: +15% vs semaine dernière`;
  }

  private generateRapportMensuel(): string {
    return `📊 RAPPORT MENSUEL - ${new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}\n\n` +
           `📋 Total Bordereaux: ${this.bordereaux.length}\n` +
           `💰 Montant Total: ${this.getTotalMontantBordereaux().toLocaleString('fr-FR')} BIF\n` +
           `📊 Transactions: ${this.getNombreTransactions()}\n\n` +
           `📈 Croissance: +12%\n` +
           `🎯 Objectif: 85% atteint`;
  }

  private generateRapportCommissions(): string {
    return `💵 RAPPORT DES COMMISSIONS\n\n` +
           `📋 Détail des commissions par agent\n\n` +
           `👨‍💼 Super Agents: 2 agents\n` +
           `💰 Total: 2,500,000 BIF\n` +
           `📊 Taux moyen: 2.5%\n\n` +
           `🏆 Top: Pierre NIZIGIYIMANA - 850,000 BIF`;
  }

  private generateRapportBordereaux(): string {
    return `📋 RAPPORT DES BORDEREAUX\n\n` +
           `📊 Liste des bordereaux de versement\n\n` +
           `📋 Total: ${this.bordereaux.length}\n` +
           `💰 Montant total: ${this.getTotalMontantBordereaux().toLocaleString('fr-FR')} BIF\n\n` +
           `✅ Validés: ${this.bordereaux.filter(b => b.statut === 'valide').length}\n` +
           `⏳ En attente: ${this.bordereaux.filter(b => b.statut === 'en_attente').length}\n` +
           `❌ Rejetés: ${this.bordereaux.filter(b => b.statut === 'rejete').length}`;
  }

  // ========== KPI DATA ==========

  getKpiData(): any[] {
    return [
      {
        icon: '📋',
        label: 'Bordereaux',
        value: this.getTotalBordereaux(),
        color: '#E8EDF5',
        trend: 'up',
        trendValue: `${this.getBordereauxEnAttente().length} en attente`
      },
      {
        icon: '💰',
        label: 'Montant Total',
        value: this.getTotalMontantBordereaux().toLocaleString('fr-FR'),
        color: '#E6F4EE',
        trend: 'up',
        trendValue: 'BIF'
      },
      {
        icon: '📊',
        label: 'Transactions',
        value: this.getNombreTransactions(),
        color: '#FBEBEA',
        trend: 'up',
        trendValue: `${this.getTransactionsEffectuees()} effectuées`
      },
      {
        icon: '📄',
        label: 'Rapports',
        value: this.rapportsData.length,
        color: '#FCF1DD',
        trend: 'up',
        trendValue: 'disponibles'
      }
    ];
  }

  // ========== BORDEREAUX ==========

  getTotalBordereaux(): number {
    return this.bordereaux.length;
  }

  getBordereauxEnAttente(): Bordereau[] {
    return this.bordereaux.filter(b => b.statut === 'en_attente');
  }

  getTotalMontantBordereaux(): number {
    return this.bordereaux.reduce((sum, b) => sum + b.montant, 0);
  }

  getMontantMoyenBordereau(): number {
    return this.bordereaux.length > 0 ? this.getTotalMontantBordereaux() / this.bordereaux.length : 0;
  }

  getBordereaux(): Bordereau[] {
    return this.bordereaux.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getPaginatedBordereaux(): Bordereau[] {
    const page = this.currentPages['bordereaux'] || 1;
    const start = (page - 1) * this.pageSize;
    return this.getBordereaux().slice(start, start + this.pageSize);
  }

  getTotalBordereauxPages(): number {
    return Math.ceil(this.getBordereaux().length / this.pageSize);
  }

  deleteBordereau(item: any): void {
    if (confirm(`Voulez-vous vraiment supprimer le bordereau ${item.numero} ?`)) {
      this.bordereaux = this.bordereaux.filter(b => b.id !== item.id);
      this.updateTabsCount();
      this.saveData();
      this.toast(`Bordereau ${item.numero} supprimé avec succès.`, 'success');
    }
  }

  // ========== TRANSACTIONS ==========

  getNombreTransactions(): number {
    return this.bordereaux.length + this.comptabiliteData.length;
  }

  getTransactionsEffectuees(): number {
    return this.bordereaux.filter(b => b.statut === 'valide').length;
  }

  // ========== COMPTABILITÉ ==========

  getComptabiliteData(): ComptabiliteItem[] {
    return this.comptabiliteData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getPaginatedComptabilite(): ComptabiliteItem[] {
    const page = this.currentPages['comptabilite'] || 1;
    const start = (page - 1) * this.pageSize;
    return this.getComptabiliteData().slice(start, start + this.pageSize);
  }

  getTotalComptabilitePages(): number {
    return Math.ceil(this.getComptabiliteData().length / this.pageSize);
  }

  // ========== RAPPORTS ==========

  getRapports(): RapportItem[] {
    return this.rapportsData;
  }

  viewRapport(rapport: RapportItem): void {
    this.selectedItem = rapport;
    this.modalType = 'voir_rapport';
    this.modalTitle = `📄 ${rapport.titre}`;
    this.modalIcon = rapport.icon;
    this.rapportPreview = rapport.contenu || 'Aucun contenu disponible pour ce rapport.';
    this.modalOpen = true;
  }

  downloadRapport(rapport: RapportItem): void {
    const content = rapport.contenu || `Rapport: ${rapport.titre}\nDate: ${rapport.date}\nType: ${rapport.type}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${rapport.titre.toLowerCase().replace(/\s/g, '_')}_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    this.toast(`Rapport "${rapport.titre}" téléchargé avec succès.`, 'success');
  }

  // ========== CONFIGURATION ==========

  getConfiguration(): any[] {
    return this.configData;
  }

  // ========== PAGINATION ==========

  getCurrentPage(type: string): number {
    return this.currentPages[type] || 1;
  }

  nextPage(type: string): void {
    const totalPages = type === 'bordereaux' ? this.getTotalBordereauxPages() : this.getTotalComptabilitePages();
    const current = this.currentPages[type] || 1;
    if (current < totalPages) {
      this.currentPages[type] = current + 1;
    }
  }

  prevPage(type: string): void {
    const current = this.currentPages[type] || 1;
    if (current > 1) {
      this.currentPages[type] = current - 1;
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.currentPages[tab] = 1;
  }

  // ========== MODALES ==========

  openNouveauBordereau(): void {
    this.modalType = 'nouveau_bordereau';
    this.modalTitle = '📋 Nouveau Bordereau';
    this.modalIcon = '📋';
    this.formData = {
      nomVersant: '',
      montant: 0,
      date: new Date().toISOString().split('T')[0],
      description: ''
    };
    this.modalOpen = true;
  }

  openNouvelleEcriture(): void {
    this.modalType = 'nouvelle_ecriture';
    this.modalTitle = '✏️ Nouvelle Écriture Comptable';
    this.modalIcon = '✏️';
    this.formData = {
      compte: '512001 - Banque',
      libelle: '',
      debit: 0,
      credit: 0,
      typeEcriture: 'transfert'
    };
    this.modalOpen = true;
  }

  openCorrigerEcriture(item: any): void {
    this.selectedItem = item;
    this.modalType = 'corriger_ecriture';
    this.modalTitle = '🔧 Corriger Écriture';
    this.modalIcon = '🔧';
    this.formData = { ...item };
    this.modalOpen = true;
  }

  openGenererRapport(): void {
    this.modalType = 'generer_rapport';
    this.modalTitle = '📄 Générer un Rapport';
    this.modalIcon = '📄';
    this.formData = {
      type: 'journalier',
      format: 'pdf'
    };
    this.modalOpen = true;
  }

  openModifierConfig(item: any): void {
    this.selectedItem = item;
    this.modalType = 'modifier_config';
    this.modalTitle = '✏️ Modifier la Configuration';
    this.modalIcon = '✏️';
    this.formData = {
      nouvelleValeur: item.value,
      raison: ''
    };
    this.modalOpen = true;
  }

  viewBordereau(item: any): void {
    this.selectedItem = item;
    this.modalType = 'voir_bordereau';
    this.modalTitle = '👁️ Détails du bordereau';
    this.modalIcon = '👁️';
    this.modalOpen = true;
  }

  viewEcriture(item: any): void {
    this.selectedItem = item;
    this.modalType = 'voir_ecriture';
    this.modalTitle = '👁️ Détails de l\'écriture';
    this.modalIcon = '👁️';
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.selectedItem = null;
    this.rapportPreview = '';
  }

  confirmModal(): void {
    switch (this.modalType) {
      case 'nouveau_bordereau':
        this.ajouterBordereau();
        break;
      case 'nouvelle_ecriture':
      case 'corriger_ecriture':
        this.toast('Écriture comptable enregistrée avec succès.', 'success');
        break;
      case 'generer_rapport':
        this.genererRapport();
        break;
      case 'modifier_config':
        this.modifierConfiguration();
        break;
    }
    this.closeModal();
  }

  private ajouterBordereau(): void {
    const nomVersant = this.formData.nomVersant;
    const montant = this.formData.montant;
    const date = this.formData.date;
    const description = this.formData.description;

    if (!nomVersant || montant <= 0) {
      this.toast('Veuillez remplir tous les champs correctement.', 'danger');
      return;
    }

    const nouveauBordereau: Bordereau = {
      id: `BR-${String(100000 + this.bordereaux.length + 1).padStart(6, '0')}`,
      numero: `BOR-${String(100000 + this.bordereaux.length + 1).padStart(6, '0')}`,
      nomVersant: nomVersant,
      montant: montant,
      date: date,
      statut: 'en_attente',
      description: description || 'Nouveau versement'
    };

    this.bordereaux.push(nouveauBordereau);
    this.liquiditeUtilisee += montant;
    this.updateTabsCount();
    this.saveData();
    this.toast(`Bordereau ${nouveauBordereau.numero} créé avec succès.`, 'success');
  }

  private genererRapport(): void {
    const type = this.formData.type || 'journalier';
    const format = this.formData.format || 'pdf';
    
    let contenu = '';
    let titre = '';
    
    switch(type) {
      case 'journalier':
        titre = 'Rapport Journalier';
        contenu = this.generateRapportJournalier();
        break;
      case 'hebdomadaire':
        titre = 'Rapport Hebdomadaire';
        contenu = this.generateRapportHebdomadaire();
        break;
      case 'mensuel':
        titre = 'Rapport Mensuel';
        contenu = this.generateRapportMensuel();
        break;
      case 'commissions':
        titre = 'Rapport des Commissions';
        contenu = this.generateRapportCommissions();
        break;
      case 'bordereaux':
        titre = 'Rapport des Bordereaux';
        contenu = this.generateRapportBordereaux();
        break;
      default:
        contenu = 'Type de rapport non reconnu.';
    }
    
    const nouveauRapport: RapportItem = {
      id: `RP-${String(100000 + this.rapportsData.length + 1).padStart(6, '0')}`,
      titre: titre,
      description: `Rapport ${type} généré le ${new Date().toLocaleDateString('fr-FR')}`,
      icon: '📄',
      date: new Date().toLocaleDateString('fr-FR'),
      taille: `${Math.ceil(contenu.length / 1024)} KB`,
      type: type.charAt(0).toUpperCase() + type.slice(1),
      contenu: contenu
    };
    
    this.rapportsData.push(nouveauRapport);
    this.updateTabsCount();
    this.saveData();
    this.toast(`Rapport "${titre}" généré avec succès.`, 'success');
  }

  private modifierConfiguration(): void {
    if (!this.selectedItem) return;
    const nouvelleValeur = this.formData.nouvelleValeur;
    const raison = this.formData.raison;
    
    if (!nouvelleValeur) {
      this.toast('Veuillez entrer une nouvelle valeur.', 'danger');
      return;
    }
    
    this.selectedItem.value = nouvelleValeur;
    this.saveData();
    this.toast(`Configuration "${this.selectedItem.label}" modifiée avec succès.`, 'success');
  }

  getRapportPeriode(): string {
    if (this.formData.type === 'journalier') return 'Aujourd\'hui';
    if (this.formData.type === 'hebdomadaire') return 'Cette semaine';
    if (this.formData.type === 'mensuel') return 'Ce mois';
    if (this.formData.type === 'commissions') return 'Période des commissions';
    if (this.formData.type === 'bordereaux') return 'Période des bordereaux';
    return 'Période personnalisée';
  }

  // ========== EXPORTS ==========

  exportBordereaux(): void {
    const data = JSON.stringify(this.bordereaux, null, 2);
    this.downloadFile(data, 'bordereaux.json', 'application/json');
    this.toast('Export des bordereaux terminé.', 'success');
  }

  printBordereaux(): void {
    this.toast('Impression en cours...', 'info');
    window.print();
  }

  exportComptabilite(): void {
    const data = JSON.stringify(this.comptabiliteData, null, 2);
    this.downloadFile(data, 'comptabilite.json', 'application/json');
    this.toast('Export de la comptabilité terminé.', 'success');
  }

  printComptabilite(): void {
    this.toast('Impression en cours...', 'info');
    window.print();
  }

  downloadBordereau(item: any): void {
    const data = JSON.stringify(item, null, 2);
    this.downloadFile(data, `bordereau_${item.numero}.json`, 'application/json');
    this.toast(`Bordereau ${item.numero} téléchargé.`, 'success');
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // ========== UTILITAIRES ==========

  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      valide: '✅ Validé',
      en_attente: '⏳ En attente',
      rejete: '❌ Rejeté'
    };
    return labels[statut] || statut;
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