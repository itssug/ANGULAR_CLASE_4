import { Component, signal } from '@angular/core';
import { Imagen360 } from './imagen-360/imagen-360';
import { Contrasena } from './contrasena/contrasena';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Contrasena, Imagen360],
  template: `<app-contrasena></app-contrasena><app-imagen-360></app-imagen-360>`,
})
export class App {
  protected readonly title = signal('clase-tres');
}