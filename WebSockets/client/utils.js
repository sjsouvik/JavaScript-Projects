export const getNodeFromHtmlString = (htmlString) => {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.cloneNode(true);
};
