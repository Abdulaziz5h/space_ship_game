import * as THREE from 'three';
export default class {
  model: THREE.Mesh = null;
  type = 0;
  alive = true;
  constructor(geometry, material, position) {
    const Mesh = new THREE.Mesh(geometry, material);
    Mesh.position.set(position.x, position.y - .1, position.z + 1);
    Mesh.scale.set(0.00015, 0.00015, 0.00015);
    Mesh.rotation.y = 3.1;
    this.model = Mesh
  }
  die(callback) {
    this.alive = false;
    this.model.geometry.dispose()
    callback(this.model)
  }
}
