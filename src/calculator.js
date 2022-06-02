import { evaluateExpression } from "./parser.js";
import { hideError } from "./error.js";

const expressionOutput = document.getElementById("expression-output");
const output = document.getElementById("output");
const buttonContainers = Array.from(document.getElementsByClassName("button-container"));
let buttons = [];

const appendValue = (value) => {
  output.value += value;
}

const deleteLast = () => {
  let s = output.value;
  output.value = s.slice(0, -1);
}

const clearInput = () => {
  output.value = "";
  expressionOutput.value = "";
  hideError();
}

const submitInput = () => {
  hideError();

  let expression = output.value;
  let result = evaluateExpression(expression);
  expressionOutput.value = expression;
  if (result) {
    console.log(result);
    output.value = result;
  } else {
    output.value = "";
  }
}

// Add each button containers children to buttons
buttonContainers.forEach(c => {
  buttons.push(...c.children);
});

buttons.map(b => {
  // Check if id is null to not add event listener
  // to submit, backspace and clear buttons
  if (!b.id) {
    b.addEventListener("click", () => {
      appendValue(b.innerHTML);
    });
  }
});

document.getElementById("backspace-button").addEventListener("click", () => {
  deleteLast();
});

document.getElementById("clear-button").addEventListener("click", () => {
  clearInput();
});

document.getElementById("submit-button").addEventListener("click", () => {
  submitInput();
});

// User experience improvements
let allowedKeys = [
  "1", "2", "3", "4", "5",
  "6", "7", "8", "9", "0",
  "+", "-", "*", "/", "^",
  "(", ")", ".",
];

document.addEventListener("keydown", (e) => {
  // Input keys
  if (allowedKeys.includes(e.key)) {
    appendValue(e.key);
  }
  // Clear key
  if (e.key === "c") {
    clearInput();
  }
  // Backspace key
  if (e.key === "Backspace") {
    deleteLast();
  }
  // Enter key
  if (e.key === "Enter") {
    e.preventDefault();
    submitInput();
  }
});
