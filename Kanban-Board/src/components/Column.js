import { Item } from "./Item";

export class Column {
  constructor(columnId, columnName) {
    this.elements = {};
    this.elements.root = this.init();

    this.elements.title = this.elements.root.querySelector(".name");
    this.elements.items = this.elements.root.querySelector(".items");
    this.elements.addBtn = this.elements.root.querySelector(".add-btn");

    this.elements.title.textContent = columnName;
    this.elements.root.dataset.id = columnId;

    ["eat", "sleep", "code"].forEach((item) => {
      const items = document.createDocumentFragment();

      const itemView = new Item(item.id, item.details);
      items.appendChild(itemView);

      this.elements.items.appendChild(items);
    });
  }

  init() {
    return `
        <div class="column">
            <div class="name"></div>
            <div class="items"></div>
            <button class="add-btn">+ ADD</button>
        </div>
        `;
  }
}
