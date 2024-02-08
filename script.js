const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersElement = "0123456789";
const specialCharacters = "!@#$%^&*()_-+=<>?";
const letters = lowercaseLetters + uppercaseLetters;
const passwordButton = document.getElementById("pass_btn");
const lengthInput = document.getElementById("lengthInput");
const passOne = document.getElementById("display_pass1");
const passTwo = document.getElementById("display_pass2");

// Function to set input slider back to 8
function resetInputSlider() {
  lengthInput.value = 8;
  document.getElementById("passCount").textContent = lengthInput.value;
}

// Call the function when the page is loaded
window.addEventListener("load", resetInputSlider);

function generateCharacters(symbols = true, numbers = true) {
  let allCharacters = letters;
  if (symbols) {
    allCharacters += specialCharacters;
  }
  if (numbers) {
    allCharacters += numbersElement;
  }

  const randomIndex = Math.floor(Math.random() * allCharacters.length);
  return allCharacters[randomIndex];
}

function generatePassword() {
  const includeSymbols = document.getElementById("includeSymbols").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const passwordLength = lengthInput.value;

  let password1 = "";
  let password2 = "";

  for (let i = 0; i < passwordLength; i++) {
    password1 += generateCharacters(includeSymbols, includeNumbers);
    password2 += generateCharacters(includeSymbols, includeNumbers);
  }

  // Store original passwords for copying
  const originalPass1 = password1;
  const originalPass2 = password2;

  passOne.textContent = "Copy me";
  passTwo.textContent = "Copy me";

  // Add hover listeners to display passwords and copy
  passOne.addEventListener("mouseover", () => {
    passOne.textContent = originalPass1;
  });
  passOne.addEventListener("mouseout", () => {
    passOne.textContent = "Copy me";
  });

  passTwo.addEventListener("mouseover", () => {
    passTwo.textContent = originalPass2;
  });
  passTwo.addEventListener("mouseout", () => {
    passTwo.textContent = "Copy me";
  });

  passOne.style.cursor = "pointer";
  passTwo.style.cursor = "pointer";
}

passwordButton.addEventListener("click", generatePassword);

function updatePasswordLength() {
  document.getElementById("passCount").textContent = lengthInput.value;
}

lengthInput.addEventListener("input", updatePasswordLength);

function copyToClipboard(element) {
  navigator.clipboard.writeText(element.textContent).then((err) => {
    console.error("Async: Could not copy text:", err);
  });
}

document.addEventListener("click", function (e) {
  if (e.target === passOne) {
    copyToClipboard(passOne);
    passOne.innerText = "";
  } else if (e.target === passTwo) {
    copyToClipboard(passTwo);
    passTwo.innerText = "";
  }
});
