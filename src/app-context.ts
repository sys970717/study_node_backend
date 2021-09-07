import { ServiceContext } from "./services/Service";

// IoC 를 위함.
export const containerOfObjects = () => {
  const context = {} as ServiceContext;

  return context;
};

const ctx = containerOfObjects();

export default ctx;