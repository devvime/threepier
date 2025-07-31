export function updatePhisic(world, currentScene) {
  world.step();
  for (const object of Object.values(currentScene.objects)) {
    if (!object.body || !object.mesh) continue;
    if (object.name === "Player") {
      object.body.quaternion.copy(object.mesh.quaternion);
      object.mesh.position.y = object.body.position.y;
      object.mesh.position.x = object.body.position.x;
      object.mesh.position.z = object.body.position.z;
    } else {
      object.mesh.position.copy(object.body.getPosition());
      object.mesh.quaternion.copy(object.body.getQuaternion());
    }
    setCollisions(object, currentScene);
  }
}

export function setCollisions(object, currentScene) {
  if (!object.collider) return;
  object.collider.setFromObject(object.mesh);
  const newCollisions = new Set();
  for (const sceneObject of Object.values(currentScene.objects)) {
    if (!sceneObject.collider || object === sceneObject) continue;
    if (object.collider.intersectsBox(sceneObject.collider)) {
      for (const prop of sceneObject.properties) {
        newCollisions.add(prop);
      }
    }
  }
  object.collisions = Array.from(newCollisions);
}
