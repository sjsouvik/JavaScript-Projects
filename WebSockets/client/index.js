import { getNodeFromHtmlString } from "./utils.js";

class Form {
  constructor() {
    this.root = root;
    this.renderForm();
    this.addEvents();
  }

  renderForm() {
    const formHtml = `
    <form id="join-form">
      <input type="text" placeholder="Enter username" class="username-input" />
      <button>Join</button>
    </form>
    `;
    const formNode = getNodeFromHtmlString(formHtml);

    this.root.appendChild(formNode);
  }

  handleSocketConnection() {
    const ws = new WebSocket("ws://localhost:8080");

    // connection opened
    ws.addEventListener("open", () => {
      console.log("Client & server is connected");

      // after establishing the connection, sending data to the server
      ws.send(JSON.stringify({ name: this.username }));
    });

    // listen for messages from the server
    ws.addEventListener("message", (e) => {
      const participants = JSON.parse(e.data);
      console.log(JSON.parse(e.data));

      const participantsSec = document.querySelector(".participants");
      const participantsHtml = participants
        .map((user) => `<li>${user.name}</li>`)
        .join("");

      participantsSec.innerHTML = participantsHtml;
    });
  }

  addEvents() {
    const form = document.getElementById("join-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const usernameInput = document.querySelector(".username-input");
      this.username = usernameInput.value;
      usernameInput.value = "";

      if (this.username !== "") {
        this.handleSocketConnection();
      }
    });
  }
}

const root = document.getElementById("root");
new Form(root);
