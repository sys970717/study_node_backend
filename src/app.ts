import express, { ErrorRequestHandler } from 'express';
import 'reflect-metadata';
import v1Router from './routers/v1/index';
import dotenv from 'dotenv';
import cors from 'cors';
import NotFoundError from './domains/errors/NotFoundError';
import FormSyntaxError from './domains/errors/FormSyntaxError';
import Logger from './util/Logger';
import morganMiddleware from './util/morganMiddleware';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

class App {
    public application : express.Application;
    constructor() {
        this.application = express();
    }
}

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = new App().application;

app.use(cors());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(morganMiddleware);
app.use('/v1', v1Router);
app.use('/fe', express.static(__dirname + '/public'));

const errorHandler = (err, req, res, next) : ErrorRequestHandler => {
    Logger.error(err);
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