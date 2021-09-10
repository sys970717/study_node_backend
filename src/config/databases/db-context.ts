import logger from "../../util/Logger";
import { createConnection } from "typeorm";
import * as testDBConnect from "./testDatabase";

const dbConn = createConnection(testDBConnect.connectionOptions).then(async connection => {
  logger.debug(`DB connection = ${connection.isConnected}`);
  return connection;
});

// export const initTransaction;

export default dbConn;