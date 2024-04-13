const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

let data = "current data";
app.get("/data", (req, res) => {
  res.send({ data });
});

app.post("/data", (req, res) => {
  data = "updated data";
  res.send({ data });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`server is running on: http://localhost:${PORT}`)
);
