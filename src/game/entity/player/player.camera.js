import { Vector3, Quaternion } from "three";

const desiredCameraOffset = new Vector3(0, 0.5, 2.8); // posição relativa à frente do player
const cameraPosition = new Vector3(); // posição real da câmera (suavizada)
const targetPosition = new Vector3(); // para cálculo de posição do player
const lookTarget = new Vector3(); // para onde a câmera vai olhar (player)

export function updatePlayerCamera(player, camera, dt) {
  const body = player.body;
  const pos = body.translation();
  const rot = body.rotation();
  const quat = new Quaternion(rot.x, rot.y, rot.z, rot.w);

  targetPosition.set(pos.x, pos.y + 1, pos.z);

  const offset = desiredCameraOffset.clone().applyQuaternion(quat);
  const desiredPosition = targetPosition.clone().add(offset);
  const smoothFactor = 5 * dt;

  cameraPosition.lerp(desiredPosition, smoothFactor);
  camera.position.copy(cameraPosition);
  camera.lookAt(targetPosition);
}
