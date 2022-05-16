import { DivElement } from './DivElement.js';

export default class Navigator {
    constructor(className = '') {
        this.className = className;
    }

    create(itemNumber) {
        this.elem = new DivElement('navigator__container').create();
        for (let index = 0; index <= itemNumber; index += 1) {
            const itemWrapper = new DivElement('navigator_item__wrapper').create();
            itemWrapper.id = `mem${index}`;
            const item = new DivElement('navigator__item').create();
            itemWrapper.appendChild(item);
            this.elem.appendChild(itemWrapper);
        }
        return this.elem;
    }
}