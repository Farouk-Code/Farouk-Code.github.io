// @ts-nocheck
/**
 * Rassemble tous les appareils uniques à partir d'une liste de recettes.
 * @param {Array<Object>} recipes - La liste des recettes.
 * @returns {Array<string>} Un tableau contenant tous les appareils uniques.
 */
const allDevices = recipes.reduce((devices, recipe) => {
  if (!devices.includes(recipe.appliance.toLowerCase())) {
    devices.push(recipe.appliance.toLowerCase());
  }
  return devices;
}, []);

/**
 * Récupère tous les appareils uniques à partir d'une liste de recettes.
 * @param {Array<Object>} results - La liste des recettes.
 * @returns {Array<string>} Un tableau contenant tous les appareils uniques.
 */
function getUniqueDevices(results) {
  const uniqueDevices = results.reduce((devices, recipe) => {
    if (!devices.includes(recipe.appliance.toLowerCase())) {
      devices.push(recipe.appliance.toLowerCase());
    }
    return devices;
  }, []);
  return uniqueDevices;
}

const devicesListContainer = document.querySelector(".devices-dd-list");
devicesListContainer.innerHTML = "";

if (selectedContainer.children.length === 0 && results.length === 0) {
  for (const device of allDevices) {
    const pElement = document.createElement("p");
    pElement.textContent = device;
    pElement.onclick = () => {
      selectItem(this);
    };
    devicesListContainer.appendChild(pElement);
  }
} else {
  const uniqueDevices = getUniqueIngredients(results);
  for (const device of uniqueDevices) {
    const pElement = document.createElement("p");
    pElement.textContent = device;
    pElement.onclick = function () {
      selectItem(this);
    };
    devicesListContainer.appendChild(pElement);
  }
}
