export default class Entity {
  game = null;
  scene = null;
  name = "";
  mesh = null;
  body = null;
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
}
