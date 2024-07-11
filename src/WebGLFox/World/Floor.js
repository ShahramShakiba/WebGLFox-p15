import * as THREE from 'three';
import Index from '../Index.js';

export default class Floor {
  constructor() {
    this.index = new Index();

    this.scene = this.index.scene;
    this.resources = this.index.resources;

    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(28, 64);
  }

  setTexture() {
    this.textures = {};

    //===== Color Texture
    this.textures.color = this.resources.items.dirtColorTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;

    this.textures.color.repeat.set(4, 4);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    //===== Normal Texture
    this.textures.normal = this.resources.items.dirtNormalTexture;

    this.textures.normal.repeat.set(4, 4);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      roughness: 0.9,
      metalness: 0.2,
    });

    this.textures.color.anisotropy = 16;
    this.textures.normal.anisotropy = 16;
  }

  setMesh() {
    this.floor = new THREE.Mesh(this.geometry, this.material);
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.receiveShadow = true;

    this.scene.add(this.floor);
  }
}

/********** anisotropy
 * Without anisotropic filtering, a texture might look blurry or distorted when viewed at a sharp angle. 

 - When you set the anisotropy level for a texture, you are specifying how much the graphics engine should prioritize the quality of textures viewed at these steep angles. Higher values provide better quality at the cost of some performance. 

 - anisotropy improves the visual quality of textures viewed at angles, and setting it to 16 in your code ensures that the textures on your floor will look as detailed and clear as possible when viewed from various perspectives. */
