import * as THREE from 'three';
import Experience from '../Experience';

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

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
    this.animation.action = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.action.play();
  }

  update() {
    this.animation.mixer.update(this.time.delta / 1000); // convert to second since delta is in milliseconds but AnimationMixer in seconds
  }
}
