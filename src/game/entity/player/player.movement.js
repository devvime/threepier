import { Vector3 } from "three";
import { keys } from "../../../core/keys";
import { playerAnimations } from "./player.animator";

export function playerMovement(player, dt) {
  playerWalk(player, dt);
  playerJump(player, dt);
  playerAnimations(player);
}

function playerWalk(player, dt) {
  const direction = new Vector3(
    Math.sin(player.mesh.rotation.y),
    0,
    Math.cos(player.mesh.rotation.y)
  );
  let velocity = player.body.linearVelocity;
  velocity.x = 0;
  velocity.z = 0;

  if (keys.w || keys.a || keys.d) {
    velocity.x += direction.x * player.speed * dt;
    velocity.z += direction.z * player.speed * dt;
  }

  if (keys.s) {
    velocity.x -= direction.x * player.speed * dt;
    velocity.z -= direction.z * player.speed * dt;
  }

  player.body.linearVelocity = velocity;

  if (player.onGround) {
    if (keys.a) player.mesh.rotation.y += player.turnSpeed * dt;
    if (keys.d) player.mesh.rotation.y -= player.turnSpeed * dt;
  }
}

function playerJump(player, dt) {
  if (!player.onGround) return;
  if (keys[" "]) {
    player.body.linearVelocity.y = player.jumpForce * dt;
  }
}
