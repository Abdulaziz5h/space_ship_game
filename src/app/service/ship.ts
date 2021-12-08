import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import bulletLoader from './bullet-loader';
import * as THREE from 'three';
import LazerBallet from './lazer-ballet';
export let speed = 0.2;
export default class Ship {
  private typePath: string;
  public blood: number = 100;
  public model: THREE.Object3D = null;
  public bulletModel: bulletLoader = null;
  public fireMode = 0;
  public ballesList = [];
  public type = 0;
  static player: Ship = null;
  private constructor(typePath: string, type: number = 0) {
    this.typePath = typePath;
    this.type = type;
  }
  init(callback, loadCollback) {
    const component = this;
    const loaderFBXModel = new FBXLoader();
    loaderFBXModel.load(
      this.typePath,
      (model) => {
        this.model = model.children[0];
        this.model.scale.set(0.008, 0.008, 0.008);
        model.children[0].position.set(0, 0, -1);
        model.children[0].rotation.set(0, 0, 0);
        var StarSparrow_Emission = new THREE.TextureLoader().load(
          '/assets/model/star-sparrow-modular-spaceship/textures/StarSparrow_Emission.png'
        );
        var StarSparrow_Red = new THREE.TextureLoader().load(
          '/assets/model/star-sparrow-modular-spaceship/textures/StarSparrow_Red.png'
        );
        model.children[0].traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.position.set(
              child.position.x,
              child.position.y,
              child.position.z - 750
            );
            child.material.map = (component.type ? StarSparrow_Emission : StarSparrow_Red);
            child.castShadow = true;
          }
        });
        callback(model);
      },
      (xhr) => {
        loadCollback((xhr.loaded / xhr.total) * 100);
      },
      (error) => {
        console.error(error);
      }
    );
    this.bulletModel = new bulletLoader(
      '/assets/model/lazer-bullet/source/LazerBullet.fbx'
    );
    this.bulletModel.init();
  }
  static singleton = (typePath: string, type: number = 0) => {
    if(!this.player) this.player = new Ship(typePath, type)
    return this.player
  }
  moveUp() {
    this.model.position.y += 0.15;
    const Ship = this.model;
    (function rotate() {
      const x = requestAnimationFrame(rotate);
      if (Ship.rotation.x > -0.15) {
        Ship.rotation.x -= 0.01;
      } else {
        cancelAnimationFrame(x);
      }
    })();
  }
  moveDown() {
    this.model.position.y -= 0.2;
    const Ship = this.model;
    (function rotate() {
      const x = requestAnimationFrame(rotate);
      if (Ship.rotation.x < 0.2) {
        Ship.rotation.x += 0.01;
      } else {
        cancelAnimationFrame(x);
      }
    })();
  }
  moveRight() {
    this.model.position.x += 0.2;
    const Ship = this.model;
    (function rotate() {
      const x = requestAnimationFrame(rotate);
      if (Ship.rotation.y < 0.2) {
        Ship.rotation.y += 0.01;
      } else {
        cancelAnimationFrame(x);
      }
    })();
  }
  moveLeft() {
    this.model.position.x -= 0.2;
    const Ship = this.model;
    (function rotate() {
      const x = requestAnimationFrame(rotate);
      if (Ship.rotation.y > -0.2) {
        Ship.rotation.y -= 0.01;
      } else {
        cancelAnimationFrame(x);
      }
    })();
  }
  dublicateSpeed() {
    speed = 0.3;
    const Ship = this.model;
    (function rotate() {
      const x = requestAnimationFrame(rotate);
      if (Ship.rotation.x > -0.2) {
        Ship.rotation.x -= 0.01;
      } else {
        cancelAnimationFrame(x);
      }
    })();
  }
  move(direction) {
    if (direction == 'w') this.moveUp();
    if (direction == 's') this.moveDown();
    if (direction == 'd') this.moveLeft();
    if (direction == 'a') this.moveRight();
    if (direction == 'speed') this.dublicateSpeed();
  }
  resetShipRotation() {
    const model = this.model;
    (function rotate() {
      const x = requestAnimationFrame(rotate);
      if (model.rotation.y > 0) {
        model.rotation.y -= 0.01;
      } else {
        cancelAnimationFrame(x);
      }
    })();
    (function rotate() {
      const x = requestAnimationFrame(rotate);
      if (model.rotation.y < 0) {
        model.rotation.y += 0.01;
      } else {
        cancelAnimationFrame(x);
      }
    })();
    (function rotate() {
      const x = requestAnimationFrame(rotate);
      if (model.rotation.x < 0) {
        model.rotation.x += 0.01;
      } else {
        cancelAnimationFrame(x);
      }
    })();
    (function rotate() {
      const x = requestAnimationFrame(rotate);
      if (model.rotation.x > 0) {
        model.rotation.x -= 0.01;
      } else {
        cancelAnimationFrame(x);
      }
    })();
  }
  decrementBlood() {
    this.blood -= 10;
    return this.blood;
  }
  toggleFireMode() {
    this.fireMode = +!this.fireMode;
  }
  fire(callback, removeCallback) {
    if (this.ballesList.length < 20) {
      const component = this;
      if (this.fireMode == 0) {
        const ballet = new LazerBallet(
          this.bulletModel.model.geometry,
          this.bulletModel.model.material,
          this.model.position
        );
        this.ballesList.push(ballet);
        callback(ballet.model);
        const _this = this;
        (function animteBulles() {
          const x = requestAnimationFrame(animteBulles);
          if (
            ballet.alive &&
            ballet.model.position.z <= _this.model.position.z + 10
          ) {
            ballet.model.position.z += 0.5;
          } else {
            ballet.die(removeCallback);
            component.ballesList.splice(
              component.ballesList.findIndex(
                (f) => f.model.uuid == ballet.model.uuid
              ),
              1
            );
            cancelAnimationFrame(x);
          }
        })();
      } else {
        const ballet_1 = new LazerBallet(
          this.bulletModel.model.geometry,
          this.bulletModel.model.material,
          {
            x: this.model.position.x - 0.5,
            y: this.model.position.y - 0.1,
            z: this.model.position.z,
          }
        );
        const ballet_2 = new LazerBallet(
          this.bulletModel.model.geometry,
          this.bulletModel.model.material,
          {
            x: this.model.position.x + 0.5,
            y: this.model.position.y - 0.1,
            z: this.model.position.z,
          }
        );
        this.ballesList.push(ballet_1);
        this.ballesList.push(ballet_2);
        callback(ballet_1.model);
        callback(ballet_2.model);
        const _this = this;
        (function animteBulles() {
          const x = requestAnimationFrame(animteBulles);
          if (
            ballet_1.alive &&
            ballet_1.model.position.z <= _this.model.position.z + 10
          ) {
            ballet_1.model.position.z += 0.5;
            ballet_2.model.position.z += 0.5;
          } else {
            ballet_1.die(removeCallback);
            ballet_2.die(removeCallback);
            cancelAnimationFrame(x);
            component.ballesList.splice(
              component.ballesList.findIndex(
                (f) => f.model.uuid == ballet_1.model.uuid
              ),
              1
            );
            component.ballesList.splice(
              component.ballesList.findIndex(
                (f) => f.model.uuid == ballet_2.model.uuid
              ),
              1
            );
          }
        })();
      }
    }
  }
  resetSpeed() {
    speed = 0.2;
  }
  reset() {
    Ship.player = null;
    this.blood = 100;
    this.fireMode = 0;
    this.ballesList = [];
  }
}

// TODO: fix balles shadow hidden ?
