class DivElement {
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

class Navigator {
  className = '';

  itemNumber = 1;

  elem = null;

  constructor(className = '', itemNumber = 4) {
    this.className = className;
    this.itemNumber = itemNumber;
  }

  create() {
    this.elem = new DivElement('navigator__container').create();
    for (let index = 0; index <= this.itemNumber; index += 1) {
      this.elem.appendChild(new DivElement('navigator__item').create());
    }
    return this.elem;
  }
}

class MemWrapper {
  init() {
    // this.fragment = document.createDocumentFragment();
    this.fragment = new DivElement().create();
    document.body.appendChild(this.fragment);

    const outerContainer = new DivElement('outer__container').create();
    this.fragment.appendChild(outerContainer);

    const innerContainer = new DivElement('inner__container').create();
    outerContainer.appendChild(innerContainer);

    const pictureFrame = new DivElement('picture__frame').create();
    innerContainer.appendChild(pictureFrame);

    const screenTitle = new DivElement('screen__title', 'here`s mem').create();
    innerContainer.appendChild(screenTitle);

    const navigator = new Navigator('navigation', 3).create();
    innerContainer.appendChild(navigator);

    return this.fragment;
  }
}
function ballHundle(ev) {
  const ball = document.querySelector('.ball');
  if (ev.type === 'mouseenter') {
    ball.classList.add('ball_visible');
  }
  if (ev.type === 'mouseleave') {
    ball.classList.remove('ball_visible');
  }
  // console.log('over ', ev.target);
  // console.log(ev);
}

function itemSelect(ev) {
  const nav = document.querySelector('.navigator__container');
  const items = nav.querySelectorAll('.navigator__item');
  Object.keys(items).forEach((key) => {
    items[key].classList.remove('navigator__item_active');
  });
  ev.currentTarget.classList.add('navigator__item_active');
  // console.log(ev.clientX, ev.clientY);
}

function folowCoords(ev) {
  // const ball = document.querySelector('.ball');
  // ball.style.top = `${ev.pageY}px`;
  // ball.style.left = `${ev.pageX}px`;
  console.log(ev.clientX, ev.clientY);
}

document.addEventListener('DOMContentLoaded', () => {
  new MemWrapper().init();
  const nav = document.querySelector('.navigator__container');
  const items = nav.querySelectorAll('.navigator__item');
  items[0].classList.add('navigator__item_active');

  Object.keys(items).forEach((key) => {
    items[key].addEventListener('click', itemSelect);
  });

  const ball = document.createElement('div');
  nav.appendChild(ball);
  ball.style.top = '0';
  ball.style.left = '0';
  ball.classList.add('ball');
  // nav.addEventListener('mouseover', ballHundle);
  nav.addEventListener('mouseenter', ballHundle);
  nav.addEventListener('mouseleave', ballHundle);
  nav.addEventListener('mousemove', folowCoords);
});
