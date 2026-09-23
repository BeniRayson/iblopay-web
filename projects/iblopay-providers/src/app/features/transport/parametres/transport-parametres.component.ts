import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ProfilCompte {
  nif: string;
  registreCommerce: string;
  email: string;
  telephone: string;
  nom: string;
}

@Component({
  selector: 'app-transport-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transport-parametres.component.html',
  styleUrls: ['./transport-parametres.component.scss']
})
export class TransportParametresComponent implements OnInit {
  profil: ProfilCompte = {
    nif: 'NIF123456789',
    registreCommerce: 'RC-00012345',
    email: 'proprietaire@busgestion.com',
    telephone: '+257 68 12 34 56',
    nom: 'Propriétaire'
  };

  ancienMotDePasse = '';
  nouveauMotDePasse = '';
  confirmationMotDePasse = '';
  afficherMotsDePasse = false;
  imageProfil: string | null = null;
  message = '';
  messageType: 'succes' | 'erreur' | 'info' = 'info';
  private messageTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.restaurerParametres();
  }

  get initiales(): string {
    return this.profil.nom.trim().split(/\s+/).slice(0, 2)
      .map(partie => partie.charAt(0)).join('').toUpperCase() || 'P';
  }

  get emailValide(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.profil.email.trim());
  }

  get profilValide(): boolean {
    return !!this.profil.nif.trim() && !!this.profil.registreCommerce.trim()
      && this.emailValide && !!this.profil.nom.trim()
      && /^\+?[\d\s-]{8,20}$/.test(this.profil.telephone.trim());
  }

  enregistrerProfil(): void {
    if (!this.profilValide) {
      this.notifier('Vérifiez les champs obligatoires, l’adresse email et le téléphone.', 'erreur');
      return;
    }
    this.profil = {
      nif: this.profil.nif.trim(),
      registreCommerce: this.profil.registreCommerce.trim(),
      email: this.profil.email.trim(),
      telephone: this.profil.telephone.trim(),
      nom: this.profil.nom.trim()
    };
    this.sauvegarderLocalement();
    this.notifier('Informations du compte enregistrées dans ce navigateur (démonstration).', 'succes');
  }

  choisirPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fichier = input.files?.[0];
    if (!fichier) return;
    if (!fichier.type.startsWith('image/')) {
      this.notifier('Sélectionnez une image valide.', 'erreur');
      input.value = '';
      return;
    }
    if (fichier.size > 2 * 1024 * 1024) {
      this.notifier('La photo ne doit pas dépasser 2 Mo.', 'erreur');
      input.value = '';
      return;
    }
    const lecteur = new FileReader();
    lecteur.onload = () => {
      this.imageProfil = typeof lecteur.result === 'string' ? lecteur.result : null;
      // L’aperçu est local : ne pas stocker l’image dans localStorage.
      this.notifier('Aperçu de la photo modifié. La sauvegarde serveur reste à connecter.', 'info');
    };
    lecteur.readAsDataURL(fichier);
    input.value = '';
  }

  enregistrerMotDePasse(): void {
    if (!this.ancienMotDePasse || !this.nouveauMotDePasse || !this.confirmationMotDePasse) {
      this.notifier('Remplissez tous les champs du mot de passe.', 'erreur');
      return;
    }
    if (this.nouveauMotDePasse.length < 8) {
      this.notifier('Le nouveau mot de passe doit contenir au moins 8 caractères.', 'erreur');
      return;
    }
    if (this.nouveauMotDePasse !== this.confirmationMotDePasse) {
      this.notifier('La confirmation du mot de passe ne correspond pas.', 'erreur');
      return;
    }
    // Aucun mot de passe n’est conservé ou prétendument changé sans API sécurisée.
    this.ancienMotDePasse = '';
    this.nouveauMotDePasse = '';
    this.confirmationMotDePasse = '';
    this.notifier('Formulaire validé. Connectez votre API d’authentification pour changer le mot de passe.', 'info');
  }

  private sauvegarderLocalement(): void {
    try {
      localStorage.setItem('iblopay_transport_parametres_demo', JSON.stringify({
        profil: this.profil
      }));
    } catch {
      this.notifier('Le stockage local du navigateur n’est pas disponible.', 'erreur');
    }
  }

  private restaurerParametres(): void {
    try {
      const donnees = localStorage.getItem('iblopay_transport_parametres_demo');
      if (!donnees) return;
      const params = JSON.parse(donnees);
      if (params.profil && typeof params.profil === 'object') {
        this.profil = { ...this.profil, ...params.profil };
      }
    } catch {
      // Revenir aux valeurs de démonstration si le stockage est inaccessible.
    }
  }

  private notifier(texte: string, type: 'succes' | 'erreur' | 'info'): void {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    this.message = texte;
    this.messageType = type;
    this.messageTimeout = setTimeout(() => this.message = '', 6500);
  }
}
