import GoodsSearchRequest from "../../domains/dto/goods/GoodsSearchRequest";
import Goods from "../../domains/entity/Goods";

export default interface GoodsRepository {
  createGoods(goods: Goods): Promise<Goods>;
  searchGoods(params: GoodsSearchRequest): Promise<[Goods[], number]>;
  updateGoods(id: number, name: string, price: number, description: string, isShow: boolean)
}