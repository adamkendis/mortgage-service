
module.exports = {

  development: {
    client: 'mariadb',
    connection: {
      port: process.env.RDS_PORT || 3306,
      host: process.env.RDS_HOSTNAME || 'localhost',
      user: process.env.RDS_USERNAME || 'root',
      password: process.env.RDS_PASSWORD || '',
      database: process.env.RDS_DB_NAME || 'mortgage'
    },
    migrations: {
      directory: __dirname + 'server/database/migrations'
    },
    seeds: {
      directory: __dirname + 'server/database/seeds/development'
    }
  }

  // staging: {
  //   client: 'mariadb',
  //   connection: {
  //     database: 'mortgage',
  //     user:     'username',
  //     password: ''
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'mariadb',
  //   connection: {
  //     database: 'mortgage',
  //     user:     'root',
  //     password: ''
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};