import { Request, Response } from "express";
import { Controller } from "../../config/decorators/Controller";
import { Get } from "../../config/decorators/Get";
import { Post } from "../../config/decorators/Post";
import UserService from "../../services/UsersService";

@Controller('/users')
export default class UsersController {
  private userService = new UserService();

  @Get('/')
  public async userList(req: Request, res: Response) {
    const result = await this.userService.getUsers();

    return res.json(result);
  };

  @Post('/sign-in')
  public async getUser(req: Request, res: Response) {
    console.log(req.body);
    const {
      name,
      password,
    } = req.body;

    const result = await this.userService.getUserById(userId);

    return res.json(result);
  };

  @Post('/sign-up')
  public async createUser(req: Request, res: Response) {
    const {
      name,
      password,
      gender,
    } = req.body;
    
    return res.json(await this.userService.createUsers(name, password, gender));
  }
}

