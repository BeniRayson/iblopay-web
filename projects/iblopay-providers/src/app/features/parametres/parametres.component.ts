import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.scss'
})
export class ParametresComponent {
  institution = {
    nom: 'Institution A',
    code: 'INST-A',
    email: 'contact@institution-a.bi',
    telephone: '+257 22 000 000',
    adresse: 'Gitega, Burundi'
  };

  notifications = {
    emailNouvelleDemande: true,
    smsChangementStatut: true,
    emailRapportHebdo: false
  };

  saved = false;

  enregistrer(): void {
    this.saved = true;
    setTimeout(() => this.saved = false, 2500);
  }
}
