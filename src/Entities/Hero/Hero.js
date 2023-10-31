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

  #isLay = false;
  #isStayUp = false;

  #view;
  constructor(stage) {
    this.#view = new HeroView();
    stage.addChild(this.#view);
    this.#state = States.Jump;
    this.#view.showJump();
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

    if (this.#velocityY > 0) {
      if (!(this.#state == States.Jump || this.#state == States.FlyDown)) {
        this.#view.showFall();
      }
      this.#state = States.FlyDown;
    }

    this.#velocityY += this.#GRAVITY_FORCE;
    this.y += this.#velocityY;
  }
  stay(platformY) {
    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      const buttonContextMock = {};
      buttonContextMock.arrowLeft = this.#movement.x == -1;
      buttonContextMock.arrowRight = this.#movement.x == 1;
      buttonContextMock.arrowDown = this.#isLay;
      buttonContextMock.arrowUp = this.#isStayUp;
      this.#state = States.Stay;
      this.setView(buttonContextMock);
    }
    this.#state = States.Stay;
    this.#velocityY = 0;
    this.y = platformY - this.#view.collisionBox.height;
  }
  jump() {
    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      return;
    }
    this.#state = States.Jump;
    this.#velocityY -= this.#JUMP_FORCE;
    this.#view.showJump();
  }
  throwDown() {
    this.#state = States.Jump;
    this.#view.showFall();
  }
  isJumpState() {
    return this.#state == States.Jump;
  }
  startRightMove() {
    this.#directionContext.right = 1;
    if (this.#directionContext.left < 0) {
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
  setView(buttonContext) {
    this.#view.flip(this.#movement.x);
    this.#isLay = buttonContext.arrowDown;
    this.#isStayUp = buttonContext.arrowUp;
    if (this.isJumpState() || this.#state == States.FlyDown) {
      return;
    }
    if (buttonContext.arrowLeft || buttonContext.arrowRight) {
      if (buttonContext.arrowUp) {
        this.#view.showRunUp();
      } else if (buttonContext.arrowDown) {
        this.#view.showRunDown();
      } else {
        this.#view.showRun();
      }
    } else {
      if (buttonContext.arrowUp) {
        this.#view.showStayUp();
      } else if (buttonContext.arrowDown) {
        this.#view.showLay();
      } else {
        this.#view.showStay();
      }
    }
  }
}
