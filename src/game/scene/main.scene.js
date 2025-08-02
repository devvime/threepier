import { Scene } from "../../core/scene";
import { HemisphereLight, PointLight } from "three";
import Player from "../entity/player/player.entity";
import Floor from "../entity/floor.entity";
import Box from "../entity/box.entity";

export default class MainScene extends Scene {
  async create() {
    this.objects["floor"] = new Floor(this.game);
    this.objects["box"] = new Box(this.game);
    this.objects["player"] = new Player(this.game);
    this.setLight();
  }

  update(dt) {}

  setLight() {
    this.objects["ambientLight"] = {
      name: "AmbientLight",
      mesh: new HemisphereLight(0xffffff, 0x080820, 0.2),
    };
    this.objects["ambientLight"].mesh.position.y = 5;

    this.objects["mainLight"] = {
      name: "MainLight",
      mesh: new PointLight(0xffffff, 15, 60),
    };
    this.objects["mainLight"].mesh.castShadow = true;
    this.objects["mainLight"].mesh.position.y = 5;
  }
}
