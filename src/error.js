export { showError, hideError };

const showError = (message) => {
  const errorContainer = document.getElementById("error-message");
  errorContainer.innerText = message;
  errorContainer.style.display = "block";
};

const hideError = () => {
  const errorContainer = document.getElementById("error-message");
  errorContainer.style.display = "none";
}
