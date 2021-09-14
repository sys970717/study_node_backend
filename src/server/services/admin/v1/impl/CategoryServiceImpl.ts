import CategoryDto from "../../../../domains/dto/CategoryDto";
import Category from "../../../../domains/entity/Category";
import AdminService from "../../AdminService";
import CategoryService from "../CategoryService";
import Logger from '../../../../util/Logger';

export default class CategoryServiceImpl extends AdminService implements CategoryService {
  public async getList(show?: boolean): Promise<CategoryDto[]> {
    throw new Error("Method not implemented.");
  }
  public async createCategory(name: string, categoryNumber?: number, description?: string): Promise<CategoryDto> {
    const result = await this.ctx.categoryRepositoy.createCategory(Category.ofForCreate(name, null, categoryNumber, description));
    return CategoryDto.ofCategoryEntity(result);
  }

}