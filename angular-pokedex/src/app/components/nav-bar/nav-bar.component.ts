import { Component, OnInit } from '@angular/core';
import { ListPokemonComponent } from '../list-pokemon/list-pokemon.component';
import { FormsModule } from '@angular/forms';
import { NgFor, TitleCasePipe } from '@angular/common';
import { PokeGraphQLService } from '../../poke-graph-ql.service';
interface Pokemon {
  name: string;
  id: number
}
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    ListPokemonComponent,
    FormsModule,
    NgFor,
    TitleCasePipe,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  filteredPokemons: Pokemon[] = []

  constructor(
    private graphQL: PokeGraphQLService
  ) { }

  ngOnInit(): void {
    this.graphQL.loadAllPokemons().subscribe((res: any) => {
      this.filteredPokemons = res.data.pokemon_v2_pokemon;
    })
  }

  showDropDown(): void {
    document.getElementById('dropDown')!.style.visibility = 'visible'
  }

  hideDropDown(): void {
    document.getElementById('dropDown')!.style.visibility = 'hidden'
  }

  filterList(name: string): void {
    name = name.toLowerCase()

    this.filteredPokemons.forEach(pokemon => {
      if (!(pokemon?.name.includes(name))) {
        document.getElementById(pokemon?.name)!.style.display = 'none'
      }
      else {
        document.getElementById(pokemon?.name)!.style.display = ''
      }
    })
  }

  goToPage(id: number): void {
    window.location.href = `/details/${id}`
  }
}
