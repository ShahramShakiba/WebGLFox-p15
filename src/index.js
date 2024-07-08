//===================================================
/* "It is not an actual project; therefore, 
I rely on comments to assess the code." */
//===================================================
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
const gui = new GUI();
const debugObject = {};
let foxMixer = null;

let width = window.innerWidth;
let height = window.innerHeight;

//==================== Loaders =========================
const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

//============= Update all materials ==================
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      // child.material.envMap = environmentMap
      child.material.envMapIntensity = debugObject.envMapIntensity;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

//================ Environment Map =====================
const environmentMap = cubeTextureLoader.load([
  '/textures/environmentMap/px.jpg',
  '/textures/environmentMap/nx.jpg',
  '/textures/environmentMap/py.jpg',
  '/textures/environmentMap/ny.jpg',
  '/textures/environmentMap/pz.jpg',
  '/textures/environmentMap/nz.jpg',
]);

environmentMap.colorSpace = THREE.SRGBColorSpace;

// scene.background = environmentMap
scene.environment = environmentMap;

debugObject.envMapIntensity = 0.4;
gui
  .add(debugObject, 'envMapIntensity')
  .min(0)
  .max(4)
  .step(0.001)
  .onChange(updateAllMaterials);

//==================== Models =========================
gltfLoader.load('/models/Fox/glTF/Fox.gltf', (gltf) => {
  //======== Model
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  scene.add(gltf.scene);

  //======== Animation
  foxMixer = new THREE.AnimationMixer(gltf.scene);
  const foxAction = foxMixer.clipAction(gltf.animations[0]);
  foxAction.play();

  //======== Update materials
  updateAllMaterials();
});

//==================== Floor =========================
const floorColorTexture = textureLoader.load('textures/dirt/color.jpg');
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorColorTexture.repeat.set(1.5, 1.5);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

const floorNormalTexture = textureLoader.load('textures/dirt/normal.jpg');
floorNormalTexture.repeat.set(1.5, 1.5);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

const floorGeometry = new THREE.CircleGeometry(5, 64);
const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorColorTexture,
  normalMap: floorNormalTexture,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

//===================== Lights =========================
const directionalLight = new THREE.DirectionalLight('#ffffff', 4);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(3.5, 2, -1.25);
scene.add(directionalLight);

gui
  .add(directionalLight, 'intensity')
  .min(0)
  .max(10)
  .step(0.001)
  .name('lightIntensity');
gui
  .add(directionalLight.position, 'x')
  .min(-5)
  .max(5)
  .step(0.001)
  .name('lightX');
gui
  .add(directionalLight.position, 'y')
  .min(-5)
  .max(5)
  .step(0.001)
  .name('lightY');
gui
  .add(directionalLight.position, 'z')
  .min(-5)
  .max(5)
  .step(0.001)
  .name('lightZ');

//===================== Camera =========================
const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
camera.position.set(6, 4, 8);
scene.add(camera);

//================ Orbit Controls ======================
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//==================== Renderer ========================
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 1.75;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor('#211d20');
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//================ Resize Listener ====================
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//=================== Animate =======================
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  //========== Fox animation
  if (foxMixer) {
    foxMixer.update(deltaTime);
  }

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
