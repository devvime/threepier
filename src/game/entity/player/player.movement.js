import { Quaternion, Vector3 } from "three";
import { keys } from "../../../core/keys";
import { playerAnimations } from "./player.animator";

export function playerMovement(player, dt) {
  playerJump(player, dt);
  playerWalk(player, dt);
  playerAnimations(player);
  playerRun(player);
}

function playerWalk(player, dt) {
  const body = player.body;
  const rot = body.rotation();
  const threeQuat = new Quaternion(rot.x, rot.y, rot.z, rot.w);
  const forward = new Vector3(0, 0, -1).applyQuaternion(threeQuat).normalize();

  let moveDir = new Vector3(0, 0, 0);

  if (keys.w && !keys.a && !keys.d) moveDir.add(forward);
  if (keys.a && !keys.d) {
    body.setAngvel({ x: 0, y: player.turnSpeed * dt, z: 0 }, true);
    if (keys.w) moveDir.add(forward);
  } else if (keys.d && !keys.a) {
    body.setAngvel({ x: 0, y: -player.turnSpeed * dt, z: 0 }, true);
    if (keys.w) moveDir.add(forward);
  } else {
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);
  }

  moveDir.multiplyScalar(player.currentSpeed * dt);

  const currentVel = body.linvel();
  body.setLinvel(
    {
      x: moveDir.x,
      y: currentVel.y,
      z: moveDir.z,
    },
    true
  );
}

function playerJump(player, dt) {
  if (!player.onGround) return;
  if (keys[" "]) {
    const body = player.body;
    const currentVel = body.linvel();
    body.setLinvel(
      {
        x: currentVel.x,
        y: player.jumpForce || 6,
        z: currentVel.z,
      },
      true
    );
  }
}

function playerRun(player) {
  if (keys.shift) {
    player.isRunning = true;
    player.currentSpeed = player.runSpeed;
  } else {
    player.isRunning = false;
    player.currentSpeed = player.speed;
  }
}
