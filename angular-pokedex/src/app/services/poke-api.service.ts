import { HttpClient } from '@angular/common/http';
import { Injectable, untracked } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class PokeAPIService {

  offset = 0
  limit = 20
  filteredURL: string = ''

  private url: string = 'https://pokeapi.co/api/v2/pokemon'

  constructor(
    private http: HttpClient
  ) { }

  get apiListPokemonPage(): Observable<any> {
    this.url = 'https://pokeapi.co/api/v2/pokemon' + '?offset=' + this.offset + '&limit=' + this.limit
    this.offset += 20

    return this.http.get<any>(this.url)
  }

  get getPokemonQty(): Observable<any> {
    return this.http.get<any>(this.url)
  }

  public getAllPokemons(pokemonQty: string): Observable<any> {
    this.filteredURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=' + pokemonQty
    
    return this.http.get<any>(this.filteredURL)
  }

  public getPokemon(pokemonURL: string): Observable<any> {
    return this.http.get<any>(pokemonURL)
  }
}
