import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private nextId = 1;

  success(message: string): void {
    this.push(message, 'success', 'fa-solid fa-circle-check');
  }

  error(message: string): void {
    this.push(message, 'error', 'fa-solid fa-circle-exclamation');
  }

  info(message: string): void {
    this.push(message, 'info', 'fa-solid fa-circle-info');
  }

  private push(message: string, type: ToastMessage['type'], icon: string): void {
    const toast: ToastMessage = { id: this.nextId++, message, type, icon };
    this.toastsSubject.next([...this.toastsSubject.value, toast]);
    setTimeout(() => this.dismiss(toast.id), 4500);
  }

  dismiss(id: number): void {
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
  }
}
