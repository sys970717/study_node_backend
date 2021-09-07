import { Connection } from "typeorm";

export type ServiceContext = {
  transaction: <T>(callbackFn: (transaction) => Promise<T>, isSerializable?: boolean) => Promise<T>;
};

export default class Service {
  constructor(private context: ServiceContext) {}

  protected get ctx(): ServiceContext {
    return this.context;
  }
}