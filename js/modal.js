"use strict";

import { dataForHome } from "./data.js";

// render modal

function renderToDo() {
  let content = "";
  //Duyệt mảng từ phải qua trái (bắt đầu ở phần tử cuối mảng)
  content = dataForHome.reduceRight((tdContent, item, index) => {
    //tdContent = tdContent(noi dung cũ) + `nội dung mới`;
    tdContent += `
          <div id="modal${index}" class="customModal hidden">
            <button id="close-modal${index}" class="close-modal">&times;</button>
            <h1>${item.title}</h1>
            <img src="./images/${item.id}.png" alt="logo">
            <p>${item.desc}</p>
          </div>
      `;
    return tdContent;
  }, "");
  return content;
}
document.querySelector("body").innerHTML += renderToDo();

const getEl = (id) => {
  return document.getElementById(id);
};
const modals = document.querySelectorAll(".customModal");
const btnCloseModal = document.querySelectorAll(".close-modal");
// const btnsOpenModal = document.querySelectorAll(".show-modal");
const milestones = document.querySelectorAll(".milestone");
const overlay = document.querySelector(".overlay");

const closeModal = () => {
  modals.forEach((modal) => modal.classList.add("hidden"));
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", function () {
//     getEl(`modal${i}`).classList.remove("hidden");
//     overlay.classList.remove("hidden");
//   });

for (let i = 0; i < btnCloseModal.length; i++)
  btnCloseModal[i].addEventListener("click", closeModal);

for (let i = 0; i < milestones.length; i++)
  milestones[i].addEventListener("click", function () {
    getEl(`modal${i}`).classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
