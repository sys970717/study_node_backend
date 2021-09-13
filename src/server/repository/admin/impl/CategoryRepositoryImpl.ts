import { getManager } from "typeorm";
import Category from "../../../domains/entity/Category";
import CategoryRepository from "../CategoryRepository";

export default class CategoryRepositoryImpl implements CategoryRepository {
  public async createCategory(category: Category) {
    const repository = getManager().getRepository(Category);
    return repository.save(category);
  }
}