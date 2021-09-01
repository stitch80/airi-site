"use strict";

const accordion = document.querySelector(".prices__accordion");
const accButtons = document.querySelectorAll(".prices__acc-button");
const items = document.querySelectorAll(".prices__item");
const boxes = document.querySelectorAll(".prices__hidden-box");
const icons = document.querySelectorAll(".ph-plus");
const topButton = document.querySelector(".ion-top-button");
const header = document.querySelector("header");
const body = document.querySelector("body");
const photos = document.querySelectorAll(".photos__item");
const carouselItems = document.querySelectorAll(".popup__carousel-item");
const popup = document.querySelector(".popup");

const masters = document.querySelector(".section-masters");
const prices = document.querySelector(".section-prices");
const quotes = document.querySelector(".section-quotes");
const contacts = document.querySelector(".section-contacts");
const footerOverlay = document.querySelector(".footer-overlay");
const footerPopup = document.querySelector(".footer-popup");
const footerIcon = document.querySelector(".footer-icon");
const linkHeadMasters = document.querySelector(".header__nav-link--masters");
const linkHeadPrices = document.querySelector(".header__nav-link--prices");
const linkHeadQuotes = document.querySelector(".header__nav-link--quotes");
const linkHeadContacts = document.querySelector(".header__nav-link--contacts");
const linkMasters = document.querySelector(".footer__link--masters");
const linkPrices = document.querySelector(".footer__link--prices");
const linkQuotes = document.querySelector(".footer__link--quotes");
const linkContacts = document.querySelector(".footer__link--contacts");
const linkOferta = document.querySelector(".footer__oferta-link");

const animatedText = document.querySelector(".animated-logo__logo-text p");
///////////////////////////////////////////
// ANIMATED LOGO

animatedText.innerHTML = animatedText.innerText
  .split("")
  .map(
    (char, i) => `<span style='transform:rotate(${i * 8.4}deg)'>${char}</span>`
  )
  .join("");

// BUTTON TO TOP

topButton.addEventListener("click", function (e) {
  document.querySelector("header").scrollIntoView({ behavior: "smooth" });
});

const stickyButton = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    topButton.classList.remove("hidden");
  } else {
    topButton.classList.add("hidden");
  }
};

const topButtonObserver = new IntersectionObserver(stickyButton, {
  root: null,
  threshold: 0,
});
topButtonObserver.observe(header);

///////////////////////////////////////////
// ACCORDION
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

// SCROLL TO CURRENT PANEL OF ACCORDION
boxes.forEach((b) =>
  b.addEventListener("transitionend", function (e) {
    const accBtn = e.target
      .closest(".prices__item")
      .querySelector(".prices__acc-button");
    if (accBtn === curButton) accBtn.scrollIntoView({ behavior: "smooth" });
  })
);

// HEADER NAV LINKS
linkHeadMasters.addEventListener("click", function () {
  masters.scrollIntoView({ behavior: "smooth" });
});
linkHeadPrices.addEventListener("click", function () {
  prices.scrollIntoView({ behavior: "smooth" });
});
linkHeadQuotes.addEventListener("click", function () {
  quotes.scrollIntoView({ behavior: "smooth" });
});
linkHeadContacts.addEventListener("click", function () {
  contacts.scrollIntoView({ behavior: "smooth" });
});

// FOOTER NAV LINKS
linkMasters.addEventListener("click", function () {
  masters.scrollIntoView({ behavior: "smooth" });
});
linkPrices.addEventListener("click", function () {
  prices.scrollIntoView({ behavior: "smooth" });
});
linkQuotes.addEventListener("click", function () {
  quotes.scrollIntoView({ behavior: "smooth" });
});
linkContacts.addEventListener("click", function () {
  contacts.scrollIntoView({ behavior: "smooth" });
});

// FOOTER POPUP
linkOferta.addEventListener("click", function () {
  footerPopup.classList.remove("hidden");
  footerOverlay.classList.remove("hidden");
  // document.body.style.overflowY = "hidden";
  body.style.overflowY = "hidden";
});

const closePopup = function () {
  footerPopup.classList.add("hidden");
  footerOverlay.classList.add("hidden");
  body.style.overflowY = null;
};

footerOverlay.addEventListener("click", function (e) {
  if (e.target === footerPopup) {
    closePopup();
  }
});

footerIcon.addEventListener("click", function () {
  closePopup();
});

footerOverlay.addEventListener("mouseover", function (e) {
  // console.log(e.target);
  if (e.target === footerPopup) {
    footerOverlay.style.cursor = "pointer";
  }
});

footerOverlay.addEventListener("mouseout", function (e) {
  // console.log(e.target);
  if (e.target === footerPopup) {
    footerOverlay.style.cursor = null;
  }
});

// CAROUSEL

let curPhoto = 0;

photos.forEach((p) =>
  p.addEventListener("click", function (e) {
    popup.classList.remove("hidden");
    curPhoto = e.target.dataset.photo;
    initState(Number.parseInt(curPhoto));
    body.style.overflowY = "hidden";
  })
);

const initState = function (item) {
  const centerItem = document.querySelector(`.popup__carousel-item--${item}`);
  centerItem.classList.remove("hidden");

  const leftId = item === 1 ? 8 : item - 1;
  const leftItem = document.querySelector(`.popup__carousel-item--${leftId}`);
  leftItem.classList.remove("hidden");
  leftItem.classList.add("setLeft");

  const rightId = item === 8 ? 1 : item + 1;
  const rightItem = document.querySelector(`.popup__carousel-item--${rightId}`);
  rightItem.classList.remove("hidden");
  rightItem.classList.add("setRight");
};

const controlBack = document.querySelector(".popup__carousel-control--back");
controlBack.addEventListener("click", function () {
  carouselItems.forEach(function (ci) {
    ci.classList.add("hidden");
    ci.classList.remove("setLeft");
    ci.classList.remove("setRight");
  });
  curPhoto = Number.parseInt(curPhoto) === 1 ? 8 : curPhoto - 1;
  console.log(curPhoto);
  initState(Number.parseInt(curPhoto));
});

const controlForward = document.querySelector(
  ".popup__carousel-control--forward"
);
controlForward.addEventListener("click", function () {
  carouselItems.forEach(function (ci) {
    ci.classList.add("hidden");
    ci.classList.remove("setLeft");
    ci.classList.remove("setRight");
  });
  curPhoto =
    Number.parseInt(curPhoto) === 8 ? 1 : Number.parseInt(curPhoto) + 1;
  console.log(curPhoto);
  initState(Number.parseInt(curPhoto));
});

const controlClose = document.querySelector(".popup__carousel-control--close");
controlClose.addEventListener("click", function () {
  carouselItems.forEach(function (ci) {
    ci.classList.add("hidden");
    ci.classList.remove("setLeft");
    ci.classList.remove("setRight");
  });
  curPhoto = 0;
  popup.classList.add("hidden");
  body.style.overflowY = null;
});
