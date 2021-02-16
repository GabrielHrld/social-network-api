const request = require("request");

//funcion para generar conexiones remotas a base de datos
const createRemoteDB = (host, port) => {
  const URL = `http://${host}:${port}`;

  //funcion para traer la colección de datos completa
  const list = (table) => {
    return req("GET", table);
  };

  //funcion para traer la colección de una fila
  const get = (table, id) => {
    return req("GET", table, id);
  };

  //funcion para crear una fila o actualizar un dato
  const upsert = (table, data) => {
    //funcion para insertar
    function insert(table, data) {
      
      return req("POST", table, data);
    }

    //funcion para actualizar
    function update(table, data) {
      
      return req("PUT", table, data);
    }

    if (data.id) {    //condicional para determinar a donde derivar la data
      
      return update(table, data);
    } else {
      return insert(table, data);
    }
  };

  //funcion para hacer una consulta
  function query(table, query, join) {
		return req('POST', table + '/query',  {query, join} );
	}

  function req(method, table, data) {
    let url = `${URL}/${table}`;
    body = "";

    if (data && method === "GET") {
      //validamos el metodo que llega
      url += `/${data}`; //y modificamos la url en base a ello
    } else if (data) {
      body = JSON.stringify(data);
    }
    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            "content-type": "application/json",
          },
          url,
          body,
        },
        (error, request, body) => {
          if (error) {
            console.error("Remote database error", error);
            return reject(error.message);
          }
          const response = JSON.parse(body);
          return resolve(response.body);
        }
      );
    });
  }

  return {
    list,
    get,
    upsert,
    query
  };
};

module.exports = createRemoteDB;
