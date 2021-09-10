import "reflect-metadata";
import { Connection, ConnectionOptions, createConnection, getConnection, getConnectionManager } from "typeorm";
import dotenv from 'dotenv';
import path from 'path';
import Users from "../../../domains/entity/Users";
import logger from "../../../util/Logger";

const __dirname = path.resolve();

// const pool = {
//   max: 10,
//   min: 5,
//   acquire: 30000,
//   idle: 10000
// };

dotenv.config();
const env = process.env;

const CONNECTION_NAME = 'test';

let entityDir = '';
if (env.NODE_ENV !== 'production') {
  entityDir = path.join(__dirname, '..', '..', '..', '../src', '/domains/entity/*.ts');
} else {
  entityDir = path.join(__dirname, '..', '..', '..', '../dist', '/domains/entity/*.js');
}

export const connectionOptions:ConnectionOptions = {
  // name: CONNECTION_NAME,
  type: "mysql",
  host: env.DB_HOST || 'localhost',
  port: Number(env.DB_PORT) || 3306,
  username: env.DB_USER || 'test',
  password: env.DB_PASSWORD || 'test1234',
  database: CONNECTION_NAME,
  synchronize: true,
  logging: false,
  entities: [
    // entityDir
    Users,
    // Products,
  ],
  migrations: [
    path.join(__dirname, './**/migrations/*.js'),
  ],
  cli: {
    "entitiesDir": entityDir,
    "migrationsDir": path.join(__dirname, './**/migrations/*.js'),
  },
  extra: {
    "connectionLimit": 8
  },
};

export const testDatabase = async() => {
  const connectionManager = getConnectionManager();
  let connection:Connection;
  const hasConnection = connectionManager.has('default');
  logger.info(`>>>> ${hasConnection}`);
  if(hasConnection) {
    connection = getConnection();
    if(!connection.isConnected) {
      connection = await createConnection(connectionOptions);
    }
  } else {
    connection = await createConnection(connectionOptions);
  }

  return connection;
};
