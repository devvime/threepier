import { Box3, MeshPhongMaterial } from "three";
import { BoxGeometry } from "three";
import { Mesh } from "three";

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

    this.body = this.game.world.add({
      type: "box",
      size: [10, 0.3, 10],
      pos: [0, 0, 0],
      rot: [0, 0, 0],
      move: false,
      density: 1,
    });

    this.collider = new Box3().setFromObject(this.mesh);
  }

  update() {}
}
