import { memsList, pathToMems } from "./memsList.js";
import { DivElement } from "./classes/DivElement.js";
import { Navigator } from "./classes/Navigator.js";
import { Ball } from "./classes/Ball.js";

let currentMemId = "mem1";

let ball = null;

//!! ***************class
class MemWrapper {
    init() {
        this.fragment = new DivElement().create();
        document.body.appendChild(this.fragment);

        const outerContainer = new DivElement("outer__container").create();
        this.fragment.appendChild(outerContainer);

        const innerContainer = new DivElement("inner__container").create();
        outerContainer.appendChild(innerContainer);

        const screenFrame = new DivElement("screen__frame").create();
        innerContainer.appendChild(screenFrame);

        const framePicture = new DivElement("mem__frame").create();
        framePicture.id = "center";
        screenFrame.appendChild(framePicture);

        const screenTitle = new DivElement("screen_title_wrapper").create();
        const title = document.createElement("input");
        title.type = "text";
        title.id = "title";
        screenTitle.appendChild(title);
        innerContainer.appendChild(screenTitle);

        let memNumbers = Object.keys(memsList).length;
        const navigator = new Navigator("navigation", memNumbers).create(
            memNumbers - 1
        );
        innerContainer.appendChild(navigator);

        ball = new Ball(document.body);

        return this.fragment;
    }
}

//!! *************** shiftTitle
function shiftTitle(id, newTitleValue) {
    const title = document.getElementById("title");
    title.classList.add("title_animated");
    title.addEventListener("transitionend", (ev) => {
        title.value = memsList[currentMemId].title;
        title.classList.remove("title_animated");
    });
}

//!! *************** function
function navItemSChoice(id) {
    // console.log(id);
    if (currentMemId === id) {
        return;
    }

    setNavItemActive(id);

    const currentMem = document.getElementById("center");
    // if (currentMem.dataset.memId < currentMemId) {
    if (currentMem.dataset.memId < id) {
        shiftMem("next", id);
    } else {
        shiftMem("prev", id);
    }
    window.localStorage.setItem("currentMemId", id);
    shiftTitle(id, memsList[currentMemId].title);
    currentMemId = id;
}

//!! *************** setNavItemActive
function setNavItemActive(id) {

    const items = document.querySelectorAll(".navigator_item__wrapper");
    Object.keys(items).forEach((key) => {
        items[key].classList.remove("navigator__item_active");
    });
    document.getElementById(id).classList.add("navigator__item_active");
}

//!! *************** shiftMem
function shiftMem(direction, id) {
    const currentMem = document.getElementById("center");
    const clone = currentMem.cloneNode(true);
    clone.id = "new";
    clone.classList.add(`${direction}_mem`);
    setUrlMem(id, clone);
    switch (direction) {
        case 'prev':
            currentMem.insertAdjacentElement("beforeBegin", clone);
            break;

        case 'next':
            currentMem.insertAdjacentElement("afterEnd", clone);
            break;

        default:
            break;
    }

    clone.addEventListener("animationend", () => {
        document.getElementById("center").remove();
        clone.classList.remove(`${direction}_mem`);
        clone.id = "center";
    });
}
//!! *************** setUrlMem
function setUrlMem(id, imgNode) {
    imgNode.style.backgroundImage = `url(${pathToMems}${memsList[id].imgUrl})`;
    imgNode.dataset.memId = id;
}

//!! *************** screenTitleSelect
function screenTitleSelect(ev) {
    if (ev.type === "mousedown") {
        ball.showBall(ev);
        document.addEventListener("mousemove", (ev) => {
            ball.follow(ev);
        });
    }
}


function handleMouseUpOnBall(ev) {
    navItemSChoice(ev.target.dataset.id);
    ball.hideBall();
    ev.target.removeEventListener("mouseup", handleMouseUpOnBall)
}
//!! *************** main code
document.addEventListener("DOMContentLoaded", () => {
    new MemWrapper().init();

    //initial set mem id
    currentMemId = window.localStorage.getItem("currentMemId");
    if (!Object.keys(memsList).includes(currentMemId)) {
        currentMemId = "mem1";
    }

    setNavItemActive(currentMemId);
    setUrlMem(currentMemId, document.getElementById("center"));
    document.getElementById("center").dataset.memId = currentMemId;

    const title = document.getElementById("title");
    title.value = memsList[currentMemId].title;
    title.addEventListener("mousedown", screenTitleSelect);
    title.addEventListener("mouseup", screenTitleSelect);
    title.addEventListener("change", (ev) => {
        memsList[currentMemId].title = title.value;
    });
    title.addEventListener("dblclick", () => {
        return false;
    });

    const nav = document.querySelector(".navigator__container");
    const ballElement = document.getElementById('ball');

    nav.addEventListener("mousedown", (ev) => {
        let id = ev.target.id;
        if (ev.target.classList.contains('navigator__item')) {
            id = ev.target.parentNode.id;
        }

        ballElement.dataset.id = id;
        ballElement.addEventListener("mouseup", handleMouseUpOnBall);
        ball.showBall(ev);
        document.addEventListener("mousemove", (ev) => {
            ball.follow(ev);
        });
    });

});