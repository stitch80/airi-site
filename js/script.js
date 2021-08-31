"use strict";

const accordion = document.querySelector(".prices__accordion");
const accButtons = document.querySelectorAll(".prices__acc-button");
const items = document.querySelectorAll(".prices__item");
const boxes = document.querySelectorAll(".prices__hidden-box");
const icons = document.querySelectorAll(".ph-plus");
const topButton = document.querySelector(".ion-top-button");
const header = document.querySelector("header");
const body = document.querySelector("body");

const masters = document.querySelector(".section-masters");
const prices = document.querySelector(".section-prices");
const quotes = document.querySelector(".section-quotes");
const contacts = document.querySelector(".section-contacts");
const footerOverlay = document.querySelector(".footer-overlay");
const footerPopup = document.querySelector(".footer-popup");
const footerIcon = document.querySelector(".footer-icon");
const linkMasters = document.querySelector(".footer__link--masters");
const linkPrices = document.querySelector(".footer__link--prices");
const linkQuotes = document.querySelector(".footer__link--quotes");
const linkContacts = document.querySelector(".footer__link--contacts");
const linkOferta = document.querySelector(".footer__oferta-link");

///////////////////////////////////////////
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
