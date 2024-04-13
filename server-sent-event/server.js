const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

app.get("/data", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write("data: 1st data is coming via Server Sent Event \n\n");

  const timerId = setInterval(() => {
    res.write(
      `data: data is coming via Server Sent Event @ ${Date.now()} \n\n`
    );
  }, 2000);

  req.on("close", () => {
    clearInterval(timerId);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`The server is running on: http://localhost:${port}`)
);
