// src/app/modules/agents/dialogs/agent-delete-dialog/agent-delete-dialog.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-agent-delete-dialog',
  template: `
    <div class="dialog-container">
      <h2>Confirmer la suppression</h2>
      <p>Êtes-vous sûr de vouloir supprimer l'agent <strong>{{ data?.agent?.firstName }} {{ data?.agent?.lastName }}</strong> ?</p>
      <p class="warning">Cette action est irréversible.</p>
      <div class="dialog-actions">
        <button (click)="cancel()" class="btn-secondary">Annuler</button>
        <button (click)="confirm()" class="btn-danger">Supprimer</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
      max-width: 400px;
      
      h2 {
        margin-top: 0;
        color: #c62828;
      }
      
      .warning {
        color: #c62828;
        font-weight: 500;
        margin: 16px 0;
      }
      
      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 24px;
      }
      
      .btn-secondary {
        padding: 8px 16px;
        background: #666;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .btn-danger {
        padding: 8px 16px;
        background: #c62828;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover {
          background: #b71c1c;
        }
      }
    }
  `]
})
export class AgentDeleteDialogComponent {
  dialogRef: any;
  data: any;

  constructor() {}

  cancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close(false);
    }
  }

  confirm(): void {
    if (this.dialogRef) {
      this.dialogRef.close(true);
    }
  }
}