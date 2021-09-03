import "reflect-metadata";
import { getConnectionManager } from "typeorm";

const connectionManager = getConnectionManager();
const connInfo = connectionManager.create({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [
    "src/databases/**/entity/**/*.ts"
  ],
  "migrations": [
    "src/databases/**/migration/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/databases/**/entity",
    "migrationsDir": "src/databases/**/migration"
  },
  "extra": {
    "connectionLimit": 8
  }
});

const connection = connInfo.connect().then(conn => {
  return conn;
});

export default connection;