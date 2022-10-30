import { NavBar } from "./components/NavBar.js";
import { Container } from "./components/Container.js";

const app = document.getElementById("app");
app.appendChild(new NavBar().elements.root);

app.appendChild(new Container().elements.root);
