import knex from "knex";
const config = {
  client: "pg",
  connection: {
    host: "localhost",
    user: "username",
    password: "password",
    database: "lucky_draw_db",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: __dirname + "/migrations",
  },
  seeds: {
    directory: __dirname + "/seeds",
  },
};

const database = knex(config);

export default database;
