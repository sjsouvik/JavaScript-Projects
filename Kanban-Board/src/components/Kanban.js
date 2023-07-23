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
  }

  static get columns() {
    return [
      { id: 1, name: "Backlog" },
      { id: 2, name: "In Progress" },
      { id: 3, name: "Completed" },
    ];
  }
}
