import { Request, Response } from "express";
import { Controller } from "../../config/decorators/Controller";
import { Get } from "../../config/decorators/Get";
import { Post } from "../../config/decorators/Post";

@Controller('/products')
export default class ProductsController {
  @Get('/')
  public index(req: Request, res: Response) {
    const {
      beginIndex,
    } = req.query;

    return res.json(beginIndex);
  }

  @Get('/:id')
  public getProduct(req: Request, res: Response) {
    const result = {
      'hi': 'hi',
      ...req.query,
    };
    return res.json(result);
  }

  @Post('/:id')
  public createProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    return res.json({name, id});
  }
}
