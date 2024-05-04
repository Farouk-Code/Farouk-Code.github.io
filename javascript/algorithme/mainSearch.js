// @ts-nocheck
/**
 * Gère la recherche en fonction de la saisie utilisateur dans la barre de recherche.
 * @returns {void}
 */
function handleSearch() {
  const userInput = searchInput.value.toLowerCase();
  if (userInput.length >= 3) {
    selectedFilters = [];
    results = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const titleMatch = recipe.name.toLowerCase().includes(userInput);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(userInput)
      );
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(userInput);

      if (titleMatch || ingredientsMatch || descriptionMatch) {
        results.push(recipe);
      }
    }

    updateSearchResults(results);
    fillCards(results);
  } else {
    resetRecipes();
  }
}

/**
 * Recherche des recettes en fonction des filtres sélectionnés.
 * Utilisation de la méthode filter()
 * @param {Array<string>} selectedFilters - Les filtres sélectionnés par l'utilisateur.
 * @returns {void}
 */
function searchByFilters(selectedFilters) {
  results = recipes.filter((recipe) => {
    return selectedFilters.every((filter) => {
      if (
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())
        )
      ) {
        return true;
      } else if (
        recipe.appliance.toLowerCase().includes(filter.toLowerCase())
      ) {
        return true;
      } else if (
        recipe.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(filter.toLowerCase())
        )
      ) {
        return true;
      } else {
        return false;
      }
    });
  });
  updateSearchResults(results);
  fillCards(results);
}

/**
 * Met à jour les résultats de la recherche en fonction des recettes filtrées.
 * @param {Array<Object>} results - Les résultats de la recherche de recettes.
 * @returns {void}
 */
function updateSearchResults(results) {
  const uniqueIngredients = getUniqueIngredients(results);
  const uniqueDevices = getUniqueDevices(results);
  const uniqueUstensils = getUniqueUstensils(results);

  updateDropdownOptions("ingredients", allIngredients, "ingredient");
  updateDropdownOptions("devices", allDevices, "appliance");
  updateDropdownOptions("utensils", allUstensils, "ustensil");

  const containers = [
    ingredientsListContainer,
    devicesListContainer,
    ustensilsListContainer,
  ];

  for (const filter of selectedFilters) {
    const isInIngredients = uniqueIngredients.includes(filter);
    const isInDevice = uniqueDevices.includes(filter);
    const isInUstensils = uniqueUstensils.includes(filter);
    if (isInIngredients || isInDevice || isInUstensils) {
      const dropdownElement = findDropdownElementByText(filter, containers);
      if (dropdownElement) {
        updateSelectedItemLayout(dropdownElement);
      }
    }
  }
}

/**
 * Recherche un élément de menu déroulant par son texte dans une liste de conteneurs.
 * @param {string} text - Le texte à rechercher dans les éléments de menu déroulant.
 * @param {Array<HTMLElement>} containers - Les conteneurs HTML dans lesquels effectuer la recherche.
 * @returns {HTMLElement|null} L'élément de menu déroulant trouvé ou null s'il n'est pas trouvé.
 */
function findDropdownElementByText(text, containers) {
  for (const container of containers) {
    const allDropdownElements = container.querySelectorAll("p");

    for (const element of allDropdownElements) {
      if (
        element.textContent.trim().toLowerCase() === text.trim().toLowerCase()
      ) {
        return element;
      }
    }
  }
  return null;
}

/**
 * Réinitialise l'affichage des recettes pour afficher toutes les recettes disponibles.
 * @returns {void}
 */
function resetRecipes() {
  fillCards(recipes);
  updateRecipeCount();
}

/**
 * Met à jour les options d'un menu déroulant avec les options fournies.
 * @param {string} dropdownOption - L'identifiant de l'élément du menu déroulant à mettre à jour.
 * @param {Array<string|Object>} options - Les options à afficher dans le menu déroulant.
 * @param {string} property - La propriété des objets à utiliser comme texte d'option.
 * @returns {void}
 */
function updateDropdownOptions(dropdownOption, options, property) {
  const dropdownId = `${dropdownOption}-dd-list`;
  const dropdown = document.getElementById(dropdownId);

  if (!dropdown) {
    console.error(`Dropdown avec l'ID ${dropdownId} non trouvé`);
    return;
  }

  dropdown.innerHTML = "";

  for (const option of options) {
    const optionElement = document.createElement("p");

    if (typeof option === "string") {
      optionElement.textContent = option.toLowerCase();
    } else if (typeof option === "object" && property in option) {
      optionElement.textContent = option[property].toLowerCase();
    } else {
      console.error(`Format d'option non valide : ${option}`);
      return;
    }
    optionElement.onclick = function () {
      selectItem(this);
    };
    dropdown.appendChild(optionElement);
  }
}

searchInput.addEventListener("input", () => {
  handleSearch();
});
