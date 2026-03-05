import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-imagen-360',
  standalone: true,
  templateUrl: './imagen-360.html',
  styleUrl: './imagen-360.scss'
})
export class Imagen360 implements AfterViewInit {

  @ViewChild('viewer', { static: true }) viewerRef!: ElementRef;

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
    this.viewerRef.nativeElement.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.load(
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000',
      (texture) => {
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('mousemove', (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      camera.rotation.y = mouseX * 0.3;
      camera.rotation.x = mouseY * 0.2;
    });
  }
}