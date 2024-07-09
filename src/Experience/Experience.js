import Sizes from './Utils/Sizes';

export default class Experience {
  constructor(canvas) {
    //======= Global access - like in terminal
    window.experience = this;

    //======= Options
    this.canvas = canvas;

    //======= Setup
    this.sizes = new Sizes();

    //=== Listen or register a callback for that event
    this.sizes.on('resize', () => {
      this.resize();
    });
  }

  resize() {}
}
