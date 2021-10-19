import { EntityManager, EntityRepository, getManager } from "typeorm";
import Category from "../../../domains/entity/Category";
import CategoryRepository from "../CategoryRepository";

@EntityRepository()
export default class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private manager: EntityManager) {

  }
  public async createCategory(category: Category) {
    const repository = getManager().getRepository(Category);
    return this.manager.save(category);
  }

  public async findAll(show = true) {
    const repository = getManager().getRepository(Category);
    return await this.manager.find(Category, {
      where: {
        isShow: show,
      }
    });
  }

  public async findById(id: number) {
    const repository = getManager().getRepository(Category);
    return await this.manager.findOneOrFail(Category, {
      where: {
        id: Number(id)
      }
    });
  }
}