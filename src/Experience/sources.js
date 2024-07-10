export default [
  //======= Environment Map
  {
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path: [
      'textures/environmentMap/px.jpg',
      'textures/environmentMap/nx.jpg',
      'textures/environmentMap/py.jpg',
      'textures/environmentMap/ny.jpg',
      'textures/environmentMap/pz.jpg',
      'textures/environmentMap/nz.jpg',
    ],
  },

  //======= Texture
  {
    name: 'dirtColorTexture',
    type: 'texture',
    path: 'textures/dirt/color.jpg',
  },
  {
    name: 'dirtNormalTexture',
    type: 'texture',
    path: 'textures/dirt/normal.jpg',
  },

  //======= Model
  {
    name: 'foxModel',
    type: 'gltfModel',
    path: 'models/Fox/glTF/Fox.gltf',
  },
];
