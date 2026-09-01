import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SettingsCategory } from '../../models/settings.model';

@Component({
  selector: 'app-settings-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent {
  searchTerm = '';

  categories: SettingsCategory[] = [
    { key: 'users', title: 'Gestion des utilisateurs', icon: '👥',
      description: 'Clients, Agents, Super Agents et Administrateurs',
      route: '/settings/users', sectionCount: 4 },
    { key: 'wallets', title: 'Gestion des Wallets', icon: '💰',
      description: 'Wallet Client, Agent, Super Agent et Institution',
      route: '/settings/wallets', sectionCount: 4 },
    { key: 'cards', title: 'Gestion des Cartes', icon: '💳',
      description: 'Émission, association, stocks et inventaire des cartes',
      route: '/settings/cards', sectionCount: 2 },
    { key: 'transactions', title: 'Gestion des Transactions', icon: '💸',
      description: 'Historique, filtres, types et actions sur les transactions',
      route: '/settings/transactions', sectionCount: 3 },
    { key: 'financial', title: 'Gestion Financière', icon: '🏦',
      description: 'Trust Account, liquidité et comptabilité',
      route: '/settings/financial', sectionCount: 3 },
    { key: 'commissions', title: 'Gestion des Commissions', icon: '💵',
      description: 'Configuration, paiement et historique des commissions',
      route: '/settings/commissions', sectionCount: 3 },
    { key: 'services', title: 'Gestion des Services', icon: '🏛',
      description: 'Eau, électricité, internet, taxes, assurance, etc.',
      route: '/settings/services', sectionCount: 2 },
    { key: 'reports', title: 'Rapports & Business Intelligence', icon: '📈',
      description: 'Dashboard, rapports, exports et graphiques',
      route: '/settings/reports', sectionCount: 4 },
    { key: 'security', title: 'Sécurité & Conformité', icon: '🔐',
      description: 'Authentification, permissions, audit, fraude, KYC/AML',
      route: '/settings/security', sectionCount: 6 },
    { key: 'system', title: 'Configuration Générale', icon: '⚙',
      description: 'Frais, limites, notifications et paramètres système',
      route: '/settings/system', sectionCount: 4 },
    { key: 'partners', title: 'Gestion des Partenaires', icon: '🌍',
      description: 'Banques, opérateurs télécom, marchands, institutions',
      route: '/settings/partners', sectionCount: 1 }
  ];

  constructor(private router: Router) {}

  get filteredCategories(): SettingsCategory[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.categories;
    return this.categories.filter(
      c =>
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
    );
  }

  goTo(category: SettingsCategory): void {
    this.router.navigateByUrl(category.route);
  }
}
