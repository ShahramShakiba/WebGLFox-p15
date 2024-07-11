import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resources from './Utils/Resources.js';
import sources from './sources.js';
import Debug from './Utils/Debug.js';

let instance = null; // An instance of Experience

export default class Index {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    //======= Global access - like in terminal
    window.experience = this;

    //======= Canvas
    this.canvas = canvas;

    //======= Setup
    this.debug = new Debug(); // 08
    this.sizes = new Sizes(); // 01
    this.time = new Time(); // 02
    this.scene = new THREE.Scene(); // 03
    this.resources = new Resources(sources); // 07
    this.camera = new Camera(); // 04
    this.renderer = new Renderer(); // 05
    this.world = new World(); // 06

    //=== Listen/register an Event
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
    this.world.update();
    this.renderer.update();
  }

  destroy() {
    this.sizes.off('resize');
    this.time.off('tick');

    //======== Destroying all objects
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // console.log(child);

        child.geometry.dispose();

        //===== Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];
          // console.log(value);

          // if there's a value and value has a dispose function
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.gui.destroy();
    }
  }
}

/********** OOP - Object-Oriented Programming 
 - In this method, the source code of the program is written in the form of small pieces of code or "Objects". You can use any of these components multiple times throughout your program.

 - Imagine the game of building a house or Lego, where we stick small and simple pieces together to make meaningful, bigger and more interesting objects. In object-oriented programming, we are also faced with such a process, and by using objects, we can create complex and professional programs.
 */

/********** Destroying
 - at some point, you might need to destroy parts of your experience, or even the whole thing

 - it could be because the animation is done, the player moved to another level, the WebGL isn't visible anymore or maybe the fox ran away.
 
 - we could leave things as they are, but that is bad for performances.
 


 - if you are using post-processing, you'll need to dispose of the "EffectComposer", its "WebGLRenderTarget" and any "potential passes" you are using. 
 
 - if you have a more complex project with a lot to destroy, you may want to create a destroy() method for each class. */
