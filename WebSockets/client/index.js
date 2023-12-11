import { Document } from "./Document.js";
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
      <div>        
        <div><label for="username">Username</label></div>
        <input id="username" type="text" placeholder="Username" class="username-input" />
      </div>
      <button>Join</button>
    </form>
    `;
    const formNode = getNodeFromHtmlString(formHtml);

    this.root.appendChild(formNode);
  }

  renderDocument(socket) {
    this.form?.remove();
    const doc = new Document(socket);
    this.doc = doc;
    this.root.appendChild(doc.docNode);
    doc.addEvents();
  }

  handleSocketConnection() {
    const ws = new WebSocket("ws://localhost:8080");

    // connection opened
    ws.addEventListener("open", () => {
      console.log("Client & server is connected");

      // after establishing the connection, sending data to the server
      ws.send(JSON.stringify({ type: "userUpdate", data: this.username }));
      this.renderDocument(ws);
    });

    // listen for messages from the server
    ws.addEventListener("message", (e) => {
      const { type, data } = JSON.parse(e.data);

      if (type === "userUpdate") {
        const participantsSec = document.querySelector(".participants");
        const participantsHtml = data
          .map((username) => `<li class="participant">${username}</li>`)
          .join("");

        participantsSec.innerHTML = participantsHtml;
      } else if (type === "contentUpdate") {
        this.doc.textElement.value = data;
      }
    });
  }

  addEvents() {
    this.form = document.getElementById("join-form");

    this.form.addEventListener("submit", (e) => {
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
