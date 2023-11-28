export const getElementFromHtmlString = (htmlString) => {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.cloneNode(true);
};

export const getDateFromTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

export const getTimeFromTimestamp = (timestamp) => {
  const [hr, min] = new Date(timestamp).toLocaleTimeString().split(":");
  const formattedHr = (hr > 12 ? hr % 12 : hr).toString().padStart(2, "0");
  const meridiem = hr >= 12 ? "pm" : "am";
  return `${formattedHr}:${min} ${meridiem}`;
};

export const transformToObj = (input) => {
  input = input.sort((a, b) => a.timestamp - b.timestamp);

  return input.reduce((acc, item) => {
    const key = getDateFromTimestamp(item.timestamp);
    if (acc[key]) {
      acc[key].push(item);
    } else {
      acc[key] = [item];
    }

    return acc;
  }, {});
};
