import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EvenementsService } from '../../services/evenements.service';
import { Lieu, TypeLieu, Evenement } from '../../models/evenements.model';
import { ToastService } from '../../core/toast.service';

interface LieuFormState {
  id?: number;
  nom: string;
  ville: string;
  adresse: string;
  type: TypeLieu;
  capaciteMax: number;
  statut: 'ACTIF' | 'INACTIF';
}

@Component({
  selector: 'app-lieux',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lieux.component.html',
  styleUrl: './lieux.component.scss'
})
export class LieuxComponent implements OnInit {
  lieux: Lieu[] = [];
  lieuxFiltres: Lieu[] = [];
  evenements: Evenement[] = [];
  recherche = '';
  filtreType: '' | TypeLieu = '';
  filtreStatut = '';
  typesDisponibles: string[] = [];
  isLoading = true;

  showModal = false;
  form: LieuFormState | null = null;

  lieuDetailAffiche: Lieu | null = null;

  constructor(private evenementsService: EvenementsService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.charger();
    this.evenementsService.getTypesLieux().subscribe(t => this.typesDisponibles = t);
  }

  charger(): void {
    this.isLoading = true;
    this.evenementsService.getEvenements().subscribe(e => this.evenements = e);
    this.evenementsService.getLieux().subscribe(l => {
      this.lieux = l;
      this.appliquerFiltres();
      this.isLoading = false;
    });
  }

  appliquerFiltres(): void {
    const term = this.recherche.toLowerCase().trim();
    this.lieuxFiltres = this.lieux.filter(l => {
      const matchType = !this.filtreType || l.type === this.filtreType;
      const matchStatut = !this.filtreStatut || l.statut === this.filtreStatut;
      const matchTerm = !term || l.nom.toLowerCase().includes(term) || l.ville.toLowerCase().includes(term);
      return matchType && matchStatut && matchTerm;
    });
  }

  reinitialiserFiltres(): void {
    this.recherche = '';
    this.filtreType = '';
    this.filtreStatut = '';
    this.appliquerFiltres();
  }

  typeLabel(type: TypeLieu): string {
    return type || 'Autre';
  }

  evenementsDuLieu(lieuId: number): Evenement[] {
    return this.evenements.filter(e => e.lieuId === lieuId && (e.statut === 'PROGRAMME' || e.statut === 'EN_COURS'));
  }

  voirDetail(l: Lieu): void {
    this.lieuDetailAffiche = l;
  }

  fermerDetail(): void {
    this.lieuDetailAffiche = null;
  }

  ouvrirNouveau(): void {
    this.form = { nom: '', ville: '', adresse: '', type: this.typesDisponibles[0] || 'Autre', capaciteMax: 1000, statut: 'ACTIF' };
    this.showModal = true;
  }

  modifier(l: Lieu): void {
    this.form = { id: l.id, nom: l.nom, ville: l.ville, adresse: l.adresse, type: l.type, capaciteMax: l.capaciteMax, statut: l.statut };
    this.showModal = true;
  }

  fermerModal(): void {
    this.showModal = false;
    this.form = null;
  }

  enregistrer(): void {
    const f = this.form;
    if (!f) return;
    if (!f.nom.trim() || !f.ville.trim()) {
      this.toastService.error('Veuillez renseigner le nom et la ville.');
      return;
    }
    const obs = f.id ? this.evenementsService.modifierLieu(f as Lieu) : this.evenementsService.creerLieu(f);
    obs.subscribe(l => {
      this.toastService.success(f.id ? `Lieu « ${l.nom} » mis à jour.` : `Lieu « ${l.nom} » créé.`);
      this.fermerModal();
      this.charger();
    });
  }

  supprimer(l: Lieu): void {
    if (!confirm(`Supprimer le lieu « ${l.nom} » ?`)) return;
    this.evenementsService.supprimerLieu(l.id).subscribe(() => {
      this.toastService.success('Lieu supprimé.');
      this.charger();
    });
  }

  toggleStatut(l: Lieu): void {
    this.evenementsService.toggleStatutLieu(l).subscribe(() => {
      this.toastService.success(`Lieu ${l.statut === 'ACTIF' ? 'désactivé' : 'activé'}.`);
      this.charger();
    });
  }

  ajouterType(): void {
    const nom = prompt('Nom du nouveau type de lieu :', '');
    if (!nom || !nom.trim()) return;
    this.evenementsService.ajouterTypeLieu(nom);
    this.evenementsService.getTypesLieux().subscribe(t => {
      this.typesDisponibles = t;
      if (this.form) this.form.type = nom.trim();
      this.toastService.success(`Type « ${nom.trim()} » ajouté.`);
    });
  }
}
