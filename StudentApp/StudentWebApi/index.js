const express = require("express");
const app = express();
const cors = require('cors');  

const student = require("./router/student");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());  

//Configure router so all routes are prefixed with specifix router endpoint
app.use("/student", student);

//SET the server to listen at 8088
app.listen(8088, () =>
  console.log("Node server is running on http://localhost:8088")
);
