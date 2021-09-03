export abstract class Builder<P, T> {
  protected args: Partial<P>;
  
  protected constructor() {
    this.args = {};
  }
  
  get params(): P {
    return this.args as P;
  }
  
  abstract build(id?: number | string): T;
}