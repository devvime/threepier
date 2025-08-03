export function playerCollision(player) {
  let isOnFloor = false;

  player.game.world.contactPairsWith(player.collider, (otherCollider) => {
    if (otherCollider.userData?.props.includes("ground")) {
      isOnFloor = true;
    }
  });

  player.onGround = isOnFloor;
}
