import { getNodeFromHtmlString } from "./utils.js";

export class Document {
  constructor(socket) {
    this.socket = socket;
    this.render();
  }

  render() {
    const docHtml = `<section class="participants"></section>
    <textarea class="text-input" rows="5" cols="30"></textarea>`;

    const docNode = getNodeFromHtmlString(docHtml);
    this.docNode = docNode;
  }

  addEvents() {
    const textElement = document.querySelector(".text-input");
    this.textElement = textElement;

    textElement.addEventListener("input", (e) => {
      this.socket.send(
        JSON.stringify({ type: "contentUpdate", data: e.target.value })
      );
    });
  }
}
