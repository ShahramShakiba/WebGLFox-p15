import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';
import EventEmitter from './EventEmitter.js';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};

    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    for (const source of this.sources) {
      switch (source.type) {
        //======= Fox Model
        case 'gltfModel':
          this.loaders.gltfLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;

        //======= Dirt Texture
        case 'texture':
          this.loaders.textureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;

        //======= EnvironmentMap
        case 'cubeTexture':
          this.loaders.cubeTextureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;

        default:
          console.error('Unknown source type:', source.type);
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file; // save loaded file

    this.loaded++; // update loaded value

    //==trigger items-ready when loading assets finished
    if (this.loaded === this.toLoad) {
      this.trigger('ready');

      // console.log('All assets loaded!', this.loaded);
    }
  }
}
