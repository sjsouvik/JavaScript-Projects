class Modal {
  constructor() {
    this.init();
    this.addEventHandlers();
  }

  init() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <h1>Modal</h1>
        <button id="openModalBtn">Open Modal</button>
        <div class="modal position-center">
            <div class="modal-content">
                <p>Modal Content</p>
                <button id="closeModalBtn">Close</button>
            </div>
        </div>        
    `;
  }

  addEventHandlers() {
    const modal = document.querySelector(".modal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");

    openModalBtn.addEventListener("click", () => {
      modal.classList.add("show");
    });

    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }
}

export default Modal;
