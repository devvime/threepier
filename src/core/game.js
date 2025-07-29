import * as THREE from "three";
import THREEx3 from "three-x3";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import settings from "../game/settings.json";
import { setKeys } from "./keys";
import { Clock } from "three";
import * as CANNON from "cannon-es";

export default class Game {
  currentScene = null;
  clock = new Clock();
  world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
  x3 = null;

  constructor() {
    setKeys();
  }

  setScene(scene) {
    this.currentScene = scene;
    this.currentScene.create();
  }

  render() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    // debug init
    if (settings.debug) {
      this.x3 = new THREEx3({
        THREE,
        OrbitControls,
        camera: this.currentScene.mainCamera,
        renderer,
        scene: this.currentScene,
      });
      this.x3.add(this.currentScene.mainCamera, {
        open: false,
        label: "MainCamera",
      });
      for (const object of Object.values(this.currentScene.objects)) {
        this.x3.add(object.entity, { open: false, label: object.name });
      }
    }
    renderer.setAnimationLoop(() => {
      const delta = this.clock.getDelta();
      this.world.fixedStep();
      this.currentScene.update(delta);
      if (settings.debug && this.x3) {
        this.x3.tick();
        this.x3.fps(() => {
          renderer.render(this.currentScene, this.currentScene.mainCamera);
        });
      } else {
        renderer.render(this.currentScene, this.currentScene.mainCamera);
      }
    });
  }
}
