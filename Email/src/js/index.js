import { Home } from "./Home.js";
import { MailList } from "./MailList.js";

export const routes = [
  { path: "/", view: (root) => new MailList("inbox", root) },
  { path: "/starred", view: (root) => new MailList("starred", root) },
  {
    path: "/important",
    view: (root) => new MailList("important", root),
  },
  { path: "/*", view: "<h3>Oops! this page is not found</h3>" },
];

const home = new Home();

const root = document.getElementById("root");
root.append(home.elements.root);

const router = () => {
  let matchedRoute = routes.find((route) => route.path === location.pathname);

  if (!matchedRoute) {
    matchedRoute = routes[routes.length - 1];
    root.innerHTML = matchedRoute.view;
    return;
  }

  matchedRoute.view(home.elements.root);
};

window.addEventListener("popstate", () => {
  router();
  home.updateActiveRoute();
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("email-type")) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      router();
      home.updateActiveRoute(e.target);
    }
  });

  router();
});
