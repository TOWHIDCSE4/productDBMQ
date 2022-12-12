import dbConfig from "@config/database";

const options = {
  client: dbConfig.DB_TYPE,
  connection: {
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASS,
    database: dbConfig.DB_NAME,
    multipleStatements: true,
  },
  pool: { min: 0, max: dbConfig.DB_POOL_SIZE },
};

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

class Connection {
  _connection: any;
  constructor() {}

  get connection() {
    if (this._connection && !this._connection.connecting) {
      this.connect();
    }
    return this._connection;
  }

  set connection(connection) {
    this._connection = connection;
    this._connection.connecting = true;
  }

  async connect() {
    console.log("new Database connection");
    try {
      const knex = require("knex");
      if (typeof knex.QueryBuilder.extend != "function") {
        throw Error(
          "Knex version đã cũ, xóa node_modules, yarn.lock và cài lại node modules"
        );
      }

      this.connection = knex(options);
      return this.connection || {};
    } catch (e) {
      throw e;
    }
  }

  async connectMongodb() {
    // try {
    //   const mongoose = require("mongoose");
    //   mongoose.set("strictQuery", false);
    //   await mongoose.connect(dbConfig.MONGODB_URI, mongodbOptions);
    //   console.log("new mongodb database connection");
    // } catch (e) {
    //   console.log("Error to connect database");
    //   throw e;
    // }
    return await "";
  }
}

export default Connection;
