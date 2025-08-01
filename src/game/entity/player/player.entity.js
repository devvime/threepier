import { Box3, BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from "three";
import Entity from "../../../core/entity";
import { playerMovement } from "./player.movement";
import { playerCollision } from "./player.collision";

export default class Player extends Entity {
  name = "Player";
  speed = 150;
  turnSpeed = 3.5;
  jumpForce = 250;
  onGround = false;

  async create() {
    this.mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshPhongMaterial({
        color: 0x6bc7ff,
        opacity: 0.5,
        transparent: true,
      })
    );
    this.mesh.castShadow = true;

    this.body = this.game.world.add({
      type: "box",
      size: [1, 1, 1],
      pos: [-2, 5, 0],
      move: true,
      density: 1,
    });

    this.body.orientation.set(0, 0, 0, 1);

    this.collider = new Box3().setFromObject(this.mesh);

    await this.loadModel("src/assets/player.glb");

    this.mesh.add(this.model);
  }

  update(dt) {
    playerMovement(this, dt);
    playerCollision(this);
  }
}
