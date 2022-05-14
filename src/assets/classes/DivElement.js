export default class DivElement {
  constructor(className, textContent = '') {
    this.className = className;
    this.textContent = textContent;
  }

  create() {
    this.elem = document.createElement('div');
    this.elem.classList.add(this.className);
    this.elem.textContent = this.textContent;
    return this.elem;
  }
}
