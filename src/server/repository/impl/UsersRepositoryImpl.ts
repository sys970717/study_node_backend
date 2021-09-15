'use strict';

import Users from '../../domains/entity/Users';
import { EntityRepository, getManager, Repository } from 'typeorm';
import UsersRepository from '../UsersRepository';

@EntityRepository(Users)
export default class UsersRepositoryImpl extends Repository<Users> implements UsersRepository {
  public async findAll(): Promise<Users[]> {
    const repository = getManager().getRepository(Users);
    const users: Users[] = await repository.createQueryBuilder('users')
    .leftJoinAndSelect('users.passwordInfo', 'users_password')
    .getMany();
    return users;
  }

  public async findById(userId:any): Promise<Users> {
    const repository = getManager().getRepository(Users);
    const user: Users = await repository.findOne(userId);

    return user;
  }

  public async usersByName(name:string): Promise<Users> {
    const repository = getManager().getRepository(Users);

    const user = await repository.createQueryBuilder('users')
    .leftJoinAndSelect('users.passwordInfo', 'users_password')
    .where('users.name = :name', { name })
    .getOne();

    // const user = await repository.find({
    //   relations: ['users_password'],
    //   where: {
    //     name,
    //   }
    // });
    
    return await user;
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