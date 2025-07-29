import { HemisphereLight, PointLight, PerspectiveCamera, Scene } from "three";
import Player from "../entity/player.entity";
import Floor from "../entity/floor.entity";

export default class MainScene extends Scene {
  game = null;
  mainCamera = null;
  objects = {};

  player = null;
  floor = null;

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
    this.objects["player"] = new Player(this.game);
    this.objects["floor"] = new Floor(this.game);

    this.setLight();
  }

  update(dt) {
    this.objects["player"].update(dt);
  }

  setLight() {
    this.objects["ambientLight"] = {
      name: "AmbientLight",
      mesh: new HemisphereLight(0xffffff, 0x080820, 0.2),
    };
    this.objects["ambientLight"].mesh.position.y = 5;

    this.objects["mainLight"] = {
      name: "MainLight",
      mesh: new PointLight(0xffffff, 5, 60),
    };
    this.objects["mainLight"].mesh.castShadow = true;
    this.objects["mainLight"].mesh.position.y = 5;
  }
}
