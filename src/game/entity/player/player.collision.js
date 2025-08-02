export function playerCollision(player) {
  player.game.world.contactPairsWith(player.collider, (otherCollider) => {
    if (otherCollider.userData.type === "floor") {
      player.onGround = true;
    } else {
      player.onGround = false;
    }
  });
}
