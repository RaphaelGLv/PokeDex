import { Component } from '@angular/core';
import { ListPokemonComponent } from '../list-pokemon/list-pokemon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    ListPokemonComponent,
    FormsModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
