import { keys } from "../../../core/keys";

export function playerAnimations(player) {
  if (!player.animator) return;
  if (keys.w || keys.a || keys.d) {
    player.animator.play("walk");
  } else {
    player.animator.play("idle");
  }
}
