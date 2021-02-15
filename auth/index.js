const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");
const secret = config.jwt.secret;

//funcion para logearse
const sign = (data) => {
  return jwt.sign(data, secret);
};

//funcion que recibe el token y lo decodifica
const verify = (token) => {
  return jwt.verify(token, secret);
};

//Objeto que guarda las funciones de check in
const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    // console.log(decoded);

    if (decoded.id !== owner) {
      throw error("No podes hacer esto", 401);
    }
  },

  logged: function (req) {
    const decoded = decodeHeader(req);
  },
};

//funcion para obtener el token limpio
const getToken = (auth) => {
  if (!auth) {
    throw error("No viene el token", 401);
  }
  if (auth.indexOf("Bearer ") == -1) {
    throw error("Formato inválido", 401);
  }
  let token = auth.replace("Bearer ", "");

  return token;
};

//funcion que decodifica el token
const decodeHeader = (req) => {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
};

module.exports = {
  sign,
  check,
};
