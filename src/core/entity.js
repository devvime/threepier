import { Animator } from "./animator";
import { loader } from "./loader";
import { AnimationClip } from "three";

export default class Entity {
  game = null;
  scene = null;
  name = "";
  mesh = null;
  body = null;
  model = null;
  animations = null;
  animator = null;
  collider = null;
  properties = [];
  collisions = [];

  constructor(game) {
    this.game = game;
    this.scene = game.currentScene;
    this.create();
  }

  create() {}

  update() {}

  async loadModel(path) {
    const { model, animations } = await loader(path);
    this.model = model;
    this.animations = animations;
    this.animator = new Animator(this.model, this.animations);
    this.scene.add(this.model);
  }
}
