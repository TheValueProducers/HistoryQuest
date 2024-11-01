"use strict";
import { data1, data2 } from "./data.js";

const getEleByClass = (className) => {
  return document.getElementsByClassName(className);
};
const getEleById = (id) => {
  return document.getElementById(id);
};
const querySelector = (selector) => {
  return document.querySelector(selector);
};
const querySelectorAll = (selector) => {
  return document.querySelectorAll(selector);
};

const leftBtn = querySelector(".left-content");
const centerText = querySelector(".center-content");
const rightBtn = querySelector(".right-content");

const menu1 = getEleById("menu1");
const menu2 = getEleById("menu2");
const menu3 = getEleById("menu3");
const dauAnContent = querySelector("#dauAn-content");

const renderMenu = (data) => {
  let content = "";
  content = data.reduce((tdContent, item, index) => {
    tdContent += `
      <div class="itemTitle menuItem">${item.title}</div>
    `;
    return tdContent;
  }, "");
  return content;
};

const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
// Giải mã tiêu đề
const decodedTitle = decodeURIComponent(title);

const renderMenu3 = (key = decodedTitle, load = false) => {
  const listTime = data1.filter(item => item.title === key)[0].content;
  let content = "";
  content = listTime.reduce((tdContent, item, index) => {
    if (index === 0 && load) {
      tdContent += `
      <li class="active menu3-item">
        <p>${item.title}</p>
        <span>(${item.time})</span>
      </li>
    `;
    } else {
      tdContent += `
      <li class="menu3-item">
        <p>${item.title}</p>
        <span>(${item.time})</span>
      </li>
    `;
    }
    return tdContent;
  }, "");
  return content;
};

const renderDauAnContent = (key = decodedTitle, load = false, suKien) => {
  const listTime = data1.filter(item => item.title === key)[0].content;
  let content = "";
  if (load) {
    content = listTime[0].text;
  } else {
    content = listTime.filter(item => item.title === suKien)[0].text;
  }
  return content;
};

function renderPaginationBar(key = decodedTitle) {
  let prev;
  let next;
  data1.forEach((item, index) => {
    if (item.title === key) {
      if (index == 0) {
        next = data1[index + 1];
        querySelector(".icon-prev").style.opacity = "0";
      } else if (index == data1.length - 1) {
        prev = data1[index - 1];
        querySelector(".icon-next").style.opacity = "0";
      } else {
        prev = data1[index - 1];
        next = data1[index + 1];
      }
    }
  });
  leftBtn.querySelector("p").textContent = prev ? prev.title : "";
  centerText.querySelector("p").textContent = key;
  rightBtn.querySelector("p").textContent = next ? next.title : "";
}

if (leftBtn) {
  leftBtn.addEventListener("click", function () {
    const key = leftBtn.querySelector("p").textContent;
    renderPaginationBar(key);
    dauAnContent.innerHTML = renderDauAnContent(key, true);
  });
}

if (rightBtn) {
  rightBtn.addEventListener("click", function () {
    const key = rightBtn.querySelector("p").textContent;
    renderPaginationBar(key);
    dauAnContent.innerHTML = renderDauAnContent(key, true);
  });
}


if (menu1) {
  menu1.innerHTML = renderMenu(data1);
}
if (menu2) {
  menu2.innerHTML = renderMenu(data2);
}
if (menu3) {
  menu3.innerHTML = renderMenu3(decodedTitle, true);
  renderPaginationBar();
}
if (dauAnContent) {
  dauAnContent.innerHTML = renderDauAnContent(decodedTitle, true);
}

const menu3Items = querySelectorAll(".menu3-item");
menu3Items.forEach((item, index) => {
  item.addEventListener("click", function () {
    this.classList.toggle("active");
    const suKien = this.querySelector("p").textContent;
    dauAnContent.innerHTML = renderDauAnContent(decodedTitle, false, suKien);
    menu3Items.forEach((it) => {
      if (it !== this) it.classList.remove("active");
    });
  })
});

console.log(`menu.js`);