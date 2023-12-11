const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

const users = {};
const sockets = {};
let textAreaValue = "";

const events = {
  USER_UPDATE: "userUpdate",
  CONTENT_UPDATE: "contentUpdate",
};

const sendUpdatesToAllClients = (data) => {
  Object.keys(sockets).forEach((socketId) =>
    sockets[socketId].send(JSON.stringify(data))
  );
};

wss.on("connection", (ws) => {
  const id = Date.now();
  sockets[id] = ws;
  console.log(`New client ${id} is connected`);

  ws.on("message", (dataFromClient) => {
    const { type, data } = JSON.parse(dataFromClient);
    console.log(data);

    if (type === events.USER_UPDATE) {
      users[id] = data;
      sendUpdatesToAllClients({ type, data: Object.values(users) });
    } else if (type === events.CONTENT_UPDATE) {
      textAreaValue = data;
      sendUpdatesToAllClients({ type, data: textAreaValue });
    }
  });

  ws.on("close", () => {
    delete users[id];
    delete sockets[id];

    sendUpdatesToAllClients({
      type: events.USER_UPDATE,
      data: Object.values(users),
    });

    console.log(`client ${id} is disconnected`);
  });

  ws.send(JSON.stringify({ type: events.CONTENT_UPDATE, data: textAreaValue }));
});
