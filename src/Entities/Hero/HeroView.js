import { Container, Graphics } from "../../../lib/pixi.mjs";

export default class HeroView extends Container {
  #bounds = {
    width: 0,
    height: 0,
  };
  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  constructor() {
    super();
    this.#bounds.width = 20;
    this.#bounds.height = 90;
    this.#collisionBox.width = this.#bounds.width;
    this.#collisionBox.height = this.#bounds.height;

    const view = new Graphics();
    view.lineStyle(1, 0xffff00);
    view.drawRect(0, 0, 20, 90);
    view.drawRect(0, 30, 60, 10);
    this.addChild(view);
    view.pivot.x = 10;
    view.x = 10;
    // view.scale.x *= -1;
  }
  get collisionBox() {
    this.#collisionBox.x = this.x;
    this.#collisionBox.y = this.y;
    return this.#collisionBox;
  }
}
