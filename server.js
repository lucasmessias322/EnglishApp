const express = require("express");
const path = require("path");
require("dotenv/config");

const app = express();

app.use(express.static(path.join(__dirname, "./build")));
app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), function (err) {
  console.log("server.js >>>");
  console.log("server listening on port ", server.address().port);
  console.log("Server on URL " + process.env.REACT_APP_API_URL);
  if (err) {
    console.log("err >>>");
    console.log(err);
  }
});
