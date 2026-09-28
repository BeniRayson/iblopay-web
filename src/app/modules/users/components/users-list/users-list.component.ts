// src/app/modules/users/components/users-list/users-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl: string;
  role: 'CLIENT' | 'AGENT' | 'SUPER_AGENT';
  status: 'ACTIVE' | 'SUSPENDED' | 'FROZEN' | 'CLOSED';
  cardNumber: string;
  cniNumber: string;
  address: {
    zone: string;
    commune: string;
    province: string;
    fullAddress: string;
  };
  createdAt: Date;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  accountNumber: string;
  walletBalance: number;
}

interface Shareholder {
  id: string;
  firstName: string;
  lastName: string;
  walletNumber: string;
  address: string;
  capital: number;
  shares: number;
  createdAt: Date;
}

const DEFAULT_PHOTO = '';
const DEFAULT_CREATOR = {
  id: '',
  firstName: '',
  lastName: '',
  role: ''
};

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  isLoading = false;
  searchTerm = '';
  selectedRole = '';
  selectedStatus = '';
  currentPage = 1;
  itemsPerPage = 50;
  totalPages = 0;
  stats = {
    total: 0,
    clients: 0,
    agents: 0,
    superAgents: 0,
    active: 0
  };

  // ─── MODALE STATUT ──────────────────────────────
  showStatusModal = false;
  statusLoading = false;
  statusError = '';
  statusSuccess = '';
  selectedUser: User | null = null;
  selectedNewStatus = '';
  currentUserStatus = '';
  statusOptions = [
    { value: 'ACTIVE', label: 'Actif', color: '#10b981', icon: 'fa-check-circle' },
    { value: 'SUSPENDED', label: 'Suspendu', color: '#f59e0b', icon: 'fa-pause-circle' },
    { value: 'FROZEN', label: 'Gelé', color: '#3b82f6', icon: 'fa-snowflake' },
    { value: 'CLOSED', label: 'Fermé', color: '#ef4444', icon: 'fa-times-circle' }
  ];

  // ─── MODALE SUPPRESSION ──────────────────────────
  showDeleteModal = false;
  deleteLoading = false;
  deleteError = '';
  deleteSuccess = '';

  // ─── ACTIONNAIRES ────────────────────────────────
  shareholders: Shareholder[] = [];
  filteredShareholders: Shareholder[] = [];
  showShareholdersModal = false;
  shareholderSearchTerm = '';
  showShareholderForm = false;
  editingShareholder: Shareholder | null = null;
  shareholderForm: {
    firstName: string;
    lastName: string;
    walletNumber: string;
    address: string;
    capital: number;
    shares: number;
  } = this.getEmptyShareholderForm();
  shareholderFormError = '';
  shareholderFormSuccess = '';

  Math = Math;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMockUsers();
    this.loadMockShareholders();
  }

  loadMockUsers(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.users = this.generateMockUsers();
      this.refreshAll();
      this.isLoading = false;
    }, 500);
  }

  private generateMockUsers(): User[] {
    const firstNames = ['Jean', 'Marie', 'Pierre', 'Claire', 'Michel', 'Anne', 'Paul', 'Jeanne', 'Alain', 'Rose',
      'David', 'Martine', 'Joseph', 'Françoise', 'Emmanuel', 'Catherine', 'Thomas', 'Nathalie',
      'Philippe', 'Isabelle', 'Eric', 'Valérie', 'Nicolas', 'Sandrine', 'Christian', 'Brigitte',
      'Patrick', 'Céline', 'Didier', 'Sophie', 'André', 'Monique', 'Laurent', 'Chantal', 'Pascal',
      'Fabrice', 'Jacqueline', 'Marcel', 'Suzanne', 'Henri', 'Louise', 'Georges', 'Jeannine',
      'Maurice', 'Simone', 'René', 'Odette', 'Raymond', 'Marcelle', 'Lucien', 'Sylvie', 'Bertrand'];
    const lastNames = ['Ndayishimiye', 'Uwimana', 'Niyonzima', 'Mukiza', 'Nishimwe', 'Hakizimana', 'Mbonimpa',
      'Nkurunziza', 'Ntakarutimana', 'Gahungu', 'Bashirahishize', 'Ndikumana', 'Niyungeko',
      'Ndayisaba', 'Habonimana', 'Manirakiza', 'Barakamfitiye', 'Nimpagaritse', 'Nirere',
      'Nyandwi', 'Ndamukunda', 'Hakizinka', 'Gashirabake', 'Rutayisire', 'Nduwimana',
      'Niyongabo', 'Ndayizeye', 'Niyonshuti', 'Uwizeyimana', 'Ntibazobimana', 'Baranyizigiye',
      'Niyikiza', 'Niyomugabo', 'Hakorimana', 'Ndayisenga', 'Ntamwenge', 'Niyokwizera'];
    const communes = ['Mukaza', 'Ntahangwa', 'Muha', 'Isale', 'Kabezi', 'Mubimbi', 'Mugongomanga',
      'Muhuta', 'Mukike', 'Mutambu', 'Mutimbuzi', 'Nyabiraba', 'Buyenzi', 'Kinindo'];
    const zones = ['Nyakabiga', 'Kigobe', 'Rohero', 'Kanyosha', 'Ruziba', 'Kinama', 'Gihosha',
      'Kiriri', 'Musaga', 'Ntare', 'Cibitoke', 'Ngagara', 'Gatoke', 'Vugizo',
      'Kwijabe', 'Gasenyi', 'Kavumu', 'Rukaramu', 'Taba', 'Bwiza', 'Gatete'];
    const provinces = ['Bujumbura Mairie', 'Bujumbura Rural', 'Bururi', 'Gitega', 'Muramvya',
      'Ngozi', 'Muyinga', 'Ruyigi', 'Kirundo', 'Kayanza', 'Karuzi', 'Cankuzo'];
    const roles: User['role'][] = ['CLIENT', 'AGENT', 'SUPER_AGENT'];
    const statuses: User['status'][] = ['ACTIVE', 'SUSPENDED', 'FROZEN', 'CLOSED'];
    const users: User[] = [];

    for (let i = 1; i <= 80; i++) {
      const firstName = firstNames[i % firstNames.length] || 'Jean';
      const lastName = lastNames[i % lastNames.length] || 'Dupont';
      const role = roles[i % roles.length] || 'CLIENT';
      const status = statuses[i % statuses.length] || 'ACTIVE';
      const province = provinces[i % provinces.length] || 'Bujumbura Mairie';
      const commune = communes[i % communes.length] || 'Mukaza';
      const zone = zones[i % zones.length] || 'Nyakabiga';

      let createdBy = { ...DEFAULT_CREATOR };
      if (role === 'CLIENT') {
        const creatorIndex = (i + 1) % 20;
        createdBy = {
          id: `agent-${creatorIndex + 1}`,
          firstName: firstNames[creatorIndex] || 'Agent',
          lastName: lastNames[creatorIndex] || 'Créateur',
          role: 'AGENT'
        };
      } else if (role === 'AGENT') {
        const creatorIndex = (i + 3) % 10;
        createdBy = {
          id: `super-${creatorIndex + 1}`,
          firstName: firstNames[creatorIndex + 15] || 'Super',
          lastName: lastNames[creatorIndex + 15] || 'Agent',
          role: 'SUPER_AGENT'
        };
      } else {
        createdBy = { id: '', firstName: '', lastName: '', role: '' };
      }

      const cardNumber = `CARD-${String(20240000 + i * 123).substring(0, 12)}`;
      const cniNumber = `CNI-${String(100000 + i * 7)}`;

      users.push({
        id: `user-${String(i).padStart(4, '0')}`,
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@iblopay.bi`,
        phone: `+257 6${String(10000000 + i * 7).substring(0, 8)}`,
        photoUrl: i % 5 === 0 ? `https://i.pravatar.cc/150?img=${i}` : DEFAULT_PHOTO,
        role,
        status,
        cardNumber,
        cniNumber,
        address: {
          zone,
          commune,
          province,
          fullAddress: `${zone}; ${commune}; ${province}`
        },
        createdAt: new Date(2024, 0, 1 + i),
        createdBy,
        accountNumber: `IBL-${String(100000000 + i * 98765).substring(0, 12)}`,
        walletBalance: Math.round((100000 + i * 15000) / 100) * 100
      });
    }

    return users;
  }

  refreshAll(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !term ||
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone.includes(term) ||
        user.cardNumber.toLowerCase().includes(term) ||
        user.cniNumber.includes(term) ||
        user.address.fullAddress.toLowerCase().includes(term);
      const matchesRole = !this.selectedRole || user.role === this.selectedRole;
      const matchesStatus = !this.selectedStatus || user.status === this.selectedStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });

    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredUsers.length);
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
    this.updateStats();
  }

  updateStats(): void {
    this.stats.total = this.users.length;
    this.stats.clients = this.users.filter(u => u.role === 'CLIENT').length;
    this.stats.agents = this.users.filter(u => u.role === 'AGENT').length;
    this.stats.superAgents = this.users.filter(u => u.role === 'SUPER_AGENT').length;
    this.stats.active = this.users.filter(u => u.status === 'ACTIVE').length;
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.refreshAll();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.refreshAll();
  }

  getPaginationPages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(this.totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  getAvatarColor(id: string): string {
    const colors = [
      '#4f46e5', '#7c3aed', '#ec4899', '#f43f5e',
      '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index] || '#4f46e5';
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      ACTIVE: 'Actif',
      SUSPENDED: 'Suspendu',
      FROZEN: 'Gelé',
      CLOSED: 'Fermé'
    };
    return labels[status] || status;
  }

  getRoleClass(role: string): string {
    return `role-${role.toLowerCase().replace('_', '-')}`;
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      CLIENT: 'Client',
      AGENT: 'Agent',
      SUPER_AGENT: 'Super Agent'
    };
    return labels[role] || role;
  }

  getCreatorRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      AGENT: 'Agent',
      SUPER_AGENT: 'Super Agent'
    };
    return labels[role] || '';
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedRole = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  // ─── ACTIONS ──────────────────────────────────────────────
  onViewUser(user: User): void {
    this.router.navigate(['/users', user.id]);
  }

  onEditUser(user: User): void {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  onFundUser(user: User): void {
    this.router.navigate(['/users', user.id, 'fund']);
  }

  // ─── MODALE STATUT ────────────────────────────────────────
  onToggleStatus(user: User): void {
    this.selectedUser = user;
    this.currentUserStatus = user.status;
    this.selectedNewStatus = user.status;
    this.statusError = '';
    this.statusSuccess = '';
    this.showStatusModal = true;
  }

  closeStatusModal(): void {
    this.showStatusModal = false;
    this.selectedUser = null;
    this.statusError = '';
    this.statusSuccess = '';
    this.statusLoading = false;
  }

  onStatusChange(): void {
    this.statusError = '';
    this.statusSuccess = '';
  }

  selectStatus(value: string): void {
    this.selectedNewStatus = value;
    this.onStatusChange();
  }

  confirmStatusChange(): void {
    if (!this.selectedUser || !this.selectedNewStatus) {
      return;
    }
    if (this.selectedNewStatus === this.currentUserStatus) {
      this.statusError = 'Veuillez sélectionner un statut différent';
      return;
    }

    this.statusLoading = true;
    this.statusError = '';
    this.statusSuccess = '';

    setTimeout(() => {
      const oldStatus = this.selectedUser!.status;
      const userId = this.selectedUser!.id;
      const newStatus = this.selectedNewStatus as User['status'];

      this.users = this.users.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      );

      if (this.selectedUser) {
        this.selectedUser.status = newStatus;
      }

      this.refreshAll();
      this.statusLoading = false;
      this.statusSuccess = `✅ Statut changé de "${this.getStatusLabel(oldStatus)}" à "${this.getStatusLabel(newStatus)}" avec succès !`;

      setTimeout(() => {
        this.closeStatusModal();
      }, 2000);
    }, 1500);
  }

  getStatusOptionLabel(status: string): string {
    const option = this.statusOptions.find(s => s.value === status);
    return option?.label || status;
  }

  getStatusOptionColor(status: string): string {
    const option = this.statusOptions.find(s => s.value === status);
    return option?.color || '#6b7280';
  }

  getStatusOptionIcon(status: string): string {
    const option = this.statusOptions.find(s => s.value === status);
    return option?.icon || 'fa-circle';
  }

  // ─── MODALE SUPPRESSION ───────────────────────────────────
  onDeleteUser(user: User): void {
    this.selectedUser = user;
    this.deleteError = '';
    this.deleteSuccess = '';
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedUser = null;
    this.deleteError = '';
    this.deleteSuccess = '';
    this.deleteLoading = false;
  }

  confirmDelete(): void {
    if (!this.selectedUser) {
      this.deleteError = 'Aucun utilisateur sélectionné';
      return;
    }

    this.deleteLoading = true;
    this.deleteError = '';
    this.deleteSuccess = '';

    setTimeout(() => {
      const userId = this.selectedUser!.id;
      const userName = `${this.selectedUser!.firstName} ${this.selectedUser!.lastName}`;

      this.users = this.users.filter(user => user.id !== userId);
      this.refreshAll();

      this.deleteLoading = false;
      this.deleteSuccess = `✅ Utilisateur "${userName}" supprimé avec succès !`;

      setTimeout(() => {
        this.closeDeleteModal();
      }, 2000);
    }, 1500);
  }

  // ─── ACTIONNAIRES ─────────────────────────────────────────
  private getEmptyShareholderForm() {
    return {
      firstName: '',
      lastName: '',
      walletNumber: '',
      address: '',
      capital: 0,
      shares: 0
    };
  }

  loadMockShareholders(): void {
    this.shareholders = [
      {
        id: 'sh-0001',
        firstName: 'Aline',
        lastName: 'Nzeyimana',
        walletNumber: 'WLT-4821-009',
        address: 'Rohero; Mukaza; Bujumbura Mairie',
        capital: 45000000,
        shares: 35,
        createdAt: new Date(2023, 2, 12)
      },
      {
        id: 'sh-0002',
        firstName: 'Eric',
        lastName: 'Bigirimana',
        walletNumber: 'WLT-1187-204',
        address: 'Kigobe; Ntahangwa; Bujumbura Mairie',
        capital: 32000000,
        shares: 25,
        createdAt: new Date(2023, 5, 3)
      },
      {
        id: 'sh-0003',
        firstName: 'Diane',
        lastName: 'Irakoze',
        walletNumber: 'WLT-7734-511',
        address: 'Musaga; Muha; Bujumbura Mairie',
        capital: 25000000,
        shares: 20,
        createdAt: new Date(2024, 0, 20)
      },
      {
        id: 'sh-0004',
        firstName: 'Claude',
        lastName: 'Ntawuruhunga',
        walletNumber: 'WLT-3390-877',
        address: 'Kinindo; Muha; Bujumbura Mairie',
        capital: 25500000,
        shares: 20,
        createdAt: new Date(2024, 4, 8)
      }
    ];
    this.filterShareholders();
  }

  openShareholdersModal(): void {
    this.shareholderSearchTerm = '';
    this.showShareholderForm = false;
    this.editingShareholder = null;
    this.shareholderFormError = '';
    this.shareholderFormSuccess = '';
    this.filterShareholders();
    this.showShareholdersModal = true;
  }

  closeShareholdersModal(): void {
    this.showShareholdersModal = false;
    this.cancelShareholderForm();
  }

  onShareholderSearchChange(): void {
    this.filterShareholders();
  }

  filterShareholders(): void {
    const term = this.shareholderSearchTerm.toLowerCase().trim();
    this.filteredShareholders = this.shareholders.filter(sh =>
      !term ||
      sh.firstName.toLowerCase().includes(term) ||
      sh.lastName.toLowerCase().includes(term) ||
      sh.walletNumber.toLowerCase().includes(term) ||
      sh.address.toLowerCase().includes(term)
    );
  }

  openAddShareholderForm(): void {
    this.editingShareholder = null;
    this.shareholderForm = this.getEmptyShareholderForm();
    this.shareholderFormError = '';
    this.shareholderFormSuccess = '';
    this.showShareholderForm = true;
  }

  openEditShareholderForm(shareholder: Shareholder): void {
    this.editingShareholder = shareholder;
    this.shareholderForm = {
      firstName: shareholder.firstName,
      lastName: shareholder.lastName,
      walletNumber: shareholder.walletNumber,
      address: shareholder.address,
      capital: shareholder.capital,
      shares: shareholder.shares
    };
    this.shareholderFormError = '';
    this.shareholderFormSuccess = '';
    this.showShareholderForm = true;
  }

  cancelShareholderForm(): void {
    this.showShareholderForm = false;
    this.editingShareholder = null;
    this.shareholderForm = this.getEmptyShareholderForm();
    this.shareholderFormError = '';
    this.shareholderFormSuccess = '';
  }

  saveShareholder(): void {
    if (!this.shareholderForm.lastName.trim() || !this.shareholderForm.firstName.trim()) {
      this.shareholderFormError = 'Le nom et le prénom sont obligatoires';
      return;
    }
    if (!this.shareholderForm.walletNumber.trim()) {
      this.shareholderFormError = 'Le numéro de wallet est obligatoire';
      return;
    }
    if (!this.shareholderForm.address.trim()) {
      this.shareholderFormError = "L'adresse est obligatoire";
      return;
    }
    if (this.shareholderForm.capital <= 0) {
      this.shareholderFormError = 'Le capital doit être supérieur à 0';
      return;
    }
    if (this.shareholderForm.shares <= 0 || this.shareholderForm.shares > 100) {
      this.shareholderFormError = 'Les parts doivent être entre 1 et 100%';
      return;
    }

    const totalShares = this.shareholders
      .filter(sh => sh.id !== this.editingShareholder?.id)
      .reduce((sum, sh) => sum + sh.shares, 0) + this.shareholderForm.shares;

    if (totalShares > 100) {
      this.shareholderFormError = `Le total des parts ne peut pas dépasser 100% (actuellement: ${totalShares}%)`;
      return;
    }

    this.shareholderFormError = '';

    if (this.editingShareholder) {
      this.shareholders = this.shareholders.map(sh =>
        sh.id === this.editingShareholder!.id
          ? { ...this.shareholderForm, id: this.editingShareholder!.id, createdAt: this.editingShareholder!.createdAt }
          : sh
      );
      this.shareholderFormSuccess = '✅ Actionnaire modifié avec succès !';
    } else {
      const newShareholder: Shareholder = {
        ...this.shareholderForm,
        id: `sh-${Date.now()}`,
        createdAt: new Date()
      };
      this.shareholders = [...this.shareholders, newShareholder];
      this.shareholderFormSuccess = '✅ Actionnaire ajouté avec succès !';
    }

    this.filterShareholders();

    setTimeout(() => {
      this.cancelShareholderForm();
    }, 1500);
  }

  deleteShareholder(shareholder: Shareholder): void {
    if (confirm(`Supprimer l'actionnaire "${shareholder.firstName} ${shareholder.lastName}" ?`)) {
      this.shareholders = this.shareholders.filter(sh => sh.id !== shareholder.id);
      this.filterShareholders();
    }
  }

  getTotalShares(): number {
    return this.shareholders.reduce((sum, sh) => sum + sh.shares, 0);
  }

  getTotalCapital(): number {
    return this.shareholders.reduce((sum, sh) => sum + sh.capital, 0);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-BI', {
      style: 'currency',
      currency: 'BIF',
      minimumFractionDigits: 0
    }).format(amount);
  }
}
