import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import Entity from "../../../core/entity";
import { playerMovement } from "./player.movement";
import { playerCollision } from "./player.collision";
import RAPIER from "@dimforge/rapier3d";

export default class Player extends Entity {
  name = "Player";
  speed = 150;
  turnSpeed = 3.5;
  jumpForce = 250;
  onGround = false;

  async create() {
    this.mesh = new Mesh(
      new BoxGeometry(0.5, 1.8, 0.4),
      new MeshPhongMaterial({
        color: 0x6bc7ff,
        opacity: 0.3,
        transparent: true,
      })
    );

    this.body = this.game.world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(-3, 5, 0).lockRotations()
    );
    this.body.lockRotations(false);
    this.body.restrictRotations(true, false, true);

    this.collider = this.game.world.createCollider(
      RAPIER.ColliderDesc.capsule(0.6, 0.27),
      this.body
    );
    this.collider.userData = { type: "player", ref: this };

    await this.loadModel("src/assets/player.glb");
    this.model.position.y = -0.9;
    this.mesh.add(this.model);
  }

  update(dt) {
    playerMovement(this, dt);
    playerCollision(this);
  }
}
