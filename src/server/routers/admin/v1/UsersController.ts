import { NextFunction, Request, Response } from 'express';
import ctx from "../../../app-admin-context";
import { Controller } from "../../../config/decorators/Controller";
import { Get } from "../../../config/decorators/Get";
import * as ApiResponse from '../../../domains/dto/Response';

@Controller('/users')
export default class UsersController {
  @Get('/')
  public async userList(req: Request, res: Response, next: NextFunction) {
    const result = (await ctx).usersService.getUsers();

    const r: ApiResponse.IResponse = {
      code: 200,
      success: true,
      data: result,
    };

    return res.json(r);
  };
};
