import { MeshPhongMaterial } from "three";
import { BoxGeometry } from "three";
import { Mesh } from "three";
import Entity from "../../core/entity";
import RAPIER from "@dimforge/rapier3d";

export default class Box extends Entity {
  name = "Box";
  properties = ["box"];

  create() {
    this.mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshPhongMaterial({ color: 0xd6cda5 })
    );
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.body = this.game.world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(3, 5, 3)
    );

    this.collider = this.game.world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5),
      this.body
    );
    this.collider.userData = { type: "player", ref: this };
  }

  update() {}
}
