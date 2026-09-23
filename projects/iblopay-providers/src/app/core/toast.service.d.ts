export interface ToastMessage {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
    icon: string;
}
export declare class ToastService {
    private toastsSubject;
    toasts$: import("rxjs").Observable<ToastMessage[]>;
    private nextId;
    success(message: string): void;
    error(message: string): void;
    info(message: string): void;
    private push;
    dismiss(id: number): void;
}
//# sourceMappingURL=toast.service.d.ts.map