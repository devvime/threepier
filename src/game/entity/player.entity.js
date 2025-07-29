import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import { keys } from "../../core/keys";
import RAPIER from "@dimforge/rapier3d";

export default class Player {
  game = null;

  name = "Player";
  mesh = null;
  body = null;
  collider = null;

  speed = 0.001;
  rotSpeed = 1.5;

  constructor(game) {
    this.game = game;

    this.mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshPhongMaterial());
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.set(0, 2, 0);

    this.body = this.game.world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 2, 0).lockRotations()
    );

    this.collider = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
    this.game.world.createCollider(this.collider, this.body);
  }

  update(dt) {}

  movement() {}
}
