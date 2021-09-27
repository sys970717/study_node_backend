import ctx from "../../../app-admin-context";
import { Request, Response, NextFunction } from "express";
import { Controller } from "../../../config/decorators/Controller";
import { Post } from "../../../config/decorators/Post";
import * as ApiResponse from '../../../domains/dto/Response'
import { IGoodsCreateDto, GoodsInfoDto } from "../../../domains/dto/IGoods";
import { check } from "express-validator";

@Controller('/goods')
export default class GoodsController {
  @Post('/')
  public async createGodos(req: Request, res: Response, next: NextFunction) {
    check('name', 'name is required').not().isEmpty().bail();
    check('price', 'minimum price 0').not().isNumeric().bail();
    const { name, price, categoryId, description, isShow }: IGoodsCreateDto = req.body;

    const r: ApiResponse.IResponse = {
      code: 200,
      success: true,
      data: {
        ...(await ctx.goodsService.createGoods(GoodsInfoDto.of(name, price, categoryId, description, isShow))),
      },
    }

    return res.json(r);
  }
}