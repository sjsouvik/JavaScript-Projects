import { Input } from "./Input.js";
import { Tasks } from "./Tasks.js";

const root = document.getElementById("root");

const tasks = [];

const operations = {
  add(title) {
    const newTask = { id: crypto.randomUUID(), title };
    tasks.push();
    tasksList.addNewTask(newTask);
  },
};

new Input(root, operations.add);
const tasksList = new Tasks(root, tasks);
