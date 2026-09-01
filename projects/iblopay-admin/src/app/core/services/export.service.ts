import { Injectable } from '@angular/core';

export interface ExportColumn {
  title: string;
  dataKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  /**
   * Exporte les données en CSV et télécharge le fichier
   */
  exportToCsv(data: any[], columns: ExportColumn[], filename: string = 'export'): void {
    if (!data || data.length === 0) {
      console.warn('Aucune donnée à exporter');
      return;
    }

    // En-têtes CSV
    const headers = columns.map(col => this.escapeCsvValue(col.title)).join(';');

    // Lignes de données
    const rows = data.map(item => {
      return columns.map(col => {
        const value = this.getNestedValue(item, col.dataKey);
        return this.escapeCsvValue(this.formatValue(value));
      }).join(';');
    });

    const bom = '\uFEFF';
    const csvContent = bom + headers + '\n' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  /**
   * Exporte les données en PDF en utilisant l'impression navigateur
   * avec un formatage tableau
   */
  exportToPdf(data: any[], columns: ExportColumn[], title: string = 'Export', filename: string = 'export'): void {
    if (!data || data.length === 0) {
      console.warn('Aucune donnée à exporter');
      return;
    }

    let html = `
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; }
          h1 { color: #1a56db; font-size: 20px; margin-bottom: 10px; }
          .meta { color: #6b7280; font-size: 12px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { background-color: #1a56db; color: white; padding: 8px 10px; text-align: left; font-weight: 600; }
          td { padding: 6px 10px; border-bottom: 1px solid #e5e7eb; }
          tr:nth-child(even) { background-color: #f9fafb; }
          .total { margin-top: 15px; font-weight: bold; text-align: right; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="meta">Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</div>
        <table>
          <thead>
            <tr>
              ${columns.map(col => `<th>${col.title}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(item => `
              <tr>
                ${columns.map(col => `<td>${this.formatValue(this.getNestedValue(item, col.dataKey))}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total">Total: ${data.length} enregistrement(s)</div>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Ouvrir dans une nouvelle fenêtre pour impression
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    }

    URL.revokeObjectURL(url);
  }

  /**
   * Récupère une valeur imbriquée par une clé (ex: "adresse.rue")
   */
  private getNestedValue(obj: any, key: string): any {
    if (!obj) return '';
    return key.split('.').reduce((current, k) => {
      return current && current[k] !== undefined ? current[k] : '';
    }, obj);
  }

  /**
   * Échappe une valeur pour le CSV
   */
  private escapeCsvValue(value: any): string {
    const str = String(value ?? '');
    if (str.includes(';') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  /**
   * Formate une valeur pour l'affichage
   */
  private formatValue(value: any): string {
    if (value === null || value === undefined) return '';

    if (value instanceof Date) {
      return value.toLocaleDateString('fr-FR');
    }

    if (typeof value === 'boolean') {
      return value ? 'Oui' : 'Non';
    }

    if (typeof value === 'number') {
      return new Intl.NumberFormat('fr-FR').format(value);
    }

    return String(value);
  }

  /**
   * Génère les colonnes à partir d'un mapping
   */
  static createColumns(mapping: { title: string; key: string }[]): ExportColumn[] {
    return mapping.map(m => ({ title: m.title, dataKey: m.key }));
  }
}