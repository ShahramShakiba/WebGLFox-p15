import * as THREE from 'three';
import Index from '../Index.js';

export default class Environment {
  constructor() {
    this.index = new Index();
    this.scene = this.index.scene;
    this.resources = this.index.resources;
    this.debug = this.index.debug;

    //===== Tweak the Environment
    if (this.debug.active) {
      this.debugFolder = this.debug.gui.addFolder('Environment');
    }

    this.setSunLight();
    this.setEnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 2.9);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3.5, 2, -1.25);

    this.scene.add(this.sunLight);

    //========== Debug GUI
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, 'intensity', 0, 10, 0.001)
        .name('Sun Light Intensity');

      this.debugFolder
        .add(this.sunLight.position, 'x', -5, 5, 0.001)
        .name('SunLight X');

      this.debugFolder
        .add(this.sunLight.position, 'y', -5, 5, 0.001)
        .name('SunLight Y');

      this.debugFolder
        .add(this.sunLight.position, 'z', -5, 5, 0.001)
        .name('SunLight Z');
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.22;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;

    this.scene.environment = this.environmentMap.texture;

    //===== Update material in the scene
    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        // console.log(child);

        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };

    this.environmentMap.updateMaterials();

    //========== Debug GUI
    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, 'intensity', 0, 4, 0.001)
        .name('envMap Intensity')
        .onChange(this.environmentMap.updateMaterials);
    }
  }
}
