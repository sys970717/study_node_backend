import UsersRepositoryImpl from "./repository/impl/UsersRepositoryImpl";
import { ServiceContext } from "./services/Service";
import * as ORM from './config/databases/db-context';
import UsersServiceImpl from "./services/impl/UsersServiceimpl";

// IoC Container / DI 를 위함.
// 인스턴스의 생명주기를 관리.
export const containerOfObjects = () => {
  const context = {} as ServiceContext;

  // context.dbconn = ORM.default;
  context.usersRepository = new UsersRepositoryImpl();
  context.usersService = new UsersServiceImpl(context);

  return context;
};

const ctx = containerOfObjects();

export default ctx;