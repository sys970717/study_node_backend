import UserSignUpDto from '../../domains/dto/UserSignUpDto';
import { NextFunction, Request, Response } from 'express';
import { Controller } from '../../config/decorators/Controller';
import { Get } from '../../config/decorators/Get';
import { Post } from '../../config/decorators/Post';
import ctx from '../../app-context';
import UserLoginDto from '../../domains/dto/UserLoginDto';
import logger from '../../util/Logger';
import FormSyntaxError from '../../domains/errors/FormSyntaxError';
import { DELETE } from '../../config/decorators/DELETE';
import * as ApiResponse from '../../domains/dto/Response'

@Controller('/users')
export default class UsersController {
  @Get('/session')
  public async getUserInfo(req: Request, res: Response, next:NextFunction) {
    // const {

    // } = req.cookie
  }

  @Post('/session')
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

    const r: ApiResponse.IResponse = {
      code: 200,
      success: true,
      data: {
        ...(await ctx.usersService.login(userLoginDto)),
      },
    }

    return res.json(r);
  };

  @Post('/signup')
  public async createUser(req: Request, res: Response, next:NextFunction) {
    const {
      name,
      password,
      gender,
    } = req.body;

    logger.debug(`${req.inboundIp}`, req.body);

    if(!name || name.length <= 1) {
      return next('IllegalAccessError');
    } else if(!password || password.length < 3) {
      return next('IllegalAccessError');
    }

    const usersSignUpDto = UserSignUpDto.ofForRequestTrans(name, password, gender);
    // TODO, 암호화 룰셋 적용하기.

    const signUser = await ctx.usersService.createUsers(usersSignUpDto);
    if(!(signUser instanceof UserSignUpDto)) {
      return res.status(400).send({ message: signUser });
    }

    delete signUser.password;
    return res.json(signUser);
  }

  @DELETE('/session')
  public async deleteUser(req: Request, res: Response, next:NextFunction) {
    const { id } = req.params;

    return res.status(400).send({ id });
  }
  
}

