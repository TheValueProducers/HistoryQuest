"use strict";
import {data1} from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  const itemsPerPage = 15;
  let currentPage = 1;
  const totalPages = Math.ceil(data1.length / itemsPerPage);

  const listThoiky = document.querySelector(".list-thoiKy");
  const pagination = document.getElementById("pagination");
  const firstPageBtn = document.getElementById("first-page");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const lastPageBtn = document.getElementById("last-page");

  function renderThoikys(page) {
    listThoiky.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const thoikyToShow = data1.slice(start, end);

    thoikyToShow.forEach((item) => {
      const encodedTitle = encodeURIComponent(item.title);
      const thoikyItem = `
      <div class="thoiKy d-flex column-gap-3">
        <div class="thoiKy-img">
          <img src="../images/${item.id}.png" alt="Ảnh">
        </div>
        <div class="thoiKy-content d-flex flex-column justify-content-center py-2">
          <div class="d-flex justify-content-between align-items-center">
            <h4>
              <a href="./dauAn2.html?title=${encodedTitle}">${item.title}</a>
            </h4>
            <p class="fw-bold text-black m-0">${item.time}</p>
          </div>
          <p class="thoiKy-content-text text-black limited-lines m-0">${item.desc}</p>
        </div>
      </div>
    `;
      listThoiky.innerHTML += thoikyItem;
    });
  }

  function renderPagination() {
    const paginationItems = Array.from(
      pagination.querySelectorAll(".page-item")
    ).slice(2, -2);
    paginationItems.forEach((item) => item.remove());

    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPages, currentPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      const pageItem = document.createElement("li");
      pageItem.classList.add("page-item");
      if (i === currentPage) {
        pageItem.classList.add("active");
      }
      const pageLink = document.createElement("a");
      pageLink.classList.add("page-link");
      pageLink.href = "#";
      pageLink.textContent = i;
      pageLink.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        renderThoikys(currentPage);
        renderPagination();
        updatePagination();
      });
      pageItem.appendChild(pageLink);
      nextPageBtn.parentElement.before(pageItem);
    }
  }

  function updatePagination() {
    prevPageBtn.parentElement.classList.toggle("disabled", currentPage === 1);
    nextPageBtn.parentElement.classList.toggle(
      "disabled",
      currentPage === totalPages
    );
  }

  firstPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentPage = 1;
    renderThoikys(currentPage);
    renderPagination();
    updatePagination();
  });

  prevPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderThoikys(currentPage);
      renderPagination();
      updatePagination();
    }
  });

  nextPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderThoikys(currentPage);
      renderPagination();
      updatePagination();
    }
  });

  lastPageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentPage = totalPages;
    renderThoikys(currentPage);
    renderPagination();
    updatePagination();
  });

  // Khởi tạo hiển thị trang đầu tiên
  renderThoikys(currentPage);
  renderPagination();
  updatePagination();
});
