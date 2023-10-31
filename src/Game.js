import Hero from "./Entities/Hero/Hero.js";
import PlatformFactory from "./Entities/Platform/PlatformFactory.js";
import KeyboardProcessor from "./KeyboardProcessor.js";
export default class Game {
  #pixiApp;
  #hero;
  #platforms = [];
  keyboardProcessor;
  constructor(pixiApp) {
    this.#pixiApp = pixiApp;
    this.#hero = new Hero(this.#pixiApp.stage);
    this.#hero.x = 100;
    this.#hero.y = 100;
    // this.#pixiApp.stage.addChild(this.#hero);

    const platformFactory = new PlatformFactory(this.#pixiApp);

    const platform1 = platformFactory.createPlatform(100, 400);
    const platform2 = platformFactory.createPlatform(300, 400);
    const platform3 = platformFactory.createPlatform(500, 400);
    const platform4 = platformFactory.createPlatform(700, 400);
    const platform5 = platformFactory.createPlatform(900, 400);

    const platform6 = platformFactory.createPlatform(300, 550);
    const platform7 = platformFactory.createBox(0, 738);
    const platform8 = platformFactory.createBox(220, 738);
    const box = platformFactory.createBox(400, 708);
    box.isStep = true;

    this.#platforms = [
      platform1,
      platform2,
      platform3,
      platform4,
      platform5,
      platform6,
      platform7,
      platform8,
      box,
    ];

    this.keyboardProcessor = new KeyboardProcessor(this);
    this.setKeys();
  }
  update() {
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y,
    };
    this.#hero.update();
    for (let i = 0; i < this.#platforms.length; i++) {
      if (this.#hero.isJumpState() && this.#platforms[i].type != "box") {
        continue;
      }
      const collisionResult = this.getPlatformCollisionResult(
        this.#hero,
        this.#platforms[i],
        prevPoint
      );
      if (collisionResult.vertical == true) {
        this.#hero.stay(this.#platforms[i].y);
      }
    }
  }

  getOrientCollisionResult(aaRect, bbRect, aaPrevPoint) {
    const collisionResult = {
      horizontal: false,
      vertical: false,
    };
    if (!this.isCheckAABB(aaRect, bbRect)) {
      return collisionResult;
    }
    aaRect.y = aaPrevPoint.y;

    if (!this.isCheckAABB(aaRect, bbRect)) {
      collisionResult.vertical = true;
      return collisionResult;
    }

    collisionResult.horizontal = true;
    return collisionResult;
  }
  getPlatformCollisionResult(character, platform, prevPoint) {
    const collisionResult = this.getOrientCollisionResult(
      character.collisionBox,
      platform,
      prevPoint
    );
    if (collisionResult.vertical) {
      character.y = prevPoint.y;
    }
    if (collisionResult.horizontal == true && platform.type == "box") {
      if (platform.isStep) {
        character.stay(platform.y);
      }
      character.x = prevPoint.x;
    }

    return collisionResult;
  }

  isCheckAABB(entity, area) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    );
  }

  setKeys() {
    this.keyboardProcessor.getButton("KeyS").executeDown = function () {
      if (
        this.keyboardProcessor.isButtonPressed("ArrowDown") &&
        !this.keyboardProcessor.isButtonPressed("ArrowLeft") &&
        !this.keyboardProcessor.isButtonPressed("ArrowUp")
      ) {
        this.#hero.throwDown();
      } else {
        this.#hero.jump();
      }
    };
    const arrowLeft = this.keyboardProcessor.getButton("ArrowLeft");
    arrowLeft.executeDown = function () {
      this.#hero.startLeftMove();
      this.#hero.setView(this.getArrowButtonContext());
    };
    arrowLeft.executeUp = function () {
      this.#hero.stopLeftMove();
      this.#hero.setView(this.getArrowButtonContext());
    };

    const arrowRight = this.keyboardProcessor.getButton("ArrowRight");
    arrowRight.executeDown = function () {
      this.#hero.startRightMove();
      this.#hero.setView(this.getArrowButtonContext());
    };
    arrowRight.executeUp = function () {
      this.#hero.stopRightMove();
      this.#hero.setView(this.getArrowButtonContext());
    };

    const arrowUp = this.keyboardProcessor.getButton("ArrowUp");
    arrowUp.executeDown = function () {
      this.#hero.setView(this.getArrowButtonContext());
    };
    arrowUp.executeUp = function () {
      this.#hero.setView(this.getArrowButtonContext());
    };

    const arrowDown = this.keyboardProcessor.getButton("ArrowDown");
    arrowDown.executeDown = function () {
      this.#hero.setView(this.getArrowButtonContext());
    };
    arrowDown.executeUp = function () {
      this.#hero.setView(this.getArrowButtonContext());
    };
  }
  getArrowButtonContext() {
    const buttonContext = {};
    buttonContext.arrowLeft =
      this.keyboardProcessor.isButtonPressed("ArrowLeft");
    buttonContext.arrowRight =
      this.keyboardProcessor.isButtonPressed("ArrowRight");
    buttonContext.arrowUp = this.keyboardProcessor.isButtonPressed("ArrowUp");
    buttonContext.arrowDown =
      this.keyboardProcessor.isButtonPressed("ArrowDown");
    return buttonContext;
  }
}
