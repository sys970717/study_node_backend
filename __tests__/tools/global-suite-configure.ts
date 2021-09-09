import ctx from "@/app-context";
// import { testCtx } from "@tools/test-context";

import { createConnection, getConnection } from "typeorm";
import { connectionOptions } from "../../src/config/databases/testDatabase";

const connection = {
  async create(){
    await createConnection(connectionOptions);
  },

  async close(){
    await getConnection().close(); 
  },

  async clear(){
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

export default connection;
