const auth = require('../../../auth');

//funcion que gestiona los permisos de la app
module.exports = function checkAuth(action){

  //recibe la accion que querramos hacer
  //y ejecuta el método correspondiente
  const middleware = (req, res, next) => {
    switch(action){
      case 'update':
        console.log(req.body.user)
        const owner = req.body.user;
        auth.check.own(req, owner);
        next();
        break;
    }
  }

  return middleware;
};