import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card-qr-scanner',
  templateUrl: './card-qr-scanner.component.html',
  styleUrls: ['./card-qr-scanner.component.scss']
})
export class CardQrScannerComponent {
  @Output() scannedUid = new EventEmitter<string>();
}
