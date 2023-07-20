import {
  getElementFromHtml,
  getDays,
  days,
  get1stDayOfMonth,
} from "./utils.js";

export class Calendar {
  constructor(month, year) {
    this.container = getElementFromHtml(`<div class="month"></div>`);

    this.init(month, year);
  }

  init(month, year) {
    const numberOfDays = getDays(month, year);

    const day1 = get1stDayOfMonth(month, year);
    console.log(day1);

    const daysFragment = document.createDocumentFragment();

    for (const day of days) {
      const dayElement = getElementFromHtml(`<div>${day}</div>`);
      daysFragment.appendChild(dayElement);
    }

    this.container.appendChild(daysFragment);

    const gapFragment = document.createDocumentFragment();
    for (let i = 1; i <= day1; i++) {
      gapFragment.appendChild(getElementFromHtml(`<div></div>`));
    }

    this.container.appendChild(gapFragment);

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= numberOfDays; i++) {
      const dateElement = getElementFromHtml(`<div>${i}</div>`);
      fragment.appendChild(dateElement);
    }

    this.container.appendChild(fragment);
  }
}
