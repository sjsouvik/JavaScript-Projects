import { Calendar } from "./Calendar.js";
import { months } from "./utils.js";

const month = "Jul",
  year = 2023;
const indexOfMonth = months.indexOf(month);

const calendar = new Calendar(indexOfMonth, year);

const root = document.getElementById("root");
root.appendChild(calendar.container);
