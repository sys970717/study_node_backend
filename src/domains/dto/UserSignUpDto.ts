const GENDER_TYPE = {
  female: 0,
  male: 1,
} as const;

export default class UserSignUpDto {
  public username:string;
  public password:string;
  public gender:number;
  constructor(username:string, password:string, gender: number) {
    this.username = username;
    this.password = password;
    this.gender = gender;
  };
}