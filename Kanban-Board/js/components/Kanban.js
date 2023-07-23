import { Column } from "./Column.js";

export class Kanban {
  constructor(root) {
    this.root = root;

    const columns = document.createDocumentFragment();

    Kanban.columns.forEach((column) => {
      const columnView = new Column(column.id, column.name);
      columns.appendChild(columnView.elements.root);
    });

    this.root.appendChild(columns);
    this.addEvents();
    this.loadTheme();
  }

  addEvents() {
    this.themeStyleLink = document.getElementById("themeStyleLink");
    this.themeBtn = document.querySelector(".theme-btn");

    this.themeBtn.addEventListener("click", () => {
      const currentTheme = localStorage.getItem("theme") || "light";
      if (currentTheme === "light") {
        this.updateTheme("dark");
        this.themeBtn.textContent = "Light";
      } else {
        this.updateTheme("light");
        this.themeBtn.textContent = "Dark";
      }
    });
  }

  loadTheme() {
    const currentTheme = localStorage.getItem("theme") || "light";
    this.updateTheme(currentTheme);
    if (currentTheme === "light") {
      this.themeBtn.textContent = "Dark";
    } else {
      this.themeBtn.textContent = "Light";
    }
  }

  updateTheme(themeName) {
    this.themeStyleLink.setAttribute("href", `css/themes/${themeName}.css`);
    localStorage.setItem("theme", themeName);
  }

  static get columns() {
    return [
      { id: 1, name: "Backlog" },
      { id: 2, name: "In Progress" },
      { id: 3, name: "Completed" },
    ];
  }
}
