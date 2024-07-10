import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Floor {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64);
  }

  setTexture() {
    this.textures = {};

    //=== Color Texture
    this.textures.color = this.resources.items.dirtColorTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;

    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    //=== Normal Texture
    this.textures.normal = this.resources.items.dirtNormalTexture;

    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    });
  }

  setMesh() {
    this.floor = new THREE.Mesh(this.geometry, this.material);
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.receiveShadow = true;

    this.scene.add(this.floor);
  }
}
