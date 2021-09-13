import Users from '../entity/Users';
import bcrypt from 'bcrypt';

const GENDER_TYPE = {
  female: 0,
  male: 1,
} as const;

export default class UserSignUpDto {
  private id: number;
  public username:string;
  public password:string;
  public gender:number;
  public salt: string;

  constructor(username: string, gender: number, password?:string, id?: number, salt?:string) {
    this.username = username;
    this.gender = gender;
    this.password = password;
    this.id = id ? id : null;
    this.salt = salt;
  }

  public createUserPasswordByBcrypt() {
    const salt = bcrypt.genSaltSync(Math.round(new Date().valueOf() * Math.random()));
    // const salt = `${Math.round(new Date().valueOf() * Math.random())}`;
    console.log(salt);
    const hash = bcrypt.hashSync(this.password, salt);
    this.salt = salt;
    this.password = hash;
  }

  static ofForRequestTrans(username:string, password:string, gender: number): UserSignUpDto {
    return new UserSignUpDto(username, gender, password);
    ;
  }

  static ofForResponse(users: Users): UserSignUpDto {
    const instance = new UserSignUpDto(users.name, users.gender, null, users.id);
    delete instance.salt;
    delete instance.password;
    return new UserSignUpDto(users.name, users.gender, null, users.id);
  }
}