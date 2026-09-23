import { Router } from '@angular/router';
import { SettingsCategory } from '../../models/settings.model';
export declare class SettingsListComponent {
    private router;
    searchTerm: string;
    categories: SettingsCategory[];
    constructor(router: Router);
    get filteredCategories(): SettingsCategory[];
    goTo(category: SettingsCategory): void;
}
//# sourceMappingURL=settings-list.component.d.ts.map