const ws = new WebSocket("ws://localhost:8080");

// connection opened
ws.addEventListener("open", () => {
  console.log("Client & server is connected");

  // after establishing the connection, sending data to the server
  //   ws.send("hey, what's up?");
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

const form = document.getElementById("join-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const usernameInput = document.querySelector(".username-input");
  const name = usernameInput.value;

  ws.send(JSON.stringify({ name }));
  usernameInput.value = "";
});
