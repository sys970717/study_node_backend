import express, { ErrorRequestHandler } from 'express';
import 'reflect-metadata';
import v1Router from './routers/v1/index';
import dotenv from 'dotenv';
import cors from 'cors';
import NotFoundError from './domains/errors/NotFoundError';
import FormSyntaxError from './domains/errors/FormSyntaxError';

dotenv.config();

class App {
    public application : express.Application;
    
    constructor() {
        this.application = express();
    }
}

const app = new App().application;

app.use(cors());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use("/v1", v1Router);

const errorHandler = (err, req, res) : ErrorRequestHandler => {
    console.error(err);
    const obj = {
        debug: true,
        code: 500,
        message: err.message,
        stack: err.stack,
        user: undefined,
    };
    if(process.env.NODE_ENV === 'production') {
        delete obj.debug;
        delete obj.stack;
    } else {
        obj.user = req.user;
    }

    if(err instanceof FormSyntaxError) {
        obj.code = 400;
        return res.status(200).json(obj);
    } else if (err instanceof NotFoundError) {
        obj.code = 404;
        return res.status(obj.code).json(obj);
    } else {
        return res.send(obj.code).json(obj);
    }
};

app.use(errorHandler);

export default app;