'use strict';

import { getRepository } from "typeorm";
import { testDatabase } from "../config/databases/testDatabase";
import Users from "../domains/entity/Users";


testDatabase();

export default class UsersRepository {
  private userRepository;
  public static instance: any;

  constructor() {
    this.userRepository = getRepository(Users);
  }

  public async findAll() {
    const users: Users[] = await this.userRepository.find();
    return users;
  }
};