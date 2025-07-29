import {
  BoxGeometry,
  HemisphereLight,
  PointLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
} from "three";
import Player from "../entity/player.entity";
import * as CANNON from "cannon-es";

export default class MainScene extends Scene {
  game = null;
  mainCamera = null;
  cube = null;
  objects = {};
  player = new Player();

  constructor(game) {
    super();
    this.game = game;
    this.mainCamera = new PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );
    this.mainCamera.position.set(0, 5, 10);
    this.mainCamera.lookAt(0, 0, 0);
  }

  create() {
    this.objects["player"] = this.player.object;

    this.objects["floor"] = {
      name: "Floor",
      entity: new Mesh(new BoxGeometry(10, 0.3, 10), new MeshPhongMaterial()),
      body: new CANNON.Body({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(5, 0.15, 5)), // metade das dimensões reais
        quaternion: new CANNON.Quaternion().setFromEuler(0, 0, 0), // ou nenhum, se não for rotacionar
      }),
    };
    this.objects["floor"].entity.receiveShadow = true;

    this.objects["ambientLight"] = {
      name: "AmbientLight",
      entity: new HemisphereLight(0xffffff, 0x080820, 0.2),
    };
    this.objects["ambientLight"].entity.position.y = 5;

    this.objects["mainLight"] = {
      name: "MainLight",
      entity: new PointLight(0xffffff, 5, 60),
    };
    this.objects["mainLight"].entity.castShadow = true;
    this.objects["mainLight"].entity.position.y = 5;

    for (const object of Object.values(this.objects)) {
      this.add(object.entity);
      if (object.body) {
        this.game.world.addBody(object.body);
      }
    }
  }

  update(dt) {
    this.player.update(dt);
    this.updatePhysic();
  }

  updatePhysic() {
    for (const object of Object.values(this.objects)) {
      if (object.body && object.body.mass > 0) {
        object.entity.position.copy(object.body.position);
        object.entity.quaternion.copy(object.body.quaternion);
      }
    }
  }
}
