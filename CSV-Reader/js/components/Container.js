import { csvToArray, getElementFromHtml } from "../../helper/utils.js";
import { Table } from "./Table.js";

export class Container {
  constructor() {
    const containerHtml = `
    <main class="container">
        <section class="load-csv">
          <div class="row">
            <button><label for="fileInput">Load CSV File</label></button>
            <input type="file" id="fileInput" />
            <input type="search" class="search" placeholder="Search" />
          </div>          
        </section>
    </main>
    `;

    this.elements = {};

    this.elements.root = getElementFromHtml(containerHtml);
    this.elements.loadCSVSection =
      this.elements.root.querySelector(".load-csv");
    this.elements.fileInput = this.elements.root.querySelector("#fileInput");
    this.elements.searchInput = this.elements.root.querySelector(".search");

    const table = new Table();

    this.elements.loadCSVSection.appendChild(table.elements.root);

    this.addEvents(table);
  }

  addEvents(table) {
    let columnHeaderData, data;

    const fileUploadHandler = (e) => {
      const csv = e.target.files[0];

      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        const text = e.target.result;
        const arr = csvToArray(text, ";");

        columnHeaderData = Object.keys(arr[0]);
        data = arr.slice(0, arr.length - 1);
        table.update(data, columnHeaderData);
      });

      reader.readAsText(csv);
    };

    const searchHandler = (e) => {
      const searchText = e.target.value.toLowerCase();

      const res = data.filter((row) =>
        Object.values(row).toString().toLowerCase().includes(searchText)
      );

      table.clear();
      table.update(res, columnHeaderData);
    };

    this.elements.fileInput.addEventListener("change", fileUploadHandler);
    this.elements.searchInput.addEventListener("input", searchHandler);
  }
}
