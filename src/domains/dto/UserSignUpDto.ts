import Users from "../entity/Users";

const GENDER_TYPE = {
  female: 0,
  male: 1,
} as const;

export default class UserSignUpDto {
  private id: number;
  public username:string;
  public password:string;
  public gender:number;

  constructor(username: string, gender: number, password?:string, id?: number, ) {
    this.username = username;
    this.gender = gender;
    this.password = password;
    this.id = id ? id : null;
  }

  static ofForRequestTrans(username:string, password:string, gender: number): UserSignUpDto {
    return new UserSignUpDto(username, gender, password);
    ;
  }

  static ofForResponse(users: Users): UserSignUpDto {
    return new UserSignUpDto(users.name, users.gender, null, users.id);
  }
}