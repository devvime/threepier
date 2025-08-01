import { Box3, MeshPhongMaterial } from "three";
import { BoxGeometry } from "three";
import { Mesh } from "three";
import Entity from "../../core/entity";

export default class Floor extends Entity {
  name = "Floor";
  properties = ["floor"];

  create() {
    this.mesh = new Mesh(
      new BoxGeometry(10, 0.3, 10),
      new MeshPhongMaterial({ color: 0xa7dbb3 })
    );
    this.mesh.receiveShadow = true;

    this.body = this.game.world.add({
      type: "box",
      size: [10, 0.3, 10],
      pos: [0, -0.15, 0],
      rot: [0, 0, 0],
      move: false,
      density: 1,
    });

    this.collider = new Box3().setFromObject(this.mesh);
  }

  update() {}
}
