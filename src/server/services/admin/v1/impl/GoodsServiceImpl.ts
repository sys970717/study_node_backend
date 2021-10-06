import GoodsService from "../GoodsService";
import AdminService from "../../AdminService";
import { GoodsDto, IGoodsCreateDto } from "../../../../domains/dto/goods/IGoods";
import GoodsSearchRequest from "../../../../domains/dto/goods/GoodsSearchRequest";
import Goods from "../../../../domains/entity/Goods";
import { Page } from "../../../../domains/dto/Page";
import CategoryDto from "../../../../domains/dto/category/CategoryDto";
import logger from "../../../../util/Logger";

export default class GoodsServiceImpl extends AdminService implements GoodsService {
  async createGoods(goodsInfo: IGoodsCreateDto) {
    const categroy = await this.ctx.categoryRepositoy.findById(goodsInfo.categoryId);
    const entity = Goods.ofForCreate(goodsInfo.name, goodsInfo.price, goodsInfo.isShow, categroy, goodsInfo.description);
    return await this.ctx.goodsRepository.createGoods(entity);
  }

  async searchGoods(params: GoodsSearchRequest) {
    const result = await this.ctx.goodsRepository.searchGoods(params);
    try {
      console.log(result);
      result[0].forEach(e => {
        console.log(e);
        logger.info(`${e.name}, ${e.price}, ${e.category}, ${e.id}`);
      });
    } catch (err) {
      logger.error(err);
    }
    return new Page<GoodsDto> (result[1], params.pageSize, result[0].map(e => GoodsDto.of(e.name, e.price, CategoryDto.ofCategoryEntity(e.category), e.id)));
  }
}