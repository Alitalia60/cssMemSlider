import { pathToMems, memsList } from "./memsList.js";
import { DivElement } from "./classes/DivElement.js";
import { Navigator } from "./classes/Navigator.js";

let currentMemId = "mem1";

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

    const slidersContainer = new DivElement("sliders__container").create();
    screenFrame.appendChild(slidersContainer);

    const framePicture = slidersContainer.appendChild(
      new DivElement("picture__frame").create()
    );

    const navigator = new Navigator("navigation", 3).create();
    innerContainer.appendChild(navigator);

    const screenTitle = new DivElement("screen__title").create();
    innerContainer.appendChild(screenTitle);

    return this.fragment;
  }
}

//!! *************** function
function itemSelect(ev) {
  if (!ev.target) {
    return;
  }
  if (!ev.target.classList.contains("navigator__item")) {
    return;
  }

  const selectedNavItem = ev.target;

  if (currentMemId === selectedNavItem.id) {
    console.log("nothing to do");
    return;
  }
  const nav = ev.currentTarget;

  // TODO ************ не работает *************debugSection  START*/
  let debugSection = false;
  if (debugSection) {
    let ball = new Ball().create(nav);
    ball.style.top = `${ev.clientY - 15}px`;
    ball.style.left = `${ev.clientX - 15}px`;
    ball.classList.add("ball_animated");
    ball.addEventListener("transitionend", (ev) => {
      console.log(ev);
      ball.classList.remove("ball_animated");
      ball.remove();
      // ball = null;
    });
  }
  // TODO ************ не работает *************debugSection END */

  currentMemId = selectedNavItem.id;
  window.localStorage.setItem("currentMemId", selectedNavItem.id);

  setNavActiveItem(selectedNavItem.id);
  const pictureFrame = document.querySelector(".picture__frame");

  // console.log('pictureFrame.dataset.memId=', pictureFrame.dataset.memId);

  setUrlMem(selectedNavItem.id, pictureFrame);
  changeMem(selectedNavItem.id);
}

//!! *************** setNavActiveItem
function setNavActiveItem(id) {
  //**reset nav items */
  const items = document.querySelectorAll(".navigator__item");
  Object.keys(items).forEach((key) => {
    items[key].classList.remove("navigator__item_active");
  });
  document.getElementById(id).classList.add("navigator__item_active");

  
}

//!! *************** setNavActiveItem
function changeMem(id) {

  const currentMem = document.querySelector(".picture__frame");
  const cloneMem = currentMem.cloneNode(true);
  cloneMem.dataset.memId = id;
  const slider = document.querySelector(".sliders__container");
  setUrlMem(id, cloneMem);
  const title = document.querySelector('.screen__title');
  title.textContent = memsList[id].title;
  
// if (id < currentMem.id) {
//   slider.insertAdjacentElement('beforebegin', currentMem);
// }
// else {
//   slider.insertAdjacentElement('afterend', currentMem);
// }


  if (currentMem.dataset.memId < currentMemId) {
    //добавить картинку справа
    console.log("show next", "добавить картинку справа");

    slider.classList.add("sliders__container_next");
  } else {
    //добавить картинку слева
    console.log("show prev", "добавить картинку слева");
    slider.classList.add("sliders__container_prev");
  }
  
}

//!! *************** setUrlMem
function setUrlMem(id, imgNode) {
  imgNode.style.backgroundImage = `url(${pathToMems}${memsList[id].imgUrl})`;
  imgNode.dataset.memId = id;
}

//!! *************** screenTitleSelect
function screenTitleSelect(ev) {
  console.log("screenTitleSelect");
}

//!! *************** main code
document.addEventListener("DOMContentLoaded", () => {
  new MemWrapper().init();

  currentMemId = window.localStorage.getItem("currentMemId");
  if (!["mem0", "mem1", "mem2", "mem3"].includes(currentMemId)) {
    currentMemId = "mem1";
  }

  setNavActiveItem(currentMemId);
  document.querySelector(".picture__frame").dataset.memId = currentMemId;
  const title = document.querySelector('.screen__title');
  title.textContent = memsList[currentMemId].title;

  const nav = document.querySelector(".navigator__container");
  nav.addEventListener("click", itemSelect);

  const screenTitle = document.querySelector(".screen__title");
  screenTitle.addEventListener("click", screenTitleSelect);
  screenTitle.addEventListener("dblclick", () => {
    return false;
  });
});
