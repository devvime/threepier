import "./oimo.js";
import * as THREE from "three";
import THREEx3 from "three-x3";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import settings from "../game/settings.js";
import { setKeys } from "./keys";
import { Clock } from "three";

export default class Game {
  currentScene = null;
  clock = new Clock();
  x3 = null;
  world = null;

  constructor() {
    this.world = new OIMO.World(settings.world);
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
      if (object.body && object.name !== "Player") {
        object.mesh.position.copy(object.body.getPosition());
        object.mesh.quaternion.copy(object.body.getQuaternion());
      }
      if (object.body && object.name === "Player") {
        object.body.quaternion.x = object.mesh.quaternion.x;
        object.body.quaternion.z = object.mesh.quaternion.z;
        object.body.quaternion.y = object.mesh.quaternion.y;

        object.mesh.position.y = object.body.getPosition().y;
        object.body.position.x = object.mesh.position.x;
        object.body.position.z = object.mesh.position.z;
      }
      this.setCollisions(object);
    }
  }

  setCollisions(object) {
    if (object.collider) {
      object.collider.setFromObject(object.mesh);
      for (const sceneObject of Object.values(this.currentScene.objects)) {
        if (!sceneObject.collider) continue;
        if (object.collider.intersectsBox(sceneObject.collider)) {
          if (object.collisions.includes(...sceneObject.properties)) return;
          object.collisions.push(...sceneObject.properties);
        } else {
          object.collisions = object.collisions.filter(
            (property) => !sceneObject.properties.includes(property)
          );
        }
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
