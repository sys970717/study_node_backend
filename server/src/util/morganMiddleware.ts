import morgan, { StreamOptions } from 'morgan';

import logger, { logRequest } from './Logger';
import dotenv from 'dotenv';
dotenv.config();
const { NODE_ENV } = process.env;

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const morganMiddleware = morgan(
  ':remote-user :method :url :status :res["content-length"] :response-time ms',
  {
    stream,
  }
);

export default morganMiddleware;