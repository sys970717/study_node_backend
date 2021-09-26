import Goods from "@/domains/entity/Goods";
import GoodsRepository from "../GoodsRepository";

export default class GoodsRepositoryImpl implements GoodsRepository {
  createGoods(goods: Goods) {
    throw new Error("Method not implemented.");
  }

}