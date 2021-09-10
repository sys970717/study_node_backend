import { Request, Response } from 'express';
import { Controller } from '../../config/decorators/Controller';
import { Get } from '../../config/decorators/Get';
import { Post } from '../../config/decorators/Post';
import ctx from '../../app-context';

@Controller('/goods')
export default class GoodsController {
  @Get('/')
  public async getList(req: Request, res: Response) {
    const {
      beginIndex,
    } = req.query;

    const result = await ctx.goodsService.getGoodsList();

    return res.json(beginIndex);
  }

  @Get('/:id')
  public getGoods(req: Request, res: Response) {
    const result = {
      'hi': 'hi',
      ...req.query,
    };
    return res.json(result);
  }

  @Post('/:id')
  public createGoods(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    return res.json({name, id});
  }
}
