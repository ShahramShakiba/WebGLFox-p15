import * as THREE from 'three';
import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    this.scene.add(testMesh);

    //=== Wait for resources
    this.resources.on('ready', () => {
      // console.log('resources are ready');

      //=== Setup
      this.floor = new Floor();
      this.environment = new Environment();
    });
  }
}
