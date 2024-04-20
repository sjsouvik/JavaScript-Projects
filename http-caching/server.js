const express = require("express");

const app = express();

/* by default, these HTTP cache headers are added by the express server, 
we can configure them as per our need as well */
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("Expires", "Sat, 21 Dec 2024 11:20:39GMT");
  next();
});

app.use(
  express.static("./client", {
    etag: true,
    lastModified: true,
    cacheControl: false, // disables adding this header by default by the express server since we're configuring this header as per our need above
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server is running on: http://localhost:${port}`)
);
