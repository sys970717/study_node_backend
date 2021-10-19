
import UserLoginDto from '../domains/dto/UserLoginDto';
import UserSignUpDto from '../domains/dto/UserSignUpDto';
import Users from '../domains/entity/Users';

export default interface UsersService {
  getUsers(): Promise<Users[]>;
  login(usersDto: UserLoginDto): Promise<UserLoginDto>;
  createUsers(usersSignUpDto: UserSignUpDto): Promise<UserSignUpDto | string>;
  removeByName(userName: string): Promise<any>;
}