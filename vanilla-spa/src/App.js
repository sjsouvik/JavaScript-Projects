import Logo from "./logo.svg";

import "./App.css";

const App = ({ name }) => {
  return `
    <img src="${Logo}" alt="builder icon"/>
    <h2>Welcome to ${name}</h2>
    `;
};

export default App;
