export const getElementFromHtml = (html) => {
  const range = document.createRange();
  return range.createContextualFragment(html.trim()).children[0];
};

export const routes = [
  { path: "/", view: "inbox" },
  { path: "/starred", view: `<div>starred</div>` },
  { path: "/important", view: `<div>important</div>` },
  { path: "/important", view: "" },
  { path: "/sent", view: "" },
  { path: "/*", view: "<h3>Oops! this page is not found</h3>" },
];
