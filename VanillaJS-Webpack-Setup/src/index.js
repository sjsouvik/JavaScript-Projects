const getElementFromHtmlString = (html) => {
  const range = document.createRange();
  return range.createContextualFragment(html.trim()).children[0];
};

const heading = getElementFromHtmlString(
  `<h1>Hello World! Feel free to add more components to it and build for the web.</h1>`
);

document.getElementById("app").appendChild(heading);
