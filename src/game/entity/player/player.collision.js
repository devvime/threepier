export function playerCollision(player) {
  if (player.collisions.includes("floor")) {
    player.onGround = true;
  } else {
    player.onGround = false;
  }
}
