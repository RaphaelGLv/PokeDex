import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TypeColors } from '../constants';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoaderPokeballComponent } from '../loader-pokeball/loader-pokeball.component';
import { PokeGraphQLService } from '../../poke-graph-ql.service';

interface Pokemon {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: {
    sprites: string
  }[];
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavBarComponent,
    InfiniteScrollModule,
    LoaderPokeballComponent
  ],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.css',
})
export class ListPokemonComponent implements OnInit {
  loading: boolean = true;
  error: any;
  pokemons: Pokemon[] = []
  typeColors = TypeColors
  i = 20

  constructor(private graphQL: PokeGraphQLService) { }

  ngOnInit(): void {
    this.pokemons = []

    this.graphQL.loadPokemons(0, 20).subscribe((res: any) => {
      this.pokemons = res.data.pokemon_v2_pokemon
      this.loading = res.loading
      this.error = res.error
    })
  }

  onScroll = (): void => {
    this.graphQL.loadPokemons(this.i, 20).subscribe((res: any) => {
      this.pokemons = [...this.pokemons, ...res.data.pokemon_v2_pokemon]
    })
    this.i += 20
  }
}