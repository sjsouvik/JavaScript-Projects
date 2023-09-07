import { Home } from "./Home.js";
import { routes } from "./utils.js";

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

  home.elements.mails.innerHTML = matchedRoute.view;
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("email-type")) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      router();
    }
  });

  router();
});
