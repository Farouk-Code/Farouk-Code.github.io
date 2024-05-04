// @ts-nocheck
/**
 * Rassemble tous les ingrédients uniques à partir d'une liste de recettes.
 * @param {Array<Object>} recipes - La liste des recettes.
 * @returns {Array<Object>} Un tableau contenant tous les ingrédients uniques.
 */
const allIngredients = recipes.reduce((ingredients, recipe) => {
  for (const ingredient of recipe.ingredients) {
    const ingredientExists = ingredients.some(
      (i) => i.ingredient.toLowerCase() === ingredient.ingredient.toLowerCase()
    );
    if (!ingredientExists) {
      ingredients.push({
        ingredient: ingredient.ingredient.toLowerCase(),
      });
    }
  }
  return ingredients;
}, []);

/**
 * Récupère tous les ingrédients uniques à partir d'une liste de recettes.
 * @param {Array<Object>} results - La liste des recettes.
 * @returns {Array<string>} Un tableau contenant tous les ingrédients uniques.
 */
function getUniqueIngredients(results) {
  const uniqueIngredients = results.reduce((ingredients, recipe) => {
    for (const ingredientObj of recipe.ingredients) {
      const ingredient = ingredientObj.ingredient.toLowerCase();
      const existingIngredient = ingredients.find(
        (i) => i.toLowerCase() === ingredient
      );
      if (!existingIngredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  }, []);
  return uniqueIngredients;
}

const ingredientsListContainer = document.querySelector(".ingredients-dd-list");
const selectedContainer = document.querySelector("#selectedContainer");

ingredientsListContainer.innerHTML = "";

if (selectedContainer.children.length === 0 && results.length === 0) {
  for (const ingredient of allIngredients) {
    const pElement = document.createElement("p");
    pElement.textContent = ingredient.ingredient;
    pElement.onclick = function () {
      selectItem(this);
    };
    ingredientsListContainer.appendChild(pElement);
  }
} else {
  const uniqueIngredients = getUniqueIngredients(results);
  for (const ingredient of uniqueIngredients) {
    const pElement = document.createElement("p");
    pElement.textContent = ingredient.ingredient;
    pElement.onclick = function () {
      selectItem(this);
    };
    ingredientsListContainer.appendChild(pElement);
  }
}
