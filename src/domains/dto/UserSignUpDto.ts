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

  constructor() {

  }

  static ofForRequestTrans(username:string, password:string, gender: number): UserSignUpDto {
    const instance = new UserSignUpDto();
    instance.username = username;
    instance.password = password;
    instance.gender = gender;
    return instance;
  }

  static ofForResponse(users: Users): UserSignUpDto {
    const instance = new UserSignUpDto();
    instance.id = users.id,
    instance.username = users.name;
    instance.gender = users.gender;
    return instance
  }
}