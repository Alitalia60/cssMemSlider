import { memsList, pathToMems } from './memsList.js';
import DivElement from './classes/DivElement.js';
import Navigator from './classes/Navigator.js';
import Ball from './classes/Ball.js';

// import './css/style.css';

let currentMemId = 'mem1';

let ball = null;

//! ! ***************class
class MemWrapper {
    init() {
        this.fragment = new DivElement().create();
        document.body.appendChild(this.fragment);

        const outerContainer = new DivElement('outer__container').create();
        this.fragment.appendChild(outerContainer);

        const innerContainer = new DivElement('inner__container').create();
        outerContainer.appendChild(innerContainer);

        const screenFrame = new DivElement('screen__frame').create();
        innerContainer.appendChild(screenFrame);

        const framePicture = new DivElement('mem__frame').create();
        framePicture.id = 'center';
        screenFrame.appendChild(framePicture);

        const screenTitle = new DivElement('screen_title_wrapper').create();
        // const title = document.createElement('input');
        // title.type = 'text';
        // title.id = 'title';
        const title = document.createElement('textarea');
        // title.type = 'text';
        title.id = 'title';
        title.maxLength = 30;
        title.title = 'allowed up to 30 symbols';
        title.style.resize = 'none';

        screenTitle.appendChild(title);
        innerContainer.appendChild(screenTitle);

        const memNumbers = Object.keys(memsList).length;
        const navigator = new Navigator('navigation', memNumbers).create(memNumbers - 1);
        innerContainer.appendChild(navigator);

        ball = new Ball(document.body);

        return this.fragment;
    }
}

//! ! *************** shiftTitle
function shiftTitle() {
    const title = document.getElementById('title');
    title.classList.add('title_animated');
    title.addEventListener('transitionend', () => {
        title.value = memsList[currentMemId].title;

        title.classList.remove('title_animated');
    });
}

//! ! *************** setNavItemActive
function setNavItemActive(id) {
    const items = document.querySelectorAll('.navigator_item__wrapper');
    Object.keys(items).forEach((key) => {
        items[key].classList.remove('navigator__item_active');

        items[key].querySelector('.navigator__item').classList.remove('navigator__item_hovered');
    });
    document.getElementById(id).classList.add('navigator__item_active');
}

//! ! *************** setUrlMem
function setUrlMem(id, imgNode) {
    const backGroundImgNode = imgNode;
    backGroundImgNode.style.backgroundImage = `url(${pathToMems}${memsList[id].imgUrl})`;
    backGroundImgNode.dataset.memId = id;
}

//! ! *************** shiftMem
function shiftMem(direction, id) {
    const currentMem = document.getElementById('center');
    const clone = currentMem.cloneNode(true);
    clone.id = 'new';
    clone.classList.add(`${direction}_mem`);
    setUrlMem(id, clone);
    currentMem.insertAdjacentElement(
        direction === 'next' ? 'afterEnd' : 'beforeBegin',
        clone,
    );

    clone.addEventListener('animationend', () => {
        document.getElementById('center').remove();
        clone.classList.remove(`${direction}_mem`);
        clone.id = 'center';
    });
}

//! ! *************** function
function executeMemChoice() {
    const ballElement = document.getElementById('ball');
    ballElement.removeEventListener('mouseup', executeMemChoice);
    ball.hideBall();
    setNavItemActive(currentMemId);

    const currentMem = document.getElementById('center');
    if (currentMem.dataset.memId < currentMemId) {
        shiftMem('next', currentMemId);
    } else {
        shiftMem('prev', currentMemId);
    }
    shiftTitle();
}

//! ! *************** function
function followBall() {
    document.addEventListener('mousemove', (event) => {
        ball.follow(event);
    });
}

//! ! *************** function
function navItemSChoice(ev) {
    console.log('nav.event=', ev.type);
    if (!ev.target) {
        return;
    }
    let selectedNavItem = null;
    if (ev.target.classList.contains('navigator_item__wrapper')) {
        selectedNavItem = ev.target;
    } else if (
        ev.target.parentNode.classList.contains('navigator_item__wrapper')
    ) {
        selectedNavItem = ev.target.parentNode;
    }
    const { id } = selectedNavItem;
    if (currentMemId === id) {
        return;
    }

    currentMemId = id;

    window.localStorage.setItem('currentMemId', id);

    ball.showBall(ev);
    followBall();
    const ballElement = document.getElementById('ball');
    ballElement.addEventListener('mouseup', executeMemChoice);
    selectedNavItem.querySelector('.navigator__item').classList.add('navigator__item_hovered');
}

//! ! *************** screenTitleSelect
function screenTitleSelect(ev) {
    ball.showBall(ev);
    followBall();
    document.getElementById('ball').addEventListener('mouseup', () => {
        ball.hideBall();
        document.getElementById('ball').removeEventListener('mousemove',
        );
    });
}

//! ! *************** main code
document.addEventListener('DOMContentLoaded', () => {
    new MemWrapper().init();

    currentMemId = window.localStorage.getItem('currentMemId');
    if (!['mem0', 'mem1', 'mem2', 'mem3'].includes(currentMemId)) {
        currentMemId = 'mem1';
    }

    setNavItemActive(currentMemId);
    setUrlMem(currentMemId, document.getElementById('center'));
    document.getElementById('center').dataset.memId = currentMemId;

    const title = document.getElementById('title');
    title.value = memsList[currentMemId].title;
    title.addEventListener('mousedown', screenTitleSelect);
    title.addEventListener('change', () => {
        memsList[currentMemId].title = title.value;
    });

    const nav = document.querySelector('.navigator__container');
    nav.addEventListener('mousedown', navItemSChoice);

    const screenTitle = document.getElementById('title');
    screenTitle.addEventListener('dblclick', () => false);
});