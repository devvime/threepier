import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import Entity from "../../../core/entity";
import { playerMovement } from "./player.movement";
import { playerCollision } from "./player.collision";
import RAPIER from "@dimforge/rapier3d";
import { updatePlayerCamera } from "./player.camera";

export default class Player extends Entity {
  name = "Player";
  speed = 150;
  runSpeed = 250;
  currentSpeed = this.speed;
  turnSpeed = 300;
  jumpForce = 6;
  onGround = false;
  isRunning = false;

  async create() {
    this.mesh = new Mesh(
      new BoxGeometry(0.5, 1.8, 0.4),
      new MeshPhongMaterial({
        color: 0x6bc7ff,
        opacity: 0.3,
        transparent: true,
        visible: false,
      })
    );

    this.body = this.game.world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 3, 0)
    );
    this.body.restrictRotations(false, true, false);

    this.collider = this.game.world.createCollider(
      RAPIER.ColliderDesc.capsule(0.6, 0.27),
      this.body
    );
    this.collider.userData = { type: "player", props: [], ref: this };

    await this.loadModel("src/assets/player.glb");
    this.model.position.y = -0.9;
    this.model.rotation.y = 160.25;
    this.mesh.add(this.model);
  }

  update(dt) {
    playerMovement(this, dt);
    playerCollision(this);
    updatePlayerCamera(this, this.scene.mainCamera, dt);
  }
}
