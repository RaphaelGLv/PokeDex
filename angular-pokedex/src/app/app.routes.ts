import { Routes } from '@angular/router';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';

export const routes: Routes = [
  { path: '', component: ListPokemonComponent },
  { path: 'details/:id', component: DetailsPageComponent},
  { path: 'next/:id', redirectTo: 'details/:id', pathMatch: 'full'}
];
