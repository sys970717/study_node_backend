import ctx from "../../../app-admin-context";
import { Request, Response, NextFunction } from "express";
import { Controller } from "../../../config/decorators/Controller";
import { Post } from "../../../config/decorators/Post";
import { Get } from "../../../config/decorators/Get";
import { Put } from "../../../config/decorators/Put";
import * as ApiResponse from '../../../domains/dto/Response'
import { IGoodsCreateDto, GoodsInfoDto } from "../../../domains/dto/goods/IGoods";
import { check } from "express-validator";
import GoodsSearchRequest from "../../../domains/dto/goods/GoodsSearchRequest";
import logger from "../../../util/Logger";

@Controller('/goods')
export default class GoodsController {
  @Post('/')
  public async createGoods(req: Request, res: Response, next: NextFunction) {
    check('name', 'name is required').not().isEmpty().bail();
    check('price', 'minimum price 0').not().isNumeric().bail();
    const { name, price, categoryId, description, isShow }: IGoodsCreateDto = req.body;

    const r: ApiResponse.IResponse = {
      code: 200,
      success: true,
      data: {
        ...(await ctx.goodsService.createGoods(GoodsInfoDto.of(null, name, price, categoryId, description, isShow))),
      },
    }

    return res.json(r);
  }

  @Get('/')
  public async listGoods(req: Request, res: Response, next: NextFunction) {
    const { pageNo = 1, pageSize = 10, name } = req.query;

    const r: ApiResponse.IResponse = {
      code: 200,
      success: true,
      data: {
        ...(await ctx.goodsService.searchGoods(GoodsSearchRequest.ofForCreate(pageNo, pageSize, name))),
      }
    };

    return res.json(r);
  }

  @Put('/:id')
  public async updateGoods(req: Request, res: Response, next: NextFunction) {
    const { isShow, name, price, description } = req.body;
    const id = Number(req.params.id);
    const r: ApiResponse.IResponse = {
      code: 200,
      success: true,
      data: {
        ...(await ctx.goodsService.updateGoods(id, name, price, description, isShow)),
      }
    };

    return res.json(r);

  }
}