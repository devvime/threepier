import { MeshPhongMaterial } from "three";
import { BoxGeometry } from "three";
import { Mesh } from "three";
import Entity from "../../core/entity";
import RAPIER from "@dimforge/rapier3d";

export default class Floor extends Entity {
  name = "Floor";
  properties = ["floor"];

  create() {
    this.mesh = new Mesh(
      new BoxGeometry(10, 0.3, 10),
      new MeshPhongMaterial({ color: 0xa7dbb3 })
    );
    this.mesh.receiveShadow = true;

    this.body = this.game.world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.15, 0)
    );

    this.collider = this.game.world.createCollider(
      RAPIER.ColliderDesc.cuboid(5, 0.15, 5),
      this.body
    );
    this.collider.userData = { type: "floor", ref: this };
  }

  update() {}
}
