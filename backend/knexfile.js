module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_DEV_NAME,
      host: process.env.DB_DEV_HOST,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_PROD_NAME,
      user: process.env.DB_PROD_USER,
      password: process.env.DB_PROD_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
