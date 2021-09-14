import Users from '../entity/Users';
import bcrypt from 'bcrypt';

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

  public compareSyncUserPassword(encryptPassword: string, salt?: string): boolean {
    return bcrypt.compareSync(this.password, encryptPassword);
  }


  static ofForSignIn(username:string, password:string): UserLoginDto {
    return new UserLoginDto(username, password);
  }

  static ofForResponse(users: Users): UserLoginDto {
    const user = new UserLoginDto(users.name, users.password, users.id, users.cash || 0);
    delete user.password;
    return user;
  }
}