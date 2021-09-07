import 'module-alias/register';
import { createConnection } from 'typeorm';
import app from "./app";
import { connectionOptions } from './config/databases/testDatabase';
import Users from './domains/entity/Users';

const port: number = Number(process.env.WEB_PORT) || 3000;

const server = async (): Promise<void> => {
  createConnection(connectionOptions).then(async connection => {
    console.log(await connection.getRepository(Users));
    app.listen(port, () => console.log(`listening ${port}`));
  })
}

server();
