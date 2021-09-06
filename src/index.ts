import 'module-alias/register';
import app from "./app";
import { testDatabase } from './config/databases/testDatabase';

const port: number = Number(process.env.WEB_PORT) || 3000;

testDatabase();

const server = (): void => {
  app.listen(port, () => console.log(`listening ${port}`));
}

server();