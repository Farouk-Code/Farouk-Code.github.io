// @ts-nocheck
/**
 * Sélectionne un élément dans les filtres et met à jour les résultats de la recherche.
 * @param {HTMLElement} selectedElement - L'élément sélectionné dans les filtres.
 * @returns {void}
 */
function selectItem(selectedElement) {
  const filterValue = selectedElement.textContent.toLowerCase();
  if (!selectedFilters.some((filter) => filter.toLowerCase() === filterValue)) {
    selectedFilters.push(filterValue);
    searchByFilters(selectedFilters);
  } else {
    const selectedItemClone = document.querySelector(
      `.selected-item[data-filter="${filterValue}"]`
    );
    if (selectedItemClone) {
      removeSelectedItem(selectedElement, selectedItemClone);
      searchByFilters(selectedFilters);
    }
    updateSelectedVisuals();
  }
}

/**
 * Met à jour la mise en page d'un élément sélectionné dans les filtres.
 * @param {HTMLElement} selectedElement - L'élément sélectionné dans les filtres.
 * @returns {void}
 */
function updateSelectedItemLayout(selectedElement) {
  const filterValue = selectedElement.textContent.trim().toLowerCase();
  const svgDropdown = selectedElement.querySelector("svg");

  if (!selectedElement.classList.contains("selected")) {
    selectedElement.classList.add("selected");
    selectedElement.style.height = "37px";
    selectedElement.setAttribute("data-filter", filterValue);
    const existingClone = document.querySelector(
      `.selected-item[data-filter="${filterValue}"]`
    );

    if (!existingClone) {
      selectedItemClone = document.createElement("p");
      selectedItemClone.textContent = filterValue;
      selectedItemClone.classList.add("selected-item");
      selectedItemClone.setAttribute("data-filter", filterValue);
      selectedItemClone.onclick = function () {
        selectItem(this);
      };
      selectedContainer?.appendChild(selectedItemClone);
    }
  }
  if (!svgDropdown) {
    createDropdownSvg();
  }
  if (!selectedItemClone.querySelector("svg")) {
    createCloneSvg();
  }

  /**
   * Crée un élément SVG à l'intérieur de l'élément sélectionné.
   */
  function createDropdownSvg() {
    var svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("width", "17");
    svgElement.setAttribute("height", "17");
    svgElement.setAttribute("viewBox", "0 0 17 17");
    var circleElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circleElement.setAttribute("cx", "8.5");
    circleElement.setAttribute("cy", "8.5");
    circleElement.setAttribute("r", "8.5");
    circleElement.setAttribute("fill", "black");
    var pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute(
      "d",
      "M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11"
    );
    pathElement.setAttribute("stroke", "#FFD15B");
    pathElement.setAttribute("stroke-linecap", "round");
    pathElement.setAttribute("stroke-linejoin", "round");
    svgElement.appendChild(circleElement);
    svgElement.appendChild(pathElement);
    selectedElement.appendChild(svgElement);
  }

  function createCloneSvg() {
    if (!selectedItemClone) {
      console.error("selectedItemClone non défini");
    }

    var svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("width", "14");
    svgElement.setAttribute("height", "13");
    svgElement.setAttribute("viewBox", "0 0 14 13");
    svgElement.setAttribute("fill", "none");
    var pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute(
      "d",
      "M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5"
    );
    pathElement.setAttribute("stroke", "#1B1B1B");
    pathElement.setAttribute("stroke-width", "2.16667");
    pathElement.setAttribute("stroke-linecap", "round");
    pathElement.setAttribute("stroke-linejoin", "round");
    svgElement.appendChild(pathElement);
    selectedItemClone.appendChild(svgElement);
  }
}

/**
 * Supprime un élément sélectionné des filtres et met à jour l'état de la page si nécessaire.
 * @param {HTMLElement} selectedElement - L'élément sélectionné à supprimer des filtres.
 * @param {HTMLElement} selectedItemClone - Le clone de l'élément sélectionné à supprimer.
 * @returns {void}
 */
function removeSelectedItem(selectedElement, selectedItemClone) {
  const filterValue = selectedElement.textContent.trim().toLowerCase();
  const index = selectedFilters.indexOf(filterValue);
  if (index !== -1) {
    selectedFilters.splice(index, 1);
  }
  if (selectedFilters.length === 0) {
    searchInput.value = "";
    resetPageState();
  }
  selectedElement.classList.remove("selected");
  selectedElement.style.height = "";
  selectedElement.querySelector("svg")?.remove();

  if (document.body.contains(selectedItemClone)) {
    selectedItemClone.querySelector("svg")?.remove();
    selectedItemClone.remove();
  }
}

/**
 * Réinitialise l'état de la page en mettant à jour les options des menus déroulants
 * et en affichant toutes les recettes.
 * @returns {void}
 */
function resetPageState() {
  updateDropdownOptions("ingredients", allIngredients, "ingredient");
  updateDropdownOptions("devices", allDevices, "appliance");
  updateDropdownOptions("utensils", allUstensils, "ustensil");
  fillCards(recipes);
  updateRecipeCount();
}

/**
 * Met à jour la présentation visuelle des éléments sélectionnés dans les filtres
 * en supprimant ceux qui ne sont plus sélectionnés.
 * @returns {void}
 */
function updateSelectedVisuals() {
  const containers = [
    ingredientsListContainer,
    devicesListContainer,
    ustensilsListContainer,
    selectedContainer,
  ];

  for (const container of containers) {
    const allSelectedItems = container.querySelectorAll('[class*="selected"]');

    for (const selectedItem of allSelectedItems) {
      const filterValue = selectedItem.getAttribute("data-filter");
      const selectedItemText = selectedItem.textContent.trim().toLowerCase();

      if (
        !selectedFilters.includes(filterValue) &&
        !selectedFilters.includes(selectedItemText)
      ) {
        removeSelectedItem(selectedItem, null, null);
      }
    }
  }
}
