const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersElement = "0123456789";
const specialCharacters = "!@#$%^&*()_-+=<>?";

const letters = lowercaseLetters + uppercaseLetters;

const passwordButton = document.getElementById("pass_btn");
const lengthInput = document.getElementById("lengthInput");

const passOne = document.getElementById("display_pass1");
const passTwo = document.getElementById("display_pass2");

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
  const passwordLength = document.getElementById("lengthInput").value;

  let password1 = "";
  let password2 = "";

  for (let i = 0; i < passwordLength; i++) {
    password1 += generateCharacters(includeSymbols, includeNumbers);
    password2 += generateCharacters(includeSymbols, includeNumbers);
  }

  passOne.textContent = password1;
  passTwo.textContent = password2;

  passOne.style.cursor = "pointer";
  passOne.classList.add("copyMe");

  passTwo.style.cursor = "pointer";
  passTwo.classList.add("copyMe");
}

passwordButton.addEventListener("click", generatePassword);

function updatePasswordLength() {
  const lengthInput = document.getElementById("lengthInput").value;
  document.getElementById("passCount").textContent = lengthInput;
}

lengthInput.addEventListener("input", updatePasswordLength);

passOne.addEventListener("click", function () {
  document.execCommand("copy");
});

passOne.addEventListener("copy", function (e) {
  e.preventDefault();

  if (e.clipboardData) {
    e.clipboardData.setData("text/plain", passOne.textContent);

    passOne.classList.remove("copyMe");
    passOne.style.cursor = "default";
  }
});

passTwo.addEventListener("click", function () {
  document.execCommand("copy");
});

passTwo.addEventListener("copy", function (p) {
  p.preventDefault();

  if (p.clipboardData) {
    p.clipboardData.setData("text/plain", passTwo.textContent);

    passTwo.classList.remove("copyMe");
    passTwo.style.cursor = "default";
  }
});
