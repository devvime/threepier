import * as THREE from "three";
import { MainCamera } from "./camera";
import DefaultSky from "./sky";

export class Scene extends THREE.Scene {
  game = null;
  mainCamera = null;
  objects = {};
  sky = null;

  constructor(game) {
    super();
    this.game = game;
    this.mainCamera = new MainCamera();
    this.sky = new DefaultSky();
  }

  async create() {}

  update(deltaTime) {}
}

export function addSceneObjects(currentScene) {
  currentScene.add(currentScene.sky);
  for (const object of Object.values(currentScene.objects)) {
    if (object.mesh) currentScene.add(object.mesh);
  }
}

export function updateSceneObjects(currentScene, deltaTime) {
  for (const object of Object.values(currentScene.objects)) {
    if (object.update) {
      object.update(deltaTime);
      if (object.animator) object.animator.update(deltaTime);
    }
  }
}
