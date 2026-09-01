import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService, ADMIN_SERVICES_IDENTIFIANT, ADMIN_SERVICES_PIN,
  ADMIN_TRANSPORT_IDENTIFIANT, ADMIN_TRANSPORT_PIN,
  ADMIN_EVENEMENTS_IDENTIFIANT, ADMIN_EVENEMENTS_PIN
} from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  identifiant = '';
  motDePasse = '';
  showMotDePasse = false;
  isLoading = false;
  erreur = '';
  showAide = false;

  readonly adminServicesIdentifiant = ADMIN_SERVICES_IDENTIFIANT;
  readonly adminServicesPin = ADMIN_SERVICES_PIN;
  readonly adminTransportIdentifiant = ADMIN_TRANSPORT_IDENTIFIANT;
  readonly adminTransportPin = ADMIN_TRANSPORT_PIN;
  readonly adminEvenementsIdentifiant = ADMIN_EVENEMENTS_IDENTIFIANT;
  readonly adminEvenementsPin = ADMIN_EVENEMENTS_PIN;

  constructor(private authService: AuthService, private router: Router) {}

  toggleAide(): void {
    this.showAide = !this.showAide;
  }

  remplir(identifiant: string, pin: string): void {
    this.identifiant = identifiant;
    this.motDePasse = pin;
    this.erreur = '';
  }

  connexion(): void {
    if (!this.identifiant.trim() || !this.motDePasse.trim()) {
      this.erreur = 'Veuillez renseigner votre identifiant et votre mot de passe.';
      return;
    }
    this.isLoading = true;
    this.erreur = '';

    this.authService.connecter(this.identifiant, this.motDePasse).subscribe(resultat => {
      this.isLoading = false;
      if (!resultat.succes || !resultat.utilisateur) {
        this.erreur = resultat.message || 'Connexion impossible.';
        return;
      }
      if (resultat.utilisateur.type === 'ADMIN') {
        if (resultat.utilisateur.secteur === 'TRANSPORT') this.router.navigate(['/transport']);
        else if (resultat.utilisateur.secteur === 'EVENEMENTS') this.router.navigate(['/evenements']);
        else this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/demandes']);
      }
    });
  }
}