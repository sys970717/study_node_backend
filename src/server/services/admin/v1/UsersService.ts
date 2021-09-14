
import UserSignUpDto from '../../../domains/dto/UserSignUpDto';
import Users from '../../../domains/entity/Users';

export default interface UsersService {
  getUsers(): Promise<Users[]>;
  createUsers(usersSignUpDto: UserSignUpDto): Promise<UserSignUpDto | string>;
  removeByName(userName: string): Promise<any>;
}