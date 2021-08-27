"use strict";

const accordion = document.querySelector(".prices__accordion");
const accButtons = document.querySelectorAll(".prices__acc-button");
const items = document.querySelectorAll(".prices__item");
const boxes = document.querySelectorAll(".prices__hidden-box");
const icons = document.querySelectorAll(".ph-plus");

let curButton;

accButtons.forEach((b) =>
  b.addEventListener("click", function (e) {
    const item = e.target
      .closest(".prices__item")
      .querySelector(".prices__hidden-box");

    curButton = e.target.closest(".prices__acc-button");
    const icon = curButton.querySelector(".ph-plus");

    if (item.style.maxHeight) {
      item.style.maxHeight = null;
      icon.style.transform = null;
    } else {
      boxes.forEach((b) => (b.style.maxHeight = null));
      icons.forEach((i) => (i.style.transform = null));
      item.style.maxHeight = item.scrollHeight + "px";
      icon.style.transform = "rotate(-45deg)";
    }
  })
);

boxes.forEach((b) =>
  b.addEventListener("transitionend", function (e) {
    const accBtn = e.target
      .closest(".prices__item")
      .querySelector(".prices__acc-button");
    if (accBtn === curButton) accBtn.scrollIntoView({ behavior: "smooth" });
  })
);
