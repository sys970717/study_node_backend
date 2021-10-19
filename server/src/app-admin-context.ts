import UsersRepositoryImpl from './repository/impl/UsersRepositoryImpl';
import { AdminServiceContext } from './services/admin/AdminService';
import * as ORM from './config/databases/db-context';
import UsersServiceImpl from './services/admin/v1/impl/UsersServiceimpl';
import CategoryServiceImpl from './services/admin/v1/impl/CategoryServiceImpl';
import CategoryRepositoryImpl from './repository/admin/impl/CategoryRepositoryImpl';
import GoodsServiceImpl from './services/admin/v1/impl/GoodsServiceImpl';
import GoodsRepositoryImpl from './repository/admin/impl/GoodsRepositoryImpl';
import { Connection } from 'typeorm';

// IoC Container / DI 를 위함.
// 인스턴스의 생명주기를 관리.
export const containerOfObjects = async () => {
  const context = {} as AdminServiceContext;

  context.usersService = new UsersServiceImpl(context);
  context.categoryService = new CategoryServiceImpl(context);
  context.goodsService = new GoodsServiceImpl(context);

  context.dbconn = ORM.default;
  context.usersRepository = (await context.dbconn).getCustomRepository(UsersRepositoryImpl);
  context.categoryRepositoy = (await context.dbconn).getCustomRepository(CategoryRepositoryImpl);
  context.goodsRepository = (await context.dbconn).getCustomRepository(GoodsRepositoryImpl);
  
  // context.usersRepository = new UsersRepositoryImpl();
  // context.categoryRepositoy = new CategoryRepositoryImpl();
  // context.goodsRepository = new GoodsRepositoryImpl();


  return context;
};

const ctx = containerOfObjects();

export default ctx;