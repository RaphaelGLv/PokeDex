import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class PokeAPIService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'

  constructor(
    private http: HttpClient
  ) { }
  
  get apiListPokemonPage(): Observable<any> {
    return this.http.get<any>(this.url)
  }

  public getPokemon(pokemonURL: string): Observable<any> {
    return this.http.get<any>(pokemonURL)
  }
}
