import Sizes from './Utils/Sizes';
import Time from './Utils/Time';

export default class Experience {
  constructor(canvas) {
    //======= Global access - like in terminal
    window.experience = this;

    //======= Options
    this.canvas = canvas; // from index.js

    //======= Setup
    this.sizes = new Sizes(); // 01
    this.time = new Time(); // 02

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
