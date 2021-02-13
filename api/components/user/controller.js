const {nanoid} = require("nanoid");
const auth = require('../auth');
const TABLE = "user";

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  //funcion para listar todos los usuarios
  const list = () => {
    return store.list(TABLE);
  };

  //funcion para traer un usurio
  const get = (id) => {
    return store.get(TABLE, id);
  };

  //funcion para crear un usuario
  const upsert = async (body) => {
    const user = {
      name: body.name,
      username: body.username
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    //generamos el usuario de autenticacion
    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
    }
    return store.upsert(TABLE, user);
  };

  //funcion para eliminar un usuario
  const remove = (id) => {
    return store.remove(TABLE, id);
  };

  return {
    list,
    get,
    upsert,
    remove,
  };
};
