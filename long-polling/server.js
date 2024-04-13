const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

let data = "current data";
const clients = [];

app.get("/data", (req, res) => {
  const { lastData } = req.query;

  /* if the data is different than the last received data by the client, 
  we'll send the updated data to the client. Otherwise, we'll hold 
  the connection until we have some updates. This api is used to fetch data from the server */
  if (lastData !== data) {
    res.send({ data });
  } else {
    clients.push(res);
  }
});

/* as soon as we have some updates in the data, send the updates to the client over 
the established connection. This api is used to make updates in the data */
app.post("/data", (req, res) => {
  data = req.query.updatedData;

  while (clients.length > 0) {
    const client = clients.pop();
    client.send({ data });
  }

  res.send({ message: "Successfully updated the data and sent to the client" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`The server is running on: http://localhost:${PORT}`)
);
