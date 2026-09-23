import { mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
var serverConfig = {
    providers: []
};
export var config = mergeApplicationConfig(appConfig, serverConfig);
//# sourceMappingURL=app.config.server.js.map