const bcrypt = require("bcrypt");
const auth = require("../../../auth");
const TABLE = "auth";

//entidad de autenticación
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  //funcion para definir si el usuario esta registrado
  const login = async (username, password) => {
    //le decimos que busque en la tabla auth el username
    //que le pasamos por parámetro
    const data = await store.query(TABLE, { username: username });

    //si el password del parametro descifra el encriptado
    //devolvemos el JWT
    return bcrypt.compare(password, data.password)
      .then((areEquals) => {
      if (areEquals === true) {
        return auth.sign({...data});
      } else {
        throw new Error("Información inválida");
      }
    });
  };

  //funcion para crear un usuario autenticado
  const upsert = async (data) => {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  };

  return {
    login,
    upsert,
  };
};
