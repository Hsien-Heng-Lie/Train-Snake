"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sql = require('mssql');
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
};
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
    console.log('Connected to MSSQL');
    return pool;
})
    .catch((err) => console.log('Database Connection Failed! Bad Config: ', err));
module.exports = {
    sql, poolPromise
};
