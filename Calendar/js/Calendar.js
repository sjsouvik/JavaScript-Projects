import {
  getElementFromHtml,
  getDays,
  days,
  months,
  get1stDayOfMonth,
} from "./utils.js";

export class Calendar {
  constructor() {
    const calendarHtml = `
        <div class="container">
            <div class="controls"></div>
            <div class="month"></div>
        </div>
    `;
    this.container = getElementFromHtml(calendarHtml);
    this.monthView = this.container.querySelector(".month");
    this.controls = this.container.querySelector(".controls");

    this.selectedMonth = months[new Date().getMonth()];
    this.selectedYear = new Date().getFullYear();

    this.renderControls();
    this.renderMonthView(this.selectedMonth, this.selectedYear);
  }

  renderControls() {
    let monthOptions = "";
    for (const month of months) {
      monthOptions += `<option value=${month}>${month}</option>`;
    }

    const monthSelect = `<select>${monthOptions}</select>`;
    this.monthControl = getElementFromHtml(monthSelect);
    this.controls.appendChild(this.monthControl);
    this.monthControl.value = this.selectedMonth;

    const currentYear = new Date().getFullYear();

    let yearOptions = "";
    for (let i = currentYear - 30; i <= currentYear + 30; i++) {
      yearOptions += `<option value=${i}>${i}</option>`;
    }

    const yearSelect = `<select>${yearOptions}</select>`;
    this.yearControl = getElementFromHtml(yearSelect);
    this.controls.appendChild(this.yearControl);
    this.yearControl.value = this.selectedYear;

    this.addEvents();
  }

  addEvents() {
    this.monthControl.addEventListener("change", (e) => {
      this.selectedMonth = e.target.value;
      this.renderMonthView(this.selectedMonth, this.selectedYear);
    });

    this.yearControl.addEventListener("change", (e) => {
      this.selectedYear = e.target.value;
      this.renderMonthView(this.selectedMonth, this.selectedYear);
    });
  }

  renderDays() {
    const daysFragment = document.createDocumentFragment();

    for (const day of days) {
      const dayElement = getElementFromHtml(`<div>${day}</div>`);
      daysFragment.appendChild(dayElement);
    }

    this.monthView.appendChild(daysFragment);
  }

  renderMonthView(month, year) {
    this.monthView.innerHTML = "";

    this.renderDays();

    const indexOfMonth = months.indexOf(month);
    const numberOfDays = getDays(indexOfMonth, year);
    const day1 = get1stDayOfMonth(indexOfMonth, year);

    const gapFragment = document.createDocumentFragment();
    for (let i = 1; i <= day1; i++) {
      gapFragment.appendChild(getElementFromHtml(`<div></div>`));
    }

    this.monthView.appendChild(gapFragment);

    const dateFragment = document.createDocumentFragment();

    for (let i = 1; i <= numberOfDays; i++) {
      const dateElement = getElementFromHtml(`<div>${i}</div>`);
      dateFragment.appendChild(dateElement);
    }

    this.monthView.appendChild(dateFragment);
  }
}
