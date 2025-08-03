import { keys } from "../../../core/keys";

export function playerAnimations(player) {
  if (!player.animator) return;
  if (!player.onGround) {
    player.animator.play("fall");
  } else {
    if (keys.w || keys.a || keys.d) {
      if (player.isRunning) {
        return player.animator.play("run");
      }
      player.animator.play("walk");
    } else {
      player.animator.play("idle");
    }
  }
}
