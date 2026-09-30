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

  readonly categories: SettingsCategory[] = [
    {
      key: 'users',
      title: 'Gestion des utilisateurs',
      icon: 'fa-solid fa-users',
      description: 'Clients, Agents, Super Agents et Administrateurs',
      route: '/settings/users',
      sectionCount: 4
    },
    {
      key: 'wallets',
      title: 'Gestion des Wallets',
      icon: 'fa-solid fa-wallet',
      description: 'Wallet Client, Agent, Super Agent et Institution',
      route: '/settings/wallets',
      sectionCount: 4
    },
    {
      key: 'cards',
      title: 'Gestion des Cartes',
      icon: 'fa-solid fa-credit-card',
      description: 'Émission, association, stocks et inventaire des cartes',
      route: '/settings/cards',
      sectionCount: 2
    },
    {
      key: 'transactions',
      title: 'Gestion des Transactions',
      icon: 'fa-solid fa-right-left',
      description: 'Historique, filtres, types et actions sur les transactions',
      route: '/settings/transactions',
      sectionCount: 3
    },
    {
      key: 'financial',
      title: 'Gestion Financière',
      icon: 'fa-solid fa-building-columns',
      description: 'Trust Account, liquidité et comptabilité',
      route: '/settings/financial',
      sectionCount: 3
    },
    {
      key: 'commissions',
      title: 'Gestion des Commissions',
      icon: 'fa-solid fa-percent',
      description: 'Configuration, paiement et historique des commissions',
      route: '/settings/commissions',
      sectionCount: 3
    },
    {
      key: 'services',
      title: 'Gestion des Services',
      icon: 'fa-solid fa-layer-group',
      description: 'Eau, électricité, internet, taxes, assurance, etc.',
      route: '/settings/services',
      sectionCount: 2
    },
    {
      key: 'reports',
      title: 'Rapports & Business Intelligence',
      icon: 'fa-solid fa-chart-column',
      description: 'Dashboard, rapports, exports et graphiques',
      route: '/settings/reports',
      sectionCount: 4
    },
    {
      key: 'security',
      title: 'Sécurité & Conformité',
      icon: 'fa-solid fa-shield-halved',
      description: 'Authentification, permissions, audit, fraude, KYC/AML',
      route: '/settings/security',
      sectionCount: 6
    },
    {
      key: 'system',
      title: 'Configuration Générale',
      icon: 'fa-solid fa-sliders',
      description: 'Frais, limites, notifications et paramètres système',
      route: '/settings/system',
      sectionCount: 4
    },
    {
      key: 'partners',
      title: 'Gestion des Partenaires',
      icon: 'fa-solid fa-handshake',
      description: 'Banques, opérateurs télécom, marchands et institutions',
      route: '/settings/partners',
      sectionCount: 1
    }
  ];

  constructor(private router: Router) {}

  get filteredCategories(): SettingsCategory[] {
    const term = this.normalize(this.searchTerm);
    if (!term) return this.categories;

    return this.categories.filter(category => {
      const content = this.normalize(
        `${category.title} ${category.description} ${category.key}`
      );
      return content.includes(term);
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  goTo(category: SettingsCategory): void {
    this.router.navigateByUrl(category.route);
  }

  trackByKey(_: number, category: SettingsCategory): string {
    return category.key;
  }

  private normalize(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
