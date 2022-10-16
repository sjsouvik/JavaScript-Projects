import { Table } from "./components/Table.js";

const tableRoot = document.querySelector("#data-table");
const fileInput = document.getElementById("fileInput");
const search = document.querySelector(".search");
const themeSwitchBtn = document.getElementById("themeSwitchBtn");
const themeStyleLink = document.getElementById("themeStyleLink");

const table = new Table(tableRoot);

let columnHeaderData, data;

function csvToArray(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  const arr = rows.map(function (row) {
    const values = row.split(delimiter);

    return headers.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
  });

  return arr;
}

fileInput.addEventListener("change", (e) => {
  const csv = e.target.files[0];

  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const arr = csvToArray(text, ";");

    console.log(arr, Object.keys(arr[0]));

    columnHeaderData = Object.keys(arr[0]);
    data = arr.slice(0, arr.length - 1);
    table.update(data.slice(0, 15), columnHeaderData);
  };

  reader.readAsText(csv);
});

search.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();

  const res = data.filter((row) =>
    Object.values(row).toString().toLowerCase().includes(searchText)
  );

  table.clear();
  table.update(res.slice(0, 15), columnHeaderData);
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
