export class NavBar {
  constructor() {
    const navbarHtml = `
      <nav class="row">
        <div>CSV Reader</div>
        <button id="themeSwitchBtn">Light/Dark</button>
      </nav>
    `;

    this.root = this.getElementFromHtml(navbarHtml);
  }

  getElementFromHtml(html) {
    const range = document.createRange();
    return range.createContextualFragment(html.trim()).children[0];
  }
}
