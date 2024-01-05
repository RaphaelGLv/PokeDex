import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../../services/poke-api.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TypeColors } from '../types';
import { error } from 'node:console';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {
  pokemon: any

  nextPokemon = {
    name: '',
    id: '',
    img: ''
  }

  prevPokemon = {
    name: '',
    id: '',
    img: ''
  }

  typeColors = TypeColors

  constructor(
    private route: ActivatedRoute,
    private pokeAPIService: PokeAPIService
  ) { }
  
  ngOnInit(): void {
    const pokeURL = 'https://pokeapi.co/api/v2/pokemon/'
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.pokeAPIService.getPokemon(pokeURL + id).subscribe(
      res => {
        this.pokemon = res
        this.getNext(pokeURL, id)
        this.getPrev(pokeURL, id)
        this.getAbilityDetail()
      },
      err => {
        console.log(err);
      }
    )
  }

  getNext(pokeURL: string, id: number): void {
    this.pokeAPIService.getPokemon(pokeURL + (id + 1)).subscribe(
      res => {
        this.nextPokemon.name = res.name
        this.nextPokemon.id = res.id
        this.nextPokemon.img = res.sprites?.other?.showdown?.front_default
      },
      err => {
        console.error(err)
      }
    )
  }

  getPrev(pokeURL: string, id: number): void {
    this.pokeAPIService.getPokemon(pokeURL + (id - 1)).subscribe(
      res => {
        this.prevPokemon.name = res.name
        this.prevPokemon.id = res.id
        this.prevPokemon.img = res.sprites?.other?.showdown?.front_default
      },
      err => {
        console.error(err)
      }
    )
  }

  getAbilityDetail(): void {
    this.pokemon.abilities.forEach((item: {ability: {url: string; details: string}}) => {
      this.pokeAPIService.getPokemon(item.ability.url).subscribe(
        res => {
          let i = 0
          while (res.effect_entries[i].language.name != 'en') {
            i++
          }
          item.ability.details = res.effect_entries[i].short_effect
        },
        err => {
          console.error(err)
        }
      )
    })
  }

  showAbilityEffect(text: string, event: MouseEvent): void {
    const popUp = document.getElementById("popUp")!

    popUp.style.bottom = '-1.2vmax' // Resetar a posição a cada click e tirar o popup de cima do texto

    popUp.innerHTML = text

    const posY = popUp.getBoundingClientRect().bottom

    popUp.style.bottom = (posY - event.pageY).toString() + 'px'


    if (popUp.style.visibility == "hidden") {
      popUp.style.visibility = "visible";
    }
    else {
      popUp.style.visibility = "hidden";
    }
  }
  
}
