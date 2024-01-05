import { Component, OnInit, Type } from '@angular/core';
import { PokeAPIService } from '../../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TypeColors } from '../types';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavBarComponent,
    InfiniteScrollModule
  ],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.css',
})
export class ListPokemonComponent implements OnInit {
  pokemons: any[] = []

  typeColors = TypeColors

  constructor(private pokeAPIService: PokeAPIService) { }

  ngOnInit(): void {
    this.pokeAPIService.apiListPokemonPage.subscribe(
      res => {
        this.pokemons = res.results;
        this.getPokemonDetails();
      },
      err => {
        console.log(err);
      }
    )
    
  }

  getPokemonDetails(): void {
    this.pokemons.forEach(pokemon => {
      this.pokeAPIService.getPokemon(pokemon.url).subscribe(
        res => {
          pokemon.details = res;
        },
        err => {
          console.log(err);
        }
      )
    })
  }

  onScroll(): void {
    this.pokeAPIService.apiListPokemonPage.subscribe(
      res => {
        this.pokemons = this.pokemons.concat(res.results);
        this.getPokemonDetails();
      },
      err => {
        console.log(err);
      }
    )
  }
}