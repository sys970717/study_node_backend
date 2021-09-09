import { createConnection } from "typeorm";
import { connectionOptions } from "./testDatabase";



const dbConn = createConnection(connectionOptions).then(async connection => {
  console.log(`DB connection = ${connection.isConnected}`);
  return connection;
});

// export const initTransaction;

export default dbConn;