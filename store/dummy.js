const db = {
  user: [
    { id: "1", name: "Gabriel" },
    { id: "2", name: "Federico" },
  ],
};

const list = async (table) => {
  return db[table];
};

const get = async (table, id) => {
  let collection = await list(table);

  return collection.filter((item) => item.id === id)[0] || null;
};

const upsert = async (table, data) => {
  db[table].push(data);

  return data;
};

const remove = async (table, id) => {
  const index = db[table].findIndex((item) => item.id === id);
  if (index >= 0) {
    db[table].splice(index, 1);
    return true;
  } else {
    return false;
  }
};

module.exports = {
  list,
  get,
  upsert,
  remove,
};
