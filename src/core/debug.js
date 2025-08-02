import settings from "../game/settings";
import * as THREE from "three";
import THREEx3 from "three-x3";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function setDebug(game) {
  let debug = null;
  if (settings.debug) {
    debug = new THREEx3({
      THREE,
      OrbitControls,
      camera: game.currentScene.mainCamera,
      renderer: game.renderer,
      scene: game.currentScene,
    });
    debug.add(game.currentScene.mainCamera, {
      open: false,
      label: "MainCamera",
    });
    for (const object of Object.values(game.currentScene.objects)) {
      if (object.mesh) {
        debug.add(object.mesh, { open: false, label: object.name });
      }
    }
  }
  return debug;
}

export function updateDebug(game) {
  game.debug.tick();
  game.debug.fps(() => {
    game.renderer.render(game.currentScene, game.currentScene.mainCamera);
  });
  updateDebugMeshes(game);
}

export function createColliderDebugMesh(collider, rapier) {
  const shape = collider.shapeType();
  let geometry;
  switch (shape) {
    case rapier.ShapeType.Cuboid: {
      const halfExtents = collider.halfExtents();
      geometry = new THREE.BoxGeometry(
        halfExtents.x * 2,
        halfExtents.y * 2,
        halfExtents.z * 2
      );
      break;
    }
    case rapier.ShapeType.Ball: {
      geometry = new THREE.SphereGeometry(collider.radius(), 16, 16);
      break;
    }
    case rapier.ShapeType.Capsule: {
      const height = collider.halfHeight() * 2;
      const radius = collider.radius();
      geometry = new THREE.CapsuleGeometry(radius, height);
      break;
    }
    default:
      console.warn("Collider shape not supported:", shape);
      return null;
  }
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
    depthTest: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = 999;
  return mesh;
}

export function updateDebugMeshes(game) {
  const colliders = game.world.colliders.map.data;
  for (let i = 0; i < colliders.length; i++) {
    const collider = colliders[i];
    const mesh = game.currentScene.debugMeshes[i];
    if (!mesh) continue;
    const pos = collider.translation();
    const rot = collider.rotation();
    mesh.position.set(pos.x, pos.y, pos.z);
    mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);
  }
}
