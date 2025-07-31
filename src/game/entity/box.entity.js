import { Box3, MeshPhongMaterial } from "three";
import { BoxGeometry } from "three";
import { Mesh } from "three";
import Entity from "../../core/entity";

export default class Box extends Entity {
  name = "Box";
  properties = ["box"];

  create() {
    this.mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshPhongMaterial({ color: 0xd6cda5 })
    );
    this.mesh.receiveShadow = true;

    this.body = this.game.world.add({
      type: "box",
      size: [1, 1, 1],
      pos: [3, 3, 3],
      rot: [0, 0, 0],
      move: true,
      density: 50,
    });

    this.collider = new Box3().setFromObject(this.mesh);
  }

  update() {}
}
