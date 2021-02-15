const auth = require('../../../auth');

//funcion que gestiona los permisos de la app
module.exports = function checkAuth(action){

  //recibe la accion que querramos hacer
  //y ejecuta el método correspondiente
  const middleware = (req, res, next) => {
    switch(action){
      case 'update':
        const owner = req.body.id;
        auth.check.own(req, owner);
        next();
        break;

      case 'follow':
          auth.check.logged(req);
          next();
          break;
      default:
        next();
    }
  }

  return middleware;
};