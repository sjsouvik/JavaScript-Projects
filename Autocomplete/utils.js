export const mockData = [
  { id: "1", title: "axis" },
  { id: "1", title: "hdfc" },
  { id: "1", title: "idfc" },
  { id: "1", title: "sbi" },
  { id: "1", title: "canara" },
];

export function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}
