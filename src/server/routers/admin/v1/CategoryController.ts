import { NextFunction, Request, Response } from 'express';
import ctx from "../../../app-admin-context";
import { Controller } from '../../../config/decorators/Controller';
import { Get } from "../../../config/decorators/Get";
import { Post } from '../../../config/decorators/Post';
import CategoryDto from '../../../domains/dto/category/CategoryDto';

@Controller('/category')
export default class CategoryController {
  @Get('/')
  public async getList(req: Request, res: Response, next: NextFunction) {
    const result = await ctx.categoryService.getCategoryList();

    return res.json(result);
  }

  @Post('/')
  public async createCategory(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      sortNumber,
      description,
      categoryRef = null,
    } = req.body;

    const category = await ctx.categoryService.createCategory(name, sortNumber, description, categoryRef);
    return res.json(category);
  }
}