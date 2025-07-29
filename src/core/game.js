import * as THREE from "three";
import THREEx3 from "three-x3";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import settings from "../game/settings.json";
import { setKeys } from "./keys";
import { Clock } from "three";
import RAPIER from "@dimforge/rapier3d";

export default class Game {
  currentScene = null;
  clock = new Clock();
  x3 = null;
  world = null;

  constructor() {
    this.world = new RAPIER.World(settings.gravity);
    setKeys();
  }

  setScene(scene) {
    this.currentScene = scene;
    this.currentScene.create();
    for (const object of Object.values(this.currentScene.objects)) {
      if (object.mesh) {
        this.currentScene.add(object.mesh);
      }
    }
  }

  render() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    this.setDebug(renderer);

    renderer.setAnimationLoop(() => {
      const delta = this.clock.getDelta();
      this.currentScene.update(delta);
      this.updatePhisic();

      if (settings.debug && this.x3) {
        this.updateDebug(renderer);
        return;
      }

      renderer.render(this.currentScene, this.currentScene.mainCamera);
    });
  }

  updatePhisic() {
    this.world.step();
    for (const object of Object.values(this.currentScene.objects)) {
      if (object.body) {
        const pos = object.body.translation();
        const rot = object.body.rotation();
        object.mesh.position.set(pos.x, pos.y, pos.z);
        object.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);
      }
    }
  }

  setDebug(renderer) {
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
        if (object.mesh) {
          this.x3.add(object.mesh, { open: false, label: object.name });
        }
      }
    }
  }

  updateDebug(renderer) {
    this.x3.tick();
    this.x3.fps(() => {
      renderer.render(this.currentScene, this.currentScene.mainCamera);
    });
  }
}
