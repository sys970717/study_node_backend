import Category from "../../domains/entity/Category";

export default interface CategoryRepository {
  findAll(show?: boolean): Promise<Category[]>
  createCategory(category: Category): Promise<Category> 
  findById(id: number): Promise<Category>
}