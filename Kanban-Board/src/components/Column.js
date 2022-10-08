import { getElementFromHtml } from "../helper/utils";
import { Item } from "./Item";

export class Column {
  constructor(columnId, columnName) {
    const columnHtml = `
      <div class="column">
          <div class="name"></div>
          <div class="items"></div>
          <button class="add-btn">+ ADD</button>
      </div>
    `;

    this.elements = {};

    this.elements.root = getElementFromHtml(columnHtml);

    this.elements.title = this.elements.root.querySelector(".name");
    this.elements.items = this.elements.root.querySelector(".items");
    this.elements.addBtn = this.elements.root.querySelector(".add-btn");

    this.elements.title.textContent = columnName;
    this.elements.root.dataset.id = columnId;

    this.renderItems(this.items, this.elements.items);

    this.elements.addBtn.addEventListener("click", () => {
      const newItem = { id: 56, title: "" };

      this.createItemAndRender(newItem, this.elements.items);
    });
  }

  renderItems(items, container) {
    const fragmentContainer = document.createDocumentFragment();

    items.forEach((item) => {
      this.createItemAndRender(item, fragmentContainer);
    });

    container.appendChild(fragmentContainer);
  }

  createItemAndRender(item, container) {
    const itemView = new Item(item.id, item.title);
    container.appendChild(itemView.root);
  }

  get items() {
    return [
      { id: 1, title: "Eat" },
      { id: 2, title: "Sleep" },
      { id: 3, title: "Code" },
    ];
  }
}
