import CategoryRepository from '../../repository/admin/CategoryRepository';
import UsersRepository from '../../repository/UsersRepository';
import { Connection } from 'typeorm';
import CategoryService from '../admin/v1/CategoryService';
import UsersService from './v1/UsersService';

export type AdminServiceContext = {
  usersService: UsersService;
  usersRepository: UsersRepository;

  dbconn: Promise<Connection>;

  categoryService: CategoryService;
  categoryRepositoy: CategoryRepository;
};

export default class AdminService {
  constructor(private context: AdminServiceContext) {}

  protected get ctx(): AdminServiceContext {
    return this.context;
  }
}