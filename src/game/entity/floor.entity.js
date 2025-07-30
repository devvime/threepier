import { MeshPhongMaterial } from "three";
import { BoxGeometry } from "three";
import { Mesh } from "three";
import RAPIER from "@dimforge/rapier3d";

export default class Floor {
  game = null;

  name = "Floor";
  mesh = null;
  body = null;
  collider = null;

  constructor(game) {
    this.game = game;
    this.create();
  }

  create() {
    this.mesh = new Mesh(new BoxGeometry(10, 0.3, 10), new MeshPhongMaterial());
    this.mesh.receiveShadow = true;

    this.body = this.game.world.createRigidBody(RAPIER.RigidBodyDesc.fixed());

    this.collider = this.game.world.createCollider(
      RAPIER.ColliderDesc.cuboid(5, 0.15, 5),
      this.body
    );
  }

  update() {}
}
