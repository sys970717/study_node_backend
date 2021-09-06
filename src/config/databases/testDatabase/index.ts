import "reflect-metadata";
import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from "typeorm";
import Products from "../../../domains/entity/Products";
import Users from "../../../domains/entity/Users";
import dotenv from 'dotenv';

const pool = {
  max: 10,
  min: 5,
  acquire: 30000,
  idle: 10000
};

dotenv.config();
const env = process.env;

const CONNECTION_NAME = 'test';

const connectionOptions:ConnectionOptions = {
  // name: CONNECTION_NAME,
  type: "mysql",
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test1234',
  // host: env.DB_HOST || 'localhost',
  // port: Number(env.DB_PORT) || 3306,
  // username: env.DB_USER || 'test',
  // password: env.DB_PASSWORD || 'test1234',
  database: CONNECTION_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Products,
    Users,
  ],
  "migrations": [
    "/src/config/databasestestDatabase/migration/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "/src/databases/**/entity",
    "migrationsDir": "/src/databases/**/migration"
  },
  extra: {
    "connectionLimit": 8
  },
};

const connectionManager = getConnectionManager();

export const testDatabase = async() => {
  let connection;
  const hasConnection = connectionManager.has(CONNECTION_NAME);
  if(hasConnection) {
    console.log('이미 연결이 있음.');
    connection = connectionManager.get(CONNECTION_NAME);
    if(!connection.isConnected) {
      console.log('연결안됨.');
      connection = connection.connect();
    }
  } else {
    console.log('연결 없음');
    connection = connectionManager.create(connectionOptions);
    connection.connect()
      .then((result) => {
        console.log('asdfasdf');
        console.log(result);
        return result
      })
      .catch(e => {
        console.log('실패?');
        return e
      });
      
    // connection = connectionManager.create(connectionOptions);
    // connection = await connection.connect();
    console.log('연결 없음');
  }

  return connection;
};
