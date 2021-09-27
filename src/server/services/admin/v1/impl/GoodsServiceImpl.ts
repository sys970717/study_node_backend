import GoodsService from "../GoodsService";
import AdminService from "../../AdminService";
import { IGoodsCreateDto } from "../../../../domains/dto/IGoods";
import Goods from "../../../../domains/entity/Goods";

export default class GoodsServiceImpl extends AdminService implements GoodsService {
  async createGoods(goodsInfo: IGoodsCreateDto) {
    console.log('asdfasdf');
    const categroy = await this.ctx.categoryRepositoy.findById(goodsInfo.categoryId);
    const entity = Goods.ofForCreate(goodsInfo.name, goodsInfo.price, goodsInfo.isShow, categroy, goodsInfo.description);
    return await this.ctx.goodsRepository.createGoods(entity);
  }
}