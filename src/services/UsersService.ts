import UsersRepository from "../repository/UsersRepositry";

export default class UserService {
  private usersRepository = new UsersRepository();

  public async getUsers() {
    return await this.usersRepository.findAll();
  }

  public async getUserById(userId) {
    return await this.usersRepository.findById(userId);
  }
  
}