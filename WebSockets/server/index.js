const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

const users = {};
const sockets = {};

wss.on("connection", (ws) => {
  const id = Date.now();
  sockets[id] = ws;
  console.log(`New client ${id} is connected`);

  ws.on("message", (data) => {
    data = JSON.parse(data);
    console.log(data);

    users[id] = data;

    Object.keys(sockets).forEach((socketId) =>
      sockets[socketId].send(JSON.stringify(Object.values(users)))
    );
  });

  ws.on("close", () => {
    delete users[id];
    delete sockets[id];

    Object.keys(sockets).forEach((socketId) =>
      sockets[socketId].send(JSON.stringify(Object.values(users)))
    );

    console.log(`client ${id} is disconnected`);
  });
});
