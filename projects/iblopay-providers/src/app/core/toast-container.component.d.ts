import { ToastService, ToastMessage } from './toast.service';
export declare class ToastContainerComponent {
    private toastService;
    toasts$: import("rxjs").Observable<ToastMessage[]>;
    constructor(toastService: ToastService);
    dismiss(id: number): void;
}
//# sourceMappingURL=toast-container.component.d.ts.map