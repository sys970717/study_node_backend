import morgan, { StreamOptions } from 'morgan';

import logger from './Logger';
import dotenv from 'dotenv';
dotenv.config();
const { NODE_ENV } = process.env;

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const morganMiddleware = morgan(
  ':method :url :status :res["content-length"] :response-time ms',
  {
    stream,
    // skip: () => {
    //   return NODE_ENV === 'development';
    // }
  }
);

export default morganMiddleware;