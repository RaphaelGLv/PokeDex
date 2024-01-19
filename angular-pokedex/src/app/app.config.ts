import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { graphqlProvider } from './graphql.provider';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { PokeAPIService } from './services/poke-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    graphqlProvider,
    PokeAPIService,
    provideRouter(routes),
    graphqlProvider,
  ]
};
