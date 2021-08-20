export default class NotFoundError extends Error {
  constructor(source: string) {
    super(`${source} is not found`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}