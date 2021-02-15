const mysql = require("mysql");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

//funcion para generar la conexion a la DB
const handleConnection = () => {
  connection = mysql.createConnection(dbconfig);

  connection.connect((error) => {
    if (error) {
      console.error("[db error]", error);
      setTimeout(handleConnection, 2000);
    } else {
      console.log("[DB CONNECTED]");
    }
  });

  connection.on("error", (error) => {
    console.error("[db error]", error);
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw error;
    }
  });
};

handleConnection();

//funcion para consultar la lista de usuarios a la DB
const list = (table) => {
  //retornamos una promesa para manejar los errores asíncronos
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, data) => {
      if (error) {
        return reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

//funcion para consultar un solo usuario a la DB
const get = (table, where) => {
  //retornamos una promesa para manejar los errores asíncronos
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE ? `,
      where,
      (error, data) => {
        if (error) {
          return reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
};

//funcion para crear un usuario
const insert = (table, data) => {
  //retornamos una promesa para manejar los errores asíncronos
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//funcion para actualizar datos de un usuario
const update = (table, data) => {
  //retornamos una promesa para manejar los errores asíncronos
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

//funcion que valida si se genera o se modifica un usuario
const upsert = async (table, data) => {
  let row = [];
  if (data.id) {
    row = await get(table, data.id);
  }

  if (row.length === 0) {
    return insert(table, data);
  } else {
    return update(table, data);
  }
};

// funcion para hacer consultas a la DB
const query = (table, q, join) => {
  let joinQuery = "";   
  if (join) {         
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, q, (error, res) => {
      if (error) {
        return reject(error);
      } else {
        resolve(res[0] || null);
      }
    });
  });
};
module.exports = { list, get, upsert, query };
