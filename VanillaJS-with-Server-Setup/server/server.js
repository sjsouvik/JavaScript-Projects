const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "../client")));

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Server is running on port ${port}`));
