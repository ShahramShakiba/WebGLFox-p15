import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';

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
    this.camera = new Camera(); // 04

    //=== Listen or register a callback for that event
    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('tick', () => {
      this.update();
    });
  }

  resize() {}

  update() {}
}
