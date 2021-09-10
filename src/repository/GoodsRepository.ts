import Goods from '../domains/entity/Goods';

export default interface GoodsRepository {
  register(goods: Goods): Promise<Goods>;
  inquiry(): Promise<Goods[]>;
}