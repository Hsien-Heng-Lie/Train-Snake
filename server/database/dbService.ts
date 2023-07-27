import dotenv from 'dotenv';
dotenv.config();
const sql = require('mssql')

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_KEY,
  server: process.env.DATABASE_CONNECTION_STRING,
  database: process.env.DATABASE,
  options: {
    trustServerCertificate: true,
  },
  pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
  }
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool: any) => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch((err: any) => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}


