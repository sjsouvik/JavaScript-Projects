document.addEventListener("DOMContentLoaded", () => {
  const db = new Dexie("todoDB");
  db.version(1).stores({ todos: "++id, title, isCompleted" });

  const todoFrom = document.getElementById("todo-form");
  const todoInput = document.querySelector("#todo-input");
  const todoList = document.querySelector(".todo-list");

  todoFrom.addEventListener("submit", async (e) => {
    e.preventDefault();

    const taskTitle = todoInput.value.trim();
    todoInput.value = "";

    if (taskTitle) {
      await db.todos.add({ title: taskTitle, isCompleted: false });
      renderTodos();
    }
  });

  todoList.addEventListener("change", async (e) => {
    const targetEl = e.target.closest("input");

    if (targetEl) {
      const todoId = Number(e.target.getAttribute("id"));
      const updatedTodo = await db.todos.update(Number(todoId), {
        isCompleted: targetEl.dataset.completed === "true" ? false : true,
      });

      if (updatedTodo) {
        renderTodos();
      }
    }
  });

  todoList.addEventListener("click", async (e) => {
    const targetEl = e.target.closest("button");

    if (targetEl?.dataset.action === "delete") {
      await db.todos.delete(Number(targetEl.dataset.todoId));
      renderTodos();
    }
  });

  async function renderTodos() {
    const allTodos = await db.todos.toArray();
    todoList.innerHTML = "";

    const fragment = document.createDocumentFragment();
    allTodos.forEach((todo) => {
      const { title, id, isCompleted } = todo;
      const todoEl = document.createElement("li");

      const taskTitle = document.createElement("label");
      taskTitle.textContent = title;
      taskTitle.setAttribute("for", id);
      taskTitle.className = isCompleted ? "completed-task" : "";

      const inputEl = document.createElement("input");
      inputEl.type = "checkbox";
      inputEl.checked = isCompleted;
      inputEl.id = id;
      inputEl.dataset.completed = isCompleted;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.dataset.action = "delete";
      deleteBtn.dataset.todoId = id;

      todoEl.appendChild(inputEl);
      todoEl.appendChild(taskTitle);
      todoEl.appendChild(deleteBtn);

      fragment.appendChild(todoEl);
    });

    todoList.appendChild(fragment);
  }

  renderTodos();
});
