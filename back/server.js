const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.json({ success: true });
});

app.listen(8081, () => console.log("app is listening on port 3000"));
