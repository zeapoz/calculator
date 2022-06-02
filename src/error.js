export { showError, hideError };

const showError = (message) => {
  const errorContainer = document.getElementById("error-message");
  errorContainer.innerText = message;
  errorContainer.style.visibility = "visible";
};

const hideError = () => {
  const errorContainer = document.getElementById("error-message");
  errorContainer.style.visibility = "hidden";
}
