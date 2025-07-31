import { Box3, BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from "three";
import { keys } from "../../core/keys";

export default class Player {
  game = null;
  scene = null;

  name = "Player";
  mesh = null;
  body = null;
  collider = null;
  properties = [];
  collisions = [];

  speed = 5;
  turnSpeed = 5;
  jumpForce = 5;

  onGround = false;

  constructor(game) {
    this.game = game;
    this.scene = game.currentScene;
    this.create();
  }

  create() {
    this.mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshPhongMaterial());
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.set(0, 2, 0);

    this.body = this.game.world.add({
      type: "box",
      size: [1, 1, 1],
      pos: [0, 5, 0],
      rot: [0, 0, 0],
      move: true,
      density: 1,
    });

    this.collider = new Box3().setFromObject(this.mesh);

    console.log(this.collider);
  }

  update(dt) {
    this.movement(dt);
    this.collision();
  }

  movement(dt) {
    const direction = new Vector3(
      Math.sin(this.mesh.rotation.y),
      0,
      Math.cos(this.mesh.rotation.y)
    );

    if (!this.onGround) return;
    if (keys.w)
      this.mesh.position.add(direction.clone().multiplyScalar(this.speed * dt));

    if (keys.s)
      this.mesh.position.add(
        direction.clone().multiplyScalar(-this.speed * dt)
      );

    if (keys.a) this.mesh.rotation.y += this.turnSpeed * dt;
    if (keys.d) this.mesh.rotation.y -= this.turnSpeed * dt;

    this.jump();
  }

  jump() {
    if (keys[" "]) {
      this.body.linearVelocity.y = this.jumpForce;
    }
  }

  collision() {
    if (this.collisions.includes("floor")) {
      this.onGround = true;
    } else {
      this.onGround = false;
    }
  }
}
