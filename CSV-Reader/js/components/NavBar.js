import { getElementFromHtml } from "../../helper/utils.js";

export class NavBar {
  constructor() {
    const navbarHtml = `
      <nav class="row">
        <div>CSV Reader</div>
        <button id="themeSwitchBtn">Light/Dark</button>
      </nav>
    `;

    this.elements = {};
    this.elements.root = getElementFromHtml(navbarHtml);

    this.elements.themeSwitchBtn =
      this.elements.root.querySelector("#themeSwitchBtn");
    this.elements.themeStyleLink = document.getElementById("themeStyleLink");

    this.elements.themeSwitchBtn.addEventListener("click", () => {
      const currentTheme = localStorage.getItem("theme") || "light";

      if (currentTheme === "light") {
        this.updateTheme("dark");
      } else {
        this.updateTheme("light");
      }
    });

    this.loadDefaultTheme();
  }

  loadDefaultTheme() {
    const currentTheme = localStorage.getItem("theme") || "light";
    this.updateTheme(currentTheme);
  }

  updateTheme(themeName) {
    this.elements.themeStyleLink.setAttribute(
      "href",
      `themes/${themeName}.css`
    );
    localStorage.setItem("theme", themeName);
  }
}
