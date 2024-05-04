// @ts-nocheck
const ingredientsDropdown = document.querySelector(".ingredients-dropdawn");
const devicesDropdown = document.querySelector(".devices-dropdawn");
const utensilsDropdown = document.querySelector(".utensils-dropdawn");
const ingredientsDropdawnVisiblePart = document.querySelector(
  ".ingredients-dd-visible-part"
);
const devicesDropdownVisiblePart = document.querySelector(
  ".devices-dd-visible-part"
);
const utensilsDropdownVisiblePart = document.querySelector(
  ".utensils-dd-visible-part"
);
const dropdownArrow1 = document.querySelector("#dropdownArrow1");
const dropdownArrow2 = document.querySelector("#dropdownArrow2");
const dropdownArrow3 = document.querySelector("#dropdownArrow3");

ingredientsDropdawnVisiblePart?.addEventListener("click", () => {
  dropdownArrow1?.classList.toggle("rotate180");
  ingredientsDropdown?.classList.toggle("open");
});

devicesDropdownVisiblePart?.addEventListener("click", () => {
  dropdownArrow2?.classList.toggle("rotate180");
  devicesDropdown?.classList.toggle("open");
});

utensilsDropdownVisiblePart?.addEventListener("click", () => {
  dropdownArrow3?.classList.toggle("rotate180");
  utensilsDropdown?.classList.toggle("open");
});

const ingredientsDropdownInput = document.getElementById(
  "ingredients-dd-input"
);
ingredientsDropdownInput.addEventListener("input", () => {
  const inputValue = ingredientsDropdownInput.value.toLowerCase();
  const specificListContainer = document.getElementById("ingredients-dd-list");
  const options = specificListContainer.querySelectorAll("p");
  for (const option of options) {
    const optionText = option.textContent.toLowerCase();
    const isMatch = optionText.includes(inputValue);
    option.style.display = isMatch ? "flex" : "none";
  }
});

const devicesDropdownInput = document.getElementById("devices-dd-input");
devicesDropdownInput.addEventListener("input", () => {
  const inputValue = devicesDropdownInput.value.toLowerCase();
  const specificListContainer = document.getElementById("devices-dd-list");
  const options = specificListContainer.querySelectorAll("p");
  for (const option of options) {
    const optionText = option.textContent.toLowerCase();
    const isMatch = optionText.includes(inputValue);
    option.style.display = isMatch ? "flex" : "none";
  }
});

const utensilsDropdownInput = document.getElementById("utensils-dd-input");
utensilsDropdownInput.addEventListener("input", () => {
  const inputValue = utensilsDropdownInput.value.toLowerCase();
  const specificListContainer = document.getElementById("utensils-dd-list");
  const options = specificListContainer.querySelectorAll("p");
  for (const option of options) {
    const optionText = option.textContent.toLowerCase();
    const isMatch = optionText.includes(inputValue);
    option.style.display = isMatch ? "flex" : "none";
  }
});
