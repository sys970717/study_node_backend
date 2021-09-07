import UsersRepository from "../repository/UsersRepositry";

export default class UserService {
  private usersRepository = new UsersRepository();

  public async getUsers() {
    return await this.usersRepository.findAll();
  }

  public async getUserById(userId:string) {
    return await this.usersRepository.findById(userId);
  }

  public async createUsers(name:string, gender:number) {
    const alreadyUser = await this.usersRepository.usersByName(name);
    if(alreadyUser) {
      return '이미 있는 회원입니다.';
    } else {
      return '회원가입 가능';
    }
  }
  
}