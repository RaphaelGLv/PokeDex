import { HttpClient } from '@angular/common/http';
import { Injectable, untracked } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class PokeAPIService {

  offset = 0
  limit = 20

  private url: string = 'https://pokeapi.co/api/v2/pokemon?offset='

  constructor(
    private http: HttpClient
  ) { }
  
  get apiListPokemonPage(): Observable<any> {
    this.url = 'https://pokeapi.co/api/v2/pokemon?offset=' + this.offset.toString() + '&limit=' + this.limit.toString()
    this.offset = this.limit
    this.limit += 8
    console.log(this.url);
    
    return this.http.get<any>(this.url)
  }

  public getPokemon(pokemonURL: string): Observable<any> {
    return this.http.get<any>(pokemonURL)
  }
}
