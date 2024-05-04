// @ts-nocheck
/**
 * Met à jour le compteur de recettes sur la page.
 * @function updateRecipeCount
 * @returns {void}
 */
function updateRecipeCount() {
  const recipeCountElement = document.querySelector("#number-recipes");
  const visibleRecipeCards = document.querySelectorAll(".recipe-container");
  const numberOfRecipe = visibleRecipeCards.length;
  let recipeText;

  if (numberOfRecipe === 0) {
    recipeText = "Aucune recette";
  } else {
    recipeText = numberOfRecipe === 1 ? "recette" : "recettes";
  }
  recipeCountElement.textContent =
    numberOfRecipe === 0 ? recipeText : `${numberOfRecipe} ${recipeText}`;
}

/**
 * Remplit le conteneur des cartes de recettes avec les résultats donnés.
 * Efface d'abord le contenu précédent du conteneur.
 * Si aucun résultat n'est trouvé, affiche un message approprié.
 * @param {Array<Object>} results - Les résultats de la recherche de recettes.
 * @returns {void}
 */
function fillCards(results) {
  const recipesContainer = document.querySelector("#cards-container");
  recipesContainer.innerHTML = "";
  if (results.length === 0) {
    const message = document.createElement("p");
    message.textContent = `Aucune recette ne contient ${searchInput.value}, vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    recipesContainer.appendChild(message);
    updateRecipeCount();
  } else {
    for (let i = 0; i < results.length; i++) {
      const recipe = results[i];
      const card = createRecipeCard(recipe, i);
      recipesContainer.appendChild(card);
    }
    updateRecipeCount();
  }
}

/**
 * Crée une carte représentant une recette à partir des données fournies.
 * @param {Object} recipe - Les données de la recette à afficher dans la carte.
 * @param {number} index - L'indice de la recette dans la liste des résultats.
 * @returns {HTMLElement} Un élément HTML représentant la carte de recette.
 */
function createRecipeCard(recipe, index) {
  const card = document.createElement("div");
  card.classList.add("recipe-container");
  card.id = `recipe-container-${index + 1}`;
  const article = document.createElement("article");
  article.classList.add("recipes-card");
  const image = document.createElement("img");
  image.src = `./images/Recettes/${recipe.image}`;
  image.alt = recipe.name;
  image.classList.add("recipe-image");
  const recipeTime = document.createElement("div");
  recipeTime.classList.add("recipe-time");
  recipeTime.textContent = `${recipe.time}min`;
  const containerCardText = document.createElement("div");
  containerCardText.classList.add("container-card-text");
  const recipeName = document.createElement("h1");
  recipeName.textContent = recipe.name;
  const recipeHeading = document.createElement("h2");
  recipeHeading.textContent = "Recette";
  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("description-container");
  const recipeDescription = document.createElement("div");
  recipeDescription.classList.add("recipe-description");
  recipeDescription.textContent = recipe.description;
  const ingredientHeading = document.createElement("h2");
  ingredientHeading.textContent = "Ingrédients";
  const recipeIngredients = document.createElement("div");
  recipeIngredients.classList.add("recipe-ingredients");

  for (let i = 0; i < recipe.ingredients.length; i++) {
    const ingredient = recipe.ingredients[i];
    const ingredientContainer = document.createElement("div");
    ingredientContainer.classList.add(`ingredient${i + 1}`);

    const ingredientName = document.createElement("p");
    ingredientName.classList.add("ingredient-name");
    ingredientName.textContent = ingredient.ingredient;

    const ingredientQuantity = document.createElement("p");
    ingredientQuantity.classList.add("ingredient-quantity");
    ingredientQuantity.textContent = `${
      ingredient.quantity !== undefined ? ingredient.quantity : "-"
    } ${ingredient.unit !== undefined ? ingredient.unit : ""}`;

    ingredientContainer.appendChild(ingredientName);
    ingredientContainer.appendChild(ingredientQuantity);
    recipeIngredients.appendChild(ingredientContainer);
  }

  descriptionContainer.appendChild(recipeDescription);
  containerCardText.appendChild(recipeName);
  containerCardText.appendChild(recipeHeading);
  containerCardText.appendChild(descriptionContainer);
  containerCardText.appendChild(ingredientHeading);
  containerCardText.appendChild(recipeIngredients);
  article.appendChild(image);
  article.appendChild(recipeTime);
  article.appendChild(containerCardText);
  card.appendChild(article);

  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  const recipeDescriptions = document.querySelectorAll(".recipe-description");
  const containerCardTexts = document.querySelectorAll(".container-card-text");

  for (let i = 0; i < recipeDescriptions.length; i++) {
    const recipeDescription = recipeDescriptions[i];
    recipeDescription.addEventListener("mouseover", () => {
      containerCardTexts[i].style.height = "100%";
    });

    recipeDescription.addEventListener("mouseout", () => {
      containerCardTexts[i].style.height = "478px";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fillCards(recipes);
  updateRecipeCount();
});
