import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  services = [
    { nom: 'Demande de certificat', icon: 'fa-solid fa-file-circle-check', delai: '3 jours' },
    { nom: 'Demande d\'autorisation', icon: 'fa-solid fa-stamp', delai: '5 jours' },
    { nom: 'Demande de licence', icon: 'fa-solid fa-id-card', delai: '7 jours' },
    { nom: 'Abonnement transport urbain', icon: 'fa-solid fa-bus', delai: '1 jour' }
  ];
}
