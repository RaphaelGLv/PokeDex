import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderPokeballComponent } from './loader-pokeball.component';

describe('LoaderPokeballComponent', () => {
  let component: LoaderPokeballComponent;
  let fixture: ComponentFixture<LoaderPokeballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderPokeballComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaderPokeballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
