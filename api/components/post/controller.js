const { nanoid } = require("nanoid");
const TABLE = "posts";

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  //funcion para traer la lista de post
  const list = () => {
    return store.list(TABLE);
  };

  const get = (id) => {
    return store.get(TABLE, id);
  };

  //funcion para crear un post
  const upsert = async (post) => {
    const postData = {
      content: post.content,
      user: post.user,
    };

    if (post.id) {
      postData.id = post.id;
    } else {
      postData.id = nanoid();
    }

    return store.upsert(TABLE, postData);
  };

  return {
    list,
    upsert,
    get
  };
};
