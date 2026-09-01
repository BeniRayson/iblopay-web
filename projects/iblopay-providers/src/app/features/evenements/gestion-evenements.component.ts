import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EvenementsService } from '../../services/evenements.service';
import { Evenement, Organisateur, Lieu, TypeEvenement, StatutEvenement, CategorieBillet, VenteHistorique } from '../../models/evenements.model';
import { ToastService } from '../../core/toast.service';

interface EvenementFormState {
  id?: number;
  nom: string;
  type: TypeEvenement;
  lieuNom: string;
  organisateurNom: string;
  dateDebut: string;
  dateFin: string;
  description: string;
  capaciteTotale: number;
  categoriesBillets: CategorieBillet[];
  statut: StatutEvenement;
  pieceJointeNom: string;
  pieceJointeDataUrl: string;
}

interface OrganisateurFormState {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  entreprise: string;
  email: string;
}

@Component({
  selector: 'app-gestion-evenements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-evenements.component.html',
  styleUrl: './gestion-evenements.component.scss'
})
export class GestionEvenementsComponent implements OnInit {
  vueActive: 'EVENEMENTS' | 'ORGANISATEURS' = 'EVENEMENTS';

  evenements: Evenement[] = [];
  evenementsFiltres: Evenement[] = [];
  organisateurs: Organisateur[] = [];
  organisateursFiltres: Organisateur[] = [];
  lieux: Lieu[] = [];

  filtreType: '' | TypeEvenement = '';
  filtreStatutEvenement = '';
  filtreStatutOrganisateur = '';
  recherche = '';

  isLoading = true;

  showEvenementModal = false;
  evenementForm: EvenementFormState | null = null;
  nouvelleCategorieNom = '';
  nouvelleCategoriePrix = 5000;
  nouvelleCategorieQuantite = 100;

  showOrganisateurModal = false;
  organisateurForm: OrganisateurFormState | null = null;

  // ─── DÉTAIL & HISTORIQUE ───────────────────────────────────
  evenementDetailAffiche: Evenement | null = null;
  organisateurDetailAffiche: Organisateur | null = null;

  historiqueOuvert = false;
  historiqueTitre = '';
  historiqueLignes: VenteHistorique[] = [];
  historiquePage = 1;
  historiquePageSize = 10;

  constructor(private evenementsService: EvenementsService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.evenementsService.getLieux().subscribe(l => this.lieux = l);
    this.evenementsService.getEvenements().subscribe(e => {
      this.evenements = e;
      this.appliquerFiltresEvenements();
      this.evenementsService.getOrganisateurs().subscribe(o => {
        this.organisateurs = o;
        this.appliquerFiltresOrganisateurs();
        this.isLoading = false;
      });
    });
  }

  changerVue(vue: 'EVENEMENTS' | 'ORGANISATEURS'): void {
    this.vueActive = vue;
  }

  appliquerFiltresEvenements(): void {
    const term = this.recherche.toLowerCase().trim();
    this.evenementsFiltres = this.evenements.filter(e => {
      const matchType = !this.filtreType || e.type === this.filtreType;
      const matchStatut = !this.filtreStatutEvenement || e.statut === this.filtreStatutEvenement;
      const matchTerm = !term || e.nom.toLowerCase().includes(term);
      return matchType && matchStatut && matchTerm;
    });
  }

  appliquerFiltresOrganisateurs(): void {
    const term = this.recherche.toLowerCase().trim();
    this.organisateursFiltres = this.organisateurs.filter(o => {
      const matchStatut = !this.filtreStatutOrganisateur || o.statut === this.filtreStatutOrganisateur;
      const matchTerm = !term || `${o.prenom} ${o.nom}`.toLowerCase().includes(term) || (o.entreprise || '').toLowerCase().includes(term);
      return matchStatut && matchTerm;
    });
  }

  onFiltreChange(): void {
    this.appliquerFiltresEvenements();
    this.appliquerFiltresOrganisateurs();
  }

  // ─── HELPERS ────────────────────────────────────────────
  nomLieu(id: number): string {
    return this.lieux.find(l => l.id === id)?.nom || 'Non assigné';
  }

  nomOrganisateur(id: number): string {
    const o = this.organisateurs.find(x => x.id === id);
    return o ? `${o.prenom} ${o.nom}` : 'Non assigné';
  }

  billetsVendus(e: Evenement): number {
    return e.categoriesBillets.reduce((s, c) => s + c.quantiteVendue, 0);
  }

  revenuEvenement(e: Evenement): number {
    return e.categoriesBillets.reduce((s, c) => s + c.quantiteVendue * c.prix, 0);
  }

  tauxRemplissage(e: Evenement): number {
    return e.capaciteTotale ? Math.round((this.billetsVendus(e) / e.capaciteTotale) * 100) : 0;
  }

  typeLabel(type: TypeEvenement): string {
    const map: Record<TypeEvenement, string> = { MATCH: 'Match', CONCERT: 'Concert', CONFERENCE: 'Conférence', FESTIVAL: 'Festival', AUTRE: 'Autre' };
    return map[type];
  }

  statutLabel(statut: StatutEvenement): string {
    const map: Record<StatutEvenement, string> = { PROGRAMME: 'Programmé', EN_COURS: 'En cours', TERMINE: 'Terminé', ANNULE: 'Annulé' };
    return map[statut];
  }

  statutClass(statut: StatutEvenement): string {
    const map: Record<StatutEvenement, string> = { PROGRAMME: 'badge-blue', EN_COURS: 'badge-purple', TERMINE: 'badge-green', ANNULE: 'badge-red' };
    return map[statut];
  }

  // ─── DÉTAIL ÉVÉNEMENT ─────────────────────────────────────
  voirDetailEvenement(e: Evenement): void {
    this.evenementDetailAffiche = e;
  }

  fermerDetailEvenement(): void {
    this.evenementDetailAffiche = null;
  }

  voirDetailOrganisateur(o: Organisateur): void {
    this.organisateurDetailAffiche = o;
  }

  fermerDetailOrganisateur(): void {
    this.organisateurDetailAffiche = null;
  }

  // ─── HISTORIQUE DES VENTES (paginé) ────────────────────────
  ouvrirHistorique(e: Evenement): void {
    this.historiqueTitre = `Historique des ventes — ${e.nom}`;
    this.historiquePage = 1;
    this.evenementsService.getHistoriqueParEvenement(e.id).subscribe(h => {
      this.historiqueLignes = h;
      this.historiqueOuvert = true;
    });
  }

  fermerHistorique(): void {
    this.historiqueOuvert = false;
    this.historiqueLignes = [];
  }

  get historiqueRevenuTotal(): number {
    return this.historiqueLignes.filter(h => h.statut === 'VALIDE').reduce((sum, h) => sum + h.revenu, 0);
  }

  get historiqueBilletsTotal(): number {
    return this.historiqueLignes.filter(h => h.statut === 'VALIDE').reduce((sum, h) => sum + h.quantite, 0);
  }

  get historiqueTotalPages(): number {
    return Math.ceil(this.historiqueLignes.length / this.historiquePageSize) || 1;
  }

  get historiquePagine(): VenteHistorique[] {
    const start = (this.historiquePage - 1) * this.historiquePageSize;
    return this.historiqueLignes.slice(start, start + this.historiquePageSize);
  }

  changerPageHistorique(page: number): void {
    if (page >= 1 && page <= this.historiqueTotalPages) this.historiquePage = page;
  }

  // ─── CRUD ÉVÉNEMENTS ──────────────────────────────────────
  ouvrirNouvelEvenement(): void {
    const dansUneSemaine = new Date(Date.now() + 7 * 86400000);
    this.evenementForm = {
      nom: '', type: 'MATCH', lieuNom: '', organisateurNom: '',
      dateDebut: dansUneSemaine.toISOString().slice(0, 16), dateFin: dansUneSemaine.toISOString().slice(0, 16),
      description: '', capaciteTotale: 1000, categoriesBillets: [], statut: 'PROGRAMME',
      pieceJointeNom: '', pieceJointeDataUrl: ''
    };
    this.showEvenementModal = true;
  }

  modifierEvenement(e: Evenement): void {
    this.evenementForm = {
      id: e.id, nom: e.nom, type: e.type, lieuNom: this.nomLieu(e.lieuId), organisateurNom: this.nomOrganisateur(e.organisateurId),
      dateDebut: new Date(e.dateDebut).toISOString().slice(0, 16), dateFin: new Date(e.dateFin).toISOString().slice(0, 16),
      description: e.description || '', capaciteTotale: e.capaciteTotale,
      categoriesBillets: e.categoriesBillets.map(c => ({ ...c })), statut: e.statut,
      pieceJointeNom: e.pieceJointeNom || '', pieceJointeDataUrl: e.pieceJointeDataUrl || ''
    };
    this.showEvenementModal = true;
  }

  fermerEvenementModal(): void {
    this.showEvenementModal = false;
    this.evenementForm = null;
  }

  ajouterCategorie(): void {
    if (!this.evenementForm || !this.nouvelleCategorieNom.trim()) return;
    this.evenementForm.categoriesBillets.push({
      nom: this.nouvelleCategorieNom.trim(), prix: this.nouvelleCategoriePrix,
      quantiteDisponible: this.nouvelleCategorieQuantite, quantiteVendue: 0
    });
    this.nouvelleCategorieNom = '';
    this.nouvelleCategoriePrix = 5000;
    this.nouvelleCategorieQuantite = 100;
  }

  supprimerCategorie(index: number): void {
    this.evenementForm?.categoriesBillets.splice(index, 1);
  }

  // ─── PIÈCE JOINTE (photo / fichier depuis le stockage interne) ────
  onFichierSelectionne(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fichier = input.files?.[0];
    if (!fichier || !this.evenementForm) return;

    if (fichier.size > 5 * 1024 * 1024) {
      this.toastService.error('Le fichier dépasse la taille maximale de 5 Mo.');
      input.value = '';
      return;
    }

    const lecteur = new FileReader();
    lecteur.onload = () => {
      if (this.evenementForm) {
        this.evenementForm.pieceJointeNom = fichier.name;
        this.evenementForm.pieceJointeDataUrl = lecteur.result as string;
      }
    };
    lecteur.readAsDataURL(fichier);
  }

  supprimerPieceJointe(): void {
    if (!this.evenementForm) return;
    this.evenementForm.pieceJointeNom = '';
    this.evenementForm.pieceJointeDataUrl = '';
  }

  get pieceJointeEstImage(): boolean {
    return !!this.evenementForm?.pieceJointeDataUrl?.startsWith('data:image/');
  }

  /** Trouve le lieu existant par nom (insensible à la casse), sinon le crée à la volée. */
  private resoudreLieuId(nom: string): Observable<number> {
    const propre = nom.trim();
    const existant = this.lieux.find(l => l.nom.toLowerCase() === propre.toLowerCase());
    if (existant) return of(existant.id);
    return this.evenementsService.creerLieu({ nom: propre, ville: '', adresse: '', type: 'Autre', capaciteMax: 0, statut: 'ACTIF' }).pipe(map(l => l.id));
  }

  /** Trouve l'organisateur existant par nom (insensible à la casse), sinon le crée à la volée. */
  private resoudreOrganisateurId(nom: string): Observable<number> {
    const propre = nom.trim();
    const existant = this.organisateurs.find(o => `${o.prenom} ${o.nom}`.trim().toLowerCase() === propre.toLowerCase() || o.nom.toLowerCase() === propre.toLowerCase());
    if (existant) return of(existant.id);
    return this.evenementsService.creerOrganisateur({ nom: propre, prenom: '', telephone: '', adresse: '' }).pipe(map(o => o.id));
  }

  enregistrerEvenement(): void {
    const f = this.evenementForm;
    if (!f) return;
    if (!f.nom.trim() || !f.lieuNom.trim() || !f.organisateurNom.trim()) {
      this.toastService.error('Veuillez renseigner le nom, le lieu et l\'organisateur.');
      return;
    }
    if (f.categoriesBillets.length === 0) {
      this.toastService.error('Ajoutez au moins une catégorie de billet.');
      return;
    }

    forkJoin([this.resoudreLieuId(f.lieuNom), this.resoudreOrganisateurId(f.organisateurNom)]).subscribe(([lieuId, organisateurId]) => {
      const payload = {
        id: f.id, nom: f.nom, type: f.type, lieuId, organisateurId,
        dateDebut: new Date(f.dateDebut), dateFin: new Date(f.dateFin), description: f.description,
        capaciteTotale: f.capaciteTotale, categoriesBillets: f.categoriesBillets, statut: f.statut,
        pieceJointeNom: f.pieceJointeNom, pieceJointeDataUrl: f.pieceJointeDataUrl
      } as Partial<Evenement>;
      const obs = f.id ? this.evenementsService.modifierEvenement(payload as Evenement) : this.evenementsService.creerEvenement(payload);
      obs.subscribe(e => {
        this.toastService.success(f.id ? `Événement « ${e.nom} » mis à jour.` : `Événement « ${e.nom} » créé.`);
        this.fermerEvenementModal();
        this.charger();
      });
    });
  }

  supprimerEvenement(e: Evenement): void {
    if (!confirm(`Supprimer l'événement « ${e.nom} » ?`)) return;
    this.evenementsService.supprimerEvenement(e.id).subscribe(() => {
      this.toastService.success('Événement supprimé.');
      this.charger();
    });
  }

  annulerEvenement(e: Evenement): void {
    if (!confirm(`Annuler l'événement « ${e.nom} » ?`)) return;
    this.evenementsService.toggleStatutEvenement(e, 'ANNULE').subscribe(() => {
      this.toastService.success('Événement annulé.');
      this.charger();
    });
  }

  // ─── CRUD ORGANISATEURS ───────────────────────────────────
  ouvrirNouvelOrganisateur(): void {
    this.organisateurForm = { nom: '', prenom: '', telephone: '', adresse: '', entreprise: '', email: '' };
    this.showOrganisateurModal = true;
  }

  modifierOrganisateur(o: Organisateur): void {
    this.organisateurForm = {
      id: o.id, nom: o.nom, prenom: o.prenom, telephone: o.telephone, adresse: o.adresse,
      entreprise: o.entreprise || '', email: o.email || ''
    };
    this.showOrganisateurModal = true;
  }

  fermerOrganisateurModal(): void {
    this.showOrganisateurModal = false;
    this.organisateurForm = null;
  }

  enregistrerOrganisateur(): void {
    const f = this.organisateurForm;
    if (!f) return;
    if (!f.nom.trim() || !f.prenom.trim() || !f.telephone.trim()) {
      this.toastService.error('Veuillez remplir le nom, le prénom et le téléphone.');
      return;
    }
    if (f.id) {
      const existant = this.organisateurs.find(o => o.id === f.id);
      const maj: Organisateur = {
        ...(existant as Organisateur),
        nom: f.nom, prenom: f.prenom, telephone: f.telephone, adresse: f.adresse,
        entreprise: f.entreprise, email: f.email
      };
      this.evenementsService.modifierOrganisateur(maj).subscribe(o => {
        this.toastService.success(`Organisateur ${o.prenom} ${o.nom} mis à jour.`);
        this.fermerOrganisateurModal();
        this.charger();
      });
    } else {
      this.evenementsService.creerOrganisateur(f).subscribe(o => {
        this.toastService.success(`Organisateur ${o.prenom} ${o.nom} ajouté.`);
        this.fermerOrganisateurModal();
        this.charger();
      });
    }
  }

  toggleStatutOrganisateur(o: Organisateur, event?: Event): void {
    event?.stopPropagation();
    this.evenementsService.toggleStatutOrganisateur(o.id).subscribe(() => {
      this.toastService.success(`Organisateur ${o.statut === 'ACTIF' ? 'désactivé' : 'activé'}.`);
      this.charger();
    });
  }

  supprimerOrganisateur(o: Organisateur): void {
    if (!confirm(`Supprimer la fiche de ${o.prenom} ${o.nom} ?`)) return;
    this.evenementsService.supprimerOrganisateur(o.id).subscribe(() => {
      this.toastService.success('Organisateur supprimé.');
      this.charger();
    });
  }
}
