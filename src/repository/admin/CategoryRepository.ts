import Category from "../../domains/entity/Category";

export default interface CategoryRepository {
  createCategory(category: Category): Promise<Category> 
}