import GoodsRepository from '../GoodsRepository';
import { EntityRepository, getManager } from 'typeorm';
import Goods from '../../domains/entity/Goods';
import GoodsSearchRequest from '../../domains/dto/goods/GoodsSearchRequest';

export default class GoodsRepositoryImpl implements GoodsRepository {
  public async register(goods:Goods) {
    const repository = getManager().getRepository(Goods);
    return await repository.manager.save(goods);
  }

  async searchGoods(params: GoodsSearchRequest): Promise<[Goods[], number]> {
    console.log('HEHEHE??');
    const repository = getManager().getRepository(Goods);
    const queryBuilder = repository.createQueryBuilder('goods')
    .select([
      'goods.id',
      'goods.name',
      'goods.price',
      'goods.is_show',
      'goods.description',
      'category.id',
      'category.name',
    ])
    .leftJoin('goods.category', 'category')
    .where('goods.isShow = true')
    .limit(params.getLimit())
    .offset(params.getOffset());

    return await queryBuilder
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