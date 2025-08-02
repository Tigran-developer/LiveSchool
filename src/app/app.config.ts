import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import { routes } from './app.routes';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import {providePrimeNG} from 'primeng/config';
import {apiUrlInterceptor} from '../shared/interceptors/app-url.interceptor';
import {errorInterceptor} from '../shared/interceptors/error.interceptor';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    providePrimeNG(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }).providers ?? [],
    provideHttpClient(withInterceptors([apiUrlInterceptor,errorInterceptor])),
  ]
};
