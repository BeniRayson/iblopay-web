import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransportService } from '../../services/transport.service';
import { CoursesService } from '../../services/courses.service';
import {
  Vehicule, Chauffeur, StatsTransportGlobal, StatsParLigneOuZone, Course, IncidentTransport
} from '../../models/transport.model';
import { MOCK_INCIDENTS_TRANSPORT } from '../../data/mock-transport-data';

@Component({
  selector: 'app-transport-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './transport-dashboard.component.html',
  styleUrl: './transport-dashboard.component.scss'
})
export class TransportDashboardComponent implements OnInit {
  vehicules: Vehicule[] = [];
  chauffeurs: Chauffeur[] = [];
  courses: Course[] = [];
  incidents: IncidentTransport[] = [...MOCK_INCIDENTS_TRANSPORT];
  stats?: StatsTransportGlobal;
  statsParLigneOuZone: StatsParLigneOuZone[] = [];
  dernieresCourses: Course[] = [];
  meilleursChauffeurs: Chauffeur[] = [];
  isLoading = true;
  today = new Date();

  private readonly colors: string[] = [
    '#2563eb', '#7c3aed', '#0891b2', '#059669',
    '#d97706', '#dc2626', '#4f46e5', '#0d9488'
  ];

  constructor(
    private transportService: TransportService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.transportService.getVehicules().subscribe(v => this.vehicules = v);
    this.transportService.getChauffeurs().subscribe(c => {
      this.chauffeurs = c;
      this.meilleursChauffeurs = [...c]
        .filter(x => x.statut === 'ACTIF')
        .sort((a, b) => (b.revenuTotal || 0) - (a.revenuTotal || 0))
        .slice(0, 10);
    });
    this.transportService.getStatsGlobal().subscribe(s => this.stats = s);
    this.transportService.getStatsParLigneOuZone().subscribe(s => this.statsParLigneOuZone = s.sort((a, b) => b.revenu - a.revenu));

    this.coursesService.getAll().subscribe(courses => {
      this.courses = courses;
      this.dernieresCourses = [...courses]
        .sort((a, b) => b.dateDemande.getTime() - a.dateDemande.getTime())
        .slice(0, 5);
      this.isLoading = false;
    });
  }

  get vehiculesEnPanneOuMaintenance(): Vehicule[] {
    return this.vehicules.filter(v => v.statut === 'EN_PANNE' || v.statut === 'EN_MAINTENANCE');
  }

  get incidentsOuverts(): IncidentTransport[] {
    return this.incidents.filter(i => i.statut !== 'RESOLU');
  }

  get repartitionBus(): number {
    return this.vehicules.filter(v => v.type === 'BUS').length;
  }

  get repartitionTaxi(): number {
    return this.vehicules.filter(v => v.type === 'TAXI').length;
  }

  get chauffeursActifs(): number {
    return this.chauffeurs.filter(c => c.statut === 'ACTIF').length;
  }

  get coursesEnCours(): number {
    return this.courses.filter(c => c.statut === 'EN_COURS').length;
  }

  get coursesTermineesCount(): number {
    return this.courses.filter(c => c.statut === 'TERMINEE').length;
  }

  get coursesAnnuleesCount(): number {
    return this.courses.filter(c => c.statut === 'ANNULEE').length;
  }

  getLigneOuZoneColor(nom: string): string {
    const index = this.statsParLigneOuZone.findIndex(s => s.nom === nom);
    let colorIndex: number;
    if (index !== -1) {
      colorIndex = index % this.colors.length;
    } else {
      let hash = 0;
      for (let i = 0; i < nom.length; i++) hash = nom.charCodeAt(i) + ((hash << 5) - hash);
      colorIndex = Math.abs(hash) % this.colors.length;
    }
    return this.colors[colorIndex] || '#2563eb';
  }

  formatBIFComplet(v: number): string {
    return new Intl.NumberFormat('fr-FR').format(v) + '\u00A0BIF';
  }

  nomVehicule(id?: number): string {
    if (!id) return '—';
    return this.vehicules.find(v => v.id === id)?.matricule || '—';
  }

  statutCourseClass(statut: string): string {
    const map: Record<string, string> = {
      DEMANDE: 'badge-orange', ACCEPTEE: 'badge-blue', EN_COURS: 'badge-purple', TERMINEE: 'badge-green', ANNULEE: 'badge-red'
    };
    return map[statut] || 'badge-blue';
  }

  statutCourseLabel(statut: string): string {
    const map: Record<string, string> = {
      DEMANDE: 'Demande reçue', ACCEPTEE: 'Assignée', EN_COURS: 'En cours', TERMINEE: 'Terminée', ANNULEE: 'Annulée'
    };
    return map[statut] || statut;
  }
}
