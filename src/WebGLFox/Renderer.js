import * as THREE from 'three';
import Index from './Index.js';

export default class Renderer {
  constructor() {
    this.index = new Index();
    
    this.canvas = this.index.canvas;
    this.sizes = this.index.sizes;
    this.scene = this.index.scene;
    this.camera = this.index.camera;

    this.setInstance();
  }

  //===== Initiate actual "Renderer"
  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.instance.toneMapping = THREE.ReinhardToneMapping;
    this.instance.toneMappingExposure = 1.75;

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    
    this.instance.setClearColor('#211d20'); // black
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
