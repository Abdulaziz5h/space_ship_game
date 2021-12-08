import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
export default class {
  model = null;
  private typePath: string;
  constructor(typePath) {
    this.typePath = typePath
  }
  init() {
    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      this.typePath,
      (model) => {
        this.model = {
          //@ts-ignore
          geometry: model.children[0].geometry,
          //@ts-ignore
          material: model.children[0].material
        }
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
