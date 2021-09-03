import { ServiceContext } from "./services/Service";

import connection from './config/databases/testDatabase/index';

// IoC 를 위함.
export const containerOfObjects = () => {
  const context = {} as ServiceContext;

  context.transaction = connection

  return context;
};

const ctx = containerOfObjects();

export default ctx;