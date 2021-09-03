import { ServiceContext } from "./services/Service";

import connection from './config/databases/testDatabase/index';
import TestDatabase from "./config/databases/testDatabase/index";

// IoC 를 위함.
export const containerOfObjects = () => {
  const context = {} as ServiceContext;


  return context;
};

const ctx = containerOfObjects();

export default ctx;