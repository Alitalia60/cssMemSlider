import { DivElement } from "./DivElement.js";

//!! ***************class
export class Ball {
    create(parentNode) {
      this.elem = new DivElement("ball").create();
      this.elem.style.top = `${parent.clientY}px`;
      this.elem.style.left = `${parent.clientX}px`;
      parentNode.appendChild(this.elem);
      return this.elem;
    }
  
    show() {
      this.elem.classList.add("ball_visible");
    }
  
    hide() {
      this.elem.classList.remove("ball_visible");
    }
    move(x, y) {
      this.elem.clientX = x;
      this.elem.clientY = y;
    }
  }
  