import CategoryRepository from '../repository/admin/CategoryRepository';
import GoodsRepository from '../repository/GoodsRepository';
import UsersRepository from '../repository/UsersRepository';
import { Connection } from 'typeorm';
import CategoryService from './admin/v1/CategoryService';
import GoodsService from './GoodsService';
import UsersService from './UsersService';

export type ServiceContext = {
  usersService: UsersService;
  goodsService: GoodsService;
  
  usersRepository: UsersRepository;
  goodsRepository:GoodsRepository;
  dbconn: Promise<Connection>;
  // transaction: <T>(callbackFn: (transaction) => Promise<T>, isSerializable?: boolean) => Promise<T>;

  /**
   * ADMIN Service
   */
  categoryService: CategoryService;

  categoryRepositoy: CategoryRepository;
};

export default class Service {
  constructor(private context: ServiceContext) {}

  protected get ctx(): ServiceContext {
    return this.context;
  }
}