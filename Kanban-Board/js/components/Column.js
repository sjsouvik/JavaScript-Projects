import { getElementFromHtml } from "../helper/utils.js";
import { KanbanAPI } from "../KanbanAPI.js";
import { Item } from "./Item.js";
import { Dropzone } from "./Dropzone.js";

export class Column {
  constructor(columnId, columnName) {
    const columnHtml = `
      <div class="kanban-column">
          <div class="column-title"></div>
          <div class="items"></div>
          <button class="add-btn">+ ADD</button>
      </div>
    `;

    this.elements = {};

    this.elements.root = getElementFromHtml(columnHtml);

    this.elements.title = this.elements.root.querySelector(".column-title");
    this.elements.items = this.elements.root.querySelector(".items");
    this.elements.addBtn = this.elements.root.querySelector(".add-btn");

    this.elements.title.textContent = columnName;
    this.elements.root.dataset.id = columnId;

    this.elements.items.appendChild(new Dropzone().root); //adding a dropzone inside kanban-items container before adding any items
    this.renderItems(KanbanAPI.getColumnItems(columnId), this.elements.items);

    this.elements.addBtn.addEventListener("click", () => {
      const newItem = KanbanAPI.addItem(columnId);

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
    container.appendChild(itemView.elements.root);
  }
}
