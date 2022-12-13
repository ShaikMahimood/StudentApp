const express = require("express");
const app = express();

//SET the server to listen at 8080
app.listen(8080, () =>
  console.log("Node server is running on http://localhost:8080")
);
