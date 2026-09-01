import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-stack">
      <div class="toast-card" *ngFor="let t of toasts$ | async" [ngClass]="t.type">
        <i [class]="t.icon"></i>
        <span>{{ t.message }}</span>
        <button (click)="dismiss(t.id)"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  `,
  styles: [`
    .toast-stack {
      position: fixed;
      top: 76px;
      right: 24px;
      z-index: 500;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 320px;
    }
    .toast-card {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-card, #fff);
      border: 1px solid var(--border-color, #e6e9f0);
      border-radius: 12px;
      padding: 12px 14px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary, #0f172a);
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
      animation: slideIn 0.2s ease;
    }
    .toast-card.success { border-left: 3px solid #16a34a; }
    .toast-card.success i:first-child { color: #16a34a; }
    .toast-card.error { border-left: 3px solid #dc2626; }
    .toast-card.error i:first-child { color: #dc2626; }
    .toast-card.info { border-left: 3px solid #2563eb; }
    .toast-card.info i:first-child { color: #2563eb; }
    .toast-card span { flex: 1; }
    .toast-card button {
      background: transparent;
      border: none;
      color: var(--text-muted, #94a3b8);
      cursor: pointer;
      font-size: 11px;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ToastContainerComponent {
  toasts$ = this.toastService.toasts$;

  constructor(private toastService: ToastService) {}

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
