import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    exports: [LayoutComponent]
})
export class LayoutModule { }