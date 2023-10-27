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
  #stm = {
    currentState: "default",
    states: {},
  };
  #rootNode;
  constructor() {
    super();
    this.#createNodeStructure();

    this.#rootNode.pivot.x = 10;
    this.#rootNode.x = 10;
    this.#bounds.width = 20;
    this.#bounds.height = 90;
    this.#collisionBox.width = this.#bounds.width;
    this.#collisionBox.height = this.#bounds.height;

    this.#stm.states.stay = this.#getStayImage();
    this.#stm.states.stayUp = this.#getStayUpImage();
    this.#stm.states.run = this.#getRunImage();
    this.#stm.states.runUp = this.#getRunUpImage();
    this.#stm.states.runDown = this.#getRunDownImage();
    this.#stm.states.lay = this.#getLayImage();
    this.#stm.states.jump = this.#getJumpImage();
    this.#stm.states.fall = this.#getFallImage();

    for (let key in this.#stm.states) {
      this.#rootNode.addChild(this.#stm.states[key]);
    }
  }
  get collisionBox() {
    this.#collisionBox.x = this.x;
    this.#collisionBox.y = this.y;
    return this.#collisionBox;
  }

  showStay() {
    this.#toState("stay");
  }
  showStayUp() {
    this.#toState("stayUp");
  }
  showRun() {
    this.#toState("run");
  }
  showRunUp() {
    this.#toState("runUp");
  }
  showRunDown() {
    this.#toState("runDown");
  }
  showLay() {
    this.#toState("lay");
  }
  showJump() {
    this.#toState("jump");
  }
  showFall() {
    this.#toState("fall");
  }
  flip(direction) {
    switch (direction) {
      case 1:
      case -1:
        this.#rootNode.scale.x *= direction;
    }
  }

  #toState(key) {
    if (this.#stm.currentState == key) {
      return;
    }
    for (let key in this.#stm.states) {
      this.#stm.states[key].visible = false;
    }
    return (this.#stm.states[key].visible = true);
  }

  #createNodeStructure() {
    const rootNode = new Container();
    this.addChild(rootNode);
    this.#rootNode = rootNode;
  }

  #getStayImage() {
    const view = new Graphics();
    view.lineStyle(2, 0xffff00);
    view.drawRect(0, 0, 20, 90);
    view.drawRect(0, 30, 70, 5);
    return view;
  }

  #getStayUpImage() {
    const view = new Graphics();
    view.lineStyle(2, 0xffff00);
    view.drawRect(0, 0, 20, 90);
    view.drawRect(8, -40, 5, 40);
    return view;
  }

  #getRunImage() {
    const view = new Graphics();
    view.lineStyle(2, 0xffff00);
    view.drawRect(0, 0, 20, 90);
    view.drawRect(0, 30, 70, 5);
    view.transform.skew.x = -0.1;
    return view;
  }

  #getRunUpImage() {
    const view = new Graphics();
    view.lineStyle(2, 0xffff00);
    view.drawRect(0, 0, 20, 90);
    view.lineTo(0, 30);
    view.lineTo(40, -20);
    view.lineTo(45, -15);
    view.lineTo(0, 40);
    view.transform.skew.x = -0.1;
    return view;
  }
  #getRunDownImage() {
    const view = new Graphics();
    view.lineStyle(2, 0xffff00);
    view.drawRect(0, 0, 20, 90);
    view.lineTo(0, 20);
    view.lineTo(40, 60);
    view.lineTo(35, 65);
    view.lineTo(0, 30);
    view.transform.skew.x = -0.1;
    return view;
  }
  #getLayImage() {
    const view = new Graphics();
    view.lineStyle(2, 0xffff00);
    view.drawRect(0, 0, 90, 20);
    view.drawRect(90, 0, 40, 5);
    view.x -= 45;
    view.y += 70;
    return view;
  }
  #getJumpImage() {
    const view = new Graphics();
    view.lineStyle(2, 0xffff00);
    view.drawRect(0, 0, 20, 20);
    view.x -= 10;
    view.y += 25;
    return view;
  }
  #getFallImage() {
    const view = new Graphics();
    view.lineStyle(2, 0xffff00);
    view.drawRect(0, 0, 20, 90);
    view.drawRect(10, 20, 5, 60);
    view.transform.skew.x = -0.1;
    return view;
  }
}
