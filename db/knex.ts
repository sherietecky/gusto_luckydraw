module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'username',
        password: 'password',
        database: 'mydb',
      },
      migrations: {
        directory: __dirname + '/db/migrations',
      },
      seeds: {
        directory: __dirname + '/db/seeds',
      },
    },
  };