import * as THREE from "three";
import settings from "../game/settings.js";
import { setKeys } from "./keys";
import { Clock } from "three";
import { setDebug, updateDebug } from "./debug.js";
import { updatePhisic } from "./phisic.js";
import {
  addSceneDebugMeshes,
  addSceneObjects,
  updateSceneObjects,
} from "./scene.js";

import RAPIER from "@dimforge/rapier3d";

export default class Game {
  currentScene = null;
  world = null;
  renderer = null;
  debug = null;
  clock = new Clock();

  constructor() {
    this.world = new RAPIER.World(settings.gravity);
    setKeys();
  }

  async setScene(scene) {
    this.currentScene = scene;
    await this.currentScene.create();
    addSceneObjects(this.currentScene);
    if (settings.debug) addSceneDebugMeshes(this);
  }

  render() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);
    this.debug = setDebug(this);
    this.loop();
  }

  loop() {
    this.renderer.setAnimationLoop(() => {
      const deltaTime = this.clock.getDelta();
      this.currentScene.update(deltaTime);
      updateSceneObjects(this.currentScene, deltaTime);
      if (this.world) updatePhisic(this);
      if (this.debug) return updateDebug(this);
      this.renderer.render(this.currentScene, this.currentScene.mainCamera);
    });
  }
}
