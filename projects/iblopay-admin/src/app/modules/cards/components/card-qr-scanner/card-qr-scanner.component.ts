import { Component, EventEmitter, Output } from '@angular/core';

// Stub: no scanning library wired up yet. Emits scannedUid when integrated
// with e.g. ngx-scanner / zxing. Kept as a component so card-activation can
// already depend on the (selector, output) contract.
@Component({
  selector: 'app-card-qr-scanner',
  templateUrl: './card-qr-scanner.component.html',
  styleUrls: ['./card-qr-scanner.component.scss']
})
export class CardQrScannerComponent {
  @Output() scannedUid = new EventEmitter<string>();
}
