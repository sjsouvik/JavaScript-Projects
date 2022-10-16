export class Table {
  constructor(root) {
    this.root = root;
  }

  update(data, headerColumns = []) {
    this.clear();

    this.setHeader(headerColumns);
    this.setBody(headerColumns, data);
  }

  clear() {
    this.root.innerHTML = "";
  }

  setHeader(headerColumns) {
    this.root.insertAdjacentHTML(
      "afterbegin",
      `
            <thead>
                <tr>
                    ${headerColumns.map((text) => `<th>${text}</th>`).join("")}
                </tr>
            </thead>
        `
    );
  }

  setBody(headerColumns, data) {
    const rowsHtml = data.map((row) => {
      return `
                <tr>
                    ${headerColumns
                      .map((column) => `<td>${row[column]}</td>`)
                      .join("")}
                </tr>
            `;
    });

    this.root.insertAdjacentHTML(
      "beforeend",
      `
            <tbody>
                ${rowsHtml.join("")}
            </tbody>
        `
    );
  }
}
