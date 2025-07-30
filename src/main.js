import "./assets/theme/theme.scss";
import Game from "./core/game";
import MainScene from "./game/scene/main.scene";

const game = new Game();

game.setScene(new MainScene(game));

game.render();
