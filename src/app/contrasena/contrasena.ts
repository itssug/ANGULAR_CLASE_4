import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-contrasena',
  standalone: true,
  templateUrl: './contrasena.html',
  styleUrl: './contrasena.scss',
})
export class Contrasena implements AfterViewInit {

  @ViewChild('sceneContainer', { static: true }) container!: ElementRef;

  ngAfterViewInit(): void {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 0.1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.nativeElement.appendChild(renderer.domElement);

    // 🌸 Imagen 360 salón (lila aesthetic)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2000',
      (texture) => {
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
      }
    );

    // 💡 Luces suaves lilas
    const light = new THREE.PointLight(0xe6ccff, 2, 1000);
    light.position.set(0, 10, 10);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xd9b3ff, 1.5);
    scene.add(ambient);

    // 🪞 Decoración flotante (esferas lila)
    const decoGeometry = new THREE.SphereGeometry(3, 32, 32);
    const decoMaterial = new THREE.MeshStandardMaterial({
      color: 0xcc99ff,
      metalness: 0.5,
      roughness: 0.2,
    });

    const deco = new THREE.Mesh(decoGeometry, decoMaterial);
    deco.position.set(20, 0, -50);
    scene.add(deco);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      deco.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Movimiento suave con mouse
    window.addEventListener('mousemove', (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      camera.rotation.y = mouseX * 0.2;
      camera.rotation.x = mouseY * 0.2;
    });
  }
}