// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <router-outlet></router-outlet>
  `,
    styles: [] // ← Utiliser styles au lieu de styleUrls
})
export class AppComponent {
    title = 'iblopay-admin';
}