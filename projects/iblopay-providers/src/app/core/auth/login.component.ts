import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  identifiant = '';
  motDePasse = '';
  motDePasseVisible = false;
  tentative = false;
  chargement = false;
  erreur = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  seConnecter(): void {
    if (this.chargement) return;

    this.tentative = true;
    this.erreur = '';

    const identifiant = this.identifiant.trim();
    const motDePasse = this.motDePasse.trim();

    if (!identifiant || !motDePasse) {
      this.erreur = 'Veuillez renseigner votre identifiant et votre mot de passe.';
      return;
    }

    this.chargement = true;

    this.authService.connecter(identifiant, motDePasse)
      .pipe(finalize(() => this.chargement = false))
      .subscribe({
        next: resultat => {
          if (!resultat.succes || !resultat.utilisateur) {
            this.erreur = resultat.message || 'Connexion impossible.';
            return;
          }

          const utilisateur = resultat.utilisateur;
          if (utilisateur.type === 'ADMIN') {
            switch (utilisateur.secteur) {
              case 'TRANSPORT':
                void this.router.navigate(['/transport']);
                break;
              case 'EVENEMENTS':
                void this.router.navigate(['/evenements']);
                break;
              default:
                void this.router.navigate(['/dashboard']);
            }
          } else {
            void this.router.navigate(['/demandes']);
          }
        },
        error: () => {
          this.erreur = 'Une erreur est survenue pendant la connexion. Réessayez.';
        }
      });
  }
}
