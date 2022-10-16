export class Heading {
  constructor(root) {
    const headingElement = this.getElementFromString(
      `<h1>Hello Programmers!</h1>`
    );
    root.appendChild(headingElement);
  }

  getElementFromString(html) {
    const range = document.createRange();
    return range.createContextualFragment(html).children[0];
  }
}
