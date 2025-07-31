import { Box3, BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import Entity from "../../../core/entity";
import { playerMovement } from "./player.movement";
import { playerCollision } from "./player.collision";

export default class Player extends Entity {
  name = "Player";
  speed = 5;
  turnSpeed = 3;
  jumpForce = 4;
  onGround = false;

  create() {
    this.mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshPhongMaterial({ color: 0x6bc7ff })
    );
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.set(0, 2, 0);

    this.body = this.game.world.add({
      type: "box",
      size: [1, 1, 1],
      pos: [-2, 5, 0],
      rot: [0, 0, 0],
      move: true,
      density: 1,
    });

    this.collider = new Box3().setFromObject(this.mesh);
  }

  update(dt) {
    playerMovement(this, dt);
    playerCollision(this);
  }
}
