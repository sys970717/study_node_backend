// import ctx from "@/app-context";
// import { testCtx } from "@tools/test-context";

import { Connection, createConnection } from "typeorm";
import { connectionOptions } from "../../src/config/databases/testDatabase";

let connection:Connection;

beforeAll(() => {
  createConnection(connectionOptions).then(async connection => {
    connection = connection;
    console.log(`DB connection = ${connection.isConnected}`);
  });
});

afterAll(async () => {
  // closeDB();
  // close();
  await connection.close();
});