import Game from "./Game.js";
import * as PIXI from "../lib/pixi.mjs";

const _pixiApp = new PIXI.Application({
  width: 1024,
  height: 768,
});
const game = new Game(_pixiApp);

document.body.appendChild(_pixiApp.view);
document.addEventListener("keydown", function (key) {
  game.keyboardProcessor.onKeyDown(key);
});
document.addEventListener("keyup", function (key) {
  game.keyboardProcessor.onKeyUp(key);
});

_pixiApp.ticker.add(game.update, game);
