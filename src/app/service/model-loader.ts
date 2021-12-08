import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export default class {
  model: Object = null;
  private typePath: string;
  constructor(typePath: string) {
    this.typePath = typePath
  }
  init(callback) {
    const glbfLoader = new GLTFLoader();
    glbfLoader.load(
      this.typePath,
      (model) => {
        this.model = {
          //@ts-ignore
          geometry: model.scene.children[0].children[0].geometry,
          //@ts-ignore
          material: model.scene.children[0].children[0].material
        }
      },
      (xhr) => {
        callback((xhr.loaded / xhr.total) * 100);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
