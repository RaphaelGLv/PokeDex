import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../../services/poke-api.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TypeColors } from '../types';
import { LoaderPokeballComponent } from '../../loader-pokeball/loader-pokeball.component';
import { Apollo, gql } from 'apollo-angular';

interface Pokemon {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: {
    sprites: string;
  }[];
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
  pokemon_v2_pokemonstats: {
    pokemon_v2_stat: {
      name: string;
    };
    base_stat: number;
  }[];
  height: number;
  weight: number;
  pokemon_v2_pokemonabilities: {
    pokemon_v2_ability: {
      name: string;
      pokemon_v2_abilityeffecttexts: {
        short_effect: string
      }[]
    };
  }[];
}
@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    LoaderPokeballComponent
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})

export class DetailsPageComponent implements OnInit {
  pokemon!: Pokemon
  loading: boolean = true
  error: any
  typeColors = TypeColors

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.loadPokemon(id)
  }

  loadPokemon = (id: number) => {
    this.apollo
      .watchQuery({
        query: gql`
        query GetPokemon ($id: Int) {
          pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
          id
          name
          pokemon_v2_pokemonsprites {
            sprites(path: "other.showdown.front_default")
          }
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonstats {
            pokemon_v2_stat {
              name
            }
            base_stat
          }
          height
          weight
          pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
              name
              pokemon_v2_abilityeffecttexts (where: {language_id: {_eq: 9}}) {
                short_effect
              }
            }
          }
        }
      }      
      `,
        variables: { id }
      })
      .valueChanges.subscribe((res: any) => {
        this.pokemon = res.data.pokemon_v2_pokemon[0]
        this.loading = res.loading || !res.data
        this.error = res.error
      })
  }

  hideLoadingComponent = (id: string): void => {
    document!.getElementById(id)!.style.visibility = 'hidden'
  }
}
