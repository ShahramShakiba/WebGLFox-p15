import EventEmitter from './EventEmitter.js';

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.start = performance.now();
    this.current = this.start;
    this.elapsedTime = 0;
    this.delta = 16;

    //===== Wait 1 frame then call tick fn
    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    const currentTime = performance.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsedTime = this.current - this.start;

    this.trigger('time');

    window.requestAnimationFrame(() => this.tick());
  }
}

/*********
- start: stay the same - when the "Index" starts 
- current: will change on each frame
- elapsedTime: how much time was spent since the start 
- delta: how much time was spent since the previous frame

- performance.now(): The performance API provides high-resolution timestamps, which can be more precise than Date */

/********* this.delta = 16;
- how much time was spent since the previous frame - 16 is close to how many milliseconds there is between two frames at 60fps

- if we set 0 you may encounter some bugs, on the first frame it might something goes wrong and messing with the reset */

/********* window.requestAnimationFrame(this.tick()) 
- we can not call tick like this because it will lost on the next frame 

- therefore we need to call it in a callback function, like this:
    window.requestAnimationFrame(() => {
      this.tick();
    });


* in Constructor :
- if you call this.tick() instead, your "delta" will be 0 for one frame, the first frame, which is usually harmless but in some project you may encounter weird bugs sometimes and it's hard to find the bug, that's why it's better to wait one tick before doing that */
