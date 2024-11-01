"use strict";

import { data1 } from "./data.js";

const getEl = (id) => {
  return document.getElementById(id);
};
const btnContents = document.querySelectorAll(".timeLine-item");
const timeLine_textC = document.querySelector(".timeLine_textC");

for (let i = 0; i < btnContents.length; i++)
  btnContents[i].addEventListener("click", function () {
    this.classList.toggle("active");
    btnContents.forEach((item) => {
      if (item !== this) item.classList.remove("active");
    });
    timeLine_textC.innerHTML = `
      <h3>${data1[i].title}</h3>
      <p>${data1[i].desc}</p>
    `;
  });

const timeLineContainer = document.querySelector(".timeLineContainer");

let isDown = false;
let startX;
let scrollLeft;

timeLineContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  timeLineContainer.classList.add("active");
  startX = e.pageX - timeLineContainer.offsetLeft;
  scrollLeft = timeLineContainer.scrollLeft;
});

timeLineContainer.addEventListener("mouseleave", () => {
  isDown = false;
  timeLineContainer.classList.remove("active");
});

timeLineContainer.addEventListener("mouseup", () => {
  isDown = false;
  timeLineContainer.classList.remove("active");
});

timeLineContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - timeLineContainer.offsetLeft;
  const walk = (x - startX) * 1.5; // Số pixel để cuộn
  timeLineContainer.scrollLeft = scrollLeft - walk;
});
