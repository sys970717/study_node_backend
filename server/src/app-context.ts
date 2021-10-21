import UsersRepositoryImpl from './repository/impl/UsersRepositoryImpl';
import { ServiceContext } from './services/Service';
import * as ORM from './config/databases/db-context';
import UsersServiceImpl from './services/impl/UsersServiceimpl';
import GoodsServiceImpl from './services/impl/GoodsServiceImpl';
import GoodsRepositoryImpl from './repository/impl/GoodsRepositoryImpl';
import CategoryServiceImpl from './services/admin/v1/impl/CategoryServiceImpl';
import CategoryRepositoryImpl from './repository/admin/impl/CategoryRepositoryImpl';

// IoC Container / DI 를 위함.
// 인스턴스의 생명주기를 관리.
export const containerOfObjects = () => {
  const context = {} as ServiceContext;

  context.dbconn = ORM.default;

  context.usersService = new UsersServiceImpl(context);
  context.goodsService = new GoodsServiceImpl(context);

  context.usersRepository = new UsersRepositoryImpl();
  context.goodsRepository = new GoodsRepositoryImpl();

  return context;
};

const ctx = containerOfObjects();

export default ctx;