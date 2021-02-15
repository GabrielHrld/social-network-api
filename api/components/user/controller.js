const {nanoid} = require("nanoid");
const auth = require('../auth');
const TABLE = "users";

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

  //funcion para que un usuario siga a otro
  const follow = (from, to) => {
    return store.upsert(TABLE + '_follow', {
      user_from: from,
      user_to: to,
    });
  }

  // funcion para traer los seguidos por un usuario
  const followList = async (user) => {
    const join = {};
    join[TABLE] = 'user_to'; // {users: 'user_to'}
    const query = {user_from: user};

    return await store.query(TABLE + '_follow', query, join)
  }
  
  return {
    list,
    get,
    upsert,
    remove,
    follow,
    followList
  };
};
