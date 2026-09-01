import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-quick-access',
    template: `
    <div class="quick-grid">
      <a *ngFor="let item of items" [routerLink]="item.link" class="quick-btn" [class]="item.colorClass">
        <i class="qicon" [class]="item.icon"></i>
        {{ item.label }}
      </a>
    </div>
  `,
    styles: [`
    .quick-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 11px;
    }
    .quick-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 14px 8px;
      border-radius: 14px;
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      color: #fff;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      min-height: 82px;
      position: relative;
      overflow: hidden;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.13);
      text-decoration: none;
    }
    .quick-btn:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
    .quick-btn .qicon {
      font-size: 22px;
      display: block;
      margin-bottom: 2px;
    }
    .quick-btn.b1 { background: linear-gradient(135deg, #1d4ed8, #1e40af); }
    .quick-btn.b2 { background: linear-gradient(135deg, #15803d, #166534); }
    .quick-btn.b3 { background: linear-gradient(135deg, #a16207, #854d0e); }
    .quick-btn.b4 { background: linear-gradient(135deg, #7e22ce, #6b21a8); }
    .quick-btn.b5 { background: linear-gradient(135deg, #1e40af, #1e3a8a); }
    .quick-btn.b6 { background: linear-gradient(135deg, #b91c1c, #991b1b); }
    .quick-btn.b7 { background: linear-gradient(135deg, #0f766e, #115e59); }
    .quick-btn.b8 { background: linear-gradient(135deg, #475569, #334155); }
    .quick-btn.b9 { background: linear-gradient(135deg, #9a3412, #7c2d12); }
  `]
})
export class QuickAccessComponent implements OnInit {
    @Input() items: any[] = [];

    constructor() { }

    ngOnInit(): void { }
}