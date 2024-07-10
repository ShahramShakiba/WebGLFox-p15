import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience();

    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    console.log(this);
  }
}

/********** Access Experience to access sizes, canvas,...
 * From a global variable - it can be messy
  
    this.experience = window.experience;
    console.log(this.experience.sizes.width);


 * From a parameter - you'll get a lot of parameters, send it, get it, especially if you have depth classes you need to pass it to all their children

    this.camera = new Camera(this); // send the experience itself to the children, then in Camera we can retrieve it 

    constructor(experience) {
      this.experience = experience;
      console.log(this.experience.sizes.width);
    }


 * Through a singleton - a singleton is a class that will instantiate just like usual when you instantiate your class you'll get your instance
    - but for all following times, it'll return the first instance

    in Experience.js:
    first create: let instance = null; - outside of Experience

    then inside: 
    if (instance) {
      // console.log('After');
      return instance; //return already experience-instance
    }
    // console.log('Start');

    instance = this;  //in first instantiate, save it in instance-variable
  */
