import { getElementFromHtml } from "./utils.js";

export class Home {
  constructor() {
    let childs = "";
    this.getSections().forEach((section) => {
      childs += `<a href="/${section.name.toLowerCase()}" class="email-type">${
        section.name
      }</a>`;
    });

    const container = `
      <div class="layout">
        <section class="side-bar">${childs}</section>
        <section class="mails"></section>
        <section class="mail"></section>
      </div>
      `;

    this.elements = {};

    const root = getElementFromHtml(container);
    this.elements.root = root;
    this.elements.mails = root.querySelector(".mails");
  }

  getSections() {
    return [
      { name: "Starred", mails: [] },
      { name: "Important", mails: [] },
      { name: "Sent", mails: [] },
    ];
  }
}
