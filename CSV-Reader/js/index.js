import { NavBar } from "./components/NavBar.js";
import { Container } from "./components/Container.js";
import { Table } from "./components/Table.js";
import { csvToArray } from "../helper/utils.js";

const app = document.getElementById("app");
app.appendChild(new NavBar().root);

app.appendChild(new Container().elements.root);

const tableRoot = document.querySelector("#data-table");
const fileInput = document.getElementById("fileInput");
const search = document.querySelector(".search");
const themeSwitchBtn = document.getElementById("themeSwitchBtn");
const themeStyleLink = document.getElementById("themeStyleLink");

const table = new Table(tableRoot);

let columnHeaderData, data;

fileInput.addEventListener("change", (e) => {
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
});

search.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();

  const res = data.filter((row) =>
    Object.values(row).toString().toLowerCase().includes(searchText)
  );

  table.clear();
  table.update(res, columnHeaderData);
});

function loadTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";

  function updateTheme(themeName) {
    themeStyleLink.setAttribute("href", `themes/${themeName}.css`);
    localStorage.setItem("theme", themeName);
  }

  updateTheme(currentTheme);

  themeSwitchBtn.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "light";

    if (currentTheme === "light") {
      updateTheme("dark");
    } else {
      updateTheme("light");
    }
  });
}

loadTheme();
