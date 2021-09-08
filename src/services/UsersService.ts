import UserSignUpDto from "@/domains/dto/UserSignUpDto";
import Users from "@/domains/entity/Users";
import UsersRepository from "../repository/UsersRepositry";

export default class UserService {
  private usersRepository = new UsersRepository();

  public async getUsers() {
    return await this.usersRepository.findAll();
  }

  public async getUserById(userId:string) {
    return await this.usersRepository.findById(userId);
  }

  public async createUsers(usersSignUpDto: UserSignUpDto) {
    const alreadyUser = await this.usersRepository.usersByName(usersSignUpDto.username);
    if(alreadyUser) {
      return '이미 있는 회원입니다.';
    } else {
      await this.usersRepository.createUsers(Users.createUserFromSignDto(usersSignUpDto));
    }
  }
  
}