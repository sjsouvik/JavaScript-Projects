export class Item {
  constructor(itemId, itemDetails) {
    this.root = document.createElement("input");
    this.root.value = itemDetails;
    this.root.id = itemId;
  }

  init() {}
}
