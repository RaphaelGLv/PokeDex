import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class PokeGraphQLService {

  constructor(private apollo: Apollo) { }

  loadAllPokemons = () => {
    return this.apollo
      .watchQuery({
        query: gql`
        query GetAll {
          pokemon_v2_pokemon {
            name
            id
          }
        }
        `
      })
      .valueChanges
  }

  loadPokemons = (offSet: number, limit: number) => {
    return this.apollo
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
      .valueChanges
  }

  loadPokemon = (id: number) => {
    return this.apollo
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
      .valueChanges
  }

  loadButtonPokemon = (id: number) => {
    return this.apollo
      .watchQuery({
        query: gql`
        query GetButtonPokemon ($id: Int) {
          pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
          id
          name
          pokemon_v2_pokemonsprites {
            sprites(path: "other.showdown.front_default")
          }
        }
        }
        `,
        variables: { id }
      })
      .valueChanges
  }
}
