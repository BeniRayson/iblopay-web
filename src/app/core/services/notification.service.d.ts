import { Observable } from 'rxjs';
export type NotificationType = 'transaction' | 'user' | 'commission' | 'deposit' | 'fund' | 'alert' | 'request' | 'info';
export type NotificationPriority = 'high' | 'medium' | 'low';
export interface AppNotification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    icon: string;
    date: Date;
    read: boolean;
    link?: string | string[];
    module?: string | null;
    priority?: NotificationPriority;
}
export declare class NotificationService {
    private notifications;
    private notificationMap;
    private maxNotifications;
    constructor();
    getForModule(moduleKey: string | null): Observable<AppNotification[]>;
    getUnreadForModule(moduleKey: string | null): Observable<AppNotification[]>;
    unreadCountForModule(moduleKey: string | null): Observable<number>;
    add(notification: AppNotification): void;
    markAsRead(id: string): void;
    markAllAsReadForModule(moduleKey: string | null): void;
    markAllAsRead(): void;
    removeAllRead(): void;
    clearModule(moduleKey: string | null): void;
    cleanup(beforeDate: Date): void;
    getGlobalNotifications(): Observable<AppNotification[]>;
    clear(): void;
}
//# sourceMappingURL=notification.service.d.ts.map