import GoodsSearchRequest from "../../../domains/dto/goods/GoodsSearchRequest";
import Goods from "../../../domains/entity/Goods";
import { createQueryBuilder, EntityRepository, getManager } from "typeorm";
import GoodsRepository from "../GoodsRepository";
import Category from "../../../domains/entity/Category";

@EntityRepository(Goods)
export default class GoodsRepositoryImpl implements GoodsRepository {
  async searchGoods(params: GoodsSearchRequest): Promise<[Goods[], number]> {
    console.log('asdfsdf');
    const repository = getManager().getRepository(Goods);
    repository.find({
      where: {
        isShow: 1,
      }
    })
    const queryBuilder = createQueryBuilder(Goods, 'goods')
    .select([
      'goods.id',
      'goods.name',
      'goods.price',
      'category.id',
      'category.category_name',
    ])
    .from(Goods, 'goods')
    .leftJoin(Category, 'category', 'goods.category_id = category.id')
    .limit(params.getLimit())
    .offset(params.getOffset());

    return queryBuilder
      .disableEscaping()
      .getManyAndCount();
  }

  public async createGoods(goods: Goods) {
    const repository = getManager().getRepository(Goods);
    return await repository.save(goods);
  }

}