import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormulairesService } from '../../services/formulaires.service';
import { Formulaire } from '../../models/provider.model';

@Component({
  selector: 'app-formulaire-publie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formulaire-publie.component.html',
  styleUrl: './formulaire-publie.component.scss'
})
export class FormulairePublieComponent implements OnInit {
  @Input() formulaireId?: number;
  
  formulaire: Formulaire = {
    id: 0,
    institutionId: 1,
    serviceId: 0,
    nom: '',
    code: '',
    version: 1,
    statut: 'PUBLIE',
    champs: [],
    createdAt: new Date()
  };

  nbColonnes = 1;

  constructor(
    private route: ActivatedRoute,
    private formulairesService: FormulairesService
  ) {}

  ngOnInit(): void {
    const id = this.formulaireId || Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.formulairesService.getById(id).subscribe(f => {
        if (f) {
          this.formulaire = f;
          this.formulaire.champs.sort((a, b) => a.ordre - b.ordre);
          // 🔥 Récupère le nombre de colonnes depuis la configuration
          this.nbColonnes = this.getNbColonnes();
        }
      });
    }
  }

  private getNbColonnes(): number {
    // 🔥 Priorité 1: configuration.nbColonnes
    if (this.formulaire.configuration?.nbColonnes) {
      return this.formulaire.configuration.nbColonnes;
    }
    // 🔥 Priorité 2: propriété directe (pour compatibilité)
    if ((this.formulaire as any).nbColonnes) {
      return (this.formulaire as any).nbColonnes;
    }
    // 🔥 Priorité 3: estimation basée sur le nombre de champs
    const totalChamps = this.formulaire.champs.length;
    if (totalChamps <= 4) return 1;
    if (totalChamps <= 8) return 2;
    if (totalChamps <= 12) return 3;
    return 4;
  }
}