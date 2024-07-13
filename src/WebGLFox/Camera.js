import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';
import Index from './Index.js';

export default class Camera {
  constructor() {
    this.index = new Index();

    this.sizes = this.index.sizes;
    this.scene = this.index.scene;
    this.canvas = this.index.canvas;

    this.setInstance();
    this.setOrbitControls();
  }

  //======== Initiate "Camera"
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      55,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  // Camera
  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  // OrbitControls
  update() {
    this.controls.update();
  }
}

/********** Access Index to access sizes, canvas,...
 * From a global variable - it can be messy
  
    this.index = window.index;
    console.log(this.index.sizes.width);


 * From a parameter - you'll get a lot of parameters, send it, get it, especially if you have depth classes you need to pass it to all their children

    this.camera = new Camera(this); // send the index itself to the children, then in Camera we can retrieve it 

    constructor(index) {
      this.index = index;
      console.log(this.index.sizes.width);
    }


 * Through a singleton - a singleton is a class that will instantiate just like usual when you instantiate your class you'll get your instance
    - but for all following times, it'll return the first instance

    in Index.js:
    first create: let instance = null; - outside of Index

    then inside: 
    if (instance) {
      // console.log('After');
      return instance; //return already index-instance
    }
    // console.log('Start');

    instance = this;  //in first instantiate, save it in instance-variable
  */
