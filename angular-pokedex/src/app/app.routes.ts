import { Routes } from '@angular/router';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';

export const routes: Routes = [
  { path: 'details/:id', component: DetailsPageComponent},
  { path: '', component: ListPokemonComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'},
];
