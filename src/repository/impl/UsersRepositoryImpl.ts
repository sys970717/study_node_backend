'use strict';

import Users from '../../domains/entity/Users';
import { getManager } from 'typeorm';
import UsersRepository from '../UsersRepository';

export default class UsersRepositoryImpl implements UsersRepository {
  public async findAll(): Promise<Users[]> {
    const repository = getManager().getRepository(Users);
    const users: Users[] = await repository.find();
    return users;
  }

  public async findById(userId:any): Promise<Users> {
    const repository = getManager().getRepository(Users);
    const user: Users = await repository.findOne(userId);

    return user;
  }

  public async usersByName(name:string): Promise<Users> {
    const repository = getManager().getRepository(Users);
    return await repository.findOne({
      where: {
        name,
      }
    });
  }

  public async createUsers(usersEntity: Users) {
    const repository = getManager().getRepository(Users);
    return await repository.manager.save(usersEntity);
  }

  public async removeByName(name:string) {
    const repository = getManager().getRepository(Users);
    await repository.delete({ name });
  }

  public async loginUser(name: string, password: string) {
    const repository = getManager().getRepository(Users);
    return await repository.findOne({
      where: {name, password}
    })
  }
};