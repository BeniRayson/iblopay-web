// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notifications = new BehaviorSubject<AppNotification[]>([]);
    private notificationMap = new Map<string, AppNotification>();
    private maxNotifications: number = 15;

    constructor() {}

    getForModule(moduleKey: string | null): Observable<AppNotification[]> {
        return this.notifications.asObservable().pipe(
            map(notifs => {
                if (!moduleKey) return notifs;
                return notifs.filter(n => n.module === moduleKey || n.module === null);
            })
        );
    }

    getUnreadForModule(moduleKey: string | null): Observable<AppNotification[]> {
        return this.getForModule(moduleKey).pipe(
            map(notifs => notifs.filter(n => !n.read))
        );
    }

    unreadCountForModule(moduleKey: string | null): Observable<number> {
        return this.getUnreadForModule(moduleKey).pipe(
            map(notifs => notifs.length)
        );
    }

    add(notification: AppNotification): void {
        this.notificationMap.set(notification.id, notification);
        let current = this.notifications.getValue();
        
        current = [notification, ...current];
        
        if (current.length > this.maxNotifications) {
            current = current.slice(0, this.maxNotifications);
            const activeIds = new Set(current.map(n => n.id));
            for (const [id] of this.notificationMap) {
                if (!activeIds.has(id)) {
                    this.notificationMap.delete(id);
                }
            }
        }
        
        this.notifications.next(current);
    }

    markAsRead(id: string): void {
        const notif = this.notificationMap.get(id);
        if (notif) {
            notif.read = true;
            this.notificationMap.set(id, notif);
            
            const current = this.notifications.getValue();
            const updated = current.map(n => {
                if (n.id === id) {
                    return notif;
                }
                return n;
            });
            this.notifications.next(updated);
        }
    }

    // ✅ Marquer toutes les notifications d'un module comme lues
    markAllAsReadForModule(moduleKey: string | null): void {
        const current = this.notifications.getValue();
        let hasChanges = false;
        
        const updated = current.map(n => {
            const belongsToModule = !moduleKey || n.module === moduleKey || n.module === null;
            
            if (belongsToModule && !n.read) {
                hasChanges = true;
                const notif = this.notificationMap.get(n.id);
                if (notif) {
                    notif.read = true;
                    this.notificationMap.set(n.id, notif);
                    return notif;
                }
                return { ...n, read: true };
            }
            return n;
        });
        
        if (hasChanges) {
            this.notifications.next(updated);
        }
    }

    // ✅ Marquer TOUTES les notifications comme lues
    markAllAsRead(): void {
        const current = this.notifications.getValue();
        
        const updated = current.map(n => {
            const notif = this.notificationMap.get(n.id);
            if (notif && !notif.read) {
                notif.read = true;
                this.notificationMap.set(n.id, notif);
                return notif;
            }
            return { ...n, read: true };
        });
        
        this.notifications.next(updated);
    }

    // ✅ Supprimer toutes les notifications lues
    removeAllRead(): void {
        const current = this.notifications.getValue();
        const unreadOnly = current.filter(n => !n.read);
        
        // Mettre à jour la map
        const activeIds = new Set(unreadOnly.map(n => n.id));
        for (const [id] of this.notificationMap) {
            if (!activeIds.has(id)) {
                this.notificationMap.delete(id);
            }
        }
        
        this.notifications.next(unreadOnly);
    }

    // ✅ Supprimer toutes les notifications d'un module
    clearModule(moduleKey: string | null): void {
        const current = this.notifications.getValue();
        const filtered = current.filter(n => {
            if (!moduleKey) return true;
            return n.module !== moduleKey && n.module !== null;
        });
        
        const activeIds = new Set(filtered.map(n => n.id));
        for (const [id] of this.notificationMap) {
            if (!activeIds.has(id)) {
                this.notificationMap.delete(id);
            }
        }
        
        this.notifications.next(filtered);
    }

    cleanup(beforeDate: Date): void {
        const current = this.notifications.getValue();
        const filtered = current.filter(n => n.date >= beforeDate);
        
        if (filtered.length < current.length) {
            const activeIds = new Set(filtered.map(n => n.id));
            for (const [id] of this.notificationMap) {
                if (!activeIds.has(id)) {
                    this.notificationMap.delete(id);
                }
            }
            this.notifications.next(filtered);
        }
    }

    getGlobalNotifications(): Observable<AppNotification[]> {
        return this.notifications.asObservable();
    }

    clear(): void {
        this.notificationMap.clear();
        this.notifications.next([]);
    }
}