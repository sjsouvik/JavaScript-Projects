export const getElementFromHtml = (html) => {
  const range = document.createRange();
  return range.createContextualFragment(html.trim()).children[0];
};

export const otherWayToGetElementFromHtml = (htmlString) => {
  const template = document.createElement("template");

  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild;
};
