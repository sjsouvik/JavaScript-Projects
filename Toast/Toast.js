import { getElementFromHtml } from "../CSV-Reader/helper/utils.js";

export class Toast {
  constructor() {
    const toastHtml = `<div role="alert" class="toast">My toast</div>`;

    this.toast = getElementFromHtml(toastHtml);
    this.toastsContainer = document.querySelector(".toasts-container");
    this.toastsContainer.appendChild(this.toast);

    setTimeout(this.removeToast.bind(this), 3000);
  }

  removeToast() {
    this.toast.animate([{ opacity: 0, transform: "translateY(-3rem)" }], {
      duration: 300,
      easing: "ease",
    });

    // this will wait for all animations on the element to finish before removing it from the document
    Promise.allSettled(
      this.toast.getAnimations().map((animation) => animation.finished)
    ).then(() => this.toast.remove());
  }
}
