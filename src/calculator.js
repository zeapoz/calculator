import { evaluateExpression } from "./parser.js";

const expressionOutput = document.getElementById("expression-output");
const output = document.getElementById("output");
const buttonContainers = Array.from(document.getElementsByClassName("button-container"));
let buttons = [];

// Add each button containers children to buttons
buttonContainers.forEach(c => {
  buttons.push(...c.children);
});

buttons.map(b => {
  b.addEventListener("click", () => {
    output.value += b.innerHTML;
  });
});

document.getElementById("backspace-button").addEventListener("click", () => {
  let s = output.value;
  output.value = s.slice(0, -2);
});

document.getElementById("clear-button").addEventListener("click", () => {
  output.value = "";
  expressionOutput.value = "";
});

document.getElementById("submit-button").addEventListener("click", () => {
  let expression = output.value;
  let result = evaluateExpression(expression);
  expressionOutput.value = expression;
  output.value = result;
});
