import Users from "../entity/Users";

export default class UserLoginDto {
  public username:string;
  public password:string;

  private id: number;
  private cash: number;

  constructor() {

  }

  static ofForSignIn(username:string, password:string): UserLoginDto {
    const instance = new UserLoginDto();
    instance.username = username;
    instance.password = password;
    return instance;
  }

  static ofForResponse(users: Users): UserLoginDto {
    const instance = new UserLoginDto();
    instance.username = users.name;
    instance.password = users.password;
    instance.id = users.id;
    instance.cash = users.cash || 0;
    return instance;
  }
}