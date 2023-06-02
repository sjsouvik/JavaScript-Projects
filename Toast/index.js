import { Toast } from "./Toast.js";

const toastBtn = document.querySelector(".toast-button");

toastBtn.addEventListener("click", () => {
  new Toast();
});
