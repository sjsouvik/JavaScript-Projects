export class Tasks {
  constructor(rootEl, tasks) {
    this.root = rootEl;
    this.render(tasks);
    this.attachEvents();
  }

  createNewTask(task) {
    const listEl = document.createElement("li");
    listEl.classList.add("task");
    const p = document.createElement("p");
    p.textContent = task.title;
    const updateBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    updateBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";

    updateBtn.setAttribute("data-action", "edit");
    deleteBtn.setAttribute("data-action", "delete");

    listEl.append(p);
    listEl.append(updateBtn);
    listEl.append(deleteBtn);

    return listEl;
  }

  render(tasks) {
    document.querySelector(".tasks")?.remove();
    const container = document.createElement("ul");
    container.classList.add("tasks");
    this.container = container;

    const fragment = document.createDocumentFragment();
    tasks.forEach((task) => {
      fragment.appendChild(this.createNewTask(task));
    });

    container.appendChild(fragment);
    this.root.appendChild(container);
  }

  addNewTask(newTask) {
    this.container.appendChild(this.createNewTask(newTask));
  }

  attachEvents() {
    document.querySelector(".tasks").addEventListener("click", (e) => {
      const { action } = e.target.dataset;

      if (action === "edit") {
        const targetEl = e.target;

        targetEl.textContent = "Update";
        targetEl.dataset.action = "update";

        this.selectedTaskEl = targetEl.previousElementSibling;
        this.updateInput = document.createElement("input");
        this.updateInput.value = this.selectedTaskEl.textContent;
        this.selectedTaskEl.replaceWith(this.updateInput);
      } else if (action === "update") {
        const p = document.createElement("p");
        p.textContent = this.updateInput.value;
        this.updateInput.replaceWith(p);

        const { target } = e;
        target.textContent = "Edit";
        target.dataset.action = "edit";
      } else if (action === "delete") {
        e.target.parentElement.remove();
      }
    });
  }
}
