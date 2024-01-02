import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavBarComponent
  ],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.css',
})
export class ListPokemonComponent implements OnInit {

  pokemons: any[] = []

  constructor(private pokeAPIService: PokeAPIService) { }

  ngOnInit(): void {
    this.pokeAPIService.apiListPokemonPage.subscribe(
      res => {
        this.pokemons = res.results;
        this.getPokemonDetails();
      }
    ) 
  }

  getPokemonDetails(): void {
    this.pokemons.forEach(pokemon => {
      this.pokeAPIService.getPokemon(pokemon.url).subscribe(
        res => {
          pokemon.details = res;
        }
      )
    })
  }
}