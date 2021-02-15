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

  //funcion para dar likes a un post
  const setLike = (user, post) => {
    return store.upsert(TABLE + "_likes", {
      user_id: user,
      post_id: post,
    });
  };

  //funcion para obtener los likes de un post
  const getLike = (id) => {
    return store.get(TABLE + "_likes", id)
  }

  return {
    list,
    upsert,
    get,
    setLike,
    getLike
  };
};
