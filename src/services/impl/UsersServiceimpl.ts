import UserLoginDto from '../../domains/dto/UserLoginDto';
import UserSignUpDto from '../../domains/dto/UserSignUpDto';
import Users from '../../domains/entity/Users';
import Service from '../Service';
import UsersService from '../UsersService';

export default class UsersServiceImpl extends Service implements UsersService {
  public async getUsers(): Promise<Users[]> {
    return await this.ctx.usersRepository.findAll();
  }

  public async getUserById(userId:string): Promise<Users> {
    return await this.ctx.usersRepository.findById(Number(userId));
  }

  public async login(usersDto: UserLoginDto): Promise<UserLoginDto> {
    const users = await this.ctx.usersRepository.loginUser(usersDto.username, usersDto.password);
    return UserLoginDto.ofForResponse(users)
  }

  public async createUsers(usersSignUpDto: UserSignUpDto): Promise<UserSignUpDto|string> {
    const alreadyUser = await this.ctx.usersRepository.usersByName(usersSignUpDto.username);
    if(alreadyUser) {
      return '이미 있는 회원입니다.';
    }
    const users = await this.ctx.usersRepository.createUsers(Users.createUserFromSignDto(usersSignUpDto));
    return UserSignUpDto.ofForResponse(users);
  }

  public async removeByName(userName: string) {
    return await this.ctx.usersRepository.removeByName(userName);
  }
  
}