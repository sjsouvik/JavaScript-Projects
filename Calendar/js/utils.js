export function getDays(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export const getElementFromHtml = (html) => {
  const range = document.createRange();
  return range.createContextualFragment(html.trim()).children[0];
};

export const get1stDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

export const isCurrentDate = (givenDate, selectedMonth, selectedYear) => {
  const date = new Date();
  const currentDate = date.getDate();
  const currentMonth = months[date.getMonth()];
  const currentYear = date.getFullYear();

  return (
    currentDate === givenDate &&
    selectedYear === currentYear &&
    selectedMonth === currentMonth
  );
};

export const days = ["S", "M", "T", "W", "T", "F", "S"];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
