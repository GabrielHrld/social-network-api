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
  const upsert = (data) => {
    return store.upsert(TABLE, data);
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
