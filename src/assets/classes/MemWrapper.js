import DivElement from './DivElement';
import Navigator from './Navigator';

export default class MemWrapper {
  init() {
    // this.fragment = document.createDocumentFragment();
    this.fragment = new DivElement().create();
    document.body.appendChild(this.fragment);

    const outerContainer = new DivElement('outer_container').create();
    this.fragment.appendChild(outerContainer);

    const innerContainer = new DivElement('inner_container').create();
    outerContainer.appendChild(innerContainer);

    const pictureFrame = new DivElement('picture_frame').create();
    innerContainer.appendChild(pictureFrame);

    const screenTitle = new DivElement('screen_title', 'here`s mem').create();
    innerContainer.appendChild(screenTitle);

    const navigator = new Navigator('navigation', 3).create();
    innerContainer.appendChild(navigator);

    return this.fragment;
  }
}
