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

  // ─── MODAL STATUT ──────────────────────────────
  showStatusModal = false;
  statusLoading = false;
  statusError = '';
  statusSuccess = '';
  selectedUser: User | null = null;
  selectedNewStatus: string = '';
  currentUserStatus: string = '';

  statusOptions = [
    { value: 'ACTIVE', label: 'Actif', color: '#10b981', icon: 'fa-check-circle' },
    { value: 'SUSPENDED', label: 'Suspendu', color: '#f59e0b', icon: 'fa-pause-circle' },
    { value: 'FROZEN', label: 'Gelé', color: '#3b82f6', icon: 'fa-snowflake' },
    { value: 'CLOSED', label: 'Fermé', color: '#ef4444', icon: 'fa-times-circle' }
  ];

  // ─── MODAL SUPPRESSION ──────────────────────────
  showDeleteModal = false;
  deleteLoading = false;
  deleteError = '';
  deleteSuccess = '';

  Math = Math;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMockUsers();
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
    
    const roles: ('CLIENT' | 'AGENT' | 'SUPER_AGENT')[] = ['CLIENT', 'AGENT', 'SUPER_AGENT'];
    const statuses: ('ACTIVE' | 'SUSPENDED' | 'FROZEN' | 'CLOSED')[] = ['ACTIVE', 'SUSPENDED', 'FROZEN', 'CLOSED'];
    
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
        createdBy = {
          id: '',
          firstName: '',
          lastName: '',
          role: ''
        };
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
        createdBy: createdBy,
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
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
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
      'ACTIVE': 'Actif',
      'SUSPENDED': 'Suspendu',
      'FROZEN': 'Gelé',
      'CLOSED': 'Fermé'
    };
    return labels[status] || status;
  }

  getRoleClass(role: string): string {
    return `role-${role.toLowerCase().replace('_', '-')}`;
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      'CLIENT': 'Client',
      'AGENT': 'Agent',
      'SUPER_AGENT': 'Super Agent'
    };
    return labels[role] || role;
  }

  getCreatorRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      'AGENT': 'Agent',
      'SUPER_AGENT': 'Super Agent'
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
      const newStatus = this.selectedNewStatus;
      
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return { ...user, status: newStatus as any };
        }
        return user;
      });
      
      if (this.selectedUser) {
        this.selectedUser.status = newStatus as any;
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
      
      // Supprimer l'utilisateur de la liste
      this.users = this.users.filter(user => user.id !== userId);
      this.refreshAll();
      
      this.deleteLoading = false;
      this.deleteSuccess = `✅ Utilisateur "${userName}" supprimé avec succès !`;
      
      setTimeout(() => {
        this.closeDeleteModal();
      }, 2000);
    }, 1500);
  }
}