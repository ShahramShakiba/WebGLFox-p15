import * as THREE from 'three';
import Index from '../Index';

export default class Fox {
  constructor() {
    this.index = new Index();

    this.scene = this.index.scene;
    this.resources = this.index.resources;
    this.time = this.index.time;
    this.debug = this.index.debug;

    //====== Tweak the Fox
    if (this.debug.active) {
      this.debugFolder = this.debug.gui.addFolder('Fox');
    }

    //====== Get Model to manipulate the scene/animation
    this.foxSource = this.resources.items.foxModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.foxModel = this.foxSource.scene;
    this.foxModel.scale.set(0.03, 0.03, 0.03);

    this.scene.add(this.foxModel);

    this.foxModel.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.foxModel);

    this.animation.actions = {};

    //===== Standing - idle
    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.foxSource.animations[0]
    );
    //===== Walking
    this.animation.actions.walking = this.animation.mixer.clipAction(
      this.foxSource.animations[1]
    );
    //===== Running
    this.animation.actions.running = this.animation.mixer.clipAction(
      this.foxSource.animations[2]
    );

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    //========== Smooth changing between animations
    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const prevAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(prevAction, 1);

      this.animation.actions.current = newAction;
    };

    //========== Debug GUI
    if (this.debug.active) {
      const debugObject = {
        playIdle: () => this.animation.play('idle'),
        playWalking: () => this.animation.play('walking'),
        playRunning: () => this.animation.play('running'),
      };

      this.debugFolder.add(debugObject, 'playIdle');
      this.debugFolder.add(debugObject, 'playWalking');
      this.debugFolder.add(debugObject, 'playRunning');
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta / 1000);
    // convert to second since delta is in milliseconds but AnimationMixer in seconds
  }
}

/********** crossFadeFrom(...)
 - this method needs to be called on the incoming action, with the previous action as the first parameter and the duration of the transition(in seconds) as the second parameter
 
 - we also need to reset and play the new animation */
