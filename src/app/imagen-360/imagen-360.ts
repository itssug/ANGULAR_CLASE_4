import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-imagen-360',
  standalone: true,
  templateUrl: './imagen-360.component.html',
  styleUrls: ['./imagen-360.component.css']
})
export class Imagen360Component implements AfterViewInit, OnDestroy {

  @ViewChild('rendererContainer', { static: true }) container!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private sphere!: THREE.Mesh;
  private animationId!: number;

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
  }

  private initScene(): void {

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Escena
    this.scene = new THREE.Scene();

    // Cámara
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    this.camera.position.set(0, 0, 0.1);

    // Renderizador
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    // Esfera invertida
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const texture = new THREE.TextureLoader().load('assets/360.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });

    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    window.addEventListener('resize', () => this.onResize());
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    // Rotación suave
    this.sphere.rotation.y += 0.0005;

    this.renderer.render(this.scene, this.camera);
  };

  private onResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }
}