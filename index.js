const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./db/config");

// console.log(process.env);

const app = express();

//DB
dbConnection();

//CORS
app.use(cors());

//PUBLIC DIRECTORY
app.use(express.static("public"));

//READ BODY
app.use(express.json());

//ROUTES
//TODO: auth // crear, login, renew
app.use("/api/auth", require("./routes/auth"));
//TODO: events // create, get, update, delete
app.use("/api/events", require("./routes/events"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port 4000");
});
