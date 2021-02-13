const TABLE = "auth";

//entidad de autenticación
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  //funcion para crear un usuario autenticado
  const upsert = (data) => {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = data.password;
    }

    return store.upsert(TABLE, authData);
  };

  return {
    upsert,
  }
};
