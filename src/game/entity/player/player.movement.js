import { Vector3 } from "three";
import { keys } from "../../../core/keys";

export function playerMovement(player, dt) {
  const direction = new Vector3(
    Math.sin(player.mesh.rotation.y),
    0,
    Math.cos(player.mesh.rotation.y)
  );

  let velocity = player.body.linearVelocity;

  velocity.x = 0;
  velocity.z = 0;

  if (keys.w) {
    velocity.x += direction.x * player.speed;
    velocity.z += direction.z * player.speed;
  }

  if (keys.s) {
    velocity.x -= direction.x * player.speed;
    velocity.z -= direction.z * player.speed;
  }

  player.body.linearVelocity = velocity;

  if (player.onGround) {
    if (keys.a) player.mesh.rotation.y += player.turnSpeed * dt;
    if (keys.d) player.mesh.rotation.y -= player.turnSpeed * dt;
  }

  playerJump(player);
}

function playerJump(player) {
  if (!player.onGround) return;
  if (keys[" "]) {
    player.body.linearVelocity.y = player.jumpForce;
  }
}
