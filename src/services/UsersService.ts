import UsersRepository from "../repository/UsersRepositry";

export default class UserService {
  private usersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async getUsers() {
    await this.usersRepository.findAll();
  }
  
}