import Goods from "@/domains/entity/Goods";
import { EntityRepository, getManager } from "typeorm";
import GoodsRepository from "../GoodsRepository";

// @EntityRepository(Goods)
export default class GoodsRepositoryImpl implements GoodsRepository {
  public async createGoods(goods: Goods) {
    const repository = getManager().getRepository(Goods);
    return await repository.save(goods);
  }

}