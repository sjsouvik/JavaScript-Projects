import { getElementFromHtml } from "../../helper/utils.js";

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
          <div class="table-container">
            <table id="data-table"></table>
          </div>
        </section>
    </main>
    `;

    this.elements = {};

    this.elements.root = getElementFromHtml(containerHtml);
  }
}