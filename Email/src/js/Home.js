import { getElementFromHtml } from "./utils.js";

export class Home {
  constructor() {
    let childs = "";
    this.getSections().forEach((section) => {
      childs += `<a href="${section.path}" id="${
        section.path
      }" class="email-type ${
        location.pathname === section.path ? "active" : ""
      }">${section.name}</a>`;
    });

    const container = `
      <div class="layout">
        <section class="side-bar">${childs}</section>        
      </div>
      `;

    this.elements = {};

    const root = getElementFromHtml(container);
    this.elements.root = root;
    this.elements.activeRoute = root.querySelector(".active");
  }

  updateActiveRoute(route = "") {
    this.elements.activeRoute.classList.remove("active");
    this.elements.activeRoute =
      route || document.getElementById(location.pathname);
    this.elements.activeRoute.classList.add("active");
  }

  getSections() {
    return [
      { name: "Inbox", path: "/", mails: [] },
      { name: "Starred", path: "/starred", mails: [] },
      { name: "Important", path: "/important", mails: [] },
    ];
  }
}
