import GoodsSearchRequest from "../../../domains/dto/goods/GoodsSearchRequest";
import Goods from "../../../domains/entity/Goods";
import { createQueryBuilder, EntityManager, EntityRepository, getManager, Repository } from "typeorm";
import GoodsRepository from "../GoodsRepository";
import Category from "../../../domains/entity/Category";

@EntityRepository()
export default class GoodsRepositoryImpl implements GoodsRepository {
  constructor(private manager: EntityManager) {

  }

  public async createGoods(goods: Goods) {
    return await this.manager.save(goods);
  }

  searchGoods(params: GoodsSearchRequest): Promise<[Goods[], number]> {
    const queryBuilder = this.manager.createQueryBuilder(Goods, 'goods')
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