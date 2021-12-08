import * as THREE from 'three';
import { speed } from './ship';
import { setMeshTransform } from './../utils/index';
export default class Rock {
  model: THREE.Mesh = null;
  alive = true;
  NOH = 0;
  type: number = 0
  constructor(geometry, material, position, type) {
    this.type = type;
    const Mesh = new THREE.Mesh(geometry, material);
    Mesh.scale.set(0.4, 0.4, 0.4);

    Mesh.position.x = position.x;
    Mesh.position.y = position.y;
    Mesh.position.z = position.z;
    this.model = Mesh;
  }
  // TODO: Strategy pattern
  die(animate?, callback?, rock_type?, animationDieCallback?, type = 0) {
    this.alive = false;
    this.model.geometry.dispose()
    if (animate) {
      const position = {
        x: this.model.position.x,
        y: this.model.position.y,
        z: this.model.position.z,
      };
      for (let i = 0; i < (!type ? 4 : 8); i++) {
        const smallRock = new Rock(
          rock_type.geometry,
          rock_type.material,
          position, 0
        );
        const teta = Math.random() * 360;
        // TODO: Strategy pattern
        if(!type)
          smallRock.model.scale.set(0.2, 0.2, 0.2);
        else
          smallRock.model.scale.set(0.1, 0.1, 0.1);
        callback(smallRock);
        let radius = 0;
        (function animateBombRock() {
          const x = requestAnimationFrame(animateBombRock);
          if (radius < 0.5) {
            radius += 0.01;
            setMeshTransform(smallRock.model, teta, radius);
            smallRock.move();
            smallRock.model.position.z = position.z;
          } else {
            smallRock.die();
            animationDieCallback(smallRock);
            cancelAnimationFrame(x)
          }
        })();
      }
    }
  }
  incrementNOH() {
    this.NOH++;
  }
  move() {
    this.model.position.z -= speed;
    this.model.rotation.x += 0.01;
    this.model.rotation.y += 0.01;
    this.model.rotation.z += 0.01;
  }
}
