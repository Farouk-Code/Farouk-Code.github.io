// @ts-ignore
function editNav() {
  var x = document.getElementById("myTopnav");
  // @ts-ignore
  if (x.className === "topnav") {
    // @ts-ignore
    x.className += " responsive";
  } else {
    // @ts-ignore
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtns = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModal = document.querySelectorAll(".close");
const content = document.querySelector(".content");
const postModal = document.querySelector(".postRegisterModal");
const postClose = document.querySelector(".postRegisterClose");
const postBtnClose = document.querySelector(".post-btn-close");
const postContent = document.querySelector(".postRegisterContent");

// -------------- REGISTRATION MODAL --------------

const launchModal = () => {
  // @ts-ignore
  modalBg.style.display = "block";
  content?.classList.remove("hide-modal");
};

for (let btn of modalBtns) {
  btn.addEventListener("click", launchModal);
}

const handleCloseModal = () => {
  content?.classList.add("hide-modal");
  content?.addEventListener("animationend", (event) => {
    // @ts-ignore
    if (event.animationName === "modalclose") {
      // @ts-ignore
      modalBg.style.display = "none";
      content.classList.remove("hide-modal");
    }
  });
};

for (let element of closeModal) {
  element.addEventListener("click", handleCloseModal);
}

// -------------- POST REGISTRATION MODAL --------------

const launchM = () => {
  // @ts-ignore
  postModal.style.display = "block";
  postContent?.classList.remove("hide-modal");
};

const handleM = () => {
  postContent?.classList.add("hide-modal");
  // @ts-ignore
  postModal.style.display = "none";
};

postClose?.addEventListener("click", handleM);
postBtnClose?.addEventListener("click", handleM);

// -------------- FORM VALIDATION --------------

const validateName = (input, errorElement) => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;
  if (regex.test(input.value)) {
    errorElement.style.display = "none";
    input.classList.remove("field-error");
    return true;
  } else {
    errorElement.style.display = "block";
    input.classList.add("field-error");
    return false;
  }
};

const validateEmail = (input, errorElement) => {
  const regex = /^[A-Za-z]{1,}[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/;
  if (regex.test(input.value)) {
    errorElement.style.display = "none";
    input.classList.remove("field-error");
    return true;
  } else {
    errorElement.style.display = "block";
    input.classList.add("field-error");
    return false;
  }
};

const validateBirthDate = (input, errorElement) => {
  if (input.value === "") {
    errorElement.style.display = "block";
    input.classList.add("field-error");
    return false;
  } else {
    const birthDate = new Date(input.value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (age < 12 || age > 100) {
      errorElement.style.display = "block";
      input.classList.add("field-error");
      return false;
    } else {
      errorElement.style.display = "none";
      input.classList.remove("field-error");
      return true;
    }
  }
};

const validateQuantity = (input, errorElement) => {
  if (input.value === "") {
    errorElement.style.display = "block";
    input.classList.add("field-error");
    return false;
  } else {
    errorElement.style.display = "none";
    input.classList.remove("field-error");
    return true;
  }
};

const validateLocation = (inputs, errorElement) => {
  let isLocationSelectioned = false;
  for (let input of inputs) {
    if (input.checked) {
      isLocationSelectioned = true;
    }
  }

  if (isLocationSelectioned) {
    errorElement.style.display = "none";
    errorElement.classList.remove("field-error");
    return isLocationSelectioned;
  } else {
    errorElement.style.display = "block";
    errorElement.classList.add("field-error");
    return isLocationSelectioned;
  }
};

const checkboxValidation = (input, erroElement) => {
  if (input.checked) {
    erroElement.style.display = "none";
    return true;
  } else {
    erroElement.style.display = "block";
    return false;
  }
};

// -------------- FORM VALIDATION PROCESS --------------

const firstNameInput = document.querySelector("#first");
const firstNameError = document.querySelector("#firstNameError");
const lastNameInput = document.querySelector("#last");
const lastNameError = document.querySelector("#lastNameError");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const dateInput = document.querySelector("#birthdate");
const dateError = document.querySelector("#birthdateError");
const quantityInput = document.querySelector("#quantity");
const quantityError = document.querySelector("#quantityError");
const locationInputs = document.querySelectorAll("input[name='location']");
const locationError = document.querySelector("#locationError");
const checkboxOneInput = document.querySelector("#checkbox1");
const checkboxError = document.querySelector("#checkboxError");

firstNameInput?.addEventListener("input", () => {
  validateName(firstNameInput, firstNameError);
});

lastNameInput?.addEventListener("input", () => {
  validateName(lastNameInput, lastNameError);
});

emailInput?.addEventListener("input", () => {
  validateEmail(emailInput, emailError);
});

dateInput?.addEventListener("input", () => {
  validateBirthDate(dateInput, dateError);
});

quantityInput?.addEventListener("input", () => {
  validateQuantity(quantityInput, quantityError);
});

for (let input of locationInputs) {
  input.addEventListener("input", () => {
    validateLocation(locationInputs, locationError);
  });
}

checkboxOneInput?.addEventListener("input", () => {
  checkboxValidation(checkboxOneInput, checkboxError);
});
// -------------- MAIN VALIDATION --------------

const validate = () => {
  const isFirstNameValid = validateName(firstNameInput, firstNameError);
  const isLastNameValid = validateName(lastNameInput, lastNameError);
  const isEmailValid = validateEmail(emailInput, emailError);
  const isDateValid = validateBirthDate(dateInput, dateError);
  const isQuantityValid = validateQuantity(quantityInput, quantityError);
  const isLocationValid = validateLocation(locationInputs, locationError);
  const isCheckboxOneValid = checkboxValidation(
    checkboxOneInput,
    checkboxError
  );

  const isValidate =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isDateValid &&
    isQuantityValid &&
    isLocationValid &&
    isCheckboxOneValid;

  if (isValidate) {
    launchM();
    event?.preventDefault();
    handleCloseModal();
    return true;
  } else {
    return false;
  }
};
