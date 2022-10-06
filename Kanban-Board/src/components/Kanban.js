import { Column } from "./Column";

export class Kanban {
  constructor(root) {
    this.root = root;

    const columns = document.createDocumentFragment();

    Kanban.columns.map((column) => {
      const columnView = new Column(column.id, column.name);
      columns.appendChild(columnView);
    });

    this.root.appendChild(columns);
  }

  static get columns() {
    return [
      { id: 1, name: "Backlog" },
      { id: 2, name: "InProg" },
      { id: 3, name: "Completed" },
    ];
  }
}
