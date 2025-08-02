import { keys } from "../../../core/keys";
import { playerAnimations } from "./player.animator";

export function playerMovement(player, dt) {
  playerWalk(player, dt);
  playerJump(player, dt);
  playerAnimations(player);
}

function playerWalk(player, dt) {}

function playerJump(player, dt) {
  if (!player.onGround) return;
  if (keys[" "]) {
    // player.body.linearVelocity.y = player.jumpForce * dt;
  }
}
