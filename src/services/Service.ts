export type ServiceContext = {

};

export default class Service {
  constructor(private context: ServiceContext) {}

  protected get ctx(): ServiceContext {
    return this.context;
  }
}