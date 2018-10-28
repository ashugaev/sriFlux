import { disableScrolling, enableScrolling } from "./ScrollDisable";

export function initPopup() {
  addCloseEvent();
  addOpenEvent();
}

// Переменные, которые будут нужны для закрытия Popup
let targetPageTop, targetPageLeft, targetHeight, targetWidth;

const popupClassName = ".one-more-video-box";
const popUpOpenClass = "absolute-positioned-video";
const bgSelector = document.querySelector(".dark-bg");

function addCloseEvent() {
  document.querySelector("body").addEventListener("mouseup", function(event) {
    if (event.target.classList.contains("videoControllers__closeBtn")) {
      closePopup(event.target.closest(popupClassName));
    }
  });
}

function addOpenEvent() {
  document.querySelectorAll(popupClassName).forEach(el => {
    el.querySelector(".camerasVideo").addEventListener("click", function(
      event
    ) {
      if (event.button === 0) {
        openPopup(el);
      }
    });
  });
}

function openPopup(elem) {
  disableScrolling();
  // Текущая позиция и размеры элемента
  targetPageTop = elem.getBoundingClientRect().top + window.pageYOffset;
  targetPageLeft = elem.getBoundingClientRect().left + window.pageXOffset;
  targetWidth = elem.clientWidth;
  targetHeight = elem.clientHeight;

  // Оставляя элемент на той же позиции сделаем его фиксированным
  elem.style.top = targetPageTop + "px";
  elem.style.left = targetPageLeft + "px";
  elem.style.position = "fixed";
  elem.style.width = targetWidth + "px";
  elem.style.height = targetHeight + "px";
  elem.parentNode.style.height = targetHeight + "px";

  elem.querySelector(".camerasVideo").muted = false;

  bgSelector.style.display = "block";
  // Задержка, что бы не было скачка, перехода на абсолют
  setTimeout(function() {
    elem.classList.add(popUpOpenClass);
    bgSelector.style.opacity = 1;
  }, 50);
}

function closePopup(popup) {
  bgSelector.style.opacity = 0;
  popup.classList.remove("absolute-positioned-video");

  popup.querySelector(".camerasVideo").muted = true;

  setTimeout(() => {
    bgSelector.style.display = "none";
    popup.style.position = "unset";
  }, 1000);

  enableScrolling();
}
