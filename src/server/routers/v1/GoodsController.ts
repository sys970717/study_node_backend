import { Request, Response } from 'express';
import { Controller } from '../../config/decorators/Controller';
import { Get } from '../../config/decorators/Get';
import { Post } from '../../config/decorators/Post';
import ctx from '../../app-context';
import * as ApiResponse from '../../domains/dto/Response'
import GoodsSearchRequest from '../../domains/dto/goods/GoodsSearchRequest';
import logger from '../../util/Logger';

@Controller('/goods')
export default class GoodsController {
  @Get('/')
  public async getList(req: Request, res: Response) {
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

  @Get('/:id')
  public async getGoods(req: Request, res: Response) {
    const id = Number(req.params.id);
    logger.debug('HERE??');

    const r: ApiResponse.IResponse = {
      code: 200,
      success: true,
      data: {
        ...(await ctx.goodsService.viewDetail(id)),
      }
    };
    return res.json(r);
  }
}
