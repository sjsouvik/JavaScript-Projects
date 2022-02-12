export default class Store {
  constructor() {
    this.todos = [];
  }

  getTodos() {
    return this.todos;
  }

  setTodos(todos) {
    this.todos = todos;
  }

  addTodo(todo) {
    const newTodo = {
      id: Math.round(Math.random() * 10000),
      todoText: todo,
      done: false,
    };

    this.todos.push(newTodo);
  }

  updateTodo(todoId, updatedTodo) {
    this.todos = this.todos.map((todo) =>
      todo.id === todoId ? { ...todo, todoText: updatedTodo } : todo
    );
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== Number(todoId));
  }
}
