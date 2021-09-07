'use strict';

import Users from "../domains/entity/Users";
import { getManager } from "typeorm";

export default class UsersRepository {
  private userRepository;
  public static instance: any;

  public async findAll() {
    this.userRepository = await getManager().getRepository(Users)
    const users: Users[] = await this.userRepository.find();
    return users;
  }

  public async findById(userId:any) {
    const repository = getManager().getRepository(Users);
    const user: Users = await repository.findOne(userId);

    return user;
  }
};