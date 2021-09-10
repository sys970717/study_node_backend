'use strict';

import Users from '../domains/entity/Users';

export default interface UsersRepository {
  findAll(): Promise<Users[]>;
  loginUser(name:string, password: string): Promise<Users>;
  findById(userId: number): Promise<Users>;
  usersByName(name: string): Promise<Users>;
  createUsers(usersEntity: Users): Promise<Users>;
  removeByName(name: string): Promise<void>;
};