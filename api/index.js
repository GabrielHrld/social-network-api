const express = require("express");

const config = require("../config.js");
const user = require("./components/user/network");

const app = express();

app.use(express.json());

//ROUTER
app.use("/api/user", user);

app.listen(config.api.port, () => {
  console.log(`escuchando en el puerto http://localhost:${config.api.port}`);
});
