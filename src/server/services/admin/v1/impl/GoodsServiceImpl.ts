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
    const category = await this.ctx.categoryRepositoy.findById(goodsInfo.categoryId);
    const entity = Goods.ofForCreate(goodsInfo.name, goodsInfo.price, goodsInfo.isShow, category, goodsInfo.goodsCode, goodsInfo.description);
    return await this.ctx.goodsRepository.createGoods(entity);
  }

  async searchGoods(params: GoodsSearchRequest) {
    const result = await this.ctx.goodsRepository.searchGoods(params);
    return new Page<GoodsDto> (result[1], params.pageSize, result[0].map(e => GoodsDto.of(e.name, e.price, CategoryDto.ofCategoryEntity(e.category), e.id)));
  }

  async updateGoods(id: number, name: string, price: number, description: string, isShow: boolean) {
    return await this.ctx.goodsRepository.updateGoods(id, name, price, description, isShow);
  }
}