import GoodsRepository from '../GoodsRepository';
import { getManager } from 'typeorm';
import Goods from '../../domains/entity/Goods';
import GoodsSearchRequest from '../../domains/dto/goods/GoodsSearchRequest';

export default class GoodsRepositoryImpl implements GoodsRepository {
  public async register(goods:Goods) {
    const repository = getManager().getRepository(Goods);
    return await repository.manager.save(goods);
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

    queryBuilder.where('goods.isShow = true');

    return queryBuilder
      .disableEscaping()
      .getManyAndCount();
  }

  async viewDetail(id: number): Promise<Goods> {
    const repository = getManager().getRepository(Goods);
    const queryBuilder = repository.createQueryBuilder('goods')
      .select([
        'goods.id',
        'goods.name',
        'goods.price',
        'goods.is_show',
        'goods.description',
        'category.id',
      ])
      .leftJoin('goods.category', 'category')
      .where('goods.id = :id', { id });
    
    return queryBuilder.disableEscaping().getOne();
  }
}