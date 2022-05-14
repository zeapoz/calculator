import { tokenize } from "./token.js";

const output = document.getElementById("output");
const buttons = Array.from(document.getElementById("button-container").children);

buttons.map(b => {
  b.addEventListener("click", () => {
    output.value += b.innerHTML;
  });
});

document.getElementById("clear-button").addEventListener("click", () => {
  output.value = "";
});

document.getElementById("submit-button").addEventListener("click", () => {
  let result = tokenize(output.value);
  console.log(result);
});
