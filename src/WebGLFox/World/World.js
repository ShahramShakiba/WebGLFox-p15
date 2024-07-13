import Index from '../Index.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Fox from './Fox.js';

export default class World {
  constructor() {
    this.index = new Index();
    this.scene = this.index.scene;
    this.resources = this.index.resources; // W-01.2

    //=== Wait for resources - W-01.3
    this.resources.on('ready', () => {
      this.floor = new Floor(); // W-01.6
      this.fox = new Fox(); // W-01.7
      this.environment = new Environment(); // W-01.0 - Light & envMap Texture
    });
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
