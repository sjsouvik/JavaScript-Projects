export const getElementFromHtmlString = (html) => {
  const range = document.createRange();
  return range.createContextualFragment(html.trim()).children[0];
};
