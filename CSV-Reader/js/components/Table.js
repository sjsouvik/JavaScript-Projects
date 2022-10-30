import { getElementFromHtml } from "../../helper/utils.js";

export class Table {
  constructor() {
    const tableHtml = `
    <div class="table-container">
      <table id="data-table"></table>
    </div>
    `;

    this.elements = {};

    this.elements.root = getElementFromHtml(tableHtml);
    this.elements.table = this.elements.root.querySelector("#data-table");
  }

  update(data, headerColumns = []) {
    this.clear();

    this.setHeader(headerColumns);
    this.setBody(headerColumns, data);
  }

  clear() {
    this.elements.table.innerHTML = "";
  }

  setHeader(headerColumns) {
    this.elements.table.insertAdjacentHTML(
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

    this.elements.table.insertAdjacentHTML(
      "beforeend",
      `
            <tbody>
                ${rowsHtml.join("")}
            </tbody>
        `
    );
  }
}
