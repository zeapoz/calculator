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
