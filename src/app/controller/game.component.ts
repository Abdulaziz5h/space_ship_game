import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Ship from '../service/ship';
import ModelLoader from '../service/model-loader';
import Rock from '../service/rock';
import { distanceVector } from '../utils/index';
import { GlobalService } from 'src/app/utils/global.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game',
  templateUrl: '../views/game/game.component.html',
  styleUrls: ['../views/game/game.component.scss'],
})
export class GameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas_container')
  private canvasRef: ElementRef;
  @ViewChild('blood')
  private blood: ElementRef;
  @ViewChild('bloodProgress')
  private bloodProgress: ElementRef;
  @ViewChild('score')
  private score: ElementRef;
  isLoading = 0;

  // stage props
  @Input() public tanFOV: number = 0;
  @Input() public windowHeight: number = 0;
  @Input() public cameraZ: number = 400;
  @Input() public fieldofview: number = 75;
  @Input('nearClipping') public nearClippingPlane: number = 0.1;
  @Input('farCliping') public farClipingPlane: number = 1000;

  public rock_type_1: ModelLoader = null;
  public rock_type_2: ModelLoader = null;
  public rock_type_3: ModelLoader = null;
  public rock_type_4: ModelLoader = null;
  rocksListLeingth = 0;

  public topLight: THREE.PointLight = null;
  public bottomLight: THREE.PointLight = null;
  public backTopLight: THREE.PointLight = null;
  public backBottomLight: THREE.PointLight = null;

  public myGameArea = {};

  public loader = new THREE.TextureLoader();
  // helper properties
  private camera!: THREE.PerspectiveCamera;

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private playerShip: Ship = null;

  activePlay = true;
  x = null;
  x1 = null;
  animAnimationFream = null;
  destroyanimAnimationFream = null;
  renderAnimationFrame = null;

  constructor(private globalService: GlobalService, private router: Router) {}
  createScene() {
    // scene
    this.scene = new THREE.Scene();
    this.scene.background = this.loader.load(
      '/assets/images/space-background.jpg'
    );

    // camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldofview,
      aspectRatio,
      this.nearClippingPlane,
      this.farClipingPlane
    );

    this.camera.position.z = -3;
    this.camera.position.y = 1;

    this.initLight();
    // this.createHelpers();
  }
  getAspectRatio() {
    return innerWidth / innerHeight;
  }
  startRenderingLoop = () => {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(innerWidth, innerHeight);

    // new OrbitControls(this.camera, this.renderer.domElement);
    this.tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
    this.windowHeight = innerHeight;

    this.canvasRef.nativeElement.appendChild(this.renderer.domElement);

    const component: GameComponent = this;

    (function render() {
      component.renderAnimationFrame = requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    })();
  };
  onWindowResize = () => {
    this.camera.aspect = innerWidth / innerHeight;

    this.camera.fov =
      (360 / Math.PI) *
      Math.atan(this.tanFOV * (innerHeight / this.windowHeight));

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.render(this.scene, this.camera);
  };
  createHelpers() {
    const axesHelper = new THREE.AxesHelper(7);
    this.scene.add(axesHelper);

    const helper = new THREE.GridHelper(10);
    this.scene.add(helper);

    const topPointhelper = new THREE.PointLightHelper(this.topLight);
    this.scene.add(topPointhelper);

    const bottomPointhelper = new THREE.PointLightHelper(this.bottomLight);
    this.scene.add(bottomPointhelper);

    const backTopPointhelper = new THREE.PointLightHelper(this.backTopLight);
    this.scene.add(backTopPointhelper);

    const backBottomPointhelper = new THREE.PointLightHelper(
      this.backBottomLight
    );
    this.scene.add(backBottomPointhelper);
  }
  initLight() {
    this.topLight = new THREE.PointLight(0xffffff);
    this.topLight.position.set(0, -8, 8);
    this.scene.add(this.topLight);

    this.bottomLight = new THREE.PointLight(0xffffff);
    this.bottomLight.position.set(0, 8, 8);
    this.scene.add(this.bottomLight);

    this.backTopLight = new THREE.PointLight(0xffffff);
    this.backTopLight.position.set(0, -8, -8);
    this.scene.add(this.backTopLight);

    this.backBottomLight = new THREE.PointLight(0xffffff);
    this.backBottomLight.position.set(0, 8, -8);
    this.scene.add(this.backBottomLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);
  }
  loadPlayerShip() {
    // TODO: Singleton pattern
    this.playerShip = Ship.singleton(
      '/assets/model/star-sparrow-modular-spaceship/source/Unity.fbx',
      this.globalService.type
    );
    this.playerShip.init((model) => {
      this.scene.add(model.children[0]);
      this.camera.lookAt(this.playerShip.model.position)
    }, (persent) => {
      if(persent == 100) this.isLoading++
    });
  }
  loadRocks() {
    // TODO: builder pattern
    this.rock_type_1 = new ModelLoader('/assets/model/rock_1.glb');
    this.rock_type_1.init((persent) => {
      if (persent == 100) this.isLoading++;
    });
    this.rock_type_2 = new ModelLoader('/assets/model/rock_2.glb');
    this.rock_type_2.init((persent) => {
      if (persent == 100) this.isLoading++;
    });
    this.rock_type_3 = new ModelLoader('/assets/model/rock_3.glb');
    this.rock_type_3.init((persent) => {
      if (persent == 100) this.isLoading++;
    });
    this.rock_type_4 = new ModelLoader('/assets/model/rock_4.glb');
    this.rock_type_4.init((persent) => {
      if (persent == 100) this.isLoading++;
    });
  }
  selectAction = (move: String) => {
    this.playerShip.move(move);
    const component = this;
    const Ship = this.playerShip.model;
    // TODO: Observer pattern
    this.topLight.position.set(
      Ship.position.x,
      Ship.position.y + 8,
      Ship.position.z + 8
    );
    this.bottomLight.position.set(
      Ship.position.x,
      Ship.position.y - 8,
      Ship.position.z + 8
    );
    this.backTopLight.position.set(
      Ship.position.x,
      Ship.position.y + 8,
      Ship.position.z - 8
    );
    this.backBottomLight.position.set(
      Ship.position.x,
      Ship.position.y - 8,
      Ship.position.z - 8
    );
    this.camera.position.y = Ship.position.y + 1;
    this.camera.position.x = Ship.position.x;
    component.camera.position.z = Ship.position.z - 3;
    this.camera.lookAt(Ship.position.x, Ship.position.y, Ship.position.z + 2);
  };
  animateArmi(rock: Rock) {
    this.rocksListLeingth++;
    this.scene.add(rock.model);
    const component = this;
    const ship = component.playerShip;
    (function _animateArmi() {
      component.animAnimationFream = requestAnimationFrame(_animateArmi);
      // TODO: Observer pattern
      if (
        rock.model.position.z > ship.model.position.z - 7 &&
        component.activePlay
      ) {
        const dis = distanceVector(rock.model.position, ship.model.position);
        if (
          ((dis <= 1 || rock.NOH >= 5) && rock.alive) ||
          !component.activePlay
        ) {
          cancelAnimationFrame(component.animAnimationFream);
          component.rocksListLeingth--;
          rock.die(
            true,
            (smallRock) => {
              component.scene.add(smallRock.model);
            },
            component.rock_type_2.model,
            (smallRock) => {
              component.scene.remove(smallRock.model);
            },
            // TODO: Strategy pattern
            ship.fireMode
          );
          component.scene.remove(rock.model);
          if (dis <= 1) {
            let i = 0;
            (function render() {
              component.destroyanimAnimationFream = requestAnimationFrame(render);
              component.bloodProgress.nativeElement.style.width =
                component.bloodProgress.nativeElement.clientWidth -
                (200 * 1) / 100 +
                'px';
              if (!component.playerShip.blood) {
                component.resetPlay();
                component.router.navigate(['/end']);
              } else if (component.playerShip.blood < 40) {
                component.bloodProgress.nativeElement.style.background =
                  '#f44336';
              } else if (component.playerShip.blood < 70) {
                component.bloodProgress.nativeElement.style.background =
                  '#ffeb3b';
              }
              i++;
              if (i == 10) cancelAnimationFrame(component.destroyanimAnimationFream);
            })();
            component.blood.nativeElement.innerText =
              component.playerShip.decrementBlood();
          }
          if (rock.NOH >= 5) {
            component.globalService.score += 5 * rock.type;
            component.score.nativeElement.innerText = component.globalService.score;
          }
        }
        ship.ballesList.forEach((balle) => {
          const dis = distanceVector(rock.model.position, balle.model.position);
          if (dis <= 1 && balle.alive) {
            rock.incrementNOH();
            balle.model.position.z = ship.model.position.z + 12;
          }
        });
        rock.move();
      } else {
        rock.die();
        component.rocksListLeingth--;
        component.scene.remove(rock.model);
        cancelAnimationFrame(component.animAnimationFream);
      }
    })();
  }
  keyUpMethod = (e) => {
    this.myGameArea[e.code] = false;
    this.playerShip.resetShipRotation();
    this.playerShip.resetSpeed();
  }
  keyDownMethos = (e) => {
    this.myGameArea[e.code] = true;
    if (e.code == 'KeyR') {
      this.playerShip.toggleFireMode();
    }
  }
  initEvent() {
    addEventListener('resize', this.onWindowResize, false);
    addEventListener('keydown', this.keyDownMethos);
    addEventListener('keyup', this.keyUpMethod);
    this.x = setInterval(() => {
      if (this.myGameArea['KeyA'] || this.myGameArea['ArrowLeft']) {
        this.selectAction('a');
      }
      if (this.myGameArea['KeyD'] || this.myGameArea['ArrowRight']) {
        this.selectAction('d');
      }
      if (this.myGameArea['KeyS'] || this.myGameArea['ArrowDown']) {
        this.selectAction('s');
      }
      if (this.myGameArea['KeyW'] || this.myGameArea['ArrowUp']) {
        this.selectAction('w');
      }
      if (this.myGameArea['Space']) {
        this.selectAction('speed');
      }
      if (this.myGameArea['KeyE']) {
        this.playerShip.fire(
          (model) => {
            this.globalService.bulletFire.next(true)
            this.scene.add(model);
          },
          (model) => {
            this.scene.remove(model);
            this.globalService.bulletFire.next(false)
          }
        );
      }
    }, 20);
  }
  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
    this.loadPlayerShip();
    this.loadRocks();
    this.initEvent();
    this.x1 = setInterval(() => {
      if (this.rocksListLeingth <= 40 && this.isLoading == 5) {
        const type = Math.ceil(Math.random() * 4);
        const rockType = this['rock_type_' + type].model;
        if (rockType) {
          this.animateArmi(
            new Rock(
              rockType.geometry,
              rockType.material,
              // TODO: Observer pattern
              {
                x: this.playerShip.model.position.x - 4 + Math.random() * 14,
                y: this.playerShip.model.position.y - 4 + Math.random() * 14,
                z: this.playerShip.model.position.z + 18,
              },
              type
            )
          );
        }
      }
    }, Math.random() * 1000);
  }
  resetPlay() {
    this.isLoading = 0;
    this.activePlay = false;
    this.playerShip.reset()
    this.renderer.dispose();
    this.scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.geometry.dispose();

      if (child.material.isMaterial) {
        this.cleanMaterial(child.material);
      } else {
        for (const material of child.material) this.cleanMaterial(material);
      }
    });
    this.canvasRef.nativeElement.innerHTML = '';

    cancelAnimationFrame(this.renderAnimationFrame);
    cancelAnimationFrame(this.animAnimationFream);
    cancelAnimationFrame(this.destroyanimAnimationFream);
    removeEventListener('resize', this.onWindowResize, false);
    removeEventListener('keydown', this.keyDownMethos);
    removeEventListener('keyup', this.keyUpMethod);
    clearInterval(this.x)
    clearInterval(this.x1)
  }
  cleanMaterial = (material) => {
    material.dispose();

    // dispose textures
    for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && typeof value === 'object' && 'minFilter' in value) {
        value.dispose();
      }
    }
  }
  ngOnDestroy() {
    this.resetPlay()
  }
}
