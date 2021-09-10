import 'module-alias/register';
import { createConnection } from 'typeorm';
import app from './app';
import { cpus } from 'os';
import { connectionOptions } from './config/databases/testDatabase';
import logger from './util/Logger';

const port: number = Number(process.env.WEB_PORT) || 3000;

logger.debug((new Date()).toISOString());
logger.debug(`NODE_ENV: ${process.env.NODE_ENV}`);
logger.debug(`CPU core count: ${cpus().length}`);

process.on('unhandledRejection', (reason) => {
  logger.error(reason);
  logger.error('unhandledRejection', (new Date()).toISOString());
  throw reason;
});

process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException >> ${JSON.stringify(error)}`);
  logger.error('uncaughtException', (new Date()).toISOString(), error);
  process.exit(1);
});

const server = async (): Promise<void> => {
  createConnection(connectionOptions).then(async connection => {
    logger.debug(`DB connection = ${connection.isConnected}`);
    app.listen(port, () => logger.info(`listening ${port}`));
  });
};

server();
