import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TypeColors } from '../constants';
import { LoaderPokeballComponent } from '../loader-pokeball/loader-pokeball.component';
import { PokeGraphQLService } from '../../poke-graph-ql.service';
interface Pokemon {
  name: string;
  id: number
}
interface DetailedPokemon {
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

interface ButtonPokemon {
  id: number
  name: string;
  pokemon_v2_pokemonsprites: {
    sprites: string;
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
  allPokemons: Pokemon[] = []
  curPokemon: DetailedPokemon = {
    id: 0,
    name: '',
    pokemon_v2_pokemonsprites: [{ sprites: '' }],
    pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: '' } }],
    pokemon_v2_pokemonstats: [{ pokemon_v2_stat: { name: '' }, base_stat: 0 }, { pokemon_v2_stat: { name: '' }, base_stat: 0 }, { pokemon_v2_stat: { name: '' }, base_stat: 0 }, { pokemon_v2_stat: { name: '' }, base_stat: 0 }, { pokemon_v2_stat: { name: '' }, base_stat: 0 }, { pokemon_v2_stat: { name: '' }, base_stat: 0 }],
    height: 0,
    weight: 0,
    pokemon_v2_pokemonabilities: [{ pokemon_v2_ability: { name: '', pokemon_v2_abilityeffecttexts: [{ short_effect: '' }] } }]
  };
  prevPokemon: ButtonPokemon = { id: 0, name: '', pokemon_v2_pokemonsprites: [{ sprites: '' }] };
  nextPokemon: ButtonPokemon = { id: 0, name: '', pokemon_v2_pokemonsprites: [{ sprites: '' }] };
  loading: boolean = true
  buttonLoading: boolean = true
  error: any
  buttonError: any
  typeColors = TypeColors

  constructor(
    public route: ActivatedRoute,
    private graphQL: PokeGraphQLService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.getAll()
      .then((result: any) => {
        this.allPokemons = result
        this.loadButtonsInfo(id)
      })
      .catch((error) => {
        console.error(error)
      })

    this.graphQL.loadPokemon(id).subscribe((res: any) => {
      this.curPokemon = res.data.pokemon_v2_pokemon[0]
      this.loading = res.loading || !res.data
      this.error = res.error
    })

  }

  getAll = () => {
    return new Promise((resolve, reject) => {
      this.graphQL.loadAllPokemons().subscribe(
        (res: any) => {
          res.data.pokemon_v2_pokemon

          resolve(res.data.pokemon_v2_pokemon)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  loadButtonsInfo = (id: number) => {
    const currentPokemon = this.allPokemons.filter(pokemon => pokemon.id === id)
    const index = this.allPokemons.indexOf(currentPokemon[0], 0)

    if (index != 0) {
      this.graphQL.loadButtonPokemon(this.allPokemons[index - 1].id).subscribe((res: any) => {
        this.prevPokemon = res.data.pokemon_v2_pokemon[0]
        this.buttonLoading = res.loading || !res.data
        this.buttonError = res.error
      })
    }
    else {
      document!.getElementById('prev-button')!.style.display = 'none';
    }

    if (index != this.allPokemons.length - 1) {
      this.graphQL.loadButtonPokemon(this.allPokemons[index + 1].id).subscribe((res: any) => {
        this.nextPokemon = res.data.pokemon_v2_pokemon[0]
        this.buttonLoading = res.loading || !res.data
        this.buttonError = res.error
      })
    }
    else {
      document!.getElementById('next-button')!.style.display = "none"
    }
  }

  doNothing = () => {
    return
  }

  goToPage = (id: number) => {
    window.location.href = `/details/${id}`;
  }
}
