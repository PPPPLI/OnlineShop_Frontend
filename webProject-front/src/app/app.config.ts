import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient,HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import TokenInterceptor from './interceptor/tokenAdd.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: 'apiUrl', useValue: 'http://localhost'},
    importProvidersFrom(HttpClientJsonpModule),
    {
        provide: IMAGE_CONFIG,
        useValue: {
          disableImageSizeWarning: true, 
          disableImageLazyLoadWarning: true
        }
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    importProvidersFrom(HttpClientModule),
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor,multi:true}
  ]
};
