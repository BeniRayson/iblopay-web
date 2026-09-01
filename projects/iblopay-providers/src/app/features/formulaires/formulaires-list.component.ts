import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormulairesService } from '../../services/formulaires.service';
import { ServicesService } from '../../services/services.service';
import { Formulaire, ServiceInstitution } from '../../models/provider.model';

@Component({
  selector: 'app-formulaires-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './formulaires-list.component.html',
  styleUrl: './formulaires-list.component.scss'
})
export class FormulairesListComponent implements OnInit {
  formulaires: Formulaire[] = [];
  services: ServiceInstitution[] = [];
  isLoading = true;

  constructor(
    private formulairesService: FormulairesService,
    private servicesService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.servicesService.getAll().subscribe(s => this.services = s);
    this.formulairesService.getAll().subscribe(f => {
      this.formulaires = f;
      this.isLoading = false;
    });
  }

  serviceNom(serviceId: number): string {
    return this.services.find(s => s.id === serviceId)?.nom || '—';
  }

  ouvrirFormulaire(f: Formulaire): void {
    if (f.typeFormulaire === 'DOCUMENT') {
      this.router.navigate(['/formulaires/document', f.id]);
    } else {
      this.router.navigate(['/formulaires', f.id, 'builder']);
    }
  }
}
