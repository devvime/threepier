export function updatePhisic(game) {
  if (game.world) game.world.step();
  for (const object of Object.values(game.currentScene.objects)) {
    if (!object.body || !object.mesh) continue;
    const pos = object.body.translation();
    const rot = object.body.rotation();
    object.mesh.position.set(pos.x, pos.y, pos.z);
    object.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);
  }
}
