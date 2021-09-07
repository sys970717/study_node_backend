import { Request, Response } from "express";
import { Controller } from "../../config/decorators/Controller";
import { Get } from "../../config/decorators/Get";
import UserService from "../../services/UsersService";

@Controller('/users')
export default class UsersController {
  private userService = new UserService();

  @Get('/')
  public async userList(req: Request, res: Response) {
    const {
      beginIndex,
    } = req.query;

    const result = await this.userService.getUsers();

    return res.json(result);
  };

  @Get('/:id')
  public async getUser(req: Request, res: Response) {
    const {
      userId,
    } = req.params;

    const result = await this.userService.getUserById(userId);

    return res.json(result);
  }
}
