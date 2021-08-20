import 'module-alias/register';
import app from "./app";

const port: number = Number(process.env.WEB_PORT) || 3000;

const server = (): void => {
  app.listen(port, () => console.log(`listening ${port}`));
}

export default server;