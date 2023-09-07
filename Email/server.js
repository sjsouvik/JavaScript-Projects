const express = require("express");
const path = require("path");

const app = express();

app.use("/src", express.static(path.resolve(__dirname, "src")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`server is running on port ${port}`));
