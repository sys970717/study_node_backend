export default class FormSyntaxError extends Error {
  constructor(source: string) {
    super(`${source} is not found`);
    Object.setPrototypeOf(this, FormSyntaxError.prototype);
  }
}