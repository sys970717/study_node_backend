import Users from '../entity/Users';

export default class UserLoginDto {
  public username:string;
  public password:string;

  private id: number;
  private cash: number;

  constructor(username: string, password: string, id?: number, cash?: number) {
    this.username = username;
    this.password = password;
    this.id = id ? id : null;
    this.cash = cash ? cash : 0;
  }

  static ofForSignIn(username:string, password:string): UserLoginDto {
    return new UserLoginDto(username, password);
  }

  static ofForResponse(users: Users): UserLoginDto {
    return new UserLoginDto(users.name, users.password, users.id, users.cash || 0);
  }
}