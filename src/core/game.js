import "./oimo.js";
import * as THREE from "three";
import settings from "../game/settings.js";
import { setKeys } from "./keys";
import { Clock } from "three";
import { setDebug, updateDebug } from "./debug.js";
import { updatePhisic } from "./phisic.js";
import { addSceneObjects, updateSceneObjects } from "./scene.js";

export default class Game {
  currentScene = null;
  world = null;
  renderer = null;
  debug = null;
  clock = new Clock();

  constructor() {
    this.world = new OIMO.World(settings.world);
    setKeys();
  }

  setScene(scene) {
    this.currentScene = scene;
    this.currentScene.create();
    addSceneObjects(this.currentScene);
  }

  render() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);
    this.debug = setDebug(this.renderer, this.currentScene);
    this.loop();
  }

  loop() {
    this.renderer.setAnimationLoop(() => {
      const deltaTime = this.clock.getDelta();
      this.currentScene.update(deltaTime);
      updateSceneObjects(this.currentScene, deltaTime);
      updatePhisic(this.world, this.currentScene);
      if (this.debug)
        return updateDebug(this.renderer, this.debug, this.currentScene);
      this.renderer.render(this.currentScene, this.currentScene.mainCamera);
    });
  }
}
