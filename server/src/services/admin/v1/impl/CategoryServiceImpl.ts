import CategoryDto from "../../../../domains/dto/category/CategoryDto";
import Category from "../../../../domains/entity/Category";
import AdminService from "../../AdminService";
import CategoryService from "../CategoryService";
import Logger from '../../../../util/Logger';

export default class CategoryServiceImpl extends AdminService implements CategoryService {
  public async getCategoryList(show?: boolean): Promise<CategoryDto[]> {
    const categoryList = await this.ctx.categoryRepositoy.findAll(show);
    const result: CategoryDto[] = [];
    for(const category of categoryList) {
      result.push(CategoryDto.ofCategoryEntity(category));
    }
    return result;
  }
  public async createCategory(name: string, categoryNumber?: number, description?: string, categoryRef?: number | null): Promise<CategoryDto> {
    const result = await this.ctx.categoryRepositoy.createCategory(Category.ofForCreate(name, null, categoryNumber, description, true, categoryRef));
    return CategoryDto.ofCategoryEntity(result);
  }

}