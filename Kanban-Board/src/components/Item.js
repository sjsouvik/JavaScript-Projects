import { getElementFromHtml } from "../helper/utils";
import { KanbanAPI } from "../KanbanAPI";

export class Item {
  constructor(itemId, title) {
    const itemHtml = `
      <div class="item">
        <div class="item-title" contenteditable="true"></div>
      </div>  
    `;

    this.elements = {};

    this.elements.root = getElementFromHtml(itemHtml);
    this.elements.title = this.elements.root.querySelector(".item-title");
    this.elements.title.textContent = title;

    this.elements.root.dataset.id = itemId;

    this.currentTitle = title;

    this.elements.title.addEventListener("blur", () => {
      const newTitle = this.elements.title.textContent.trim();

      if (newTitle === this.currentTitle) {
        return;
      }

      this.currentTitle = newTitle;
      KanbanAPI.updateItem(itemId, { title: newTitle });
    });

    this.elements.root.addEventListener("dblclick", () => {
      const check = window.confirm("Are you sure you want to delete it?");

      if (check) {
        KanbanAPI.deleteItem(itemId);

        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });
  }
}
