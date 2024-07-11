import Index from '../Index.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Fox from './Fox.js';

export default class World {
  constructor() {
    this.index = new Index();
    this.scene = this.index.scene;
    this.resources = this.index.resources;

    //=== Wait for resources
    this.resources.on('ready', () => {
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
