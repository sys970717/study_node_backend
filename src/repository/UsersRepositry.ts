'use strict';

import Users from "../domains/entity/Users";
import { getManager } from "typeorm";

export default class UsersRepository {
  public static instance: any;

  public async findAll() {
    const repository = getManager().getRepository(Users);
    const users: Users[] = await repository.find();
    return users;
  }

  public async findById(userId:any) {
    const repository = getManager().getRepository(Users);
    const user: Users = await repository.findOne(userId);

    return user;
  }

  public async usersByName(name:string) {
    const repository = getManager().getRepository(Users);
    return await repository.find({
      where: {
        name,
      }
    });
  }

  public async createUsers(usersEntity: Users) {
    const repository = getManager().getRepository(Users);
    repository.insert(usersEntity);
  }
};