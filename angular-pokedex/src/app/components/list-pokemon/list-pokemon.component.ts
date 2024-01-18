import { Component, OnInit, Type } from '@angular/core';
import { PokeAPIService } from '../../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TypeColors } from '../types';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Apollo, gql } from 'apollo-angular';
import { LoaderPokeballComponent } from '../../loader-pokeball/loader-pokeball.component';

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
  pokemons: any[] = []
  typeColors = TypeColors
  i = 20

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.pokemons = []

    this.loadPokemons(0, 20)
  }
  
  loadPokemons = (offSet: number, limit: number) => {
    this.apollo
      .watchQuery({
        query: gql`
        query GetPokemons ($offSet: Int, $limit: Int) {
          pokemon_v2_pokemon (offset: $offSet, limit: $limit) {
            id
            name
            pokemon_v2_pokemonsprites {
              sprites (path: "front_default")
            }
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
          }
        }
        `,
        variables: {offSet, limit}
      })
      .valueChanges.subscribe((res: any) => {       
        this.pokemons = [...this.pokemons, ...res.data.pokemon_v2_pokemon]
        this.loading = res.loading
        this.error = res.error
      })
  }

  onScroll = (): void => {
    this.loadPokemons(this.i, 20)
    this.i += 20
  }
}