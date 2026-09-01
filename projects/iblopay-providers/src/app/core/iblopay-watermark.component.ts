import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iblopay-watermark',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="iblopay-watermark" [class.small]="size === 'small'">
      <div class="iw-logo">IB</div>
      <span *ngIf="size !== 'small'">IBLOPAY · Sécurisé</span>
    </div>
  `,
  styles: [`
    .iblopay-watermark {
      position: absolute;
      bottom: 8px;
      right: 8px;
      display: flex;
      align-items: center;
      gap: 5px;
      background: rgba(15, 23, 42, 0.72);
      color: #fff;
      padding: 4px 9px 4px 4px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.3px;
      pointer-events: none;
      user-select: none;
      backdrop-filter: blur(2px);
    }
    .iw-logo {
      width: 16px;
      height: 16px;
      border-radius: 5px;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      font-weight: 800;
    }
    .iblopay-watermark.small {
      padding: 3px;
      bottom: 4px;
      right: 4px;
    }
    .iblopay-watermark.small .iw-logo {
      width: 14px;
      height: 14px;
      font-size: 7px;
    }
  `]
})
export class IblopayWatermarkComponent {
  @Input() size: 'normal' | 'small' = 'normal';
}
