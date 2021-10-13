import 'module-alias/register';
import cluster from 'cluster';
import app from './app';
import { cpus } from 'os';
import { createConnection } from 'typeorm';
import { connectionOptions } from './config/databases/testDatabase';
import logger from './util/Logger';

const port: number = Number(process.env.WEB_PORT) || 3000;
const cpuCount = cpus().length;

if(cluster.isPrimary) {
  logger.debug((new Date()).toISOString());
  logger.debug(`NODE_ENV: ${process.env.NODE_ENV}`);
  logger.debug(`CPU core count: ${cpuCount}`);
  
  process.on('unhandledRejection', (reason) => {
    logger.error(reason);
    logger.error('unhandledRejection', (new Date()).toISOString());
    throw reason;
  });
  
  process.on('uncaughtException', (error) => {
    logger.error(`uncaughtException`, error);
    logger.error('uncaughtException', (new Date()).toISOString(), error);
    process.exit(1);
  });
}

const workers = {};
const spawn = () => {
  const worker = cluster.fork();
  workers[worker.process.pid] = worker;
  return worker;
}

if(cluster.isPrimary) {
  for(let i = 0; i < cpuCount; i += 1) {
    cluster.on('death', (worker) => {
      logger.info(`worker ${worker.pid} died.`);
      logger.info('spawning a new process..');
      spawn();
    });
  }
}

const server = (): void => {
  // createConnection(connectionOptions).then(async connection => {
    // logger.debug(`DB connection = ${connection.isConnected}`);
    app.listen(port, () => logger.info(`listening ${port}`));
  // }).catch(err => logger.error('DBError', err));
};

server();
