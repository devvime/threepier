import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import { keys } from "../../core/keys";

export default class Player {
  game = null;

  name = "Player";
  mesh = null;
  body = null;
  collider = null;

  speed = 5;
  turnSpeed = 5;
  jumpForce = 5;

  constructor(game) {
    this.game = game;
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

    console.log(this.body);
  }

  update(dt) {
    this.movement(dt);
  }

  movement(dt) {
    if (keys.w) this.body.position.x += this.speed * dt;
    if (keys.s) this.body.position.x -= this.speed * dt;

    if (keys.a) this.body.rotation.y += this.turnSpeed;

    // if (keys[" "]) this.body.linearVelocity.y = this.jumpForce;
  }
}
