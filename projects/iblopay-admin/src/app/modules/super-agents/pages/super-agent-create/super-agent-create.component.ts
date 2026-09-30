import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface SuperAgentForm {
  lastName: string; firstName: string; phone: string; email: string; cni: string;
  birthDate: string; gender: string; login: string; password: string; confirmPassword: string;
  region: string; commune: string; address: string; commissionRate: number | null;
  dailyLimit: number | null; initialBalance: number | null; status: 'Actif' | 'Suspendu' | 'Bloqué';
  canCreateAgents: boolean; canManageCards: boolean; canProcessTransactions: boolean; receiveReports: boolean; notes: string;
}

@Component({
  selector: 'app-super-agent-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './super-agent-create.component.html',
  styleUrl: './super-agent-create.component.scss'
})
export class SuperAgentCreateComponent {
  showPassword = false;
  showConfirmPassword = false;
  selectedPhotoName = '';
  submitted = false;
  regions = ['Bujumbura', 'Gitega', 'Bubanza', 'Cibitoke', 'Kayanza', 'Ngozi', 'Muyinga', 'Karusi', 'Cankuzo', 'Makamba'];
  communesByRegion: Record<string, string[]> = {
    Bujumbura: ['Mukaza', 'Muha', 'Ntahangwa'], Gitega: ['Gitega', 'Bugendana'], Bubanza: ['Bubanza', 'Mpanda'],
    Cibitoke: ['Cibitoke', 'Rugombo'], Kayanza: ['Kayanza', 'Matongo'], Ngozi: ['Ngozi', 'Kiremba'], Muyinga: ['Muyinga', 'Gashoho'],
    Karusi: ['Karusi', 'Buhiga'], Cankuzo: ['Cankuzo', 'Gisagara'], Makamba: ['Makamba', 'Nyanza-Lac']
  };

  model: SuperAgentForm = {
    lastName: '', firstName: '', phone: '', email: '', cni: '', birthDate: '', gender: '', login: '', password: '', confirmPassword: '',
    region: '', commune: '', address: '', commissionRate: null, dailyLimit: null, initialBalance: null, status: 'Actif',
    canCreateAgents: true, canManageCards: true, canProcessTransactions: true, receiveReports: false, notes: ''
  };

  constructor(private router: Router) {}
  get communes(): string[] { return this.model.region ? (this.communesByRegion[this.model.region] || []) : []; }
  onRegionChange(): void { this.model.commune = ''; }
  onPhotoSelected(event: Event): void { const input = event.target as HTMLInputElement; this.selectedPhotoName = input.files?.[0]?.name || ''; }
  cancel(): void { this.router.navigate(['/super-agents']); }
  submit(form: NgForm): void {
    this.submitted = true;
    if (form.invalid || this.model.password !== this.model.confirmPassword) return;
    alert(`Le Super Agent ${this.model.firstName} ${this.model.lastName} a été préparé avec succès.`);
    this.router.navigate(['/super-agents']);
  }
}
