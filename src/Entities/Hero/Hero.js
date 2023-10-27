import HeroView from "./HeroView.js";

const States = {
  Stay: "stay",
  Jump: "jump",
  FlyDown: "flydown",
};
export default class Hero {
  #GRAVITY_FORCE = 0.2;
  #JUMP_FORCE = 9;
  #SPEED = 3;
  #velocityX = 0;
  #velocityY = 0;
  #movement = {
    x: 0,
    y: 0,
  };
  #directionContext = {
    left: 0,
    right: 0,
  };
  #state = States.Stay;

  #view;
  constructor(stage) {
    this.#view = new HeroView();
    stage.addChild(this.#view);
  }
  get collisionBox() {
    return this.#view.collisionBox;
  }
  get x() {
    return this.#view.x;
  }
  set x(value) {
    this.#view.x = value;
  }
  get y() {
    return this.#view.y;
  }
  set y(value) {
    this.#view.y = value;
  }
  update() {
    this.#velocityX = this.#movement.x * this.#SPEED;
    this.x += this.#velocityX;

    if (this.#velocityY > 0 && this.isJumpState()) {
      this.#state = States.FlyDown;
    }

    this.#velocityY += this.#GRAVITY_FORCE;
    this.y += this.#velocityY;
  }
  stay(platformY) {
    this.#velocityY = 0;
    this.#state = States.Stay;
    this.y = platformY - this.#view.collisionBox.height;
  }
  jump() {
    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      return;
    }
    this.#state = States.Jump;
    this.#velocityY -= this.#JUMP_FORCE;
  }
  throwDown() {
    this.#state = States.Jump;
  }
  isJumpState() {
    return this.#state == States.Jump;
  }
  startRightMove() {
    this.#directionContext.right = 1;
    if (this.#directionContext.left > 0) {
      this.#movement.x = 0;
      return;
    }
    this.#movement.x = 1;
  }
  startLeftMove() {
    this.#directionContext.left = -1;
    if (this.#directionContext.right > 0) {
      this.#movement.x = 0;
      return;
    }
    this.#movement.x = -1;
  }

  stopLeftMove() {
    this.#directionContext.left = 0;
    this.#movement.x = this.#directionContext.right;
  }

  stopRightMove() {
    this.#directionContext.right = 0;
    this.#movement.x = this.#directionContext.left;
  }
}
