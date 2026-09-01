import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransportService } from '../../services/transport.service';
import { Vehicule, Chauffeur, TypeVehicule, StatutVehicule, LigneBus, ZoneTaxi } from '../../models/transport.model';
import { ToastService } from '../../core/toast.service';

const STATUTS_BUS: StatutVehicule[] = ['EN_SERVICE', 'AU_DEPOT', 'EN_PANNE', 'EN_MAINTENANCE'];
const STATUTS_TAXI: StatutVehicule[] = ['DISPONIBLE', 'EN_COURSE', 'HORS_SERVICE', 'EN_MAINTENANCE'];

interface VehiculeFormState {
  id?: number;
  type: TypeVehicule;
  matricule: string;
  marqueModele: string;
  capacite: number | null;
  statut: StatutVehicule;
  chauffeurId: number | null;
  ligneId: number | null;
  zoneId: number | null;
  kilometrage: number;
  motorisation: string;
  consommationMoyenne100km: number;
}

interface ChauffeurFormState {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  numeroPermis: string;
  permisValidite: string;
  vehiculeId: number | null;
}

@Component({
  selector: 'app-flotte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flotte.component.html',
  styleUrl: './flotte.component.scss'
})
export class FlotteComponent implements OnInit {
  vueActive: 'VEHICULES' | 'CHAUFFEURS' = 'VEHICULES';

  vehicules: Vehicule[] = [];
  vehiculesFiltres: Vehicule[] = [];
  chauffeurs: Chauffeur[] = [];
  chauffeursFiltres: Chauffeur[] = [];
  lignes: LigneBus[] = [];
  zones: ZoneTaxi[] = [];

  filtreType: '' | TypeVehicule = '';
  filtreStatutVehicule = '';
  filtreStatutChauffeur = '';
  recherche = '';

  isLoading = true;

  showVehiculeModal = false;
  vehiculeForm: VehiculeFormState | null = null;

  showChauffeurModal = false;
  chauffeurForm: ChauffeurFormState | null = null;

  // ─── DÉTAIL D'UNE LIGNE (clic sur le tableau) ──────────────
  vehiculeDetailAffiche: Vehicule | null = null;
  chauffeurDetailAffiche: Chauffeur | null = null;

  constructor(private transportService: TransportService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.transportService.getLignes().subscribe(l => this.lignes = l);
    this.transportService.getZones().subscribe(z => this.zones = z);
    this.transportService.getVehicules().subscribe(v => {
      this.vehicules = v;
      this.appliquerFiltresVehicules();
      this.transportService.getChauffeurs().subscribe(c => {
        this.chauffeurs = c;
        this.appliquerFiltresChauffeurs();
        this.isLoading = false;
      });
    });
  }

  changerVue(vue: 'VEHICULES' | 'CHAUFFEURS'): void {
    this.vueActive = vue;
  }

  // ─── FILTRES ─────────────────────────────────────────────
  appliquerFiltresVehicules(): void {
    const term = this.recherche.toLowerCase().trim();
    this.vehiculesFiltres = this.vehicules.filter(v => {
      const matchType = !this.filtreType || v.type === this.filtreType;
      const matchStatut = !this.filtreStatutVehicule || v.statut === this.filtreStatutVehicule;
      const matchTerm = !term || v.matricule.toLowerCase().includes(term) || v.marqueModele.toLowerCase().includes(term);
      return matchType && matchStatut && matchTerm;
    });
  }

  appliquerFiltresChauffeurs(): void {
    const term = this.recherche.toLowerCase().trim();
    this.chauffeursFiltres = this.chauffeurs.filter(c => {
      const matchStatut = !this.filtreStatutChauffeur || c.statut === this.filtreStatutChauffeur;
      const matchTerm = !term || `${c.prenom} ${c.nom}`.toLowerCase().includes(term) || c.numeroPermis.toLowerCase().includes(term);
      return matchStatut && matchTerm;
    });
  }

  onFiltreChange(): void {
    this.appliquerFiltresVehicules();
    this.appliquerFiltresChauffeurs();
  }

  // ─── HELPERS D'AFFICHAGE ─────────────────────────────────
  nomChauffeur(id?: number): string {
    if (!id) return 'Non assigné';
    const c = this.chauffeurs.find(x => x.id === id);
    return c ? `${c.prenom} ${c.nom}` : 'Non assigné';
  }

  nomLigneOuZone(v: Vehicule): string {
    if (v.type === 'BUS') return this.lignes.find(l => l.id === v.ligneId)?.nom || 'Non assignée';
    return this.zones.find(z => z.id === v.zoneId)?.nom || 'Non assignée';
  }

  vehiculeAssigne(chauffeurId: number): Vehicule | undefined {
    return this.vehicules.find(v => v.chauffeurId === chauffeurId);
  }

  statutsDisponibles(type: TypeVehicule): StatutVehicule[] {
    return type === 'BUS' ? STATUTS_BUS : STATUTS_TAXI;
  }

  statutVehiculeClass(statut: string): string {
    const map: Record<string, string> = {
      EN_SERVICE: 'badge-green', DISPONIBLE: 'badge-green', EN_COURSE: 'badge-blue',
      AU_DEPOT: 'badge-gray', EN_PANNE: 'badge-red', EN_MAINTENANCE: 'badge-orange', HORS_SERVICE: 'badge-gray'
    };
    return map[statut] || 'badge-gray';
  }

  statutVehiculeLabel(statut: string): string {
    const map: Record<string, string> = {
      EN_SERVICE: 'En service', DISPONIBLE: 'Disponible', EN_COURSE: 'En course',
      AU_DEPOT: 'Au dépôt', EN_PANNE: 'En panne', EN_MAINTENANCE: 'En maintenance', HORS_SERVICE: 'Hors service'
    };
    return map[statut] || statut;
  }

  permisExpireBientot(date: Date): boolean {
    const dans60Jours = Date.now() + 60 * 24 * 3600000;
    return new Date(date).getTime() < dans60Jours;
  }

  motorisationLabel(m: string): string {
    const map: Record<string, string> = { ESSENCE: 'Essence', DIESEL: 'Diesel', ELECTRIQUE: 'Électrique', HYBRIDE: 'Hybride' };
    return map[m] || m;
  }

  consommationFormatee(v: Vehicule): string {
    const total = (v.kilometrage / 100) * v.consommationMoyenne100km;
    const unite = v.motorisation === 'ELECTRIQUE' ? 'kWh' : 'L';
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(total) + ' ' + unite;
  }

  // ─── DÉTAIL D'UNE LIGNE (clic sur le tableau) ──────────────
  voirDetailVehicule(v: Vehicule): void {
    this.vehiculeDetailAffiche = v;
  }

  fermerDetailVehicule(): void {
    this.vehiculeDetailAffiche = null;
  }

  voirDetailChauffeur(c: Chauffeur): void {
    this.chauffeurDetailAffiche = c;
  }

  fermerDetailChauffeur(): void {
    this.chauffeurDetailAffiche = null;
  }

  // ─── CRUD VÉHICULES ──────────────────────────────────────
  ouvrirNouveauVehicule(): void {
    this.vehiculeForm = {
      type: 'BUS', matricule: '', marqueModele: '', capacite: 30, statut: 'AU_DEPOT',
      chauffeurId: null, ligneId: null, zoneId: null, kilometrage: 0,
      motorisation: 'DIESEL', consommationMoyenne100km: 19
    };
    this.showVehiculeModal = true;
  }

  modifierVehicule(v: Vehicule): void {
    this.vehiculeForm = {
      id: v.id, type: v.type, matricule: v.matricule, marqueModele: v.marqueModele,
      capacite: v.capacite ?? null, statut: v.statut, chauffeurId: v.chauffeurId ?? null,
      ligneId: v.ligneId ?? null, zoneId: v.zoneId ?? null, kilometrage: v.kilometrage,
      motorisation: v.motorisation, consommationMoyenne100km: v.consommationMoyenne100km
    };
    this.showVehiculeModal = true;
  }

  fermerVehiculeModal(): void {
    this.showVehiculeModal = false;
    this.vehiculeForm = null;
  }

  onChangerTypeVehicule(): void {
    if (!this.vehiculeForm) return;
    this.vehiculeForm.statut = this.vehiculeForm.type === 'BUS' ? 'AU_DEPOT' : 'DISPONIBLE';
    this.vehiculeForm.ligneId = null;
    this.vehiculeForm.zoneId = null;
    this.vehiculeForm.capacite = this.vehiculeForm.type === 'BUS' ? 30 : null;
  }

  enregistrerVehicule(): void {
    const f = this.vehiculeForm;
    if (!f) return;
    if (!f.matricule.trim() || !f.marqueModele.trim()) {
      this.toastService.error('Veuillez renseigner le matricule et le modèle du véhicule.');
      return;
    }
    const payload = {
      id: f.id, type: f.type, matricule: f.matricule.trim().toUpperCase(), marqueModele: f.marqueModele,
      capacite: f.capacite ?? undefined, statut: f.statut,
      chauffeurId: f.chauffeurId ?? undefined, ligneId: f.ligneId ?? undefined, zoneId: f.zoneId ?? undefined,
      kilometrage: f.kilometrage, motorisation: f.motorisation, consommationMoyenne100km: f.consommationMoyenne100km
    } as Partial<Vehicule>;

    const obs = f.id ? this.transportService.modifierVehicule(payload as Vehicule) : this.transportService.creerVehicule(payload);
    obs.subscribe(v => {
      this.toastService.success(f.id ? `Véhicule ${v.matricule} mis à jour.` : `Véhicule ${v.matricule} ajouté à la flotte.`);
      this.fermerVehiculeModal();
      this.charger();
    });
  }

  supprimerVehicule(v: Vehicule): void {
    if (!confirm(`Retirer le véhicule ${v.matricule} de la flotte ?`)) return;
    this.transportService.supprimerVehicule(v.id).subscribe(() => {
      this.toastService.success('Véhicule retiré de la flotte.');
      this.charger();
    });
  }

  // ─── CRUD CHAUFFEURS ─────────────────────────────────────
  ouvrirNouveauChauffeur(): void {
    this.chauffeurForm = {
      nom: '', prenom: '', telephone: '', adresse: '', numeroPermis: '', permisValidite: '', vehiculeId: null
    };
    this.showChauffeurModal = true;
  }

  modifierChauffeur(c: Chauffeur): void {
    this.chauffeurForm = {
      id: c.id, nom: c.nom, prenom: c.prenom, telephone: c.telephone, adresse: c.adresse,
      numeroPermis: c.numeroPermis, permisValidite: new Date(c.permisValidite).toISOString().slice(0, 10),
      vehiculeId: c.vehiculeId ?? null
    };
    this.showChauffeurModal = true;
  }

  fermerChauffeurModal(): void {
    this.showChauffeurModal = false;
    this.chauffeurForm = null;
  }

  enregistrerChauffeur(): void {
    const f = this.chauffeurForm;
    if (!f) return;
    if (!f.nom.trim() || !f.prenom.trim() || !f.telephone.trim() || !f.numeroPermis.trim() || !f.permisValidite) {
      this.toastService.error('Veuillez remplir le nom, prénom, téléphone, n° de permis et sa date de validité.');
      return;
    }
    const payload = {
      id: f.id, nom: f.nom, prenom: f.prenom, telephone: f.telephone, adresse: f.adresse,
      numeroPermis: f.numeroPermis, permisValidite: new Date(f.permisValidite),
      vehiculeId: f.vehiculeId ?? undefined
    } as Partial<Chauffeur>;
    const obs = f.id ? this.transportService.modifierChauffeur(payload as Chauffeur) : this.transportService.creerChauffeur(payload);
    obs.subscribe(c => {
      this.toastService.success(f.id ? `Chauffeur ${c.prenom} ${c.nom} mis à jour.` : `Chauffeur ${c.prenom} ${c.nom} ajouté.`);
      this.fermerChauffeurModal();
      this.charger();
    });
  }

  toggleStatutChauffeur(c: Chauffeur, event?: Event): void {
    event?.stopPropagation();
    this.transportService.toggleStatutChauffeur(c.id).subscribe(() => {
      this.toastService.success(`Chauffeur ${c.statut === 'ACTIF' ? 'désactivé' : 'activé'}.`);
      this.charger();
    });
  }

  supprimerChauffeur(c: Chauffeur): void {
    if (!confirm(`Supprimer la fiche de ${c.prenom} ${c.nom} ?`)) return;
    this.transportService.supprimerChauffeur(c.id).subscribe(() => {
      this.toastService.success('Chauffeur supprimé.');
      this.charger();
    });
  }
}
