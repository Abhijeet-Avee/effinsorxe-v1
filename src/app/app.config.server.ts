import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // provideRouter(routes),
    // // provideHttpClient(withInterceptorsFromDi())  // Register HttpClient with interceptors
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()  // ✅ Enables fetch API for HttpClient
    )
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
