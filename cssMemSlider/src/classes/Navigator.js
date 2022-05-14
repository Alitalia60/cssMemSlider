import {DivElement} from './DivElement.js';

export class Navigator {
  constructor(className = "", itemNumber = 4) {
    this.className = className;
    this.itemNumber = itemNumber;
  }

  create() {
    this.elem = new DivElement("navigator__container").create();
    for (let index = 0; index <= this.itemNumber; index += 1) {
      const item = new DivElement("navigator__item").create();
      item.id = `mem${index}`;
      this.elem.appendChild(item);
    }
    return this.elem;
  }
}
