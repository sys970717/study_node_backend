import GoodsRepository from '../GoodsRepository';
import { getManager } from 'typeorm';
import Goods from '../../domains/entity/Goods';

export default class GoodsRepositoryImpl implements GoodsRepository {
  public async register(goods:Goods) {
    const repository = getManager().getRepository(Goods);
    return await repository.manager.save(goods);
  }

  public async inquiry(): Promise<Goods[]> {
    const repository = getManager().getRepository(Goods);
    return await repository.find({
      where: {
        isShow: true,
      },
    })
  }
}