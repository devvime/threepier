import settings from "../game/settings";
import * as THREE from "three";
import THREEx3 from "three-x3";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function setDebug(renderer, currentScene) {
  let debug = null;
  if (settings.debug) {
    debug = new THREEx3({
      THREE,
      OrbitControls,
      camera: currentScene.mainCamera,
      renderer,
      scene: currentScene,
    });
    debug.add(currentScene.mainCamera, {
      open: false,
      label: "MainCamera",
    });
    for (const object of Object.values(currentScene.objects)) {
      if (object.mesh) {
        debug.add(object.mesh, { open: false, label: object.name });
      }
    }
  }
  return debug;
}

export function updateDebug(renderer, debug, currentScene) {
  debug.tick();
  debug.fps(() => {
    renderer.render(currentScene, currentScene.mainCamera);
  });
}
