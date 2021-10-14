import GoodsSearchRequest from "../../../domains/dto/goods/GoodsSearchRequest";
import Goods from "../../../domains/entity/Goods";
import { createQueryBuilder, EntityRepository, getManager } from "typeorm";
import GoodsRepository from "../GoodsRepository";
import Category from "../../../domains/entity/Category";

export default class GoodsRepositoryImpl implements GoodsRepository {
  public async createGoods(goods: Goods) {
    const repository = getManager().getRepository(Goods);
    return await repository.save(goods);
  }

  searchGoods(params: GoodsSearchRequest): Promise<[Goods[], number]> {
    const repository = getManager().getRepository(Goods);
    const queryBuilder = repository.createQueryBuilder('goods')
    .select([
      'goods.id',
      'goods.name',
      'goods.price',
      'goods.is_show',
      'category.id',
      'category.name',
    ])
    .leftJoin('goods.category', 'category')
    .limit(params.getLimit())
    .offset(params.getOffset());

    return queryBuilder
      .disableEscaping()
      .getManyAndCount();
  }

  async updateGoods(id: number, name: string, price: number, description: string, isShow: boolean) {
    const repository = getManager().getRepository(Goods);
    const goods: Goods = await repository.findOne(id);

    goods.change(name, price, description, isShow);

    return goods.save();
  }

}