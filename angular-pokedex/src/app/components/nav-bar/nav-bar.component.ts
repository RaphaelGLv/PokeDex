import { Component, OnInit } from '@angular/core';
import { ListPokemonComponent } from '../list-pokemon/list-pokemon.component';
import { FormsModule } from '@angular/forms';
import { PokeAPIService } from '../../services/poke-api.service';
import { NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    ListPokemonComponent,
    FormsModule,
    NgFor,
    TitleCasePipe
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  pokemonQty: string = ''
  filteredPokemons: any[] = []

  constructor(private pokeAPIService: PokeAPIService) { }

  ngOnInit(): void {
    this.pokeAPIService.getPokemonQty.subscribe(
      res => {
        this.pokemonQty = res.count
        this.fillList(this.pokemonQty)        
      },
      err => {
        console.log(err);
      }
    )
  }

  fillList(pokemonQty: string): void {
    this.pokeAPIService.getAllPokemons(pokemonQty).subscribe(
      res => {
        this.filteredPokemons = res.results
      },
      err => {
        console.log(err);
      }
    )
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
        console.log(pokemon.url)
      }
    })
  }

  getID(pokeURL: string): void {
    let id: string = ''
    
    this.pokeAPIService.getPokemon(pokeURL).subscribe(
      res => {
        id = res.id
        this.goToPage(id)
      },
      err => {
        console.log(err);
      }
    )    
  }

  goToPage(id: string): void {
    window.location.href = `/details/${id}`
  }
}
