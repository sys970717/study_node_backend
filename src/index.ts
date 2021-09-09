import 'module-alias/register';
import { createConnection } from 'typeorm';
import app from "./app";
import connection from './config/databases/db-context';
import { connectionOptions } from './config/databases/testDatabase';
import Logger from './util/Logger';

const port: number = Number(process.env.WEB_PORT) || 3000;

const server = async (): Promise<void> => {
  
  createConnection(connectionOptions).then(async connection => {
    Logger.info(`DB connection = ${connection.isConnected}`);
    app.listen(port, () => Logger.info(`listening ${port}`));
  });
};

server();
