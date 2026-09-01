import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

export interface ColonneExport {
  cle: string;
  label: string;
}

export interface LigneExport {
  [cle: string]: string | number;
}

@Injectable({ providedIn: 'root' })
export class ExportUtilsService {

  /** Génère un vrai fichier Excel (.xlsx) téléchargeable à partir de colonnes/lignes. */
  exporterExcel(colonnes: ColonneExport[], lignes: LigneExport[], nomFichier: string, nomFeuille = 'Rapport'): void {
    const entetes = colonnes.map(c => c.label);
    const donnees = lignes.map(ligne => colonnes.map(c => ligne[c.cle] ?? ''));

    const feuille = XLSX.utils.aoa_to_sheet([entetes, ...donnees]);
    feuille['!cols'] = colonnes.map(() => ({ wch: 20 }));

    const classeur = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(classeur, feuille, nomFeuille.slice(0, 31));

    const fichier = `${nomFichier}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(classeur, fichier);
  }

  /** Ouvre une fenêtre d'impression avec un tableau HTML propre (titre, filtres, colonnes/lignes). */
  imprimer(titre: string, sousTitre: string, filtresTexte: string[], colonnes: ColonneExport[], lignes: LigneExport[]): void {
    const entetesHtml = colonnes.map(c => `<th>${c.label}</th>`).join('');
    const lignesHtml = lignes.map(l =>
      `<tr>${colonnes.map(c => `<td>${l[c.cle] ?? ''}</td>`).join('')}</tr>`
    ).join('');

    const html = `
      <html>
        <head>
          <title>${titre} — IBLOPAY</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #0f172a; }
            h1 { font-size: 18px; margin-bottom: 2px; }
            .sous-titre { font-size: 12px; color: #64748b; margin-bottom: 4px; }
            .filtres { font-size: 11px; color: #475569; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
            th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
            th { background: #f1f5f9; text-transform: uppercase; font-size: 10px; letter-spacing: 0.3px; }
            tr:nth-child(even) td { background: #f8fafc; }
            .pied { margin-top: 16px; font-size: 10px; color: #94a3b8; text-align: right; }
          </style>
        </head>
        <body>
          <h1>${titre}</h1>
          <div class="sous-titre">${sousTitre}</div>
          <div class="filtres">${filtresTexte.length ? filtresTexte.join(' &nbsp;•&nbsp; ') : 'Aucun filtre appliqué'} &nbsp;•&nbsp; ${lignes.length} résultat(s)</div>
          <table>
            <thead><tr>${entetesHtml}</tr></thead>
            <tbody>${lignesHtml}</tbody>
          </table>
          <div class="pied">Généré le ${new Date().toLocaleString('fr-FR')}</div>
        </body>
      </html>`;

    const fenetre = window.open('', '_blank', 'width=1000,height=800');
    if (!fenetre) return;
    fenetre.document.open();
    fenetre.document.write(html);
    fenetre.document.close();
    setTimeout(() => { fenetre.focus(); fenetre.print(); }, 300);
  }
}
