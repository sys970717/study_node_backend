import { getManager } from "typeorm";
import Category from "../../../domains/entity/Category";
import CategoryRepository from "../CategoryRepository";

export default class CategoryRepositoryImpl implements CategoryRepository {
  public async createCategory(category: Category) {
    const repository = getManager().getRepository(Category);
    return repository.save(category);
  }

  public async findAll(show = true) {
    const repository = getManager().getRepository(Category);
    return await repository.find({
      where: {
        isShow: show,
      }
    });
  }

  public async findById(id: number) {
    const repository = getManager().getRepository(Category);
    return await repository.findOneOrFail({
      where: {
        id: Number(id)
      }
    });
  }
}