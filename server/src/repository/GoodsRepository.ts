import GoodsSearchRequest from '../domains/dto/goods/GoodsSearchRequest';
import Goods from '../domains/entity/Goods';

export default interface GoodsRepository {
  register(goods: Goods): Promise<Goods>;
  searchGoods(params: GoodsSearchRequest): Promise<[Goods[], number]>;
  viewDetail(id: number): Promise<Goods>;
}