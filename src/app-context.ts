import { ServiceContext } from "./services/Service";

// import TestDatabase from "./config/databases/testDatabase/index";

// IoC 를 위함.
export const containerOfObjects = () => {
  const context = {} as ServiceContext;
  // const testDatabase = new TestDatabase('localhost', '', 3306, '');


  return context;
};

const ctx = containerOfObjects();

export default ctx;