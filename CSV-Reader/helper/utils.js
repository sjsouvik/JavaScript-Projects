export const getElementFromHtml = (html) => {
  const range = document.createRange();
  return range.createContextualFragment(html.trim()).children[0];
};

export const otherWayToGetElementFromHtml = (htmlString) => {
  const template = document.createElement("template");

  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild;
};

export const csvToArray = (str, delimiter = ",") => {
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
};
