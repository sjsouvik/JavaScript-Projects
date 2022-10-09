import { otherWayToGetElementFromHtml } from "../helper/utils";
import { KanbanAPI } from "../KanbanAPI";

export class Dropzone {
  constructor() {
    this.root = otherWayToGetElementFromHtml(`<div class="dropzone"></div`);

    this.root.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.root.classList.add("active");
    });

    this.root.addEventListener("dragleave", () => {
      this.root.classList.remove("active");
    });

    this.root.addEventListener("drop", (e) => {
      e.preventDefault();

      this.root.classList.remove("active");

      const droppedColumn = this.root.closest(".kanban-column");
      const droppedColumnId = Number(droppedColumn.dataset.id);

      const droppedItemId = Number(e.dataTransfer.getData("text/plain"));
      const droppedItem = document.querySelector(
        `[data-id="${droppedItemId}"]`
      );

      if (droppedItem.parentElement.contains(this.root)) {
        return;
      }

      const dropzonesInDroppedColumn = Array.from(
        droppedColumn.querySelectorAll(".dropzone")
      );
      const droppedDropzoneIndex = dropzonesInDroppedColumn.indexOf(this.root);

      const insertAfter = this.root.parentElement.classList.contains("item")
        ? this.root.parentElement
        : this.root;

      insertAfter.after(droppedItem);

      KanbanAPI.updateItem(droppedItemId, {
        columnId: droppedColumnId,
        position: droppedDropzoneIndex,
      });
    });
  }
}
