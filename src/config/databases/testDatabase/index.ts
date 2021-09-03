import "reflect-metadata";
import { Connection, getConnectionManager } from "typeorm";
import Products from "../../../domains/entity/products";

const connectionManager = getConnectionManager();

const pool = {
  max: 10,
  min: 5,
  acquire: 30000,
  idle: 10000
};

export default class TestDatabase {
  private connection: Connection;

  private DB_HOST: string;
  private DB_PORT: number;
  private DB_USER: string;
  private DB_NAME: string;

  constructor(DB_HOST: string, DB_USER: string, DB_PORT: number, DB_NAME: string) {
    this.DB_HOST = DB_HOST || 'localhost';
    this.DB_PORT = DB_PORT || 3306;
    this.DB_USER = DB_USER || 'test';
    this.DB_NAME = DB_NAME || 'test1234';
  }

  async createConnection() {
    this.connection = await connectionManager.create({
      type: "mysql",
      host: this.DB_HOST,
      port: this.DB_PORT,
      username: this.DB_USER,
      password: this.DB_NAME,
      database: "test",
      synchronize: true,
      logging: false,
      entities: [
        Products,
      ],
      "migrations": [
        "/src/databases/**/migration/**/*.ts"
      ],
      "cli": {
        "entitiesDir": "/src/databases/**/entity",
        "migrationsDir": "/src/databases/**/migration"
      },
      extra: {
        "connectionLimit": 8
      },
    }).connect();
  }

  async getConnection () {
   return this.connection;
  }
};
