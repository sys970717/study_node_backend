import UsersRepository from "@/repository/UsersRepository";
import { Connection } from "typeorm";
import UsersService from "./UsersService";

export type ServiceContext = {
  usersService: UsersService;
  usersRepository: UsersRepository;

  dbconn: Promise<Connection>;
  // transaction: <T>(callbackFn: (transaction) => Promise<T>, isSerializable?: boolean) => Promise<T>;
};

export default class Service {
  constructor(private context: ServiceContext) {}

  protected get ctx(): ServiceContext {
    return this.context;
  }
}