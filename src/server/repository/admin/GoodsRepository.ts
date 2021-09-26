import Goods from "../../domains/entity/Goods";

export default interface GoodsRepository {
  createGoods(goods: Goods);
}