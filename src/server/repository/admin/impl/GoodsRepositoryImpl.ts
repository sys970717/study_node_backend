import GoodsSearchRequest from "../../../domains/dto/goods/GoodsSearchRequest";
import Goods from "../../../domains/entity/Goods";
import { createQueryBuilder, EntityRepository, getManager } from "typeorm";
import GoodsRepository from "../GoodsRepository";
import Category from "../../../domains/entity/Category";

@EntityRepository(Goods)
export default class GoodsRepositoryImpl implements GoodsRepository {
  public async createGoods(goods: Goods) {
    const repository = getManager().getRepository(Goods);
    return await repository.save(goods);
  }

  searchGoods(params: GoodsSearchRequest): Promise<[Goods[], number]> {
    const queryBuilder = createQueryBuilder()
    .select([
      'goods.id',
      'goods.name',
      'goods.price',
      'goods.is_show',
      'goods.category_id',
      'category.*',
    ])
    .from(Goods, 'goods')
    .leftJoin(Category, 'category', 'goods.category_id = category.id')
    .limit(params.getLimit())
    .offset(params.getOffset());

    return queryBuilder
      .disableEscaping()
      .getManyAndCount();
  }

}