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
            <section class="controls"></section>
            <section class="month"></section>
            <p class="selected-date"></p>
        </div>
    `;
    this.container = getElementFromHtml(calendarHtml);
    this.controls = this.container.querySelector(".controls");
    this.monthView = this.container.querySelector(".month");
    this.selectedDate = this.container.querySelector(".selected-date");

    this.selectedMonth = months[new Date().getMonth()];
    this.selectedYear = new Date().getFullYear();
    this.selectedDate.textContent = `${
      this.selectedMonth
    } ${new Date().getDate()}, ${this.selectedYear}`;

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
      const dayElement = getElementFromHtml(`<div class="day">${day}</div>`);
      daysFragment.appendChild(dayElement);
    }

    this.monthView.appendChild(daysFragment);
  }

  renderMonthView(month, year) {
    this.monthView.innerHTML = "";

    this.renderDays();

    const indexOfMonth = months.indexOf(month);
    const numberOfDays = getDays(indexOfMonth, year);
    const indexOf1stDay = get1stDayOfMonth(indexOfMonth, year);
    const sundays = [];
    for (let i = 0; i <= 5; i++) {
      sundays.push(1 - indexOf1stDay + 7 * i);
    }

    const gapFragment = document.createDocumentFragment();
    for (let i = 1; i <= indexOf1stDay; i++) {
      gapFragment.appendChild(getElementFromHtml(`<div></div>`));
    }

    this.monthView.appendChild(gapFragment);

    const dateFragment = document.createDocumentFragment();

    for (let day = 1; day <= numberOfDays; day++) {
      const dateElement = getElementFromHtml(
        `<div class="date ${
          sundays.includes(day) ? "sunday" : ""
        }">${day}</div>`
      );
      dateFragment.appendChild(dateElement);
    }

    this.monthView.appendChild(dateFragment);

    this.monthView.addEventListener("click", (e) => {
      const targetEl = e.target.closest("div");

      if (!this.monthView.contains(targetEl)) {
        return;
      }

      this.selectedDateEl?.classList.remove("selected");
      this.selectedDateEl = targetEl;
      targetEl.classList.add("selected");
      this.selectedDate.textContent = `${this.selectedMonth} ${targetEl.textContent}, ${this.selectedYear}`;
    });
  }
}
