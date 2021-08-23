import { Request, Response } from "express";
import { Controller } from "../../config/decorators/Controller";
import { Get } from "../../config/decorators/Get";
import { Post } from "../../config/decorators/Post";

@Controller('/board')
export default class BoardsController {
  @Get('')
  public index(req: Request, res: Response) {
    const result = {
      'hi': 'hi',
      ...req.query,
    };
    return res.json(result);
  }

  @Post('/:id')
  public getId(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    return res.json({name, id});
  }
}
