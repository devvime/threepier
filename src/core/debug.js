import settings from "../game/settings";
import * as THREE from "three";
import THREEx3 from "three-x3";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function setDebug(renderer, x3, currentScene) {
  if (settings.debug) {
    x3 = new THREEx3({
      THREE,
      OrbitControls,
      camera: currentScene.mainCamera,
      renderer,
      scene: currentScene,
    });
    x3.add(currentScene.mainCamera, {
      open: false,
      label: "MainCamera",
    });
    for (const object of Object.values(currentScene.objects)) {
      if (object.mesh) {
        x3.add(object.mesh, { open: false, label: object.name });
      }
    }
  }
}

export function updateDebug(renderer, x3, currentScene) {
  x3.tick();
  x3.fps(() => {
    renderer.render(currentScene, currentScene.mainCamera);
  });
}
