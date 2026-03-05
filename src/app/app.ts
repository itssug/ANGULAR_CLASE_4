import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Imagen360Component } from './imagen-360/imagen-360';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Imagen360Component],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('clase-tres');
}
