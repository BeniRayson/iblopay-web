import { Component } from '@angular/core';

@Component({
  selector: 'app-agent-delete-dialog',
  templateUrl: './agent-delete-dialog.component.html',
  styleUrls: ['./agent-delete-dialog.component.scss']})
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
