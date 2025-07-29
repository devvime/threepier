import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import { keys } from "../../core/keys";
import * as CANNON from "cannon-es";

export default class Player {
  object = null;
  speed = 14;
  rotSpeed = 1.5;

  constructor() {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshPhongMaterial());
    const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    const body = new CANNON.Body({
      mass: 1,
      shape,
      position: new CANNON.Vec3(0, 2, 0),
    });
    body.fixedRotation = true;
    body.updateMassProperties();
    body.angularFactor.set(0, 0, 0);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    this.object = {
      name: "Player",
      entity: mesh,
      body: body,
    };
  }

  update(dt) {
    const { body } = this.object;

    const move = new CANNON.Vec3();

    if (keys.w) move.z -= 1;
    if (keys.s) move.z += 1;

    if (move.length()) {
      move.normalize();
      const worldMove = new CANNON.Vec3();
      body.quaternion.vmult(move, worldMove);
      worldMove.scale(this.speed, worldMove);
      body.velocity.x = worldMove.x;
      body.velocity.z = worldMove.z;
    } else {
      // para suavizar parada
      body.velocity.x = 0;
      body.velocity.z = 0;
    }

    if (keys.a) {
      const q = new CANNON.Quaternion().setFromEuler(0, this.rotSpeed * dt, 0);
      body.quaternion = body.quaternion.mult(q);
    }
    if (keys.d) {
      const q = new CANNON.Quaternion().setFromEuler(0, -this.rotSpeed * dt, 0);
      body.quaternion = body.quaternion.mult(q);
    }
  }
}
