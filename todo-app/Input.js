export class Input {
  constructor(rootEl, addTask) {
    this.root = rootEl;
    this.addTask = addTask;
    this.render();
    this.attachEvents();
  }

  render() {
    const form = document.createElement("form");
    this.form = form;
    const inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("placeholder", "Enter task title");
    inputEl.setAttribute("value", "");
    this.inputEl = inputEl;
    form.appendChild(inputEl);
    this.root.appendChild(form);
  }

  attachEvents() {
    this.inputEl.addEventListener("change", (e) => {
      this.title = e.target.value;
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.title) {
        this.addTask(this.title);
        this.inputEl.value = "";
        this.title = "";
      }
    });
  }
}
