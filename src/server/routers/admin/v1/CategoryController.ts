import { NextFunction, Request, Response } from 'express';
import ctx from "../../../app-admin-context";
import { Controller } from '../../../config/decorators/Controller';
import { Get } from "../../../config/decorators/Get";
import { Post } from '../../../config/decorators/Post';
import CategoryDto from '../../../domains/dto/CategoryDto';

@Controller('/category')
export default class CategoryController {
  @Get('/')
  public async getList(req: Request, res: Response, next: NextFunction) {
    const {
      beginIndex,
    } = req.query;

    // const result = await ctx.categoryService.getCategoryList();

    return res.json(beginIndex);
  }

  @Post('/')
  public async createCategory(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      sortNumber,
      description,
    } = req.body;

    const category = await ctx.categoryService.createCategory(name, sortNumber, description);
    return res.json(category);
  }
}