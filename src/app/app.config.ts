import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './ngrx-store/counter.reducer';

export const appConfig: ApplicationConfig = {

    providers:
        [
            provideZoneChangeDetection({ eventCoalescing: true }),
            provideHttpClient(), provideRouter(routes),
            provideStore({ count: counterReducer})
        ]
}; 