import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPokemonComponent } from './list-pokemon.component';

describe('ListPokemonComponent', () => {
  let component: ListPokemonComponent;
  let fixture: ComponentFixture<ListPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
