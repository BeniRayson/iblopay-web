// src/app/modules/dashboard/widgets/activity-feed/activity-feed.component.ts
import { Component, Input } from '@angular/core';
import { Activity } from '../../models/dashboard.model';

@Component({
    selector: 'app-activity-feed',
    templateUrl: './activity-feed.component.html',
    styleUrls: ['./activity-feed.component.scss']
})
export class ActivityFeedComponent {
    @Input() activities: Activity[] = [];

    getActivityIcon(type: string): string {
        const icons: { [key: string]: string } = {
            'person_add': '👤',
            'payment': '💳',
            'credit_card': '💳',
            'warning': '⚠️',
            'agent': '👤',
            'transaction': '💰',
            'card': '💳',
            'system': '🖥️'
        };
        return icons[type] || '📌';
    }

    getActivityTypeClass(type: string): string {
        const classes: { [key: string]: string } = {
            'success': 'success',
            'info': 'info',
            'warning': 'warning',
            'danger': 'danger'
        };
        return classes[type] || 'info';
    }

    getTimeAgo(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 1) return 'à l\'instant';
        if (minutes < 60) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
        if (hours < 24) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
        if (days < 7) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
        return date.toLocaleDateString('fr-FR');
    }
}