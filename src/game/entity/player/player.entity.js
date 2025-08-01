import { Box3, BoxGeometry, Mesh, MeshPhongMaterial, Vector3 } from "three";
import Entity from "../../../core/entity";
import { playerMovement } from "./player.movement";
import { playerCollision } from "./player.collision";

import { Sky } from "three/examples/jsm/objects/Sky.js";

export default class Player extends Entity {
  name = "Player";
  speed = 150;
  turnSpeed = 3.5;
  jumpForce = 250;
  onGround = false;

  async create() {
    this.mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshPhongMaterial({
        color: 0x6bc7ff,
        opacity: 0.5,
        transparent: true,
      })
    );
    this.mesh.castShadow = true;

    this.body = this.game.world.add({
      type: "box",
      size: [1, 1, 1],
      pos: [-2, 5, 0],
      move: true,
      density: 1,
    });

    this.body.orientation.set(0, 0, 0, 1);

    this.collider = new Box3().setFromObject(this.mesh);

    await this.loadModel("src/assets/player.glb");

    this.mesh.add(this.model);
    // this.model.position.y = -0.85;

    this.setSky();
  }

  update(dt) {
    playerMovement(this, dt);
    playerCollision(this);
  }

  setSky() {
    const sky = new Sky();
    sky.scale.setScalar(10000);
    this.scene.add(sky);

    // Parâmetros atmosféricos
    const skyUniforms = sky.material.uniforms;
    skyUniforms["turbidity"].value = 10;
    skyUniforms["rayleigh"].value = 1.5;
    skyUniforms["mieCoefficient"].value = 0.009;
    skyUniforms["mieDirectionalG"].value = 0.8;

    // Atualiza o sol (posição de luz)
    const sun = new Vector3();
    sun.setFromSphericalCoords(1, Math.PI / 2, 0); // você pode mover isso dinamicamente
    sky.material.uniforms["sunPosition"].value.copy(sun);
  }
}
