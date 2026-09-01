import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DemandesService } from '../../services/demandes.service';
import { TransportService } from '../../services/transport.service';
import { EvenementsService } from '../../services/evenements.service';
import { SoumissionFormulaire, DroitWorkflow } from '../../models/provider.model';
import { IncidentTransport, Vehicule } from '../../models/transport.model';
import { ReclamationEvenement } from '../../models/evenements.model';
import { ToastContainerComponent } from '../toast-container.component';
import { ToastService } from '../toast.service';
import { AuthService, UtilisateurConnecte } from '../auth.service';
import { ActiviteService, ActiviteJournal } from '../../services/activite.service';

interface MenuItem {
  icon: string;
  label: string;
  link: string;
  badge?: number;
  /** Si vrai, uniquement visible pour l'administrateur. */
  adminOnly?: boolean;
  /** Si présent, visible pour l'admin OU pour un compte disposant de ce droit. */
  droit?: DroitWorkflow;
  /** Si présent, affiche un petit intitulé de section juste au-dessus de cet élément. */
  sectionStart?: string;
  /** Restreint l'élément à un secteur précis (SERVICES, TRANSPORT ou EVENEMENTS). Par défaut : SERVICES. */
  secteur?: 'SERVICES' | 'TRANSPORT' | 'EVENEMENTS';
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, ToastContainerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  isSidebarOpen = false;
  isNotifOpen = false;
  moduleTitle = 'Tableau de bord';

  utilisateur: UtilisateurConnecte | null = null;

  institution = {
    nom: 'Institution A',
    role: 'Administrateur',
    initiales: 'IA'
  };

  menuItemsBase: MenuItem[] = [
    { icon: 'fa-solid fa-gauge', label: 'Tableau de bord', link: '/dashboard', adminOnly: true, secteur: 'SERVICES' },
    { icon: 'fa-solid fa-layer-group', label: 'Services', link: '/services', adminOnly: true, secteur: 'SERVICES' },
    { icon: 'fa-solid fa-file-lines', label: 'Formulaires', link: '/formulaires', adminOnly: true, secteur: 'SERVICES' },
    { icon: 'fa-solid fa-sitemap', label: 'Workflows', link: '/workflows', adminOnly: true, secteur: 'SERVICES' },
    { icon: 'fa-solid fa-inbox', label: 'Demandes', link: '/demandes', droit: 'VOIR_DEMANDE', secteur: 'SERVICES' },
    { icon: 'fa-solid fa-users', label: 'Utilisateurs', link: '/utilisateurs', adminOnly: true, secteur: 'SERVICES' },
    { icon: 'fa-solid fa-chart-line', label: 'Statistiques', link: '/statistiques', droit: 'VOIR_STATISTIQUES', secteur: 'SERVICES' },
    { icon: 'fa-solid fa-file-contract', label: 'Rapports', link: '/rapports', adminOnly: true, secteur: 'SERVICES' },
    { icon: 'fa-solid fa-bus', label: 'Tableau de bord', link: '/transport', adminOnly: true, secteur: 'TRANSPORT' },
    { icon: 'fa-solid fa-car', label: 'Flotte & Chauffeurs', link: '/transport/flotte', adminOnly: true, secteur: 'TRANSPORT' },
    { icon: 'fa-solid fa-route', label: 'Trajets & Tarifs', link: '/transport/lignes-tarifs', adminOnly: true, secteur: 'TRANSPORT' },
    { icon: 'fa-solid fa-satellite-dish', label: 'Courses en temps réel', link: '/transport/courses', adminOnly: true, secteur: 'TRANSPORT' },
    { icon: 'fa-solid fa-chart-line', label: 'Statistiques', link: '/transport/statistiques', adminOnly: true, secteur: 'TRANSPORT' },
    { icon: 'fa-solid fa-file-contract', label: 'Rapports', link: '/transport/rapports', adminOnly: true, secteur: 'TRANSPORT' },
    { icon: 'fa-solid fa-calendar-days', label: 'Tableau de bord', link: '/evenements', adminOnly: true, secteur: 'EVENEMENTS' },
    { icon: 'fa-solid fa-ticket', label: 'Gestion des événements', link: '/evenements/gestion', adminOnly: true, secteur: 'EVENEMENTS' },
    { icon: 'fa-solid fa-map-location-dot', label: 'Lieux & Salles', link: '/evenements/lieux', adminOnly: true, secteur: 'EVENEMENTS' },
    { icon: 'fa-solid fa-satellite-dish', label: 'Billetterie en temps réel', link: '/evenements/billetterie', adminOnly: true, secteur: 'EVENEMENTS' },
    { icon: 'fa-solid fa-chart-line', label: 'Statistiques', link: '/evenements/statistiques', adminOnly: true, secteur: 'EVENEMENTS' },
    { icon: 'fa-solid fa-file-contract', label: 'Rapports', link: '/evenements/rapports', adminOnly: true, secteur: 'EVENEMENTS' }
  ];

  get menuItems(): MenuItem[] {
    if (!this.utilisateur) return [];
    const secteurActuel = this.utilisateur.secteur;
    if (this.utilisateur.type === 'ADMIN') {
      return this.menuItemsBase.filter(item => (item.secteur || 'SERVICES') === secteurActuel);
    }
    // Un compte (staff) travaille toujours dans le secteur Services.
    return this.menuItemsBase.filter(item =>
      (item.secteur || 'SERVICES') === 'SERVICES' &&
      !item.adminOnly && (!item.droit || this.authService.aLeDroit(item.droit))
    );
  }

  demandesUrgentes: SoumissionFormulaire[] = [];
  incidentsTransport: IncidentTransport[] = [];
  vehiculesEnPanneTransport: Vehicule[] = [];
  reclamationsEvenements: ReclamationEvenement[] = [];
  bellPulse = false;
  private toastCountPrecedent = 0;

  /** Journal d'activité : chaque action effectuée dans l'application (5 plus récentes dans la cloche). */
  activitesRecentes: ActiviteJournal[] = [];

  get notifCount(): number {
    if (this.authService.estAdminTransport) {
      return this.incidentsTransport.length + this.vehiculesEnPanneTransport.length;
    }
    if (this.authService.estAdminEvenements) {
      return this.reclamationsEvenements.length;
    }
    return this.demandesUrgentes.length;
  }

  constructor(
    private router: Router,
    private demandesService: DemandesService,
    private transportService: TransportService,
    private evenementsService: EvenementsService,
    private toastService: ToastService,
    private authService: AuthService,
    private activiteService: ActiviteService
  ) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const url = this.router.url;
      const candidats = this.menuItems.filter(m => url.startsWith(m.link)).sort((a, b) => b.link.length - a.link.length);
      const found = candidats[0];
      this.moduleTitle = found ? found.label : (this.utilisateur?.type === 'COMPTE' ? 'Mon espace de travail' : 'Tableau de bord');
      this.isSidebarOpen = false;
      this.isNotifOpen = false;
    });

    this.toastService.toasts$.subscribe(toasts => {
      if (toasts.length > this.toastCountPrecedent) {
        this.bellPulse = true;
        setTimeout(() => this.bellPulse = false, 1600);
      }
      this.toastCountPrecedent = toasts.length;
    });
  }

  ngOnInit(): void {
    this.activiteService.activites$.subscribe(liste => {
      this.activitesRecentes = liste.slice(0, 5);
    });

    this.authService.utilisateur$.subscribe(u => {
      this.utilisateur = u;
      if (u) {
        if (u.type === 'ADMIN') {
          if (u.secteur === 'TRANSPORT') {
            this.institution = { nom: 'IBLOPAY — Transport', role: 'Administrateur Transport', initiales: 'AT' };
          } else if (u.secteur === 'EVENEMENTS') {
            this.institution = { nom: 'IBLOPAY — Événements', role: 'Administrateur Événements', initiales: 'AE' };
          } else {
            this.institution = { nom: 'IBLOPAY — Administrateur', role: 'Administrateur', initiales: 'AD' };
          }
        } else {
          const prenom = u.prenom || '';
          this.institution = {
            nom: `${prenom} ${u.nom}`.trim(),
            role: `${u.role}${u.etapeNom ? ' — ' + u.etapeNom : ''}`,
            initiales: `${prenom.charAt(0)}${u.nom.charAt(0)}`.toUpperCase() || 'U'
          };
        }
      }
    });

    this.demandesService.getAll().subscribe(demandes => {
      if (!this.authService.estAdminServices) return;
      const deuxJours = 2 * 24 * 60 * 60 * 1000;
      this.demandesUrgentes = demandes.filter(d =>
        !['TERMINE', 'REJETE'].includes(d.statut) &&
        (Date.now() - d.dateSoumission.getTime()) > deuxJours
      );
      const menu = this.menuItemsBase.find(m => m.link === '/demandes');
      if (menu) {
        if (this.demandesUrgentes.length > 0) {
          menu.badge = this.demandesUrgentes.length;
        } else {
          delete menu.badge;
        }
      }
    });

    this.transportService.getVehicules().subscribe(vehicules => {
      if (!this.authService.estAdminTransport) return;
      this.vehiculesEnPanneTransport = vehicules.filter(v => v.statut === 'EN_PANNE');
    });
    this.transportService.getIncidents().subscribe(incidents => {
      if (!this.authService.estAdminTransport) return;
      this.incidentsTransport = incidents.filter(i => i.statut !== 'RESOLU');
    });

    this.evenementsService.getReclamations().subscribe(reclamations => {
      if (!this.authService.estAdminEvenements) return;
      this.reclamationsEvenements = reclamations.filter(r => r.statut !== 'RESOLU');
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  toggleNotif(): void {
    this.isNotifOpen = !this.isNotifOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notif-wrap')) {
      this.isNotifOpen = false;
    }
  }

  logout(): void {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      this.authService.deconnecter();
      this.router.navigate(['/login']);
    }
  }
}