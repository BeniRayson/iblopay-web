import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { DemandesService } from '../../services/demandes.service';
import { FormulairesService } from '../../services/formulaires.service';
import { ServiceInstitution, RendementGlobal, RendementParService, SoumissionFormulaire, Formulaire } from '../../models/provider.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  services: ServiceInstitution[] = [];
  formulaires: Formulaire[] = [];
  rendement?: RendementGlobal;
  rendementServices: RendementParService[] = [];
  demandes: SoumissionFormulaire[] = [];
  dernieresDemandes: SoumissionFormulaire[] = [];
  derniersUtilisateurs: SoumissionFormulaire[] = [];
  isLoading = true;
  today = new Date();

  // Palette de couleurs professionnelles
  private readonly colors: string[] = [
    '#2563eb', '#7c3aed', '#0891b2', '#059669', 
    '#d97706', '#dc2626', '#4f46e5', '#0d9488',
    '#0ea5e9', '#14b8a6', '#f59e0b', '#ef4444',
    '#8b5cf6', '#06b6d4', '#10b981', '#f472b6'
  ];

  constructor(
    private servicesService: ServicesService,
    private demandesService: DemandesService,
    private formulairesService: FormulairesService
  ) {}

  ngOnInit(): void {
    this.servicesService.getAll().subscribe(s => this.services = s);
    this.formulairesService.getAll().subscribe(f => this.formulaires = f);
    this.demandesService.getRendementGlobal().subscribe(r => this.rendement = r);
    this.demandesService.getRendementParService().subscribe(r => {
      this.rendementServices = r;
    });
    this.demandesService.getAll().subscribe(d => {
      this.demandes = d;
      // 5 dernières demandes
      this.dernieresDemandes = [...d]
        .sort((a, b) => b.dateSoumission.getTime() - a.dateSoumission.getTime())
        .slice(0, 5);
      
      // 10 derniers utilisateurs uniques avec leurs infos
      const uniqueUsers = new Map<string, SoumissionFormulaire>();
      [...d]
        .sort((a, b) => b.dateSoumission.getTime() - a.dateSoumission.getTime())
        .forEach(demande => {
          if (!uniqueUsers.has(demande.utilisateurTelephone)) {
            uniqueUsers.set(demande.utilisateurTelephone, demande);
          }
        });
      this.derniersUtilisateurs = Array.from(uniqueUsers.values()).slice(0, 10);
      
      this.isLoading = false;
    });
  }

  get servicesActifs(): number {
    return this.services.filter(s => s.statut === 'ACTIF').length;
  }

  get servicesBrouillon(): number {
    return this.services.filter(s => s.statut === 'BROUILLON').length;
  }

  get formulairesPublies(): number {
    return this.formulaires.filter(f => f.statut === 'PUBLIE').length;
  }

  get formulairesBrouillon(): number {
    return this.formulaires.filter(f => f.statut === 'BROUILLON').length;
  }

  get utilisateursDistincts(): number {
    return new Set(this.demandes.map(d => d.utilisateurTelephone)).size;
  }

  get demandesEnCours(): number {
    return this.demandes.filter(d => !['TERMINE', 'REJETE'].includes(d.statut)).length;
  }

  get demandesUrgentes(): SoumissionFormulaire[] {
    const deuxJours = 2 * 24 * 60 * 60 * 1000;
    return this.demandes.filter(d =>
      !['TERMINE', 'REJETE'].includes(d.statut) &&
      (Date.now() - d.dateSoumission.getTime()) > deuxJours
    );
  }

  // Récupère la couleur d'un service
  getServiceColor(serviceNom: string): string {
    const index = this.rendementServices.findIndex(s => s.serviceNom === serviceNom);
    
    let colorIndex: number;
    if (index !== -1) {
      colorIndex = index % this.colors.length;
    } else {
      let hash = 0;
      for (let i = 0; i < serviceNom.length; i++) {
        hash = serviceNom.charCodeAt(i) + ((hash << 5) - hash);
      }
      colorIndex = Math.abs(hash) % this.colors.length;
    }
    
    if (colorIndex < 0 || colorIndex >= this.colors.length) {
      colorIndex = 0;
    }
    
    const color = this.colors[colorIndex];
    return color || '#2563eb';
  }

  // 🔥 Format BIF avec espace insécable pour garder le montant et BIF sur une seule ligne
  formatBIFComplet(v: number): string {
    return new Intl.NumberFormat('fr-FR').format(v) + '\u00A0BIF';
  }

  // Format BIF abrégé (pour les affichages plus compacts)
  formatBIF(v: number): string {
    if (v >= 1000000) {
      return (v / 1000000).toFixed(1) + 'M BIF';
    }
    if (v >= 1000) {
      return (v / 1000).toFixed(0) + 'K BIF';
    }
    return new Intl.NumberFormat('fr-FR').format(v) + ' BIF';
  }

  statutClass(statut: string): string {
    const map: Record<string, string> = {
      SOUMIS: 'badge-blue', 
      PAIEMENT_EN_ATTENTE: 'badge-orange', 
      RECU: 'badge-blue',
      EN_VERIFICATION: 'badge-orange', 
      EN_VALIDATION: 'badge-orange', 
      EN_TRAITEMENT: 'badge-purple',
      APPROUVE: 'badge-green', 
      REJETE: 'badge-red', 
      TERMINE: 'badge-green'
    };
    return map[statut] || 'badge-blue';
  }

  statutLabel(statut: string): string {
    const map: Record<string, string> = {
      SOUMIS: 'Soumis', 
      PAIEMENT_EN_ATTENTE: 'Paiement en attente', 
      RECU: 'Reçu',
      EN_VERIFICATION: 'En vérification', 
      EN_VALIDATION: 'En validation', 
      EN_TRAITEMENT: 'En traitement',
      APPROUVE: 'Approuvé', 
      REJETE: 'Rejeté', 
      TERMINE: 'Terminé'
    };
    return map[statut] || statut;
  }
}