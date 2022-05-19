import { evaluateExpression } from "./parser.js";

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
});

document.getElementById("submit-button").addEventListener("click", () => {
  let result = evaluateExpression(output.value);
  output.value = result;
});
