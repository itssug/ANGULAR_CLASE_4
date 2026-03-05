import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imagen360 } from './imagen-360';

describe('Imagen360', () => {
  let component: Imagen360;
  let fixture: ComponentFixture<Imagen360>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imagen360]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imagen360);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
