// @ts-nocheck
const searchInput = document.querySelector("#search-input");
const searchClose = document.querySelector("#search-close");

searchInput?.addEventListener("input", () => {
  if (searchInput.value) {
    searchClose.style.display = "block";
  } else {
    searchClose.style.display = "none";
  }
});

searchClose.addEventListener("click", () => {
  searchInput.value = "";
  searchClose.style.display = "none";
});
