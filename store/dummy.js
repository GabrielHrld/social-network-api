const db = {
  user: [
    { id: "1", name: "Gabriel" },
    { id: "2", name: "Federico" },
  ],
};

const list = async (table) => {
  //retornamos la lista completa
  return db[table] || [];
};

const get = async (table, id) => {
  //obtenemos por id al usuario que queremos
  let collection = await list(table);

  return collection.filter((item) => item.id === id)[0] || null;
};

const upsert = async (table, data) => {

  if (!db[table]) {
    db[table] = [];
  }
  //empujamos a nuestra "db" los datos del nuevo usuario
  db[table].push(data);

  console.log(db)
  return data;
};

const remove = async (table, id) => {
  //buscamos por el id a nuestro usuario y validamos
  //si index es mayor a cero, eliminamos ese usuario
  const index = db[table].findIndex((item) => item.id === id);
  if (index >= 0) {
    db[table].splice(index, 1);
    return true;
  } else {
    return false;
  }
};

const query = async (table, q) => {
  let collection = await list(table);
  
  let keys = Object.keys(q);
  let key = keys[0]

  return collection.filter((item) => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
};
