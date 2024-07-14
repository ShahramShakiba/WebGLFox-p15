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

/********** toneMapping
 - Tone Mapping is like an automatic photo editor for your 3D scenes.
 
 - It takes a very bright and detailed image (high dynamic range or HDR) and adjusts it so it looks good on your screen, which can't show as many bright and dark details at the same time.

 - Simple Example
    Imagine you take a photo outside on a sunny day. Some parts are super bright (the sun) and some parts are dark (shadows). 
    Tone mapping helps adjust the photo so you can see details in both the bright and dark areas without anything being too bright or too dark.

- Why Do We Use Tone Mapping?
    Realistic Lighting: 
      When you create 3D scenes, you often use realistic lighting that can have very bright and very dark areas. Your screen can't display all those details properly without some help.

    Balanced Images: 
      Tone mapping helps balance the bright and dark areas so you can see all the details without anything being too washed out or too dark.



 ***** ReinhardToneMapping
 - The Reinhard tone mapping operator is a popular algorithm that compresses the dynamic range of an image in a way that maintains the visibility of details in both dark and bright areas.
 - it balances the bright and dark areas nicely
 */