import "reflect-metadata";
import { Connection, ConnectionOptions, createConnection, getConnection, getConnectionManager } from "typeorm";
import dotenv from 'dotenv';
import path from 'path';
import Users from "../../../domains/entity/Users";
import logger from "../../../util/Logger";
import Goods from "../../../domains/entity/Goods";
import Category from "../../../domains/entity/Category";
import UsersPassword from "../../../domains/entity/UsersPassword";
import UserLastLogin from "../../../domains/entity/UsersLastLogin";

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
  entityDir = path.join(__dirname, '..', '..', '..', '../src/server', '/domains/entity/*.ts');
} else {
  entityDir = path.join(__dirname, '..', '..', '..', '../dist/server', '/domains/entity/*.js');
}

export const connectionOptions:ConnectionOptions = {
  // name: CONNECTION_NAME,
  type: "mysql",
  host: env.DB_HOST || 'localhost',
  port: Number(env.DB_PORT) || 3306,
  username: env.DB_USER || 'test',
  password: env.DB_PASSWORD || 'test1234',
  database: CONNECTION_NAME,
  synchronize: true, // don't create table always
  logging: true,
  timezone: 'Z',
  entities: [
    // entityDir
    Category,
    Users,
    Goods,
    UsersPassword,
    UserLastLogin
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
  logger.info(`DB has connection > ${hasConnection}`);
  if(hasConnection) {
    connection = getConnection();
    if(!connection.isConnected) {
      connection = await createConnection(connectionOptions);
      logger.info(`[RECONNECT] DB has connection > ${connectionManager.has('default')}`);
    }
  } else {
    connection = await createConnection(connectionOptions);
    logger.info(`[NEW CONNECT] DB has connection > ${connectionManager.has('default')}`);
  }

  return connection;
};
