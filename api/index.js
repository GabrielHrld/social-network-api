const express = require("express");

const config = require("../config.js");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const post = require("./components/post/network");
const errors = require('../network/errors');

const app = express();

app.use(express.json());

//ROUTER
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use('/api/post', post);
app.use(errors);

app.listen(config.api.port, () => {
  console.log(`escuchando en el puerto http://localhost:${config.api.port}`);
});
