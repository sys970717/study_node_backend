import express, { ErrorRequestHandler, Request, } from 'express';
import 'reflect-metadata';
import v1Router from './routers/v1';
import AdminRouterV1 from './routers/admin/v1';
import dotenv from 'dotenv';
import cors from 'cors';
import NotFoundError from './domains/errors/NotFoundError';
import FormSyntaxError from './domains/errors/FormSyntaxError';
import Logger, { logRequest } from './util/Logger';
import morganMiddleware from './util/morganMiddleware';
import path from 'path';
import session from 'express-session';
import { UserRedis } from './config/databases/redis/UserRedis';
import connectRedis from 'connect-redis';
import { v4 as uuidv4 } from 'uuid';
import UserSession from './domains/dto/user/UserSession';

dotenv.config();

const __dirname = path.resolve();

declare global {
  namespace Express {
    export interface Request {
      user?: string,
      admin?: string,
      role?: any,
      _startAt?: number,
      inboundIp?: string | string[],
    }
  }
}

class App {
    public application : express.Application;
    constructor() {
        this.application = express();
    }
}

process.on('uncaughtException', (e) => {
  Logger.error('server error', e);
});

const RedisStore = connectRedis(session);
const app = new App().application;

const corsOptionsDelegate = (req: Request, cb: Function) => {
  const allowList = [
    `http://localhost:5000`,
  ];

  const corsOption = {};
  if (allowList.indexOf(req.header('Origin')) !== -1) {
    corsOption['origin'] = true;
  } else {
    corsOption['origin'] = false;
  }
  corsOption['credentials'] = true;
  cb(null, corsOption);
};

app.use(cors(corsOptionsDelegate));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(morganMiddleware);

app.use((req, res, next) => {
    logRequest(req, res);
    next();
});
console.log('redis Connection?');
console.log(UserRedis.connected);
app.use('/v1', v1Router);
app.use(session({
  genid: () => uuidv4(),
  secret: 's#y$97@7!7',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 30,
    httpOnly: true,
    secure: false
  },
  store: new RedisStore({
    client: UserRedis,
    ttl: 260,
    prefix : "session:",
  }),
}));

app.use('/admin/v1', AdminRouterV1);

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  req.inboundIp = ip === '::1' ? '127.0.0.1' : ip;

  next();
});

const errorHandler = (err, req, res, next) : ErrorRequestHandler => {
  Logger.error('API Error', err);
  const obj = {
    debug: true,
    code: err.code || 500,
    message: err.message,
    stack: err.stack,
    user: undefined,
    date: (new Date()).toISOString(),
  };
  if(process.env.NODE_ENV === 'production') {
    delete obj.debug;
    delete obj.stack;
  } else {
    obj.user = req.user;
  }

  console.log(obj);

  if(err instanceof FormSyntaxError) {
    obj.code = 400;
      return res.status(200).send(obj);
  } else if (err instanceof NotFoundError) {
    obj.code = 404;
      return res.status(obj.code).send(obj);
  } else {
    return res.status(obj.code).send({ ...obj });
  }
};
app.use(errorHandler);

export default app;