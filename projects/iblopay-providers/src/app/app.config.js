import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
export var appConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations()
    ]
};
//# sourceMappingURL=app.config.js.map