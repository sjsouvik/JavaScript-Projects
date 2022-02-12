import Store from "./Store";

export default class Views {
  constructor() {
    this.initView();
    this.store = new Store();
  }

  initView() {
    document.getElementById("root").innerHTML = `<div class='app'>
                                                    <h1>Keep notes</h1>
                                                    <main>
                                                    <input type='text' placeholder='Search todos' class='search-todo form-control' />   
                                                    <input type='text' placeholder='Add todo' class='txtTodo form-control' /> 
                                                    <button class='btnAdd btn btn-primary'>ADD</button>           
                                                    <div class='todos'></div>
                                                    </main>
                                                  </div>`;

    const txtTodo = document.querySelector(".txtTodo");
    const txtSearch = document.querySelector(".search-todo");

    document.querySelector(".btnAdd").addEventListener("click", () => {
      this.store.addTodo(txtTodo.value);
      this.updateView(this.store.getTodos());
      txtTodo.value = "";
    });

    document.addEventListener("keyup", (e) => {
      if (e.target.classList.contains("todo-task")) {
        if (e.code === "Enter") {
          this.store.updateTodo(Number(e.target.id), e.target.value);
          this.updateView(this.store.getTodos());
        }
      }
    });

    document.addEventListener("dblclick", (e) => {
      if (e.target.classList.contains("todo-task")) {
        const confirmed = confirm("Are you sure you want to delete it?");

        if (confirmed) {
          this.store.removeTodo(e.target.id);
          this.updateView(this.store.getTodos());
        }
      }
    });

    const improvedSearch = this.debounce(this.searchTodos, 500);
    document.addEventListener("input", (e) => {
      if (e.target.classList.contains("search-todo")) {
        improvedSearch(e.target.value, this.store.getTodos(), this.updateView);
        // let todos = this.store.getTodos();
        // todos = todos.filter(todo => todo.todoText.toLowerCase().includes(e.target.value.toLowerCase()));
        // this.updateView(todos);
      }
    });
  }

  searchTodos(searchText, todos, updateView) {
    // let todos = this.store.getTodos();
    todos = todos.filter((todo) =>
      todo.todoText.toLowerCase().includes(searchText.toLowerCase())
    );
    updateView(todos);
  }

  debounce(fn, delay) {
    let timer;

    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
  }

  createTodoList({ todoText }) {
    return `<div>
        <input type='text' value=${todoText} />
        </div>`;
  }

  updateView(todos) {
    const todosDiv = document.querySelector(".todos");
    todosDiv.textContent = "";

    todos.forEach((todo) => {
      const newElement = document.createElement("input");
      newElement.classList.add("todo-task", "form-control", "w-90");
      newElement.id = todo.id;
      newElement.value = todo.todoText;
      todosDiv.appendChild(newElement);
    });
  }
}
