import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
bootstrapApplication(AppComponent, appConfig)
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map