import * as THREE from 'three';
import Experience from '../Experience';

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    //=== Tweak the Fox
    if (this.debug.active) {
      this.debugFolder = this.debug.gui.addFolder('Fox').close();
    }

    //=== Access Model to manipulate the scene or animation
    this.resource = this.resources.items.foxModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.03, 0.03, 0.03);

    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    this.animation.actions = {};

    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.actions.walking = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    this.animation.actions.running = this.animation.mixer.clipAction(
      this.resource.animations[2]
    );

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    //========== Create a smooth changing between animations
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
        playIdle: () => {
          this.animation.play('idle');
        },

        playWalking: () => {
          this.animation.play('walking');
        },

        playRunning: () => {
          this.animation.play('running');
        },
      };

      this.debugFolder.add(debugObject, 'playIdle');
      this.debugFolder.add(debugObject, 'playWalking');
      this.debugFolder.add(debugObject, 'playRunning');
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta / 1000); // convert to second since delta is in milliseconds but AnimationMixer in seconds
  }
}

/********** crossFadeFrom(...)
 - this method needs to be called on the incoming action, with the previous action as the first parameter and the duration of the transition(in seconds) as the second parameter
 
 - we also need to reset and play the new animation */
