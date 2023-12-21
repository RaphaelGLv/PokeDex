import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { PokeAPIService } from './app/services/poke-api.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch()), PokeAPIService, importProvidersFrom(HttpClientModule)]
}).catch((err) => console.error(err));