import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { API_URL } from './core/constants/api.constants';
import { authInterceptor } from '@app/core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: API_URL, useValue: 'http://192.168.0.175:8080' },
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideCharts(withDefaultRegisterables()),
  ],
};
