const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static("./client"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

/*
a better way to clear data from all the web storages at once from the server side instead 
of clearing data from individual web storage at the client side

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data

*/
app.get("/logout", (req, res) => {
  res.setHeader("Clear-Site-Data", '"cache", "cookies", "storage"');
  res.redirect("/");
});

/* this how we can set cookie at the server side, this API is not being used in this project 
from the client to set the cookie */
app.post("/set-preferences", (req, res) => {
  const { preferences } = req.body;

  res.cookie("userPreferences", preferences, { maxAge: 60 * 60 * 1000 });
  res.redirect("/");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);
