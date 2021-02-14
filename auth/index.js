const jwt = require("jsonwebtoken");
const config = require('../config');
const secret = config.jwt.secret;

//funcion para logearse
const sign = (data) => {
  return jwt.sign(data, secret);
};

//funcion que recibe el token y lo decodifica
const verify = (token) => {
  return jwt.verify(token, secret)
}

const check = { //Objeto que guarda las funciones de check in
  own: function(req, owner){
    const decoded = decodeHeader(req);
    console.log(decoded);

    if (decoded.id !== owner) {
      throw new Error('No podes hacer esto');
    }
  }
}

//funcion para obtener el token limpio
const getToken = (auth) => {
  if (!auth) {
    throw new Error('No viene el token');
  }
  if (auth.indexOf('Bearer ') == -1) {
    throw new Error('Formato inválido')
  }
  let token = auth.replace('Bearer ', '');

  return token;
}

//funcion que decodifica el token
const decodeHeader = (req) => {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check
}
