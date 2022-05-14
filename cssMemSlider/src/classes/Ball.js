import { DivElement } from "./DivElement.js";

//!! ***************class
export class Ball {
  constructor(ev) {
    this.elem = document.createElement('div');
    this.elem.classList.add('ball');
    this.elem.id='ball';
    document.body.appendChild(this.elem);
  }

  hideBall() {
    this.elem.classList.remove("ball_visible");
  }
  follow(ev) {
    this.elem.style.left = `${ev.clientX -10}px`;
    this.elem.style.top = `${ev.clientY-10}px`;
  }
  showBall(ev) {
    this.elem.style.left = `${ev.clientX -10}px`;
    this.elem.style.top = `${ev.clientY-10}px`;
    this.elem.classList.add("ball_visible");
  }

}
