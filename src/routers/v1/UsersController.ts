import UserSignUpDto from "../../domains/dto/UserSignUpDto";
import { NextFunction, Request, Response } from "express";
import { Controller } from "../../config/decorators/Controller";
import { Get } from "../../config/decorators/Get";
import { Post } from "../../config/decorators/Post";
import ctx from '../../app-context';
import UserLoginDto from "../../domains/dto/UserLoginDto";
import logger from "../../util/Logger";

@Controller('/users')
export default class UsersController {
  @Get('/')
  public async userList(req: Request, res: Response) {
    const result = await ctx.usersService.getUsers();
    logger.info('asdfasdf');

    return res.json(result);
  };

  @Post('/sign-in')
  public async getUser(req: Request, res: Response, next:NextFunction) {
    const {
      name,
      password,
    } = req.body;

    if(!name || name.length <= 1) {
      return next('IllegalAccessError');
    } else if(!password || password.length < 3) {
      return next('IllegalAccessError');
    }

    const userLoginDto = UserLoginDto.ofForSignIn(name, password);

    return res.json(await ctx.usersService.login(userLoginDto));
  };

  @Post('/sign-up')
  public async createUser(req: Request, res: Response, next:NextFunction) {
    const {
      name,
      password,
      gender,
    } = req.body;

    if(!name || name.length <= 1) {
      return next('IllegalAccessError');
    } else if(!password || password.length < 3) {
      return next('IllegalAccessError');
    }

    const usersSignUpDto = UserSignUpDto.ofForRequestTrans(name, password, gender);
    
    return res.json(await ctx.usersService.createUsers(usersSignUpDto));
  }
}

