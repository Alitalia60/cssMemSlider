import DivElement from './DivElement';

export default class Navigator {
  className = '';

  itemNumber = 1;

  elem = null;

  constructor(className = '', itemNumber = 4) {
    this.className = className;
    this.itemNumber = itemNumber;
  }

  create() {
    this.elem = new DivElement('navigator_container').create();
    for (let index = 0; index <= this.itemNumber; index += 1) {
      this.elem.appendChild(new DivElement('navigator_item').create());
    }
    return this.elem;
  }
}
