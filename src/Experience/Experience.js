import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resources from './Utils/Resources.js';
import sources from './sources.js';

let instance = null; // an instance of Experience

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    //==== Global access - like in terminal
    window.experience = this;

    //==== Options
    this.canvas = canvas; // from index.js

    //==== Setup
    this.sizes = new Sizes(); // 01
    this.time = new Time(); // 02
    this.scene = new THREE.Scene(); // 03
    this.resources = new Resources(sources); // 07
    this.camera = new Camera(); // 04
    this.renderer = new Renderer(); // 05
    this.world = new World(); // 06

    //=== Listen or register a callback for that event
    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('tick', () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }
}
